import { test } from '@playwright/test'

/**
 * Demo Video 2: Phase 1-2 Assessment
 *
 * Simple demonstration - no strict assertions
 * Run: npm run test:video:02:headless (test)
 * Generate video: npm run test:video:02 (with --headed)
 */

test.describe('Demo Video 2: Phase 1-2 Assessment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('complete Phase 1-2 assessment walkthrough', async ({ page }) => {
    test.slow() // Triple timeout

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const sidebar = page.locator('aside')

    // SECTION 1: Navigate to Phase 1 - Programme Initiation
    const programmeInit = sidebar.getByText('Programme Initiation')
    if (await programmeInit.isVisible()) {
      await programmeInit.click()
      await page.waitForTimeout(2000)
    }

    // Scroll to show content
    await page.evaluate(() => window.scrollTo(0, 300))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 600))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 2: Navigate to Governance Context
    const govContext = sidebar.getByText('Governance Context')
    if (await govContext.isVisible()) {
      await govContext.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through governance context
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 3: Navigate to Capability Assessment
    const capAssess = sidebar.getByText('Capability Assessment')
    if (await capAssess.isVisible()) {
      await capAssess.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through assessment
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 4: Navigate to Issues Identification (if available)
    const issues = sidebar.getByText('Issues Identification')
    if (await issues.isVisible()) {
      await issues.click()
      await page.waitForTimeout(2000)

      await page.evaluate(() => window.scrollTo(0, 400))
      await page.waitForTimeout(2000)

      await page.evaluate(() => window.scrollTo(0, 0))
      await page.waitForTimeout(2000)
    }

    // SECTION 5: Return to Dashboard
    const dashboard = sidebar.getByText('Dashboard', { exact: true })
    if (await dashboard.isVisible()) {
      await dashboard.click()
      await page.waitForTimeout(2000)
    }

    // OUTRO
    await page.waitForTimeout(3000)
  })
})
