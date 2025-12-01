import { test, expect } from '@playwright/test'
import { TEST_IDS } from '../../src/constants/testIds'

/**
 * Phase 5 Demo: Enabler Deployment
 * Shows how to deploy governance enablers (policies, tools, skills, culture)
 *
 * Following Playwright Best Practices:
 * - Realistic interactions with hover and delays
 * - Proper waits for React hydration
 * - Explicit visibility checks
 * - Professional demo appearance
 */

test.describe('Phase 5 Demo: Enabler Deployment', () => {
  test('Phase 5 - Enabler Deployment Demo', async ({ page }) => {
    // Set longer timeout for demo videos (2 minutes)
    test.setTimeout(120000)

    // Navigate to app and wait for React to hydrate
    console.log('📍 Navigating to application...')
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000) // Allow React to fully hydrate

    // Expand Phase 5 with realistic interaction
    console.log('📍 Navigating to Phase 5: Execute Plan')
    const phase5Button = page.getByTestId(TEST_IDS.SIDEBAR.PHASE_BUTTON(5))
    await phase5Button.waitFor({ state: 'visible', timeout: 30000 })
    await phase5Button.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await phase5Button.hover()
    await page.waitForTimeout(300)
    await phase5Button.click()
    await page.waitForTimeout(1000)

    // Click on Enabler Deployment with realistic interaction
    console.log('📍 Opening Enabler Deployment')
    const enablerButton = page.locator('aside button').filter({ hasText: /Enabler Deployment/i })
    await enablerButton.waitFor({ state: 'visible', timeout: 10000 })
    await enablerButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await enablerButton.hover()
    await page.waitForTimeout(300)
    await enablerButton.click()
    await page.waitForTimeout(2000)

    // Show empty state
    console.log('📍 Showing empty state')
    const emptyStateHeading = page.getByText(/No Enabler Deployment Data Yet/i)
    await emptyStateHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Load TechCorp Example with realistic interaction
    console.log('📍 Loading TechCorp example data')
    const loadExampleButton = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.LOAD_EXAMPLE_BUTTON)
    await loadExampleButton.waitFor({ state: 'visible', timeout: 10000 })
    await loadExampleButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await loadExampleButton.hover()
    await page.waitForTimeout(300)
    await loadExampleButton.click()
    await page.waitForTimeout(2000)

    // Show deployment overview
    console.log('📍 Showing Deployment Overview dashboard')
    const overviewHeading = page.getByText(/Deployment Overview/i)
    await overviewHeading.waitFor({ state: 'visible', timeout: 10000 })
    await page.waitForTimeout(3000)

    // Show Policies section
    console.log('📍 Highlighting Policies dashboard')
    const policiesHeading = page.getByRole('heading', { name: 'Policies' })
    await policiesHeading.waitFor({ state: 'visible', timeout: 10000 })
    await policiesHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Scroll to Tools section
    console.log('📍 Scrolling to Tools section')
    const toolsHeading = page.getByRole('heading', { name: 'Tools' })
    await toolsHeading.scrollIntoViewIfNeeded()
    await page.waitForTimeout(2000)

    // Filter by Policies with realistic interaction
    console.log('📍 Filtering by Policies')
    const policiesFilter = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.FILTER_POLICIES_BUTTON)
    await policiesFilter.waitFor({ state: 'visible', timeout: 10000 })
    await policiesFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await policiesFilter.hover()
    await page.waitForTimeout(300)
    await policiesFilter.click()
    await page.waitForTimeout(2000)

    // Show first policy item
    console.log('📍 Showing policy details')
    await page.waitForTimeout(2000)

    // Filter by Tools with realistic interaction
    console.log('📍 Filtering by Tools')
    const toolsFilter = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.FILTER_TOOLS_BUTTON)
    await toolsFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await toolsFilter.hover()
    await page.waitForTimeout(300)
    await toolsFilter.click()
    await page.waitForTimeout(2000)

    // Show tools items
    console.log('📍 Showing tools deployment')
    await page.waitForTimeout(2000)

    // Filter by Skills with realistic interaction
    console.log('📍 Filtering by Skills')
    const skillsFilter = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.FILTER_SKILLS_BUTTON)
    await skillsFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await skillsFilter.hover()
    await page.waitForTimeout(300)
    await skillsFilter.click()
    await page.waitForTimeout(2000)

    // Show skills items
    console.log('📍 Showing skills development')
    await page.waitForTimeout(2000)

    // Filter by Culture with realistic interaction
    console.log('📍 Filtering by Culture')
    const cultureFilter = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.FILTER_CULTURE_BUTTON)
    await cultureFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await cultureFilter.hover()
    await page.waitForTimeout(300)
    await cultureFilter.click()
    await page.waitForTimeout(2000)

    // Show culture items
    console.log('📍 Showing culture initiatives')
    await page.waitForTimeout(2000)

    // Reset to All with realistic interaction
    console.log('📍 Showing all enablers')
    const allFilter = page.getByTestId(TEST_IDS.ENABLER_DEPLOYMENT.FILTER_ALL_BUTTON)
    await allFilter.scrollIntoViewIfNeeded()
    await page.waitForTimeout(300)
    await allFilter.hover()
    await page.waitForTimeout(300)
    await allFilter.click()
    await page.waitForTimeout(2000)

    // Final pause to show all enablers
    console.log('📍 Reviewing all enablers')
    await page.waitForTimeout(3000)

    console.log('✅ Phase 5 Demo Complete!')
  })
})
