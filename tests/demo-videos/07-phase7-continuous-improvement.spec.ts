import { test, expect } from '@playwright/test'

/**
 * Phase 7 Demo: Continuous Improvement
 * Shows strategic improvement initiatives and roadmap management
 *
 * Following Playwright Best Practices:
 * - Realistic interactions with hover and delays
 * - Proper waits for React hydration
 * - Explicit visibility checks
 * - Professional demo appearance
 */

test.describe('Phase 7 Demo: Continuous Improvement', () => {
  test('Phase 7 - Continuous Improvement Demo', async ({ page }) => {
    // Set longer timeout for demo videos (2 minutes)
    test.setTimeout(120000)

    // Navigate to app and wait for React to hydrate
    console.log('📍 Navigating to application...')
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000) // Allow React to fully hydrate

    // Expand Phase 7 with realistic interaction
    console.log('📍 Navigating to Phase 7: Review Effectiveness')
    const phase7Button = page.locator('aside button').filter({ hasText: /Review Effectiveness/ })
    await phase7Button.waitFor({ state: 'visible', timeout: 30000 })
    await phase7Button.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await phase7Button.hover()
    await page.waitForTimeout(300)
    await phase7Button.click()
    await page.waitForTimeout(1000)

    // Click on Continuous Improvement with realistic interaction
    console.log('📍 Opening Continuous Improvement')
    const improvementButton = page.locator('aside button').filter({ hasText: /Continuous Improvement/i })
    await improvementButton.waitFor({ state: 'visible', timeout: 10000 })
    await improvementButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await improvementButton.hover()
    await page.waitForTimeout(300)
    await improvementButton.click()
    await page.waitForTimeout(2000)

    // Show empty state
    console.log('📍 Showing empty state')
    const emptyStateHeading = page.getByText(/No Improvement Initiatives Yet/i)
    await emptyStateHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Load TechCorp Example with realistic interaction
    console.log('📍 Loading TechCorp improvement portfolio')
    const loadExampleButton = page.getByRole('button', { name: /Load TechCorp Example/i })
    await loadExampleButton.waitFor({ state: 'visible', timeout: 10000 })
    await loadExampleButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await loadExampleButton.hover()
    await page.waitForTimeout(300)
    await loadExampleButton.click()
    await page.waitForTimeout(2000)

    // Show Improvement Portfolio Dashboard
    console.log('📍 Showing Improvement Portfolio Dashboard')
    const dashboardHeading = page.getByText(/Improvement Portfolio Dashboard/i)
    await dashboardHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Highlight portfolio metrics
    console.log('📍 Highlighting portfolio metrics')
    const totalInitiatives = page.getByText(/Total Active Initiatives/i)
    await totalInitiatives.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Show Total Investment
    console.log('📍 Showing total investment')
    const totalInvestment = page.getByText(/Total Investment/i)
    await totalInvestment.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Show Strategic Initiatives section
    console.log('📍 Showing Strategic Initiatives')
    const strategicHeading = page.getByText(/Strategic Initiatives/i)
    await strategicHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Show On-Track metrics
    console.log('📍 Showing initiative status metrics')
    const onTrackMetric = page.getByText(/On-Track Initiatives/i)
    await onTrackMetric.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Final pause to review improvement portfolio
    console.log('📍 Reviewing improvement portfolio')
    await page.waitForTimeout(3000)

    console.log('✅ Phase 7 Demo Complete!')
  })
})
