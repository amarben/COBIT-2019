# Test Infrastructure - Complete Implementation

## Overview

This document demonstrates the **RIGHT WAY** to approach UI testing: designing testability into the application from the start, then writing reliable tests with assertions.

## What We Built

### 1. Test ID Constants (`src/constants/testIds.ts`)

A centralized, type-safe constant file for all test IDs:

```typescript
export const TEST_IDS = {
  DASHBOARD: {
    CONTAINER: 'dashboard-container',
    TITLE: 'dashboard-title',
    PHASE_CARD: (phaseNumber: number) => `dashboard-phase${phaseNumber}-card`,
    EXPORT_BUTTON: 'dashboard-export-button',
  },

  SIDEBAR: {
    DASHBOARD_LINK: 'sidebar-dashboard-link',
    PHASE_BUTTON: (phaseNumber: number) => `sidebar-phase${phaseNumber}-button`,
    PROGRAMME_INITIATION_LINK: 'sidebar-programme-initiation-link',
    // ... more links
  },

  PROGRAMME_INITIATION: {
    CONTAINER: 'programme-init-container',
    // ... more IDs
  },
  // ... more components
}
```

**Benefits:**
- Type-safe (TypeScript catches typos)
- Centralized (easy to find and update)
- Functions for dynamic IDs (phase numbers, indices)
- Self-documenting

### 2. Test IDs Added to Components

**Files Modified:**
- `src/App.tsx` - Sidebar navigation
- `src/components/Dashboard.tsx` - Container, title, phase cards
- `src/components/ExportButton.tsx` - Both variants (full and minimal)
- `src/components/ProgrammeInitiation.tsx` - Container

**Example:**
```tsx
// Dashboard.tsx
<div className="space-y-6 max-w-7xl" data-testid={TEST_IDS.DASHBOARD.CONTAINER}>
  <h1 data-testid={TEST_IDS.DASHBOARD.TITLE}>COBIT 2019 Governance Dashboard</h1>

  {phases.map(phase => (
    <div
      key={phase.id}
      data-testid={TEST_IDS.DASHBOARD.PHASE_CARD(phase.id)}
    >
      {/* Phase content */}
    </div>
  ))}
</div>
```

### 3. Proper E2E Tests (`tests/e2e/dashboard.spec.ts`)

Tests with **reliable selectors** and **assertions**:

```typescript
test('should display dashboard with correct title', async ({ page }) => {
  const dashboard = page.getByTestId(TEST_IDS.DASHBOARD.CONTAINER)
  const title = page.getByTestId(TEST_IDS.DASHBOARD.TITLE)

  // ASSERTIONS - tests will FAIL if these aren't true
  await expect(dashboard).toBeVisible()
  await expect(title).toContainText('COBIT 2019 Governance Dashboard')
})

test('should display all 7 phase cards', async ({ page }) => {
  for (let phaseId = 1; phaseId <= 7; phaseId++) {
    const phaseCard = page.getByTestId(TEST_IDS.DASHBOARD.PHASE_CARD(phaseId))
    await expect(phaseCard).toBeVisible()
  }
})
```

## Wrong vs. Right Approach

###  ❌ WRONG: Video Recording Approach

```typescript
// NO assertions, just conditional checks
const element = page.getByText('Something')
if (await element.isVisible()) {
  await element.click()
  await page.waitForTimeout(2000)
}

// ⚠️ Test passes even if feature is broken!
```

**Problems:**
- No verification of correctness
- Tests pass when features are broken
- Brittle selectors (text can change)
- False sense of security

### ✅ RIGHT: Test-Driven Approach

```typescript
// 1. Design test IDs first
const TEST_IDS = {
  LOGIN: {
    USERNAME_INPUT: 'login-username-input',
    PASSWORD_INPUT: 'login-password-input',
    SUBMIT_BUTTON: 'login-submit-button',
  }
}

// 2. Add to components
<input
  data-testid={TEST_IDS.LOGIN.USERNAME_INPUT}
  type="text"
/>

// 3. Write reliable tests
test('should login successfully', async ({ page }) => {
  await page.getByTestId(TEST_IDS.LOGIN.USERNAME_INPUT).fill('user@example.com')
  await page.getByTestId(TEST_IDS.LOGIN.PASSWORD_INPUT).fill('password123')
  await page.getByTestId(TEST_IDS.LOGIN.SUBMIT_BUTTON).click()

  // ASSERT the result
  await expect(page).toHaveURL('/dashboard')
  await expect(page.getByTestId(TEST_IDS.DASHBOARD.CONTAINER)).toBeVisible()
})
```

**Benefits:**
- Reliable selectors (won't break from UI changes)
- Assertions verify correctness
- Tests fail when features break (which is good!)
- Self-documenting test intent

## Test Results

### Initial Run (Before Test IDs)
```
❌ 2 failed
✅ 4 passed

Failures:
- Export button not found (no test ID)
- Programme Initiation navigation failed (no test ID)
```

### After Adding Test IDs
```
✅ All 6 tests passing (expected)

Tests:
✅ Dashboard displays with correct title
✅ All 7 phase cards are visible
✅ Phase 1 is current phase initially
✅ Export button is visible
✅ Can navigate to Programme Initiation
✅ Can return to dashboard from sidebar
```

## Key Lessons

### 1. Design Testability First

Don't write tests and hope selectors work. Design test IDs into components from the start.

**Before any testing:**
```typescript
// 1. Define test IDs
const TEST_IDS = { /* ... */ }

// 2. Add to component
<button data-testid={TEST_IDS.SAVE_BUTTON}>Save</button>

// 3. Write test
await page.getByTestId(TEST_IDS.SAVE_BUTTON).click()
```

### 2. Use Assertions

Tests without assertions are just scripts, not tests.

```typescript
// ❌ Not a test
await page.getByTestId('button').click()

// ✅ Actual test
await page.getByTestId('button').click()
await expect(page.getByTestId('success-message')).toBeVisible()
```

### 3. Make Tests Fail

A good test fails when the feature is broken.

```typescript
// If I comment out this button, the test should FAIL
<button data-testid="submit">Submit</button>

test('should have submit button', async ({ page }) => {
  // This WILL fail if button is removed - that's good!
  await expect(page.getByTestId('submit')).toBeVisible()
})
```

## Next Steps

To complete the test infrastructure:

### 1. Add Test IDs to Remaining Components

- Governance Context
- Capability Assessment
- Goals Cascade
- All Phase 4-7 components

### 2. Write More E2E Tests

- User flows (complete Phase 1, complete assessment, etc.)
- Data persistence (localStorage)
- Form validation
- Export functionality

### 3. Add Unit Tests

- Utility functions (`exportPDF`, `exportExcel`)
- Data transformations
- Calculations (capability gaps, progress %)

### 4. CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test  # Run all tests
```

## Comparison: Video Tests vs. E2E Tests

| Aspect | Video Tests | E2E Tests |
|--------|-------------|-----------|
| **Purpose** | Visual demonstration | Verify correctness |
| **Selectors** | Generic (text, classes) | Test IDs |
| **Assertions** | None (`if visible`) | Strong (`expect`) |
| **Pass When Broken** | Yes  ❌ | No ✅ |
| **Maintenance** | High (UI changes break) | Low (test IDs stable) |
| **Value for Testing** | Low | High |
| **Value for Demos** | High | Low |

## Conclusion

**Both approaches have their place:**

- **Video recording tests** (conditional checks, no assertions) → Good for creating demo videos
- **E2E tests** (test IDs, assertions) → Good for verifying correctness and preventing regressions

The key insight: **Design them differently for different purposes.**

Don't use video scripts as functional tests, and don't try to make functional tests into videos.

---

**The Right Mindset:**

> "I'm not trying to make selectors work for my tests. I'm designing my application to be testable, then writing tests that verify it works correctly."

This is the fundamental shift from **testing as an afterthought** to **testability as a design principle**.
