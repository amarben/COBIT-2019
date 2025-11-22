import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

// Toggle this for development (false) vs final demo video (true)
const DEMO_MODE = process.env.DEMO_MODE === 'true'

test.describe('TechCorp Financial - Step 4: Governance Objectives', () => {
  test('select and implement governance objectives for TechCorp Financial Services', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    // Only enable cursor tracking for demo mode
    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 4: Governance Objectives (EDM)')
    console.log('   Evaluate, Direct, and Monitor')
    console.log('========================================\n')
    logSpeedConfig()

    // Load app WITHOUT clearing localStorage (preserve Steps 1-3 data)
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('⏳ App loaded')

    // Navigate - expand Step 4, then click EDM01
    console.log('📍 Navigating to Governance Objectives...\n')

    const step4Button = page.locator('aside nav button').filter({ hasText: /Step 4.*Governance Objectives/i }).first()
    await step4Button.click()
    await page.waitForLoadState('networkidle')

    await page.locator('aside nav button').filter({ hasText: /EDM01/i }).first().click()
    await page.waitForLoadState('networkidle')

    // Wait for page - use smart selector wait instead of text search
    await page.waitForSelector('text=Governance Objectives')
    if (DEMO_MODE) await page.waitForTimeout(wait(2000)) // Brief visual pause

    console.log('🛡️  GOVERNANCE OBJECTIVES (EDM)\n')

    // EDM01 - Governance Framework (High Priority)
    console.log('   1️⃣  EDM01: Governance Framework')
    let card = page.locator('div.card').filter({ hasText: /EDM01.*Governance Framework/i }).first()
    await card.scrollIntoViewIfNeeded()

    // Enable objective - click the icon toggle button (first button in card)
    let toggleButton = card.locator('button').first()
    await toggleButton.click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500)) // Brief state update

    // Implement all 3 practices - get all buttons except the first (toggle)
    let practiceButtons = card.locator('button').nth(1) // Start from second button
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(2)
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(3)
    await practiceButtons.click()
    console.log('      ✅ Enabled + 3 practices')

    // EDM02 - Benefits Delivery
    console.log('   2️⃣  EDM02: Benefits Delivery')
    // Navigate to EDM02
    await page.locator('aside nav button').filter({ hasText: /EDM02/i }).first().click()
    await page.waitForLoadState('networkidle')

    card = page.locator('div.card').filter({ hasText: /EDM02.*Benefits/i }).first()
    await card.scrollIntoViewIfNeeded()

    toggleButton = card.locator('button').first()
    await toggleButton.click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Implement 2 of 3 practices
    practiceButtons = card.locator('button').nth(1)
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(2)
    await practiceButtons.click()
    console.log('      ✅ Enabled + 2 practices')

    // EDM03 - Risk Optimization (Critical for financial sector)
    console.log('   3️⃣  EDM03: Risk Optimization')
    // Navigate to EDM03
    await page.locator('aside nav button').filter({ hasText: /EDM03/i }).first().click()
    await page.waitForLoadState('networkidle')

    card = page.locator('div.card').filter({ hasText: /EDM03.*Risk/i }).first()
    await card.scrollIntoViewIfNeeded()

    toggleButton = card.locator('button').first()
    await toggleButton.click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Implement all 3 practices (high priority)
    practiceButtons = card.locator('button').nth(1)
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(2)
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(3)
    await practiceButtons.click()
    console.log('      ✅ Enabled + 3 practices')

    // EDM04 - Resource Optimization
    console.log('   4️⃣  EDM04: Resource Optimization')
    // Navigate to EDM04
    await page.locator('aside nav button').filter({ hasText: /EDM04/i }).first().click()
    await page.waitForLoadState('networkidle')

    card = page.locator('div.card').filter({ hasText: /EDM04.*Resource/i }).first()
    await card.scrollIntoViewIfNeeded()

    toggleButton = card.locator('button').first()
    await toggleButton.click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Implement 2 of 3 practices
    practiceButtons = card.locator('button').nth(1)
    await practiceButtons.click()
    practiceButtons = card.locator('button').nth(2)
    await practiceButtons.click()
    console.log('      ✅ Enabled + 2 practices')

    // EDM05 - Stakeholder Engagement
    console.log('   5️⃣  EDM05: Stakeholder Engagement')
    // Navigate to EDM05
    await page.locator('aside nav button').filter({ hasText: /EDM05/i }).first().click()
    await page.waitForLoadState('networkidle')

    card = page.locator('div.card').filter({ hasText: /EDM05.*Stakeholder/i }).first()
    await card.scrollIntoViewIfNeeded()

    toggleButton = card.locator('button').first()
    await toggleButton.click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Implement 1 of 3 practices
    practiceButtons = card.locator('button').nth(1)
    await practiceButtons.click()
    console.log('      ✅ Enabled + 1 practice')

    // Scroll to top to show summary
    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(wait(2500)) // Let scroll animation complete
    }

    // Save configuration
    console.log('\n💾 Saving governance objectives...')
    const saveButton = page.getByRole('button', { name: /Save.*Objectives/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(2000)) // Brief confirmation pause

    console.log('✅ Configuration saved!\n')
    console.log('📊 SUMMARY:')
    console.log('   • 5 of 5 governance objectives enabled')
    console.log('   • 11 of 15 practices implemented (73%)')
    console.log('   • Focus: Governance Framework + Risk Management\n')

    // Navigate to dashboard to show completion (demo mode only)
    if (DEMO_MODE) {
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(wait(3000)) // Final pause to show dashboard
    }

    console.log('🎉 Step 4 complete - Governance objectives defined!\n')
  })
})
