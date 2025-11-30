import { test, expect } from '@playwright/test'

test.describe('ContinuousMonitoring - Simple Test', () => {
  test('should navigate to Continuous Monitoring and load example', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    // Expand Phase 6
    console.log('Expanding Phase 6...')
    const phase6Button = page.locator('aside button').filter({ hasText: /Realize Benefits/ })
    await phase6Button.click()
    await page.waitForTimeout(500)

    // Click on Continuous Monitoring
    console.log('Clicking Continuous Monitoring...')
    const monitoringButton = page.locator('aside button').filter({ hasText: /Continuous Monitoring/i })
    await expect(monitoringButton).toBeVisible({ timeout: 5000 })
    await monitoringButton.click()
    await page.waitForTimeout(1000)

    // Should see the empty state
    console.log('Checking for empty state...')
    const emptyStateHeading = page.getByText(/No Monitoring Data Yet/i)
    await expect(emptyStateHeading).toBeVisible({ timeout: 5000 })

    // Click "Load TechCorp Example"
    console.log('Loading TechCorp example...')
    const loadExampleButton = page.getByRole('button', { name: /Load TechCorp Example/i })
    await expect(loadExampleButton).toBeVisible()
    await loadExampleButton.click()
    await page.waitForTimeout(1000)

    // Should now see the monitoring dashboard
    console.log('Checking for monitoring dashboard...')
    const dashboardHeading = page.getByText(/Governance Health Overview/i)
    await expect(dashboardHeading).toBeVisible({ timeout: 5000 })

    // Should see Overall Health metric
    const overallHealth = page.getByText(/Overall Health/i)
    await expect(overallHealth).toBeVisible()

    // Should see Performance Trends section
    const performanceTrends = page.getByText(/Performance Trends/i)
    await expect(performanceTrends).toBeVisible()

    // Should see Performance Metrics heading
    const performanceMetrics = page.getByText(/Performance Metrics \(/i)
    await expect(performanceMetrics).toBeVisible()

    console.log('✅ Test passed!')
  })
})
