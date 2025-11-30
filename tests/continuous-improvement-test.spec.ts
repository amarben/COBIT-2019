import { test, expect } from '@playwright/test'

test.describe('ContinuousImprovement - Simple Test', () => {
  test('should navigate to Continuous Improvement and load example', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    // Expand Phase 7
    console.log('Expanding Phase 7...')
    const phase7Button = page.locator('aside button').filter({ hasText: /Review Effectiveness/ })
    await phase7Button.click()
    await page.waitForTimeout(500)

    // Click on Continuous Improvement
    console.log('Clicking Continuous Improvement...')
    const improvementButton = page.locator('aside button').filter({ hasText: /Continuous Improvement/i })
    await expect(improvementButton).toBeVisible({ timeout: 5000 })
    await improvementButton.click()
    await page.waitForTimeout(1000)

    // Should see the empty state
    console.log('Checking for empty state...')
    const emptyStateHeading = page.getByText(/No Improvement Initiatives Yet/i)
    await expect(emptyStateHeading).toBeVisible({ timeout: 5000 })

    // Click "Load TechCorp Example"
    console.log('Loading TechCorp example...')
    const loadExampleButton = page.getByRole('button', { name: /Load TechCorp Example/i })
    await expect(loadExampleButton).toBeVisible()
    await loadExampleButton.click()
    await page.waitForTimeout(1000)

    // Should now see the improvement portfolio dashboard
    console.log('Checking for portfolio dashboard...')
    const dashboardHeading = page.getByText(/Improvement Portfolio Dashboard/i)
    await expect(dashboardHeading).toBeVisible({ timeout: 5000 })

    // Should see Total Active Initiatives
    const totalInitiatives = page.getByText(/Total Active Initiatives/i)
    await expect(totalInitiatives).toBeVisible()

    // Should see Total Investment
    const totalInvestment = page.getByText(/Total Investment/i)
    await expect(totalInvestment).toBeVisible()

    // Should see the Strategic Initiatives heading
    const strategicInitiatives = page.getByText(/Strategic Initiatives/i)
    await expect(strategicInitiatives).toBeVisible()

    // Should see On-Track Initiatives metric
    const onTrackMetric = page.getByText(/On-Track Initiatives/i)
    await expect(onTrackMetric).toBeVisible()

    console.log('✅ Test passed!')
  })
})
