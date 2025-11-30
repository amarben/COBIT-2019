import { test } from '@playwright/test'

/**
 * Demo Video 5: Phase 6-7 - Monitoring & Continuous Improvement
 *
 * Simple demonstration - no strict assertions
 * Run: npm run test:video:05:headless (test)
 * Generate video: npm run test:video:05 (with --headed)
 */

test.describe('Demo Video 5: Phase 6-7 - Monitoring & Continuous Improvement', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('complete Phase 6-7 monitoring and continuous improvement walkthrough', async ({ page }) => {
    test.slow() // Triple timeout

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const sidebar = page.locator('aside')

    // PART 1: PHASE 6 - MONITORING & MEASUREMENT

    // SECTION 1: Navigate to Phase 6
    const phase6 = sidebar.getByText('Realize Benefits')
    if (await phase6.isVisible()) {
      await phase6.click()
      await page.waitForTimeout(2000)
    }

    // Navigate to Benefits Realization
    const benefitsReal = sidebar.getByText('Benefits Realization')
    if (await benefitsReal.isVisible()) {
      await benefitsReal.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through benefits tracking
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1200))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 2: Performance Measurement
    const perfMeasure = sidebar.getByText('Performance Measurement')
    if (await perfMeasure.isVisible()) {
      await perfMeasure.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through performance measurement
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // PART 2: PHASE 7 - CONTINUOUS IMPROVEMENT

    // SECTION 3: Navigate to Phase 7
    const phase7 = sidebar.getByText('Review Effectiveness')
    if (await phase7.isVisible()) {
      await phase7.click()
      await page.waitForTimeout(2000)
    }

    // Navigate to Review Effectiveness component
    const reviewEff = sidebar.getByText('Review Effectiveness').last()
    if (await reviewEff.isVisible()) {
      await reviewEff.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through review effectiveness
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 4: Return to Dashboard
    const dashboard = sidebar.getByText('Dashboard', { exact: true })
    if (await dashboard.isVisible()) {
      await dashboard.click()
      await page.waitForTimeout(2000)
    }

    // Show overall progress - all phases
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 900))
    await page.waitForTimeout(2000)

    // Scroll back to top for final view
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // OUTRO - show completion
    await page.waitForTimeout(3000)
  })
})
