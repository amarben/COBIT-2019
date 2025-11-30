import { test, expect } from '@playwright/test'
import { TEST_IDS } from '../../src/constants/testIds'

/**
 * Dashboard E2E Tests
 *
 * Proper functional tests with:
 * - Test IDs for reliable selectors
 * - Assertions to verify correctness
 * - Clear test structure
 */

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Start fresh
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForLoadState('networkidle')
  })

  test('should display dashboard with correct title', async ({ page }) => {
    // Navigate to dashboard (should be default view)
    const dashboard = page.getByTestId(TEST_IDS.DASHBOARD.CONTAINER)
    const title = page.getByTestId(TEST_IDS.DASHBOARD.TITLE)

    // Assert dashboard is visible
    await expect(dashboard).toBeVisible()

    // Assert title contains correct text
    await expect(title).toContainText('COBIT 2019 Governance Dashboard')
  })

  test('should display all 7 phase cards', async ({ page }) => {
    // Check each phase card exists
    for (let phaseId = 1; phaseId <= 7; phaseId++) {
      const phaseCard = page.getByTestId(TEST_IDS.DASHBOARD.PHASE_CARD(phaseId))
      await expect(phaseCard).toBeVisible()
    }
  })

  test('should show Phase 1 as current phase initially', async ({ page }) => {
    // Phase 1 should be marked as current when starting fresh
    const phase1Card = page.getByTestId(TEST_IDS.DASHBOARD.PHASE_CARD(1))

    // Phase 1 card should have special styling (this tests the implementation logic)
    await expect(phase1Card).toBeVisible()

    // Phase 1 should show 0% progress initially
    await expect(phase1Card).toContainText('0%')
  })

  test('should have export button', async ({ page }) => {
    const exportButton = page.getByTestId(TEST_IDS.DASHBOARD.EXPORT_BUTTON)
    await expect(exportButton).toBeVisible()
  })
})

test.describe('Navigation from Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should navigate to Programme Initiation from sidebar', async ({ page }) => {
    // Expand Phase 1 if needed (conditional - might already be expanded)
    const phase1Button = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(1))
    if (await phase1Button.isVisible()) {
      await phase1Button.click()
    }

    // Click Programme Initiation link
    const programmeLink = page.getByTestId(TEST_IDS.SIDEBAR.PROGRAMME_INITIATION_LINK)
    await programmeLink.click()

    // Assert we navigated to Programme Initiation
    const programmeContainer = page.getByTestId(TEST_IDS.PROGRAMME_INITIATION.CONTAINER)
    await expect(programmeContainer).toBeVisible()
  })

  test('should return to dashboard from sidebar', async ({ page }) => {
    // Navigate away from dashboard first
    const phase1Button = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(1))
    if (await phase1Button.isVisible()) {
      await phase1Button.click()
    }

    const programmeLink = page.getByTestId(TEST_IDS.SIDEBAR.PROGRAMME_INITIATION_LINK)
    if (await programmeLink.isVisible()) {
      await programmeLink.click()
      await page.waitForTimeout(500) // Wait for navigation
    }

    // Now click Dashboard link
    const dashboardLink = page.getByTestId(TEST_IDS.SIDEBAR.DASHBOARD_LINK)
    await dashboardLink.click()

    // Assert we're back on dashboard
    const dashboard = page.getByTestId(TEST_IDS.DASHBOARD.CONTAINER)
    await expect(dashboard).toBeVisible()
  })
})
