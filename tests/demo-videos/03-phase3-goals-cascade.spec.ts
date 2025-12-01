import { test } from '@playwright/test'
import { TEST_IDS } from '../../src/constants/testIds'

/**
 * Demo Video 3: Phase 3 - Goals Cascade
 *
 * Simple demonstration - no strict assertions
 * Run: npm run test:video:03:headless (test)
 * Generate video: npm run test:video:03 (with --headed)
 */

test.describe('Demo Video 3: Phase 3 - Goals Cascade', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
  })

  test('complete Phase 3 goals cascade walkthrough', async ({ page }) => {
    test.slow() // Triple timeout

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const sidebar = page.locator('aside')

    // SECTION 1: Navigate to Phase 3
    const phase3 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(3))
    if (await phase3.isVisible()) {
      await phase3.click()
      await page.waitForTimeout(2000)
    }

    // SECTION 2: Navigate to Goals Cascade component
    const goalsCascade = page.getByTestId(TEST_IDS.SIDEBAR.GOALS_CASCADE_LINK)
    if (await goalsCascade.isVisible()) {
      await goalsCascade.click()
      await page.waitForTimeout(2000)
    }

    // Scroll to show content
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 3: Select Enterprise Goals (if checkboxes/selectors exist)
    // Look for enterprise goals section
    const eg03 = page.getByText(/EG03.*Managed Business Risk/i).first()
    if (await eg03.isVisible()) {
      await eg03.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1500)
    }

    const eg04 = page.getByText(/EG04.*Compliance/i).first()
    if (await eg04.isVisible()) {
      await eg04.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1500)
    }

    const eg02 = page.getByText(/EG02.*Portfolio/i).first()
    if (await eg02.isVisible()) {
      await eg02.scrollIntoViewIfNeeded()
      await page.waitForTimeout(1500)
    }

    // Scroll through goals
    await page.evaluate(() => window.scrollTo(0, 1200))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1600))
    await page.waitForTimeout(2000)

    // SECTION 4: View Alignment Goals section
    await page.evaluate(() => window.scrollTo(0, 2000))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 2400))
    await page.waitForTimeout(2000)

    // SECTION 5: View Recommended Objectives
    await page.evaluate(() => window.scrollTo(0, 2800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 3200))
    await page.waitForTimeout(2000)

    // SECTION 6: Design Factors (if available)
    const designFactors = page.getByTestId(TEST_IDS.SIDEBAR.DESIGN_FACTORS_LINK)
    if (await designFactors.isVisible()) {
      await designFactors.click()
      await page.waitForTimeout(2000)

      // Scroll through design factors
      await page.evaluate(() => window.scrollTo(0, 400))
      await page.waitForTimeout(2000)

      await page.evaluate(() => window.scrollTo(0, 800))
      await page.waitForTimeout(2000)

      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(2000)
    }

    // SECTION 7: Return to Dashboard
    const dashboard = page.getByTestId(TEST_IDS.SIDEBAR.DASHBOARD_LINK)
    if (await dashboard.isVisible()) {
      await dashboard.click()
      await page.waitForTimeout(2000)
    }

    // Show Phase 3 progress
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // OUTRO
    await page.waitForTimeout(3000)
  })
})
