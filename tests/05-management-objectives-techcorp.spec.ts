import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

// Toggle this for development (false) vs final demo video (true)
const DEMO_MODE = process.env.DEMO_MODE === 'true'

test.describe('TechCorp Financial - Step 5: Management Objectives', () => {
  test('select management objectives for TechCorp Financial Services', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    // Only enable cursor tracking for demo mode
    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 5: Management Objectives')
    console.log('   APO, BAI, DSS, MEA Domains')
    console.log('========================================\n')
    logSpeedConfig()

    // Load app WITHOUT clearing localStorage (preserve Steps 1-4 data)
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('⏳ App loaded')

    // Navigate to Step 5
    console.log('📍 Navigating to Management Objectives...\n')

    const step5Button = page.locator('aside nav button').filter({ hasText: /Step 5.*Management Objectives/i }).first()
    await step5Button.click()
    await page.waitForLoadState('networkidle')

    // Wait for page
    await page.waitForSelector('text=Management Objectives')
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    console.log('🎯 MANAGEMENT OBJECTIVES\n')
    console.log('   Selecting 12 of 35 objectives across 4 domains\n')

    // APO Domain (select 4 objectives)
    console.log('   📘 APO: Align, Plan, Organize')

    // Navigate to APO domain via sidebar
    await page.locator('aside nav button').filter({ hasText: /APO.*Align/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // APO01: IT Management Framework
    let card = page.locator('div.card').filter({ hasText: /APO01.*Management Framework/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click() // Toggle
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ APO01: IT Management Framework (high)')

    // APO02: Strategy
    card = page.locator('div.card').filter({ hasText: /APO02.*Strategy/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ APO02: Strategy (high)')

    // APO11: Quality
    card = page.locator('div.card').filter({ hasText: /APO11.*Quality/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption('medium')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ APO11: Quality (medium)')

    // APO13: Security
    card = page.locator('div.card').filter({ hasText: /APO13.*Security/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ APO13: Security (high)')

    // BAI Domain (select 3 objectives)
    console.log('\n   📗 BAI: Build, Acquire, Implement')

    // Navigate to BAI domain via sidebar
    await page.locator('aside nav button').filter({ hasText: /BAI.*Build/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // BAI02: Requirements Definition
    card = page.locator('div.card').filter({ hasText: /BAI02.*Requirements/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ BAI02: Requirements Definition (high)')

    // BAI06: Manage Changes
    card = page.locator('div.card').filter({ hasText: /BAI06.*Change/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ BAI06: Manage Changes (high)')

    // BAI10: Configuration Management
    card = page.locator('div.card').filter({ hasText: /BAI10.*Configuration/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption('medium')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ BAI10: Configuration Management (medium)')

    // DSS Domain (select 3 objectives)
    console.log('\n   📙 DSS: Deliver, Service, Support')

    // Navigate to DSS domain via sidebar
    await page.locator('aside nav button').filter({ hasText: /DSS.*Deliver/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // DSS01: Manage Operations
    card = page.locator('div.card').filter({ hasText: /DSS01.*Operations/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ DSS01: Manage Operations (high)')

    // DSS05: Manage Security Services
    card = page.locator('div.card').filter({ hasText: /DSS05.*Security Services/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ DSS05: Manage Security Services (high)')

    // DSS06: Manage Business Process Controls
    card = page.locator('div.card').filter({ hasText: /DSS06.*Business Process Controls/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ DSS06: Manage Business Process Controls (high)')

    // MEA Domain (select 2 objectives)
    console.log('\n   📕 MEA: Monitor, Evaluate, Assess')

    // Navigate to MEA domain via sidebar
    await page.locator('aside nav button').filter({ hasText: /MEA.*Monitor/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // MEA01: Performance Monitoring
    card = page.locator('div.card').filter({ hasText: /MEA01.*Performance/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ MEA01: Performance Monitoring (high)')

    // MEA03: Compliance
    card = page.locator('div.card').filter({ hasText: /MEA03.*Compliance/i }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))
    console.log('      ✅ MEA03: Compliance (high)')

    // Scroll to top to show summary (demo mode only)
    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(wait(2500))
    }

    // Save configuration
    console.log('\n💾 Saving management objectives...')
    const saveButton = page.getByRole('button', { name: /Save.*Objectives/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    console.log('✅ Configuration saved!\n')
    console.log('📊 SUMMARY:')
    console.log('   • 12 of 35 management objectives enabled (34%)')
    console.log('   • APO: 4 objectives | BAI: 3 objectives')
    console.log('   • DSS: 3 objectives | MEA: 2 objectives')
    console.log('   • Focus: Security, Change, Compliance\n')

    // Navigate to dashboard to show completion (demo mode only)
    if (DEMO_MODE) {
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(wait(3000))
    }

    console.log('🎉 Step 5 complete - Management objectives defined!\n')
  })
})
