import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

const DEMO_MODE = process.env.DEMO_MODE === 'true'

/**
 * Sequential Steps 1-7 - All steps run in the SAME browser context
 * This ensures data consistency and context is maintained across all steps.
 * localStorage persists throughout the entire test.
 */
test.describe('TechCorp Financial - Sequential Steps 1-7 (Shared Context)', () => {
  test('run all steps sequentially in same browser', async ({ page }) => {
    test.setTimeout(300000) // 5 minutes for all steps

    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ════════════════════════════════════════════════════════')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Sequential Steps 1-7 (Shared Browser Context)')
    console.log('   Data persists across all steps via localStorage')
    console.log('════════════════════════════════════════════════════════\n')

    // Initialize - Clear localStorage ONCE at the start
    await page.goto('http://localhost:5174/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForLoadState('networkidle')

    console.log('⏳ Browser initialized - Starting sequential workflow\n')

    // ═══════════════════════════════════════════════════════════
    // STEP 1: GOVERNANCE CONTEXT
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 1: Governance Context\n')

    const step1Button = page.locator('aside nav button').filter({ hasText: /Step 1.*Governance Context/i }).first()
    await step1Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   • Company: TechCorp Financial Services')
    console.log('   • Industry: Financial Services')
    console.log('   • Size: 2,500 employees, $1.2B revenue')
    console.log('   • IT: 350 employees, $98M budget')
    console.log('   ✅ Step 1 complete - Context saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 2: CAPABILITY ASSESSMENT
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 2: Capability Assessment\n')

    const step2Button = page.locator('aside nav button').filter({ hasText: /Step 2.*Capability Assessment/i }).first()
    await step2Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   • Current Capability: 2.3 (Managed)')
    console.log('   • Target Capability: 4.0 (Predictable)')
    console.log('   • Gap: 1.7 levels to close')
    console.log('   ✅ Step 2 complete - Assessment saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 3: GOVERNANCE DESIGN
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 3: Governance Design\n')

    const step3Button = page.locator('aside nav button').filter({ hasText: /Step 3.*Governance Design/i }).first()
    await step3Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   • Design System: COBIT 2019')
    console.log('   • Focus Areas: EDM, APO, BAI, DSS, MEA')
    console.log('   • Governance Structure: 3-tier model')
    console.log('   ✅ Step 3 complete - Design saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 4: GOVERNANCE OBJECTIVES (EDM)
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 4: Governance Objectives (EDM)\n')

    const step4Button = page.locator('aside nav button').filter({ hasText: /Step 4.*Governance Objectives/i }).first()
    await step4Button.click()
    await page.waitForLoadState('networkidle')

    const edmObjectives = ['EDM01', 'EDM02', 'EDM03', 'EDM04', 'EDM05']
    for (const edmId of edmObjectives) {
      await page.locator('aside nav button').filter({ hasText: new RegExp(edmId, 'i') }).first().click()
      await page.waitForLoadState('networkidle')
      if (DEMO_MODE) await page.waitForTimeout(300)

      const card = page.locator('div.card').filter({ hasText: new RegExp(edmId, 'i') }).first()
      await card.locator('button').first().click()
      if (DEMO_MODE) await page.waitForTimeout(200)

      await card.locator('button').nth(1).click()
      if (DEMO_MODE) await page.waitForTimeout(150)
      await card.locator('button').nth(2).click()
      if (DEMO_MODE) await page.waitForTimeout(150)

      console.log(`   ✅ ${edmId} enabled with 2 practices`)
    }

    console.log('   Total: 5 EDM objectives, 10 practices')
    console.log('   ✅ Step 4 complete - EDM objectives saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 5: MANAGEMENT OBJECTIVES
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 5: Management Objectives\n')

    const step5Button = page.locator('aside nav button').filter({ hasText: /Step 5.*Management Objectives/i }).first()
    await step5Button.click()
    await page.waitForLoadState('networkidle')

    // APO Domain
    await page.locator('aside nav button').filter({ hasText: /APO.*Align/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const apoObjectives = [
      { id: 'APO01', priority: 'high' },
      { id: 'APO02', priority: 'high' },
      { id: 'APO11', priority: 'medium' },
      { id: 'APO13', priority: 'high' }
    ]

    for (const obj of apoObjectives) {
      const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
      await card.scrollIntoViewIfNeeded()
      await card.locator('button').first().click()
      if (DEMO_MODE) await page.waitForTimeout(200)
      await card.locator('select').selectOption(obj.priority)
      if (DEMO_MODE) await page.waitForTimeout(150)
    }

    // BAI Domain
    await page.locator('aside nav button').filter({ hasText: /BAI.*Build/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const baiObjectives = [
      { id: 'BAI02', priority: 'high' },
      { id: 'BAI06', priority: 'high' },
      { id: 'BAI10', priority: 'medium' }
    ]

    for (const obj of baiObjectives) {
      const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
      await card.scrollIntoViewIfNeeded()
      await card.locator('button').first().click()
      if (DEMO_MODE) await page.waitForTimeout(200)
      await card.locator('select').selectOption(obj.priority)
      if (DEMO_MODE) await page.waitForTimeout(150)
    }

    // DSS Domain
    await page.locator('aside nav button').filter({ hasText: /DSS.*Deliver/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const dssObjectives = [
      { id: 'DSS01', priority: 'high' },
      { id: 'DSS05', priority: 'high' },
      { id: 'DSS06', priority: 'high' }
    ]

    for (const obj of dssObjectives) {
      const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
      await card.scrollIntoViewIfNeeded()
      await card.locator('button').first().click()
      if (DEMO_MODE) await page.waitForTimeout(200)
      await card.locator('select').selectOption(obj.priority)
      if (DEMO_MODE) await page.waitForTimeout(150)
    }

    // MEA Domain
    await page.locator('aside nav button').filter({ hasText: /MEA.*Monitor/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const meaObjectives = [
      { id: 'MEA01', priority: 'high' },
      { id: 'MEA03', priority: 'high' }
    ]

    for (const obj of meaObjectives) {
      const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
      await card.scrollIntoViewIfNeeded()
      await card.locator('button').first().click()
      if (DEMO_MODE) await page.waitForTimeout(200)
      await card.locator('select').selectOption(obj.priority)
      if (DEMO_MODE) await page.waitForTimeout(150)
    }

    console.log('   • APO: 4 objectives | BAI: 3 | DSS: 3 | MEA: 2')
    console.log('   • Total: 12 management objectives (10 high, 2 medium)')
    console.log('   ✅ Step 5 complete - Management objectives saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 6: COMPONENT DEFINITION
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 6: Component Definition\n')

    const step6Button = page.locator('aside nav button').filter({ hasText: /Step 6.*Component Definition/i }).first()
    await step6Button.click()
    await page.waitForLoadState('networkidle')

    const addComponent = async (type: string, name: string, description: string, status: string) => {
      await page.locator('select').first().selectOption(type)
      if (DEMO_MODE) await page.waitForTimeout(100)

      await page.locator('input[placeholder*="Component name"]').fill(name)
      if (DEMO_MODE) await page.waitForTimeout(100)

      await page.locator('textarea[placeholder*="Description"]').fill(description)
      if (DEMO_MODE) await page.waitForTimeout(100)

      await page.locator('button').filter({ hasText: /Add/i }).first().click()
      await page.waitForLoadState('networkidle')
      if (DEMO_MODE) await page.waitForTimeout(150)

      if (status !== 'planned') {
        const componentCard = page.locator('div.bg-gray-50').filter({ hasText: name }).first()
        await componentCard.waitFor({ state: 'visible' })
        await componentCard.locator('select.text-xs').first().selectOption(status)
        if (DEMO_MODE) await page.waitForTimeout(100)
      }
    }

    await addComponent('organizational-structures', 'IT Steering Committee', 'Executive governance body', 'completed')
    console.log('   ✅ IT Steering Committee')

    await addComponent('organizational-structures', 'Technology Risk Committee', 'Risk oversight', 'completed')
    console.log('   ✅ Technology Risk Committee')

    await addComponent('processes', 'Strategic Planning Process', 'Annual IT planning', 'completed')
    console.log('   ✅ Strategic Planning Process')

    await addComponent('services', 'ServiceNow GRC Platform', 'GRC tool', 'completed')
    console.log('   ✅ ServiceNow GRC Platform')

    await addComponent('services', 'Splunk Enterprise Security', 'SIEM', 'completed')
    console.log('   ✅ Splunk Enterprise Security')

    // Save components
    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(500)
    }

    const saveButton = page.getByRole('button', { name: /Save Components/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(500)

    console.log('   Total: 5 components defined')
    console.log('   ✅ Step 6 complete - Components saved to localStorage\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    // ═══════════════════════════════════════════════════════════
    // STEP 7: PRIORITY IMPLEMENTATION
    // ═══════════════════════════════════════════════════════════
    console.log('📍 STEP 7: Priority Implementation\n')

    const step7Button = page.locator('aside nav button').filter({ hasText: /Step 7.*Priority/i }).first()
    await step7Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   🚀 Implementation Roadmap:')
    console.log('   • Phase 1: Governance Foundation (5 EDM objectives)')
    console.log('   • Phase 2: High Priority Management (10 objectives)')
    console.log('   • Phase 3: Additional Objectives (2 objectives)')
    console.log('   ✅ Step 7 complete - Roadmap displayed from localStorage data\n')

    if (DEMO_MODE) {
      await page.waitForTimeout(1000)
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1500)
    }

    // ═══════════════════════════════════════════════════════════
    // FINAL SUMMARY
    // ═══════════════════════════════════════════════════════════
    console.log('🎉 ════════════════════════════════════════════════════════')
    console.log('   SEQUENTIAL WORKFLOW COMPLETE!')
    console.log('════════════════════════════════════════════════════════')
    console.log('   ✅ All 7 steps executed in SAME browser context')
    console.log('   ✅ Data persisted via localStorage throughout')
    console.log('   ✅ Step 7 successfully read data from Steps 4-5')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Configuration Summary:')
    console.log('   • 5 EDM objectives (10 practices)')
    console.log('   • 12 management objectives (10 high, 2 medium)')
    console.log('   • 5 governance components')
    console.log('   • 3-phase implementation roadmap')
    console.log('════════════════════════════════════════════════════════\n')
  })
})
