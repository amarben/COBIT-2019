import { test, expect } from '@playwright/test'

/**
 * TestID Verification Tests
 *
 * Verifies that all newly added testIDs are present and functional
 * in the three critical components:
 * - EnablerDeployment (Phase 5)
 * - ContinuousMonitoring (Phase 6)
 * - ContinuousImprovement (Phase 7)
 */

test.describe('TestID Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)
  })

  test('EnablerDeployment - All testIDs present', async ({ page }) => {
    // Navigate to Phase 5
    const phase5Button = page.locator('aside button').filter({ hasText: /Execute Plan/i })
    await phase5Button.waitFor({ state: 'visible', timeout: 10000 })
    await phase5Button.click()
    await page.waitForTimeout(500)

    // Find and click Enabler Deployment (using text since we don't have testID on nav yet)
    const enablerLink = page.locator('aside').getByText('Enabler Deployment', { exact: true })
    await enablerLink.waitFor({ state: 'visible', timeout: 5000 })
    await enablerLink.click()
    await page.waitForTimeout(1000)

    // Verify empty state buttons
    const loadExampleBtn = page.locator('[data-testid="enabler-load-example-button"]')
    const addFirstBtn = page.locator('[data-testid="enabler-add-first-button"]')

    await expect(loadExampleBtn).toBeVisible()
    await expect(addFirstBtn).toBeVisible()

    // Load example data
    await loadExampleBtn.click()
    await page.waitForTimeout(1000)

    // Verify filter buttons
    await expect(page.locator('[data-testid="enabler-filter-all-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-filter-policies-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-filter-tools-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-filter-skills-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-filter-culture-button"]')).toBeVisible()

    // Verify add enabler button
    await expect(page.locator('[data-testid="enabler-add-button"]')).toBeVisible()

    // Verify at least one enabler card exists
    const firstCard = page.locator('[data-testid="enabler-0-card"]')
    await expect(firstCard).toBeVisible()

    // Verify card action buttons
    await expect(page.locator('[data-testid="enabler-0-edit-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-0-delete-button"]')).toBeVisible()

    // Click add button to verify modal form testIDs
    await page.locator('[data-testid="enabler-add-button"]').click()
    await page.waitForTimeout(500)

    // Verify modal form fields
    await expect(page.locator('[data-testid="enabler-modal-type-select"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-modal-name-input"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-modal-status-select"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-modal-version-input"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-modal-cancel-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="enabler-modal-save-button"]')).toBeVisible()

    // Close modal
    await page.locator('[data-testid="enabler-modal-cancel-button"]').click()

    console.log('✅ EnablerDeployment: All testIDs verified!')
  })

  test('ContinuousMonitoring - All testIDs present', async ({ page }) => {
    // Navigate to Phase 6
    const phase6Button = page.locator('aside button').filter({ hasText: /Realize Benefits/i })
    await phase6Button.waitFor({ state: 'visible', timeout: 10000 })
    await phase6Button.click()
    await page.waitForTimeout(500)

    // Find and click Continuous Monitoring
    const monitoringLink = page.locator('aside').getByText('Continuous Monitoring', { exact: true })
    await monitoringLink.waitFor({ state: 'visible', timeout: 5000 })
    await monitoringLink.click()
    await page.waitForTimeout(1000)

    // Verify empty state buttons
    const loadExampleBtn = page.locator('[data-testid="monitoring-load-example-button"]')
    const addFirstBtn = page.locator('[data-testid="monitoring-add-first-metric-button"]')

    await expect(loadExampleBtn).toBeVisible()
    await expect(addFirstBtn).toBeVisible()

    // Load example data
    await loadExampleBtn.click()
    await page.waitForTimeout(1000)

    // Verify filter tabs
    await expect(page.locator('[data-testid="monitoring-filter-all-tab"]')).toBeVisible()
    await expect(page.locator('[data-testid="monitoring-filter-on-track-tab"]')).toBeVisible()
    await expect(page.locator('[data-testid="monitoring-filter-at-risk-tab"]')).toBeVisible()
    await expect(page.locator('[data-testid="monitoring-filter-critical-tab"]')).toBeVisible()

    // Verify add metric button
    await expect(page.locator('[data-testid="monitoring-add-metric-button"]')).toBeVisible()

    // Verify at least one metric card exists
    const firstCard = page.locator('[data-testid="monitoring-metric-0-card"]')
    await expect(firstCard).toBeVisible()

    // Verify card action buttons
    await expect(page.locator('[data-testid="monitoring-metric-0-edit-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="monitoring-metric-0-delete-button"]')).toBeVisible()

    console.log('✅ ContinuousMonitoring: All testIDs verified!')
  })

  test('ContinuousImprovement - All testIDs present', async ({ page }) => {
    // Navigate to Phase 7
    const phase7Button = page.locator('aside button').filter({ hasText: /Review Effectiveness/i })
    await phase7Button.waitFor({ state: 'visible', timeout: 10000 })
    await phase7Button.click()
    await page.waitForTimeout(500)

    // Find and click Continuous Improvement
    const improvementLink = page.locator('aside').getByText('Continuous Improvement', { exact: true })
    await improvementLink.waitFor({ state: 'visible', timeout: 5000 })
    await improvementLink.click()
    await page.waitForTimeout(1000)

    // Verify empty state buttons
    const loadExampleBtn = page.locator('[data-testid="improvement-load-example-button"]')
    const addFirstBtn = page.locator('[data-testid="improvement-add-first-initiative-button"]')

    await expect(loadExampleBtn).toBeVisible()
    await expect(addFirstBtn).toBeVisible()

    // Load example data
    await loadExampleBtn.click()
    await page.waitForTimeout(1000)

    // Verify filter buttons (at least the "All" button should always be visible)
    await expect(page.locator('[data-testid="improvement-filter-all-button"]')).toBeVisible()
    // Other filter buttons may or may not be visible depending on data
    // Just verify they exist in the DOM when present
    const capabilityBtn = page.locator('[data-testid="improvement-filter-capability-button"]')
    const performanceBtn = page.locator('[data-testid="improvement-filter-performance-button"]')
    const innovationBtn = page.locator('[data-testid="improvement-filter-innovation-button"]')

    // Check if any additional filters are visible (at least one should be)
    const visibleFilters = [
      await capabilityBtn.isVisible().catch(() => false),
      await performanceBtn.isVisible().catch(() => false),
      await innovationBtn.isVisible().catch(() => false)
    ]
    const hasVisibleFilters = visibleFilters.some(v => v === true)
    expect(hasVisibleFilters).toBe(true)

    // Verify add initiative button
    await expect(page.locator('[data-testid="improvement-add-initiative-button"]')).toBeVisible()

    // Verify at least one initiative card exists
    const firstCard = page.locator('[data-testid="improvement-initiative-0-card"]')
    await expect(firstCard).toBeVisible()

    // Verify card action buttons
    await expect(page.locator('[data-testid="improvement-initiative-0-edit-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-initiative-0-delete-button"]')).toBeVisible()

    // Click add button to verify modal form testIDs
    await page.locator('[data-testid="improvement-add-initiative-button"]').click()
    await page.waitForTimeout(500)

    // Verify modal form fields
    await expect(page.locator('[data-testid="improvement-modal-name-input"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-description-textarea"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-type-select"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-priority-select"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-status-select"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-cancel-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="improvement-modal-save-button"]')).toBeVisible()

    // Close modal
    await page.locator('[data-testid="improvement-modal-cancel-button"]').click()

    console.log('✅ ContinuousImprovement: All testIDs verified!')
  })
})
