import { test, expect } from '@playwright/test'

test.describe('EnablerDeployment - Simple Test', () => {
  test('should navigate to Enabler Deployment and load example', async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    // Expand Phase 5
    console.log('Expanding Phase 5...')
    const phase5Button = page.locator('aside button').filter({ hasText: /Execute Plan/ })
    await phase5Button.click()
    await page.waitForTimeout(500)

    // Click on Enabler Deployment
    console.log('Clicking Enabler Deployment...')
    const enablerButton = page.locator('aside button').filter({ hasText: /Enabler Deployment/i })
    await expect(enablerButton).toBeVisible({ timeout: 5000 })
    await enablerButton.click()
    await page.waitForTimeout(1000)

    // Should see the empty state
    console.log('Checking for empty state...')
    const emptyStateHeading = page.getByText(/No Enabler Deployment Data Yet/i)
    await expect(emptyStateHeading).toBeVisible({ timeout: 5000 })

    // Click "Load TechCorp Example"
    console.log('Loading TechCorp example...')
    const loadExampleButton = page.getByRole('button', { name: /Load TechCorp Example/i })
    await expect(loadExampleButton).toBeVisible()
    await loadExampleButton.click()
    await page.waitForTimeout(1000)

    // Should now see the deployment overview
    console.log('Checking for deployment overview...')
    const overviewHeading = page.getByText(/Deployment Overview/i)
    await expect(overviewHeading).toBeVisible({ timeout: 5000 })

    // Should see Policies dashboard card
    const policiesHeading = page.getByRole('heading', { name: 'Policies' })
    await expect(policiesHeading).toBeVisible()

    // Should see Tools dashboard card
    const toolsHeading = page.getByRole('heading', { name: 'Tools' })
    await expect(toolsHeading).toBeVisible()

    console.log('✅ Test passed!')
  })
})
