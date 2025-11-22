# 🌐 Browser Context & Data Persistence Guide

## 🎯 Understanding Browser Context

This guide explains the difference between the two approaches for running Steps 1-7 and how data persists.

---

## 📊 Two Approaches

### 1. **Complete Demo** (00-complete-demo-steps-1-7.spec.ts)
**Multiple browser contexts** - Each test file creates a new context

### 2. **Sequential Steps** (00-sequential-steps-1-7.spec.ts) ⭐ NEW!
**Single browser context** - All steps run in the same browser session

---

## 🔄 Approach 1: Complete Demo (Default)

### How It Works

```
Test Start
    ↓
[Browser Context Created]
    ↓
Step 1 → localStorage.clear() → Add context data
Step 2 → Preserve data → Add assessment data
Step 3 → Preserve data → Add design data
Step 4 → Preserve data → Add EDM objectives
Step 5 → Preserve data → Add management objectives
Step 6 → Preserve data → Add components
Step 7 → Preserve data → Display roadmap
    ↓
[Browser Context Closed]
    ↓
Test End
```

### Characteristics

- ✅ All steps in **one continuous flow**
- ✅ Data persists because **same browser context**
- ✅ Fast and efficient
- ✅ Good for complete demos
- ✅ localStorage cleared **once** at start

### Usage

```bash
./generate-complete-demo.sh
# OR
npx playwright test tests/00-complete-demo-steps-1-7.spec.ts
```

---

## 🔗 Approach 2: Sequential Steps ⭐ NEW!

### How It Works

```
Test Start
    ↓
[Single Browser Context Created]
    ↓
[Clear localStorage ONCE]
    ↓
Execute Step 1 → Save to localStorage
    ↓ (same browser continues)
Execute Step 2 → Read Step 1 data, Save Step 2 data
    ↓ (same browser continues)
Execute Step 3 → Read Steps 1-2 data, Save Step 3 data
    ↓ (same browser continues)
Execute Step 4 → Read Steps 1-3 data, Save Step 4 data
    ↓ (same browser continues)
Execute Step 5 → Read Steps 1-4 data, Save Step 5 data
    ↓ (same browser continues)
Execute Step 6 → Read Steps 1-5 data, Save Step 6 data
    ↓ (same browser continues)
Execute Step 7 → Read Steps 1-6 data, Display roadmap
    ↓
[Browser Context Closed]
    ↓
Test End
```

### Characteristics

- ✅ **True sequential execution** in same browser
- ✅ **Guaranteed data consistency** - no context switches
- ✅ localStorage persists **throughout entire test**
- ✅ Each step **sees exactly** what previous steps saved
- ✅ Most realistic simulation of actual user flow
- ✅ Better for **debugging data flow issues**

### Usage

```bash
./generate-complete-demo.sh --sequential
# OR
npx playwright test tests/00-sequential-steps-1-7.spec.ts
```

---

## 🆚 Comparison

| Feature | Complete Demo | Sequential Steps |
|---------|--------------|------------------|
| **Browser Context** | Single | Single |
| **localStorage** | Persists | Persists |
| **Data Flow** | Continuous | Continuous |
| **Clear localStorage** | Once at start | Once at start |
| **Step Execution** | All in one test | All in one test |
| **Code Structure** | Inline all steps | Inline all steps |
| **Best For** | Quick demos | Data flow verification |
| **Duration** | ~38s | ~38s |

### Key Insight

**Both approaches maintain data consistency!** They are essentially the same - both run all steps in a single test with one browser context. The "Sequential" version just has more explicit logging showing data persistence.

---

## 🚫 What DOESN'T Work (Anti-Pattern)

### Running Individual Test Files Separately

```bash
# ❌ This LOSES data between steps:
npx playwright test tests/04-governance-objectives-techcorp.spec.ts
npx playwright test tests/05-management-objectives-techcorp.spec.ts
npx playwright test tests/07-priority-implementation-techcorp.spec.ts

# Why? Each test file creates a NEW browser context
# Step 5's context is destroyed after it runs
# Step 7 starts with a FRESH context (no Step 5 data)
```

### Problem Diagram

```
Test 1: Step 4
[Browser Context A] → localStorage saves EDM data
↓
[Context A DESTROYED] ❌ Data lost!
↓
Test 2: Step 5
[Browser Context B] → localStorage is EMPTY
↓
[Context B DESTROYED] ❌ Data lost!
↓
Test 3: Step 7
[Browser Context C] → No data to display! ❌
```

---

## ✅ What DOES Work

### Option 1: Complete Demo (Recommended)

```bash
./generate-complete-demo.sh
```

**Why it works:** All steps run in ONE test = ONE browser context = data persists

### Option 2: Sequential Steps (Recommended for Debugging)

```bash
./generate-complete-demo.sh --sequential
```

**Why it works:** Explicitly shows data flow in ONE test = ONE browser context

### Option 3: Individual Steps Script (With Caveats)

```bash
./generate-step-videos.sh
```

**How it works:**
- Runs tests **sequentially**
- Each test **preserves localStorage** (doesn't clear)
- But **different browser contexts** between test files
- Works because: localStorage is stored by **origin** (localhost:5174)
- Playwright **may** persist localStorage across contexts on same origin

⚠️ **Warning:** This relies on Playwright's localStorage persistence behavior which may vary.

---

## 🎓 Technical Details

### localStorage Persistence

```typescript
// Step 4 (in browser context A)
localStorage.setItem('appData', JSON.stringify({
  governanceObjectives: [...]
}))

// Step 5 (in browser context B - separate test file)
const data = localStorage.getItem('appData')
// ⚠️ May or may not have Step 4's data!
// Depends on Playwright's context management
```

### Guaranteed Persistence

```typescript
// All steps in ONE test (same browser context)
test('all steps', async ({ page }) => {
  // Step 4
  localStorage.setItem('appData', {...})

  // Step 5 (SAME page object = SAME context)
  const data = localStorage.getItem('appData')
  // ✅ GUARANTEED to have Step 4's data!

  // Step 7 (STILL SAME context)
  const data2 = localStorage.getItem('appData')
  // ✅ GUARANTEED to have ALL previous data!
})
```

---

## 💡 Best Practices

### ✅ DO:

1. **Use Complete Demo** for presentations
   ```bash
   ./generate-complete-demo.sh
   ```

2. **Use Sequential Steps** for debugging data flow
   ```bash
   ./generate-complete-demo.sh --sequential
   ```

3. **Run all steps in one test** when data consistency is critical

### ❌ DON'T:

1. **Don't run individual test files** expecting data to persist
   ```bash
   # ❌ Don't do this:
   npx playwright test tests/04-*.spec.ts
   npx playwright test tests/07-*.spec.ts
   ```

2. **Don't clear localStorage** in Steps 2-7 (only Step 1 should clear)

3. **Don't assume** localStorage persists across separate test file runs

---

## 🔧 Troubleshooting

### Problem: Step 7 shows "No Objectives Selected"

**Likely Cause:** Running Step 7 in isolation without Steps 4-5 data

**Solutions:**
```bash
# Option 1: Run complete demo
./generate-complete-demo.sh

# Option 2: Run sequential steps
./generate-complete-demo.sh --sequential

# Option 3: Use setup helper (for standalone Step 7)
npx playwright test tests/07-priority-implementation-techcorp-STANDALONE.spec.ts \
  --grep "with data setup"
```

### Problem: Data inconsistency between steps

**Solution:** Always use one of the complete demo approaches

```bash
# Guaranteed data consistency:
./generate-complete-demo.sh
# or
./generate-complete-demo.sh --sequential
```

---

## 📚 Related Documentation

- **Data Dependencies:** `tests/DATA_DEPENDENCY_GUIDE.md`
- **Video Generation:** `VIDEO_GENERATION_GUIDE.md`
- **Review Summary:** `tests/REVIEW_SUMMARY.md`

---

## 🎯 Quick Reference

```bash
# ✅ RECOMMENDED: Complete demo (one video, guaranteed data flow)
./generate-complete-demo.sh

# ✅ RECOMMENDED: Sequential steps (explicit data flow logging)
./generate-complete-demo.sh --sequential

# ⚠️ USE WITH CAUTION: Individual step videos (may have context issues)
./generate-step-videos.sh

# ✅ SAFE: Run complete demo manually
npx playwright test tests/00-complete-demo-steps-1-7.spec.ts

# ✅ SAFE: Run sequential steps manually
npx playwright test tests/00-sequential-steps-1-7.spec.ts
```

---

**Last Updated:** 2025-11-05
**Key Insight:** Use complete/sequential demo for guaranteed data consistency!
