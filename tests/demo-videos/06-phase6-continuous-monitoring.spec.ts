import { test, expect } from '@playwright/test'

/**
 * Phase 6 Demo: Continuous Monitoring
 * Shows how to monitor governance performance and compliance in real-time
 *
 * Following Playwright Best Practices:
 * - Realistic interactions with hover and delays
 * - Proper waits for React hydration
 * - Explicit visibility checks
 * - Professional demo appearance
 */

test.describe('Phase 6 Demo: Continuous Monitoring', () => {
  test('Phase 6 - Continuous Monitoring Demo', async ({ page }) => {
    // Set longer timeout for demo videos (2 minutes)
    test.setTimeout(120000)

    // Navigate to app and wait for React to hydrate
    console.log('📍 Navigating to application...')
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000) // Allow React to fully hydrate

    // Expand Phase 6 with realistic interaction
    console.log('📍 Navigating to Phase 6: Realize Benefits')
    const phase6Button = page.locator('aside button').filter({ hasText: /Realize Benefits/ })
    await phase6Button.waitFor({ state: 'visible', timeout: 30000 })
    await phase6Button.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await phase6Button.hover()
    await page.waitForTimeout(300)
    await phase6Button.click()
    await page.waitForTimeout(1000)

    // Click on Continuous Monitoring with realistic interaction
    console.log('📍 Opening Continuous Monitoring')
    const monitoringButton = page.locator('aside button').filter({ hasText: /Continuous Monitoring/i })
    await monitoringButton.waitFor({ state: 'visible', timeout: 10000 })
    await monitoringButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await monitoringButton.hover()
    await page.waitForTimeout(300)
    await monitoringButton.click()
    await page.waitForTimeout(2000)

    // Show empty state
    console.log('📍 Showing empty state')
    const emptyStateHeading = page.getByText(/No Monitoring Data Yet/i)
    await emptyStateHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Load TechCorp Example with realistic interaction
    console.log('📍 Loading TechCorp monitoring metrics')
    const loadExampleButton = page.getByRole('button', { name: /Load TechCorp Example/i })
    await loadExampleButton.waitFor({ state: 'visible', timeout: 10000 })
    await loadExampleButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await loadExampleButton.hover()
    await page.waitForTimeout(300)
    await loadExampleButton.click()
    await page.waitForTimeout(2000)

    // Show Governance Health Overview
    console.log('📍 Showing Governance Health Overview')
    const healthHeading = page.getByText(/Governance Health Overview/i)
    await healthHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Highlight health score metrics
    console.log('📍 Highlighting health metrics')
    const overallHealth = page.getByText(/Overall Health/i).first()
    await overallHealth.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Show Performance Trends
    console.log('📍 Showing Performance Trends')
    const trendsHeading = page.getByText(/Performance Trends/i).first()
    await trendsHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(3000)

    // Show Objectives at Risk
    console.log('📍 Showing objectives requiring attention')
    const objectivesAtRisk = page.getByText(/Objectives Requiring Attention/i)
    if (await objectivesAtRisk.isVisible()) {
      await objectivesAtRisk.scrollIntoViewIfNeeded()
      await page.waitForTimeout(2000)
    }

    // Show Performance Metrics list
    console.log('📍 Showing Performance Metrics list')
    const metricsHeading = page.getByText(/Performance Metrics \(/i)
    await metricsHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Filter by On Track with realistic interaction
    console.log('📍 Filtering: On Track metrics')
    const onTrackFilter = page.getByRole('button', { name: /On Track/i }).first()
    await onTrackFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await onTrackFilter.hover()
    await page.waitForTimeout(300)
    await onTrackFilter.click()
    await page.waitForTimeout(2000)

    // Filter by At Risk with realistic interaction
    console.log('📍 Filtering: At Risk metrics')
    const atRiskFilter = page.getByRole('button', { name: /At Risk/i }).first()
    await atRiskFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await atRiskFilter.hover()
    await page.waitForTimeout(300)
    await atRiskFilter.click()
    await page.waitForTimeout(2000)

    // Show metric details
    console.log('📍 Showing metric details')
    await page.waitForTimeout(2000)

    // Filter by Critical with realistic interaction
    console.log('📍 Filtering: Critical metrics')
    const criticalFilter = page.getByRole('button', { name: /Critical/i }).first()
    await criticalFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await criticalFilter.hover()
    await page.waitForTimeout(300)
    await criticalFilter.click()
    await page.waitForTimeout(2000)

    // Reset to All with realistic interaction
    console.log('📍 Showing all metrics')
    const allFilter = page.getByRole('button', { name: /All/i }).first()
    await allFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await allFilter.hover()
    await page.waitForTimeout(300)
    await allFilter.click()
    await page.waitForTimeout(2000)

    // Final pause to show all metrics
    console.log('📍 Reviewing all metrics')
    await page.waitForTimeout(3000)

    console.log('✅ Phase 6 Demo Complete!')
  })
})
