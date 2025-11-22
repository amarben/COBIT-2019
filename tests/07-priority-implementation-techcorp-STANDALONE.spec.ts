import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { setupSteps1to6 } from './helpers/setup-steps-1-6'

const DEMO_MODE = process.env.DEMO_MODE === 'true'

test.describe('TechCorp Financial - Step 7: Priority Implementation', () => {
  test('view implementation roadmap (assumes Steps 4-5 data exists)', async ({ page }) => {
    test.setTimeout(120000)

    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 7: Priority Implementation')
    console.log('   3-Phase Implementation Approach')
    console.log('========================================\n')

    // Load app WITHOUT clearing localStorage (preserve Steps 1-6 data)
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('⏳ App loaded (using data from Steps 4-5)')
    console.log('📍 Navigating to Priority Implementation...\n')

    const step7Button = page.locator('aside nav button').filter({ hasText: /Step 7.*Priority/i }).first()
    await step7Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1500)

    console.log('🚀 IMPLEMENTATION ROADMAP\n')

    // Scroll to top first
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(800)

    // Show and hover over metric cards
    console.log('   📊 Implementation Metrics:\n')

    const govCard = page.locator('div.card').filter({ hasText: /Governance.*EDM/ }).first()
    await govCard.scrollIntoViewIfNeeded()
    await govCard.hover()
    console.log('      • Governance (EDM): 5 objectives')
    if (DEMO_MODE) await page.waitForTimeout(1200)

    const mgmtCard = page.locator('div.card').filter({ hasText: /Management.*objectives enabled/ }).first()
    await mgmtCard.hover()
    console.log('      • Management: 12 objectives')
    if (DEMO_MODE) await page.waitForTimeout(1200)

    const priorityCard = page.locator('div.card').filter({ hasText: /High Priority/ }).first()
    await priorityCard.hover()
    console.log('      • High Priority: 10 objectives\n')
    if (DEMO_MODE) await page.waitForTimeout(1500)

    // Scroll down to roadmap
    const roadmapHeading = page.locator('text=Implementation Roadmap').first()
    await roadmapHeading.scrollIntoViewIfNeeded()
    if (DEMO_MODE) await page.waitForTimeout(1000)

    // Display and hover over Phase 1
    const phase1 = page.locator('div.bg-purple-50').first()
    await phase1.scrollIntoViewIfNeeded()
    await phase1.hover()
    if (await phase1.isVisible().catch(() => false)) {
      console.log('   📍 Phase 1: Governance Foundation')
      console.log('      • EDM01: Governance Framework')
      console.log('      • EDM02: Benefits Delivery')
      console.log('      • EDM03: Risk Optimization')
      console.log('      • EDM04: Resource Optimization')
      console.log('      • EDM05: Stakeholder Engagement\n')
    }
    if (DEMO_MODE) await page.waitForTimeout(2000)

    // Display and hover over Phase 2
    const phase2 = page.locator('div.bg-red-50').first()
    await phase2.scrollIntoViewIfNeeded()
    await phase2.hover()
    if (await phase2.isVisible().catch(() => false)) {
      console.log('   📍 Phase 2: High Priority Management (10 objectives)')
      console.log('      • APO01, APO02, APO13 (Strategy & Security)')
      console.log('      • BAI02, BAI06 (Requirements & Changes)')
      console.log('      • DSS01, DSS05, DSS06 (Operations & Security)')
      console.log('      • MEA01, MEA03 (Performance & Compliance)\n')
    }
    if (DEMO_MODE) await page.waitForTimeout(2000)

    // Display and hover over Phase 3
    const phase3 = page.locator('div.bg-blue-50').first()
    await phase3.scrollIntoViewIfNeeded()
    await phase3.hover()
    if (await phase3.isVisible().catch(() => false)) {
      console.log('   📍 Phase 3: Additional Objectives (2 medium priority)')
      console.log('      • APO11: Managed Quality')
      console.log('      • BAI10: Managed Configuration\n')
    }
    if (DEMO_MODE) await page.waitForTimeout(2000)

    // Scroll back to top to show complete view
    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(1500)
    }

    console.log('✅ Implementation roadmap displayed!\n')
    console.log('📊 SUMMARY:')
    console.log('   • Total Objectives: 17 (5 EDM + 12 Management)')
    console.log('   • Phase 1 (Foundation): 5 EDM objectives')
    console.log('   • Phase 2 (High Priority): 10 management objectives')
    console.log('   • Phase 3 (Additional): 2 medium priority objectives\n')

    if (DEMO_MODE) {
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)
    }

    console.log('🎉 Step 7 complete - Ready for performance measurement!\n')
  })

  test('with data setup - complete workflow', async ({ page }) => {
    test.setTimeout(180000)

    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🔧 Setting up Steps 1-6 data first...')

    // Run setup to populate data
    await setupSteps1to6(page, true)

    console.log('\n🎬 ========================================')
    console.log('   STEP 7: Priority Implementation')
    console.log('   (with fresh data from setup)')
    console.log('========================================\n')

    // Now navigate to Step 7
    const step7Button = page.locator('aside nav button').filter({ hasText: /Step 7.*Priority/i }).first()
    await step7Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1500)

    console.log('🚀 IMPLEMENTATION ROADMAP\n')

    // Hover over metrics
    const govCard = page.locator('div.card').filter({ hasText: /Governance.*EDM/ }).first()
    await govCard.hover()
    if (DEMO_MODE) await page.waitForTimeout(1000)

    const mgmtCard = page.locator('div.card').filter({ hasText: /Management.*objectives enabled/ }).first()
    await mgmtCard.hover()
    if (DEMO_MODE) await page.waitForTimeout(1000)

    const priorityCard = page.locator('div.card').filter({ hasText: /High Priority/ }).first()
    await priorityCard.hover()
    console.log('   📊 Metrics: 5 EDM + 12 Management = 17 Total')
    if (DEMO_MODE) await page.waitForTimeout(1500)

    // Scroll through phases
    const phase1 = page.locator('div.bg-purple-50').first()
    await phase1.scrollIntoViewIfNeeded()
    await phase1.hover()
    console.log('   📍 Phase 1: Governance Foundation (5 objectives)')
    if (DEMO_MODE) await page.waitForTimeout(1800)

    const phase2 = page.locator('div.bg-red-50').first()
    await phase2.scrollIntoViewIfNeeded()
    await phase2.hover()
    console.log('   📍 Phase 2: High Priority Management (10 objectives)')
    if (DEMO_MODE) await page.waitForTimeout(1800)

    const phase3 = page.locator('div.bg-blue-50').first()
    await phase3.scrollIntoViewIfNeeded()
    await phase3.hover()
    console.log('   📍 Phase 3: Additional Objectives (2 objectives)\n')
    if (DEMO_MODE) await page.waitForTimeout(1800)

    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(1500)
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1000)
    }

    console.log('✅ Step 7 complete with setup!\n')
  })
})
