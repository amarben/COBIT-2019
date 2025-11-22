# Test Data Dependency Guide

## 🎯 Overview

This guide explains how the demo tests are structured to handle data dependencies between steps.

## 📊 Data Flow Architecture

```
Step 1: Governance Context
    ↓ (saves company data to localStorage)
Step 2: Capability Assessment
    ↓ (saves assessment data)
Step 3: Governance Design
    ↓ (saves design choices)
Step 4: Governance Objectives ← Creates EDM objectives data
    ↓ (saves governanceObjectives to localStorage)
Step 5: Management Objectives ← Creates management objectives data
    ↓ (saves managementObjectives to localStorage)
Step 6: Component Definition
    ↓ (saves components to localStorage)
Step 7: Priority Implementation ← READS data from Steps 4-5
    (displays implementation roadmap based on objectives)
```

## 🔑 Key Principles

### ✅ DO:
1. **Steps 2-7:** Load app WITHOUT clearing localStorage
2. **Each step:** Add its own data to existing appData
3. **Later steps:** Assume previous steps' data exists
4. **Use setup helper:** When testing steps in isolation

### ❌ DON'T:
1. **Never** call `localStorage.clear()` in Steps 2-7
2. **Never** re-run previous steps inside a later step
3. **Never** assume empty state when starting Steps 2-7

## 📝 Updated Test Structure

### Step 4, 5, 6 Pattern:
```typescript
// ✅ CORRECT: Preserve previous data
await page.goto('http://localhost:5174/')
await page.waitForLoadState('networkidle')

// ❌ WRONG: Wipes previous data
await page.evaluate(() => localStorage.clear())
```

### Step 7 Pattern (Two Approaches):

#### Approach 1: Assume Data Exists (Fast)
```typescript
test('view roadmap (assumes Steps 4-5 data)', async ({ page }) => {
  // Load WITHOUT clearing
  await page.goto('http://localhost:5174/')

  // Navigate directly to Step 7
  await page.locator('aside nav button')
    .filter({ hasText: /Step 7/i })
    .first()
    .click()

  // Display roadmap based on existing data
})
```

#### Approach 2: Setup Data First (Complete)
```typescript
import { setupSteps1to6 } from './helpers/setup-steps-1-6'

test('with data setup', async ({ page }) => {
  // Run setup to populate data
  await setupSteps1to6(page, verbose=true)

  // Now navigate to Step 7
  await page.locator('aside nav button')
    .filter({ hasText: /Step 7/i })
    .first()
    .click()
})
```

## 🧪 Running Tests

### Individual Steps (Requires Sequential Execution)

```bash
# Run Steps 1-7 in sequence (builds up data)
npx playwright test tests/01-governance-context-techcorp.spec.ts
npx playwright test tests/02-capability-assessment-techcorp.spec.ts
npx playwright test tests/03-governance-design-techcorp.spec.ts
npx playwright test tests/04-governance-objectives-techcorp.spec.ts
npx playwright test tests/05-management-objectives-techcorp.spec.ts
npx playwright test tests/06-component-definition-techcorp.spec.ts
npx playwright test tests/07-priority-implementation-techcorp-STANDALONE.spec.ts
```

### Step 7 with Auto-Setup

```bash
# This test includes setup, can run standalone
npx playwright test tests/07-priority-implementation-techcorp-STANDALONE.spec.ts \
  --grep "with data setup"
```

### Complete Demo (All Steps)

```bash
# Runs Steps 1-7 in one continuous demo
npx playwright test tests/00-complete-demo-steps-1-7.spec.ts
```

## 📹 Generating Demo Videos

### Individual Step Videos (Sequential)

```bash
# Must run in order to build up data
export DEMO_MODE=true

npx playwright test tests/01-governance-context-techcorp.spec.ts
npx playwright test tests/02-capability-assessment-techcorp.spec.ts
npx playwright test tests/03-governance-design-techcorp.spec.ts
npx playwright test tests/04-governance-objectives-techcorp.spec.ts
npx playwright test tests/05-management-objectives-techcorp.spec.ts
npx playwright test tests/06-component-definition-techcorp.spec.ts
npx playwright test tests/07-priority-implementation-techcorp-STANDALONE.spec.ts
```

### Complete Workflow Video

```bash
# Single video showing Steps 1-7
export DEMO_MODE=true
npx playwright test tests/00-complete-demo-steps-1-7.spec.ts
```

## 🔧 Setup Helper

The `setupSteps1to6()` helper function populates data for testing later steps:

```typescript
import { setupSteps1to6 } from './helpers/setup-steps-1-6'

// In your test:
await setupSteps1to6(page, verbose=false)

// This creates:
// - 5 EDM objectives with practices
// - 12 management objectives with priorities
// - 3 key components
```

## 🐛 Troubleshooting

### Problem: Step 7 shows "No Objectives Selected"

**Cause:** Steps 4-5 weren't run first, or localStorage was cleared.

**Solutions:**
1. Run Steps 4-5 before Step 7
2. Use the "with data setup" test variant
3. Run the complete demo test

### Problem: Data from previous step is missing

**Cause:** Test cleared localStorage or ran in isolation.

**Solution:** Run steps sequentially or use setup helper.

### Problem: Old data conflicts with new test

**Cause:** localStorage persists between test runs.

**Solution:** Only Step 1 should clear localStorage at the start.

## 📂 File Structure

```
tests/
├── 01-governance-context-techcorp.spec.ts          (Clears & sets up)
├── 02-capability-assessment-techcorp.spec.ts       (Preserves data)
├── 03-governance-design-techcorp.spec.ts           (Preserves data)
├── 04-governance-objectives-techcorp.spec.ts       (Preserves data)
├── 05-management-objectives-techcorp.spec.ts       (Preserves data)
├── 06-component-definition-techcorp.spec.ts        (Preserves data)
├── 07-priority-implementation-techcorp-STANDALONE.spec.ts (Reads data)
├── 00-complete-demo-steps-1-7.spec.ts              (All steps)
└── helpers/
    └── setup-steps-1-6.ts                          (Setup helper)
```

## 🎬 Demo Video Strategy

### For Presentation: Use Complete Demo
- Single video showing full workflow
- File: `00-complete-demo-steps-1-7.spec.ts`
- Duration: ~38 seconds
- Shows: Steps 1-7 continuously

### For Documentation: Individual Videos
- Run Steps 1-7 sequentially
- Each step is its own video
- Can be edited/spliced together
- Allows focus on specific steps

## ✅ Migration Checklist

- [x] Created `setup-steps-1-6.ts` helper
- [x] Removed `localStorage.clear()` from Steps 4-7
- [x] Created standalone Step 7 test
- [x] Updated Step 7 with two test variants
- [x] Created complete demo test (Steps 1-7)
- [x] Documented data dependency architecture

## 📚 Best Practices

1. **Only Step 1 clears localStorage** - Fresh start for complete workflow
2. **Steps 2-7 preserve data** - Build on previous steps
3. **Step 7 reads, doesn't write** - Pure display of roadmap
4. **Use setup helper for isolation** - Test Step 7 independently
5. **Complete demo for videos** - Single continuous recording

---

**Last Updated:** 2025-11-05
**Version:** 2.0 (Data Dependency Architecture)
