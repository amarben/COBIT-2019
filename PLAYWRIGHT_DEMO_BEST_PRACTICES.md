# Playwright Demo Video Best Practices

A comprehensive guide for creating high-quality, performant demo videos using Playwright for any web application.

---

## Table of Contents

1. [Core Principles](#core-principles)
2. [Ultra-Fast Demo Mode](#ultra-fast-demo-mode)
3. [Configuration Setup](#configuration-setup)
4. [Wait Strategies](#wait-strategies)
5. [Performance Optimization](#performance-optimization)
6. [Advanced Speed Techniques](#advanced-speed-techniques)
7. [Visual Polish](#visual-polish)
8. [Helper Utilities](#helper-utilities)
9. [Common Pitfalls](#common-pitfalls)
10. [Sample Implementation](#sample-implementation)
11. [Speed Benchmarking](#speed-benchmarking)

---

## Core Principles

### 1. Smart Waits Over Fixed Timeouts

**❌ BAD - Fixed Timeouts:**
```typescript
await button.click()
await page.waitForTimeout(1000) // Arbitrary wait
await input.fill('text')
await page.waitForTimeout(500)  // Another arbitrary wait
```

**✅ GOOD - Event-Based Waits:**
```typescript
await button.click()
await page.waitForLoadState('networkidle')
await expect(input).toBeVisible()
await input.fill('text')
```

**Benefits:**
- Tests run as fast as possible
- No wasted time waiting when page is already ready
- More reliable (no race conditions)
- Smaller video file sizes

### 2. Minimal slowMo for Maximum Efficiency

**slowMo Guidelines:**
- **Production demos**: 50-100ms (smooth but efficient)
- **Sales presentations**: 100-200ms (more deliberate)
- **Training videos**: 200-400ms (educational pace)
- **❌ Avoid**: 500ms+ (unnecessarily slow)

### 3. Strategic Text Input

Choose the right method for the context:

```typescript
// Fast fills for non-critical fields
await input.fill('user@example.com')

// Typed animation for key moments only
await input.pressSequentially('Important Message', { delay: 50 })

// Ultra-slow typing (30-50ms delay) only for dramatic effect
```

---

## Ultra-Fast Demo Mode

### Aggressive Speed Optimization Strategy

For maximum speed, apply ALL of these techniques simultaneously:

#### 1. Zero slowMo Configuration

```typescript
test.use({
  launchOptions: {
    slowMo: 0, // NO artificial delays - maximum speed
  },
})
```

**Impact:** Every Playwright action runs at maximum browser speed

#### 2. Remove ALL Visual Pauses

```typescript
// ❌ BEFORE: Multiple visual pauses
await button.click()
await page.waitForTimeout(300)
await input.fill('text')
await page.waitForTimeout(500)
await submitButton.click()
await page.waitForTimeout(1000)

// ✅ AFTER: Zero visual pauses
await button.click()
await input.fill('text')
await submitButton.click()
await page.waitForLoadState('networkidle') // Only wait for actual completion
```

**Impact:** Eliminates 1.8 seconds of unnecessary waiting in this example

#### 3. Instant Text Input

```typescript
// ❌ BEFORE: Simulated typing
await input.pressSequentially('This is a long text field', { delay: 150 })
// Takes: 3.75 seconds (25 characters × 150ms)

// ✅ AFTER: Instant fill
await input.fill('This is a long text field')
// Takes: <50ms

// 🚀 RESULT: 98.7% faster
```

#### 4. Parallel Operations Where Possible

```typescript
// ❌ BEFORE: Sequential form filling
await nameInput.fill('John Doe')
await emailInput.fill('john@example.com')
await phoneInput.fill('+1234567890')
await addressInput.fill('123 Main St')

// ✅ AFTER: Use Promise.all for independent operations
await Promise.all([
  nameInput.fill('John Doe'),
  emailInput.fill('john@example.com'),
  phoneInput.fill('+1234567890'),
  addressInput.fill('123 Main St'),
])

// 🚀 RESULT: 75% faster for 4 fields
```

#### 5. Skip Unnecessary Scrolling

```typescript
// ❌ BEFORE: Manual scrolling
await element.scrollIntoViewIfNeeded()
await page.waitForTimeout(300)
await element.click()

// ✅ AFTER: Let Playwright handle it automatically
await element.click() // Playwright auto-scrolls when needed

// 🚀 RESULT: Removes 300ms + scroll animation time
```

#### 6. Use 'domcontentloaded' Instead of 'networkidle'

```typescript
// ❌ SLOWER: Wait for all network requests
await page.goto('/dashboard')
await page.waitForLoadState('networkidle')

// ✅ FASTER: Wait only for DOM
await page.goto('/dashboard')
await page.waitForLoadState('domcontentloaded')

// Then wait only for critical elements
await expect(page.getByTestId('dashboard-content')).toBeVisible()

// 🚀 RESULT: 50-80% faster page loads
```

#### 7. Disable Unnecessary Features

```typescript
// Ultra-fast configuration
export default defineConfig({
  use: {
    trace: 'off', // Disable traces for maximum speed
    screenshot: 'off', // Disable screenshots
    video: 'off', // Disable video recording during dev

    // Reduce timeouts to fail fast
    actionTimeout: 5000,
    navigationTimeout: 15000,
  },
})
```

#### 8. Skip Animation Waits

```typescript
// Disable CSS animations and transitions globally
await page.addStyleTag({
  content: `
    *, *::before, *::after {
      animation-duration: 0s !important;
      animation-delay: 0s !important;
      transition-duration: 0s !important;
      transition-delay: 0s !important;
    }
  `
})
```

### Speed Comparison: Aggressive Optimization

| Technique | Time Saved Per Action | Cumulative Savings (50 actions) |
|-----------|----------------------|--------------------------------|
| slowMo 0 (vs 800ms) | 800ms | 40 seconds |
| No visual pauses | 300-500ms | 15-25 seconds |
| Instant fill (vs typing) | 1-3 seconds | 50-150 seconds |
| Parallel operations | 50-75% of operation time | 10-30 seconds |
| Skip scrolling waits | 300-500ms | 15-25 seconds |
| domcontentloaded (vs networkidle) | 1-3 seconds per page | 5-15 seconds (5 pages) |
| **TOTAL SAVINGS** | - | **135-285 seconds (2-5 minutes)** |

### When to Use Ultra-Fast Mode

**✅ Use for:**
- Development and debugging
- Quick functional testing
- Rapid iteration
- CI/CD pipelines
- Generating multiple demo variations quickly

**❌ Don't use for:**
- Final presentation videos
- Sales demos
- Tutorial content
- Stakeholder presentations

### Quick Toggle Between Fast and Presentation Mode

```typescript
// In playwright.config.ts
const isDemoMode = process.env.DEMO_MODE === 'presentation'

export default defineConfig({
  use: {
    launchOptions: {
      slowMo: isDemoMode ? 150 : 0, // 0 for speed, 150 for presentation
    },
    trace: isDemoMode ? 'on' : 'off',
    video: isDemoMode ? 'on' : 'off',
  },
})
```

**Usage:**
```bash
# Ultra-fast mode (development)
npx playwright test my-demo.spec.ts

# Presentation mode (final video)
DEMO_MODE=presentation npx playwright test my-demo.spec.ts
```

---

## Configuration Setup

### Optimized `playwright.config.ts`

```typescript
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './demos',
  timeout: 120000, // 2 minutes per demo
  fullyParallel: false, // Run demos sequentially for consistent resource usage

  use: {
    baseURL: 'http://localhost:5173',

    // Smart defaults for demos
    trace: 'on', // Better than video for debugging
    screenshot: 'only-on-failure',
    video: 'on', // or 'retain-on-failure' to save space

    // Optimized slowMo
    launchOptions: {
      slowMo: 100, // Sweet spot: visible but efficient
    },

    // Sensible viewport
    viewport: { width: 1920, height: 1080 },

    // Improve stability
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'demo-fast',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { slowMo: 50 },
      },
    },
    {
      name: 'demo-presentation',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { slowMo: 200 },
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```

---

## Wait Strategies

### The Wait Hierarchy (Use in Order)

#### 1. Built-in Playwright Auto-Waiting (Preferred)
```typescript
// Playwright automatically waits for:
// - Element to be visible, enabled, and stable
await page.click('button')
await page.fill('input', 'value')
```

#### 2. Explicit Expect Assertions
```typescript
await expect(page.getByText('Success')).toBeVisible()
await expect(button).toBeEnabled()
await expect(input).toHaveValue('expected')
```

#### 3. State-Based Waits
```typescript
// Wait for network to settle
await page.waitForLoadState('networkidle')

// Wait for DOM to be ready
await page.waitForLoadState('domcontentloaded')

// Wait for specific selector
await page.waitForSelector('[data-testid="dashboard"]')

// Wait for navigation
await page.waitForURL('**/dashboard')
```

#### 4. Custom Wait Conditions
```typescript
// Wait for JavaScript condition
await page.waitForFunction(() => {
  return document.querySelector('.spinner') === null
})

// Wait for API response
await page.waitForResponse(resp =>
  resp.url().includes('/api/data') && resp.status() === 200
)
```

#### 5. Fixed Timeouts (Last Resort Only)
```typescript
// ONLY use for:
// - Visual pacing in demos (let viewer see the result)
// - Animations that must complete
// - Known slow operations without better signals

await page.waitForTimeout(1000) // Let user see the success message
```

### When to Use Each Wait Type

| Scenario | Best Wait Strategy | Example |
|----------|-------------------|---------|
| Clicking button | None (auto-wait) | `await button.click()` |
| Page navigation | `waitForURL()` or `waitForLoadState()` | `await page.waitForURL('**/settings')` |
| Form submission | `waitForResponse()` | `await page.waitForResponse('**/api/submit')` |
| Loading spinner | `waitForFunction()` | `await page.waitForFunction(() => !document.querySelector('.spinner'))` |
| Visual pacing | `waitForTimeout()` (sparingly) | `await page.waitForTimeout(500)` |

---

## Performance Optimization

### 1. Eliminate Redundant Waits

**❌ BAD:**
```typescript
await page.waitForTimeout(800)
await button.scrollIntoViewIfNeeded()
await page.waitForTimeout(600)
await button.click()
await page.waitForTimeout(1000)
```

**✅ GOOD:**
```typescript
await button.scrollIntoViewIfNeeded()
await button.click()
await page.waitForTimeout(400) // Brief pause to show result
```

**Savings:** 2000ms → 400ms (80% faster)

### 2. Batch Independent Operations

**❌ BAD - Sequential:**
```typescript
await input1.fill('value1')
await page.waitForTimeout(300)
await input2.fill('value2')
await page.waitForTimeout(300)
await input3.fill('value3')
await page.waitForTimeout(300)
```

**✅ GOOD - Batched:**
```typescript
await input1.fill('value1')
await input2.fill('value2')
await input3.fill('value3')
await page.waitForTimeout(500) // One pause to show all fields
```

**Savings:** 900ms → 500ms (44% faster)

### 3. Eliminate Redundant Scrolling

```typescript
// ❌ BAD: Manual scroll before every action
await button.scrollIntoViewIfNeeded()
await button.click()

await input.scrollIntoViewIfNeeded()
await input.fill('text')

await submitButton.scrollIntoViewIfNeeded()
await submitButton.click()

// ✅ GOOD: Let Playwright auto-scroll
await button.click()
await input.fill('text')
await submitButton.click()

// Playwright automatically scrolls elements into view when needed
```

**Savings:** 300-500ms per action removed

### 4. Smart Form Filling

```typescript
// Create a reusable helper
async function fillFormField(
  page: Page,
  locator: Locator,
  value: string,
  options: { animate?: boolean; delay?: number } = {}
) {
  await locator.scrollIntoViewIfNeeded()

  if (options.animate) {
    await locator.click()
    await locator.pressSequentially(value, { delay: options.delay || 50 })
  } else {
    await locator.fill(value)
  }
}

// Use it in your demo
await fillFormField(page, nameInput, 'John Doe', { animate: true })
await fillFormField(page, emailInput, 'john@example.com') // Fast fill
await fillFormField(page, phoneInput, '+1234567890') // Fast fill
```

### 4. Optimize Video Recording

```typescript
// In playwright.config.ts
use: {
  video: {
    mode: 'on',
    size: { width: 1280, height: 720 }, // Smaller = faster encoding
  },

  // Alternative: Use traces instead
  trace: 'on', // Screenshots + timeline + network
  video: 'retain-on-failure', // Only save video if test fails
}
```

---

## Advanced Speed Techniques

### 1. Batch Multiple Selectors

Instead of multiple individual selects, use a single loop:

```typescript
// ❌ SLOW: Individual selections
await page.locator('button:has-text("Option 1")').click()
await page.waitForTimeout(300)
await page.locator('button:has-text("Option 2")').click()
await page.waitForTimeout(300)
await page.locator('button:has-text("Option 3")').click()
await page.waitForTimeout(300)

// ✅ FAST: Batched with minimal waits
const options = ['Option 1', 'Option 2', 'Option 3']
for (const option of options) {
  await page.locator(`button:has-text("${option}")`).click()
}
await page.waitForTimeout(400) // Single pause at end

// 🚀 RESULT: 900ms → 400ms (55% faster)
```

### 2. Use Locator Chaining Efficiently

```typescript
// ❌ SLOW: Multiple separate locators
const container = page.locator('[data-testid="form"]')
await container.waitFor()
const nameField = container.locator('input[name="name"]')
await nameField.waitFor()
await nameField.fill('John')

// ✅ FAST: Chain without intermediate waits
await page
  .locator('[data-testid="form"]')
  .locator('input[name="name"]')
  .fill('John')
```

### 3. Skip Navigation When Possible

```typescript
// ❌ SLOW: Full page navigation for every test
await page.goto('/dashboard')
await page.goto('/settings')
await page.goto('/profile')

// ✅ FAST: Navigate once, use in-app routing
await page.goto('/dashboard')
await page.click('[data-link="settings"]') // Click internal link
await page.click('[data-link="profile"]')  // Click internal link

// Internal navigation is 3-5x faster than full page loads
```

### 4. Pre-populate Data via API/LocalStorage

```typescript
// ❌ SLOW: Fill forms through UI
await page.goto('/register')
await page.fill('[name="email"]', 'user@test.com')
await page.fill('[name="password"]', 'password123')
await page.click('button[type="submit"]')
await page.waitForURL('**/dashboard')

// ✅ FAST: Pre-populate via localStorage/API
await page.goto('/')
await page.evaluate(() => {
  localStorage.setItem('auth_token', 'mock_token_123')
  localStorage.setItem('user', JSON.stringify({
    email: 'user@test.com',
    name: 'Test User',
  }))
})
await page.goto('/dashboard') // Jump directly to authenticated state

// 🚀 RESULT: 5-10 seconds saved on authentication flow
```

### 5. Use Test Fixtures for Common Setup

```typescript
// Create fixtures for repeated setup
import { test as base } from '@playwright/test'

type Fixtures = {
  authenticatedPage: Page
  formWithData: Page
}

export const test = base.extend<Fixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('auth_token', 'test_token')
    })
    await use(page)
  },

  formWithData: async ({ page }, use) => {
    await page.goto('/form')
    await page.evaluate(() => {
      localStorage.setItem('form_draft', JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com',
      }))
    })
    await use(page)
  },
})

// Use in tests
test('Quick demo', async ({ authenticatedPage }) => {
  await authenticatedPage.goto('/dashboard')
  // Already authenticated!
})
```

### 6. Parallel Test Execution

```typescript
// In playwright.config.ts
export default defineConfig({
  workers: 4, // Run 4 demos in parallel
  fullyParallel: true,
})

// Run multiple demos simultaneously
// 10 demos × 2 minutes each = 20 minutes sequential
// With 4 workers = ~5 minutes total (75% time saved)
```

### 7. Reduce Network Wait Time

```typescript
// Wait for specific API calls instead of networkidle
await Promise.all([
  page.waitForResponse(resp => resp.url().includes('/api/user')),
  page.waitForResponse(resp => resp.url().includes('/api/settings')),
  page.goto('/dashboard')
])

// This is faster than:
await page.goto('/dashboard')
await page.waitForLoadState('networkidle')
```

### 8. Mock Slow External Resources

```typescript
// Mock slow third-party scripts and resources
await page.route('**/*{analytics,ads,tracking}*', route => route.abort())
await page.route('**/cdn.external-service.com/**', route => route.abort())

// Mock slow API responses with instant local data
await page.route('**/api/slow-endpoint', async route => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ data: 'instant response' }),
  })
})

// 🚀 RESULT: Eliminates 2-5 seconds of external request time
```

### 9. Conditional Visual Pauses

```typescript
// Only add visual pauses in presentation mode
const DEMO_MODE = process.env.DEMO_MODE === 'presentation'

async function pause(ms: number) {
  if (DEMO_MODE) {
    await page.waitForTimeout(ms)
  }
  // In fast mode, this does nothing
}

// Usage
await button.click()
await pause(500) // Only pauses in presentation mode
```

### 10. Batch Assertions

```typescript
// ❌ SLOW: Multiple individual assertions with waits
await expect(page.getByText('Success')).toBeVisible()
await expect(page.getByText('Email sent')).toBeVisible()
await expect(page.getByTestId('status')).toHaveText('Complete')

// ✅ FAST: Single compound assertion
await expect(async () => {
  const success = await page.getByText('Success').isVisible()
  const emailSent = await page.getByText('Email sent').isVisible()
  const status = await page.getByTestId('status').textContent()
  expect(success && emailSent && status === 'Complete').toBeTruthy()
}).toPass()
```

### Speed Optimization Impact Matrix

| Technique | Difficulty | Time Savings | ROI |
|-----------|-----------|--------------|-----|
| Remove visual pauses | Easy | 10-30 sec | ⭐⭐⭐⭐⭐ |
| Zero slowMo | Easy | 20-60 sec | ⭐⭐⭐⭐⭐ |
| Instant text input | Easy | 30-90 sec | ⭐⭐⭐⭐⭐ |
| Pre-populate via storage | Medium | 5-15 sec | ⭐⭐⭐⭐ |
| Skip unnecessary scrolls | Easy | 5-15 sec | ⭐⭐⭐⭐ |
| Parallel operations | Medium | 10-30 sec | ⭐⭐⭐⭐ |
| Mock external resources | Medium | 2-10 sec | ⭐⭐⭐ |
| Test fixtures | Hard | 10-30 sec | ⭐⭐⭐ |
| Parallel execution | Easy | 50-75% | ⭐⭐⭐⭐⭐ |
| Batch assertions | Medium | 2-5 sec | ⭐⭐⭐ |

---

## Visual Polish

### 1. Cursor Visibility

**Option A: CSS-Based Cursor (Lightweight)**
```typescript
async function enableCursorHighlight(page: Page) {
  await page.addStyleTag({
    content: `
      * {
        cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"><circle cx="16" cy="16" r="10" fill="red" opacity="0.5"/><circle cx="16" cy="16" r="2" fill="white"/></svg>') 16 16, auto !important;
      }
    `
  })
}

// Use at start of test
test('Demo with cursor', async ({ page }) => {
  await page.goto('/')
  await enableCursorHighlight(page)
  // ... rest of demo
})
```

**Option B: No Cursor Simulation Needed**
```typescript
// Modern approach: Don't simulate cursor movement
// Playwright's video captures the actual cursor
// Just ensure browser is in headed mode: --headed
```

### 2. Smooth Scrolling

```typescript
// Smooth scroll to element
async function smoothScrollTo(page: Page, selector: string) {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel)
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, selector)
  await page.waitForTimeout(500) // Let scroll animation complete
}
```

### 3. Highlight Important Elements

```typescript
async function highlightElement(page: Page, selector: string, duration = 2000) {
  await page.evaluate(({ sel, dur }) => {
    const element = document.querySelector(sel)
    if (element) {
      element.classList.add('demo-highlight')
      setTimeout(() => element.classList.remove('demo-highlight'), dur)
    }
  }, { sel: selector, dur: duration })
}

// Add highlight CSS at start
await page.addStyleTag({
  content: `
    .demo-highlight {
      outline: 3px solid #ff0000;
      outline-offset: 2px;
      transition: outline 0.3s ease;
    }
  `
})
```

---

## Helper Utilities

### Create a Demo Utilities File

```typescript
// demos/helpers/demo-utils.ts

import { Page, Locator, expect } from '@playwright/test'

export class DemoHelper {
  constructor(private page: Page) {}

  /**
   * Navigate and wait for page to be ready
   */
  async navigateTo(url: string) {
    await this.page.goto(url)
    await this.page.waitForLoadState('networkidle')
    await this.pause(300) // Brief visual pause
  }

  /**
   * Fill form field with optional typing animation
   */
  async fillField(
    locator: Locator,
    value: string,
    options: { animate?: boolean; delay?: number } = {}
  ) {
    await locator.scrollIntoViewIfNeeded()

    if (options.animate) {
      await locator.click()
      await locator.pressSequentially(value, { delay: options.delay || 50 })
    } else {
      await locator.fill(value)
    }
  }

  /**
   * Click and wait for action to complete
   */
  async clickAndWait(
    locator: Locator,
    waitFor?: { selector?: string; url?: string }
  ) {
    await locator.scrollIntoViewIfNeeded()
    await locator.click()

    if (waitFor?.selector) {
      await this.page.waitForSelector(waitFor.selector)
    } else if (waitFor?.url) {
      await this.page.waitForURL(waitFor.url)
    } else {
      await this.page.waitForLoadState('networkidle')
    }

    await this.pause(200)
  }

  /**
   * Select dropdown option and verify
   */
  async selectOption(locator: Locator, value: string | number) {
    await locator.scrollIntoViewIfNeeded()
    await locator.selectOption(typeof value === 'number' ? { index: value } : value)
    await this.pause(200)
  }

  /**
   * Visual pause for demo pacing
   */
  async pause(ms: number = 500) {
    await this.page.waitForTimeout(ms)
  }

  /**
   * Log step with emoji for console output
   */
  log(emoji: string, message: string) {
    console.log(`${emoji} ${message}`)
  }

  /**
   * Setup demo environment (clear data, setup viewport, etc)
   */
  async setupDemo(options: { clearStorage?: boolean } = {}) {
    if (options.clearStorage) {
      await this.page.evaluate(() => {
        localStorage.clear()
        sessionStorage.clear()
      })
    }
  }

  /**
   * Fill multiple form fields efficiently
   */
  async fillForm(fields: Array<{ locator: Locator; value: string; animate?: boolean }>) {
    for (const field of fields) {
      await this.fillField(field.locator, field.value, { animate: field.animate })
    }
    await this.pause(400) // Show completed form
  }
}
```

### Using the Helper in Demos

```typescript
import { test } from '@playwright/test'
import { DemoHelper } from './helpers/demo-utils'

test('User Registration Demo', async ({ page }) => {
  const demo = new DemoHelper(page)

  demo.log('🎬', 'Starting User Registration Demo')

  // Setup
  await demo.setupDemo({ clearStorage: true })
  await demo.navigateTo('/register')

  // Fill form
  demo.log('📝', 'Filling registration form')
  await demo.fillForm([
    { locator: page.getByLabel('Name'), value: 'John Doe', animate: true },
    { locator: page.getByLabel('Email'), value: 'john@example.com' },
    { locator: page.getByLabel('Company'), value: 'Acme Corp' },
  ])

  // Submit
  demo.log('✅', 'Submitting form')
  await demo.clickAndWait(
    page.getByRole('button', { name: 'Register' }),
    { url: '**/dashboard' }
  )

  demo.log('🎉', 'Registration complete!')
  await demo.pause(2000)
})
```

---

## Common Pitfalls

### 1. Over-Using waitForTimeout

**Problem:** Test takes 5 minutes due to excessive fixed waits

**Solution:** Replace 90% of `waitForTimeout` with smart waits

```typescript
// Before: 40 fixed waits × 500ms = 20 seconds of pure waiting
// After: 5 visual pauses × 300ms = 1.5 seconds of intentional waiting
```

### 2. Excessive slowMo

**Problem:** slowMo: 1000ms makes every action feel sluggish

**Solution:** Use 50-100ms for smooth but efficient demos

### 3. Cursor Movement Overhead

**Problem:** Custom cursor tracking adds 200-300ms per movement

**Solution:**
- Use CSS-based cursor highlight instead
- Or skip cursor simulation entirely (Playwright captures it natively in headed mode)

### 4. Text Input Delays

**Problem:** Typing 20-character text with 150ms delay = 3 seconds per field

**Solution:**
- Use `.fill()` for most fields (instant)
- Reserve `.pressSequentially()` for 1-2 dramatic moments
- Reduce delay to 30-50ms when used

### 5. Video File Size

**Problem:** 5-minute demos create 500MB+ video files

**Solution:**
- Reduce video resolution to 1280x720
- Shorten demo duration (faster = smaller files)
- Consider using traces instead of video
- Compress videos post-recording with ffmpeg

---

## Sample Implementation

### Example: Complete Optimized Demo

```typescript
import { test, expect } from '@playwright/test'
import { DemoHelper } from './helpers/demo-utils'

test.use({
  launchOptions: {
    slowMo: 100, // Optimized pacing
  },
  viewport: { width: 1920, height: 1080 },
})

test('E-commerce Checkout Demo', async ({ page }) => {
  test.setTimeout(120000) // 2 minutes max

  const demo = new DemoHelper(page)

  console.log('\n🎬 ========================================')
  console.log('   E-COMMERCE CHECKOUT DEMO')
  console.log('========================================\n')

  // Setup
  demo.log('🧹', 'Preparing environment')
  await demo.setupDemo({ clearStorage: true })
  await demo.navigateTo('/')

  // Browse products
  demo.log('🛍️', 'Browsing products')
  await demo.clickAndWait(
    page.getByRole('link', { name: 'Shop' }),
    { selector: '[data-testid="product-grid"]' }
  )

  // Add to cart
  demo.log('➕', 'Adding product to cart')
  const productCard = page.getByTestId('product-1')
  await demo.clickAndWait(
    productCard.getByRole('button', { name: 'Add to Cart' }),
    { selector: '.cart-notification' }
  )

  // View cart
  demo.log('🛒', 'Viewing cart')
  await demo.clickAndWait(
    page.getByRole('button', { name: /Cart/ }),
    { url: '**/cart' }
  )

  // Verify cart contents
  await expect(page.getByTestId('cart-items')).toContainText('Product 1')
  await demo.pause(500)

  // Proceed to checkout
  demo.log('💳', 'Proceeding to checkout')
  await demo.clickAndWait(
    page.getByRole('button', { name: 'Checkout' }),
    { url: '**/checkout' }
  )

  // Fill checkout form
  demo.log('📝', 'Filling checkout details')
  await demo.fillForm([
    {
      locator: page.getByLabel('Full Name'),
      value: 'Jane Smith',
      animate: true // Show typing for first field only
    },
    { locator: page.getByLabel('Email'), value: 'jane@example.com' },
    { locator: page.getByLabel('Address'), value: '123 Main St' },
    { locator: page.getByLabel('City'), value: 'San Francisco' },
    { locator: page.getByLabel('Postal Code'), value: '94102' },
  ])

  // Select payment method
  await demo.selectOption(
    page.getByLabel('Payment Method'),
    'Credit Card'
  )

  // Complete order
  demo.log('✅', 'Placing order')
  await demo.clickAndWait(
    page.getByRole('button', { name: 'Place Order' }),
    { selector: '.success-message' }
  )

  // Verify success
  await expect(page.getByText('Order Confirmed')).toBeVisible()

  console.log('\n🎉 ========================================')
  console.log('   CHECKOUT DEMO COMPLETED!')
  console.log('   ✅ Product browsing')
  console.log('   ✅ Cart management')
  console.log('   ✅ Checkout process')
  console.log('   ✅ Order confirmation')
  console.log('========================================\n')

  await demo.pause(2000)
})
```

### Performance Comparison

| Metric | Before Optimization | After Optimization | Improvement |
|--------|-------------------|-------------------|-------------|
| Duration | 5-7 minutes | 1-2 minutes | 70-80% faster |
| waitForTimeout calls | 40+ per demo | 5-8 per demo | 80% reduction |
| slowMo value | 800ms | 100ms | 87% faster |
| Video file size | 500MB+ | 100-150MB | 70% smaller |
| Maintainability | Low (scattered logic) | High (reusable helpers) | Much better |

---

## Quick Reference Checklist

Before creating a demo, ensure:

- [ ] slowMo is 50-200ms (not 500ms+)
- [ ] Using smart waits (selectors, load states) over fixed timeouts
- [ ] Fixed timeouts only for visual pacing (5-10 max per demo)
- [ ] Text input uses `.fill()` except for key moments
- [ ] `.pressSequentially()` delay is 30-50ms (not 150ms+)
- [ ] Helper utilities exist for common patterns
- [ ] Console logging shows clear progress
- [ ] Test timeout is reasonable (2-3 minutes)
- [ ] Video settings are optimized (720p or 1080p max)
- [ ] No unnecessary cursor simulation overhead

---

## Additional Resources

### Video Post-Processing

Compress videos after recording:

```bash
# Reduce file size by 60-80% with minimal quality loss
ffmpeg -i input.webm -c:v libx264 -crf 28 -preset fast output.mp4

# Convert to web-optimized format
ffmpeg -i input.webm -c:v libx264 -c:a aac -b:a 128k -movflags +faststart output.mp4
```

### Trace Viewer Alternative

Instead of video, use Playwright's trace viewer:

```typescript
// In playwright.config.ts
use: {
  trace: 'on',
  screenshot: 'on',
  video: 'off', // Skip video entirely
}
```

View traces:
```bash
npx playwright show-trace trace.zip
```

Benefits:
- Smaller file sizes
- Interactive timeline
- Network inspection
- DOM snapshots
- No video encoding overhead

---

## Speed Benchmarking

### Measuring Demo Performance

Track and measure your demo speed improvements:

#### 1. Add Timing Instrumentation

```typescript
import { test } from '@playwright/test'

test('Benchmarked Demo', async ({ page }) => {
  const timings: Record<string, number> = {}
  const startTime = Date.now()

  // Helper to record step timing
  const recordStep = (stepName: string) => {
    timings[stepName] = Date.now() - startTime
    console.log(`⏱️  ${stepName}: ${timings[stepName]}ms`)
  }

  await page.goto('/')
  recordStep('Page Load')

  await page.fill('[name="email"]', 'user@test.com')
  recordStep('Fill Email')

  await page.click('button[type="submit"]')
  recordStep('Submit Form')

  await page.waitForURL('**/dashboard')
  recordStep('Navigation Complete')

  const totalTime = Date.now() - startTime
  console.log(`\n🏁 Total time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`)

  // Log summary
  console.log('\n📊 Step-by-step breakdown:')
  Object.entries(timings).forEach(([step, time]) => {
    console.log(`   ${step.padEnd(30)} ${time}ms`)
  })
})
```

#### 2. Compare Before and After

```typescript
// Create a baseline
test('Baseline - Unoptimized', async ({ page }) => {
  const start = Date.now()

  await page.goto('/')
  await page.waitForTimeout(1000)
  await page.fill('[name="email"]', 'test@example.com')
  await page.waitForTimeout(500)
  await page.pressSequentially('password', { delay: 150 })
  await page.waitForTimeout(500)
  await page.click('button')
  await page.waitForTimeout(2000)

  console.log(`⏱️  Baseline: ${Date.now() - start}ms`)
})

test('Optimized', async ({ page }) => {
  const start = Date.now()

  await page.goto('/')
  await page.fill('[name="email"]', 'test@example.com')
  await page.fill('[name="password"]', 'password')
  await page.click('button')
  await page.waitForLoadState('networkidle')

  console.log(`⏱️  Optimized: ${Date.now() - start}ms`)
  console.log(`🚀 Improvement: ${((Date.now() - start) / 5000 * 100).toFixed(1)}% faster`)
})
```

#### 3. Track Video File Sizes

```bash
# Compare video file sizes before and after optimization
ls -lh test-results/**/video.webm

# Example output:
# Before: 487MB (5:30 duration)
# After:  142MB (1:45 duration)
# Improvement: 70% smaller, 68% shorter
```

#### 4. Automated Performance Reporting

```typescript
// Create a performance reporter
import { Reporter, TestCase, TestResult } from '@playwright/test/reporter'

class PerformanceReporter implements Reporter {
  onTestEnd(test: TestCase, result: TestResult) {
    const duration = result.duration
    const status = result.status

    console.log(`\n📊 Performance Report: ${test.title}`)
    console.log(`   Duration: ${(duration / 1000).toFixed(2)}s`)
    console.log(`   Status: ${status}`)

    // Flag slow tests
    if (duration > 60000) {
      console.log(`   ⚠️  WARNING: Test took over 1 minute`)
    } else if (duration < 30000) {
      console.log(`   ✅ Fast test (under 30 seconds)`)
    }
  }
}

export default PerformanceReporter
```

```typescript
// Use in playwright.config.ts
export default defineConfig({
  reporter: [
    ['list'],
    ['./performance-reporter.ts']
  ],
})
```

### Speed Optimization Goals

Set clear performance targets for your demos:

| Demo Type | Target Duration | Max Duration | Video Size |
|-----------|----------------|--------------|------------|
| Quick feature demo | 30-60 sec | 90 sec | 30-50MB |
| Full workflow demo | 1-2 min | 3 min | 80-120MB |
| Complete tour | 2-4 min | 5 min | 150-250MB |
| Training video | 3-8 min | 10 min | 200-400MB |

### Real-World Optimization Example

```
Original Demo (Unoptimized):
├─ Duration: 6 minutes 45 seconds
├─ Video size: 523MB
├─ waitForTimeout calls: 47
├─ slowMo: 800ms
└─ Text input: pressSequentially (150ms delay)

After Optimization:
├─ Duration: 1 minute 52 seconds (72% faster) ✅
├─ Video size: 138MB (74% smaller) ✅
├─ waitForTimeout calls: 6 (87% reduction) ✅
├─ slowMo: 50ms (94% faster) ✅
└─ Text input: fill() (instant) ✅

Techniques Applied:
✓ Removed 41 unnecessary waitForTimeout calls
✓ Reduced slowMo from 800ms to 50ms
✓ Replaced pressSequentially with fill()
✓ Eliminated redundant scrollIntoViewIfNeeded calls
✓ Used domcontentloaded instead of networkidle
✓ Batched sequential operations
✓ Removed manual cursor simulation
```

### Continuous Performance Monitoring

Track demo performance over time:

```typescript
// Add to CI/CD pipeline
const fs = require('fs')

test('Performance Tracking', async ({ page }) => {
  const start = Date.now()

  // Run your demo
  await page.goto('/')
  // ... demo steps ...

  const duration = Date.now() - start
  const result = {
    timestamp: new Date().toISOString(),
    duration,
    commit: process.env.GITHUB_SHA || 'local',
  }

  // Append to performance log
  fs.appendFileSync(
    'performance-log.json',
    JSON.stringify(result) + '\n'
  )

  // Fail if performance regresses
  if (duration > 120000) { // 2 minutes
    throw new Error(`Demo took ${duration}ms - exceeds 2 minute target`)
  }
})
```

### Performance Dashboard

Create a simple HTML report:

```typescript
// generate-performance-report.ts
const fs = require('fs')

const logs = fs.readFileSync('performance-log.json', 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(JSON.parse)

const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Demo Performance Report</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
  <h1>Demo Performance Over Time</h1>
  <canvas id="chart"></canvas>
  <script>
    new Chart(document.getElementById('chart'), {
      type: 'line',
      data: {
        labels: ${JSON.stringify(logs.map(l => l.timestamp))},
        datasets: [{
          label: 'Duration (seconds)',
          data: ${JSON.stringify(logs.map(l => l.duration / 1000))},
          borderColor: 'rgb(75, 192, 192)',
        }]
      }
    })
  </script>
</body>
</html>
`

fs.writeFileSync('performance-report.html', html)
console.log('📊 Performance report generated: performance-report.html')
```

---

## Conclusion

High-quality demo videos require a balance between:
- **Visual appeal** (smooth, easy to follow)
- **Performance** (fast execution, small files)
- **Reliability** (consistent, no flakiness)
- **Maintainability** (clean code, reusable patterns)

Follow these best practices to create demos that are:
- **70-90% faster** than typical implementations
- **More reliable** with event-based waits
- **Easier to maintain** with helper utilities
- **70-80% smaller** file sizes with optimized settings

### Speed Optimization Summary

Apply these techniques progressively for maximum impact:

#### Level 1: Basic Optimization (30-50% faster)
- ✅ Reduce slowMo to 100ms
- ✅ Replace 80% of waitForTimeout with smart waits
- ✅ Use .fill() instead of .pressSequentially()

#### Level 2: Advanced Optimization (50-70% faster)
- ✅ Zero slowMo
- ✅ Remove ALL visual pauses except 2-3 strategic ones
- ✅ Pre-populate data via localStorage
- ✅ Use domcontentloaded instead of networkidle

#### Level 3: Ultra-Fast Mode (70-90% faster)
- ✅ Disable animations with CSS
- ✅ Parallel operations with Promise.all
- ✅ Mock slow external resources
- ✅ Test fixtures for common setup
- ✅ Parallel test execution

### Expected Results by Optimization Level

| Level | Demo Duration | Improvement | File Size | Effort |
|-------|--------------|-------------|-----------|--------|
| Unoptimized | 5-7 min | baseline | 400-600MB | - |
| Basic | 3-4 min | 30-50% ⭐⭐⭐ | 200-300MB | Low |
| Advanced | 1.5-2.5 min | 50-70% ⭐⭐⭐⭐ | 100-180MB | Medium |
| Ultra-Fast | 0.5-1.5 min | 70-90% ⭐⭐⭐⭐⭐ | 40-120MB | Medium-High |

**Key Takeaway:** By applying these optimization techniques, you can reduce demo execution time from 5-7 minutes to under 2 minutes (70-90% faster), while maintaining visual quality and reliability. Start with basic optimizations for quick wins, then progress to advanced techniques for maximum performance.
