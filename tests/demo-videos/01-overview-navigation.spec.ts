import { test } from '@playwright/test'
import { TEST_IDS } from '../../src/constants/testIds'

/**
 * Demo Video 1: Overview & Navigation
 *
 * Simple demonstration - no strict assertions, just visual demonstration
 * Run: npm run test:video:01:headless (test)
 * Generate video: npm run test:video:01 (with --headed)
 */

test.describe('Demo Video 1: Overview & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('complete overview and navigation walkthrough', async ({ page }) => {
    test.slow() // Triple timeout for video recording

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    // SECTION 1: Show dashboard (no assertions, just wait)
    await page.waitForTimeout(2000)

    // SECTION 2: Show sidebar navigation
    const sidebar = page.locator('aside')
    await page.waitForTimeout(2000)

    // SECTION 3: Click through phases
    const phase1 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(1))
    if (await phase1.isVisible()) {
      await phase1.click()
      await page.waitForTimeout(2000)
    }

    const phase2 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(2))
    if (await phase2.isVisible()) {
      await phase2.click()
      await page.waitForTimeout(2000)
    }

    const phase3 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(3))
    if (await phase3.isVisible()) {
      await phase3.click()
      await page.waitForTimeout(2000)
    }

    const phase4 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(4))
    if (await phase4.isVisible()) {
      await phase4.click()
      await page.waitForTimeout(2000)
    }

    const phase5 = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(5))
    if (await phase5.isVisible()) {
      await phase5.click()
      await page.waitForTimeout(2000)
    }

    // SECTION 4: Toggle sidebar
    const toggleBtn = page.getByTestId(TEST_IDS.SIDEBAR.TOGGLE_BUTTON)
    await toggleBtn.click()
    await page.waitForTimeout(2000)

    await toggleBtn.click()
    await page.waitForTimeout(2000)

    // SECTION 5: Scroll dashboard
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 6: Hover export
    const exportBtn = page.getByTestId(TEST_IDS.DASHBOARD.EXPORT_BUTTON).first()
    if (await exportBtn.isVisible()) {
      await exportBtn.hover()
      await page.waitForTimeout(2000)
    }

    // OUTRO
    await page.waitForTimeout(3000)
  })
})
