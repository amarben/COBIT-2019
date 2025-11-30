import { test } from '@playwright/test'

/**
 * Demo Video 4: Phase 4-5 - Planning & Implementation
 *
 * Simple demonstration - no strict assertions
 * Run: npm run test:video:04:headless (test)
 * Generate video: npm run test:video:04 (with --headed)
 */

test.describe('Demo Video 4: Phase 4-5 - Planning & Implementation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('complete Phase 4-5 planning and implementation walkthrough', async ({ page }) => {
    test.slow() // Triple timeout

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    const sidebar = page.locator('aside')

    // PART 1: PHASE 4 - PLANNING

    // SECTION 1: Navigate to Phase 4
    const phase4 = sidebar.getByText('Plan Programme')
    if (await phase4.isVisible()) {
      await phase4.click()
      await page.waitForTimeout(2000)
    }

    // Navigate to Phase 4 Planning component
    const phase4Planning = sidebar.getByText('Phase 4 Planning')
    if (await phase4Planning.isVisible()) {
      await phase4Planning.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through business case and quick wins
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1200))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1600))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // PART 2: PHASE 5 - IMPLEMENTATION

    // SECTION 2: Navigate to Phase 5
    const phase5 = sidebar.getByText('Execute Plan')
    if (await phase5.isVisible()) {
      await phase5.click()
      await page.waitForTimeout(2000)
    }

    // SECTION 3: Governance Objectives (EDM)
    const governanceObj = sidebar.getByText('Governance Objectives')
    if (await governanceObj.isVisible()) {
      await governanceObj.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through governance objectives
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 4: Component Definition (APO/BAI/DSS/MEA)
    const componentDef = sidebar.getByText('Component Definition')
    if (await componentDef.isVisible()) {
      await componentDef.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through component definition
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 800))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1200))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 5: RACI Chart
    const raciChart = sidebar.getByText('RACI Chart')
    if (await raciChart.isVisible()) {
      await raciChart.click()
      await page.waitForTimeout(2000)
    }

    // Scroll through RACI chart
    await page.evaluate(() => window.scrollTo(0, 500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1000))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 1500))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // SECTION 6: Return to Dashboard
    const dashboard = sidebar.getByText('Dashboard', { exact: true })
    if (await dashboard.isVisible()) {
      await dashboard.click()
      await page.waitForTimeout(2000)
    }

    // Show Phase 4-5 progress
    await page.evaluate(() => window.scrollTo(0, 400))
    await page.waitForTimeout(2000)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(2000)

    // OUTRO
    await page.waitForTimeout(3000)
  })
})
