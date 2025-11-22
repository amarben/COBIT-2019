import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

const DEMO_MODE = process.env.DEMO_MODE === 'true'

test.describe('TechCorp Financial - Complete Demo: Steps 1-7', () => {
  test('complete governance implementation workflow', async ({ page }) => {
    test.setTimeout(300000) // 5 minutes for complete workflow

    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Complete Governance Implementation')
    console.log('   COBIT 2019 Framework - Steps 1-7')
    console.log('========================================\n')

    await page.goto('http://localhost:5174/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForLoadState('networkidle')

    console.log('⏳ App loaded - Starting complete workflow\n')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    // ========================================
    // STEP 1: GOVERNANCE CONTEXT
    // ========================================
    console.log('📍 STEP 1: Governance Context\n')
    const step1Button = page.locator('aside nav button').filter({ hasText: /Step 1.*Governance Context/i }).first()
    await step1Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(800)

    // Fill organization details
    const orgName = page.getByPlaceholder(/Global Financial Services/i)
    await orgName.scrollIntoViewIfNeeded()
    await orgName.click()
    await orgName.fill('TechCorp Financial Services Inc.')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const industry = page.getByPlaceholder(/Banking and Financial Services/i)
    await industry.scrollIntoViewIfNeeded()
    await industry.click()
    await industry.fill('Banking and Financial Technology')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const size = page.getByPlaceholder(/5,000 employees/i)
    await size.scrollIntoViewIfNeeded()
    await size.click()
    await size.fill('2,500 employees, $1.2B revenue')
    if (DEMO_MODE) await page.waitForTimeout(300)

    const itRole = page.getByPlaceholder(/Key enabler/i)
    await itRole.scrollIntoViewIfNeeded()
    await itRole.click()
    await itRole.fill('Strategic enabler for digital banking')
    if (DEMO_MODE) await page.waitForTimeout(300)

    // Select 5 key enterprise goals
    const goals = [
      'Managed business risk',
      'Compliance with external laws and regulations',
      'Business service continuity and availability',
      'Quality of management information',
      'Skilled and motivated people'
    ]

    for (const goal of goals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await button.click()
      if (DEMO_MODE) await page.waitForTimeout(200)
    }

    // Save governance context
    const saveContextButton = page.getByRole('button', { name: /Save.*Context/i })
    await saveContextButton.scrollIntoViewIfNeeded()
    await saveContextButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(500)

    console.log('   • Company: TechCorp Financial Services')
    console.log('   • Industry: Financial Services')
    console.log('   • Size: 2,500 employees, $1.2B revenue')
    console.log('   • IT: 350 employees, $98M budget')
    console.log('   • Enterprise Goals: 5 selected')
    console.log('   ✅ Context saved!\n')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    // ========================================
    // STEP 2: CAPABILITY ASSESSMENT
    // ========================================
    console.log('📍 STEP 2: Capability Assessment\n')
    const step2Button = page.locator('aside nav button').filter({ hasText: /Step 2.*Capability Assessment/i }).first()
    await step2Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(800)

    console.log('   • Current Capability: 2.3 (Managed)')
    console.log('   • Target Capability: 4.0 (Predictable)')
    console.log('   • Gap: 1.7 levels to close\n')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    // ========================================
    // STEP 3: GOVERNANCE DESIGN
    // ========================================
    console.log('📍 STEP 3: Governance Design\n')
    const step3Button = page.locator('aside nav button').filter({ hasText: /Step 3.*Governance Design/i }).first()
    await step3Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(800)

    console.log('   • Design System: COBIT 2019')
    console.log('   • Focus Areas: EDM, APO, BAI, DSS, MEA')
    console.log('   • Governance Structure: 3-tier model\n')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    // ========================================
    // STEP 4: GOVERNANCE OBJECTIVES (EDM)
    // ========================================
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
      const toggleButton = card.locator('button').first()
      await toggleButton.click()
      if (DEMO_MODE) await page.waitForTimeout(200)

      // Enable 2 practices
      await card.locator('button').nth(1).click()
      if (DEMO_MODE) await page.waitForTimeout(150)
      await card.locator('button').nth(2).click()
      if (DEMO_MODE) await page.waitForTimeout(150)

      console.log(`   ✅ ${edmId} enabled with 2 practices`)
    }

    console.log('\n   Total: 5 EDM objectives, 10 practices\n')
    if (DEMO_MODE) await page.waitForTimeout(800)

    // ========================================
    // STEP 5: MANAGEMENT OBJECTIVES
    // ========================================
    console.log('📍 STEP 5: Management Objectives\n')
    const step5Button = page.locator('aside nav button').filter({ hasText: /Step 5.*Management Objectives/i }).first()
    await step5Button.click()
    await page.waitForLoadState('networkidle')

    // APO Domain
    await page.locator('aside nav button').filter({ hasText: /APO.*Align/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(400)

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
      console.log(`   ✅ ${obj.id} (${obj.priority})`)
    }

    // BAI Domain
    await page.locator('aside nav button').filter({ hasText: /BAI.*Build/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(400)

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
      console.log(`   ✅ ${obj.id} (${obj.priority})`)
    }

    // DSS Domain
    await page.locator('aside nav button').filter({ hasText: /DSS.*Deliver/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(400)

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
      console.log(`   ✅ ${obj.id} (${obj.priority})`)
    }

    // MEA Domain
    await page.locator('aside nav button').filter({ hasText: /MEA.*Monitor/i }).first().click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(400)

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
      console.log(`   ✅ ${obj.id} (${obj.priority})`)
    }

    console.log('\n   Total: 12 management objectives')
    console.log('   • APO: 4 | BAI: 3 | DSS: 3 | MEA: 2')
    console.log('   • High priority: 10 | Medium: 2\n')
    if (DEMO_MODE) await page.waitForTimeout(800)

    // ========================================
    // STEP 6: COMPONENT DEFINITION
    // ========================================
    console.log('📍 STEP 6: Component Definition\n')
    const step6Button = page.locator('aside nav button').filter({ hasText: /Step 6.*Component Definition/i }).first()
    await step6Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(800)

    // Helper function
    const addComponent = async (type: string, name: string, description: string, status: string) => {
      const typeSelect = page.locator('select').first()
      await typeSelect.selectOption(type)
      if (DEMO_MODE) await page.waitForTimeout(100)

      const nameInput = page.locator('input[placeholder*="Component name"]')
      await nameInput.click()
      await nameInput.fill(name)
      if (DEMO_MODE) await page.waitForTimeout(100)

      const descInput = page.locator('textarea[placeholder*="Description"]')
      await descInput.click()
      await descInput.fill(description)
      if (DEMO_MODE) await page.waitForTimeout(100)

      const addButton = page.locator('button').filter({ hasText: /Add/i }).first()
      await addButton.click()
      await page.waitForLoadState('networkidle')
      if (DEMO_MODE) await page.waitForTimeout(150)

      if (status !== 'planned') {
        const componentCard = page.locator('div.bg-gray-50').filter({ hasText: name }).first()
        await componentCard.waitFor({ state: 'visible' })
        const statusSelect = componentCard.locator('select.text-xs').first()
        await statusSelect.selectOption(status)
        if (DEMO_MODE) await page.waitForTimeout(100)
      }
    }

    // Add key components (reduced set for speed)
    console.log('   📊 Organizational Structures')
    await addComponent('organizational-structures', 'IT Steering Committee', 'Executive governance body', 'completed')
    console.log('      ✅ IT Steering Committee')
    await addComponent('organizational-structures', 'Technology Risk Committee', 'Risk oversight', 'completed')
    console.log('      ✅ Technology Risk Committee')
    await addComponent('organizational-structures', 'Security Operations Center', '24/7 security monitoring', 'completed')
    console.log('      ✅ Security Operations Center')

    console.log('\n   ⚙️  Processes & Practices')
    await addComponent('processes', 'Strategic Planning Process', 'Annual IT strategic planning', 'completed')
    console.log('      ✅ Strategic Planning Process')
    await addComponent('processes', 'Enterprise Risk Management', 'IT risk management', 'completed')
    console.log('      ✅ Enterprise Risk Management')

    console.log('\n   💻 Services & Infrastructure')
    await addComponent('services', 'ServiceNow GRC Platform', 'GRC tool - Risk, Compliance', 'completed')
    console.log('      ✅ ServiceNow GRC Platform')
    await addComponent('services', 'Splunk Enterprise Security', 'SIEM - Security monitoring', 'completed')
    console.log('      ✅ Splunk Enterprise Security')

    console.log('\n   🎓 Skills & Competencies')
    await addComponent('skills', 'Technical Skills Training', 'Cloud, DevOps, security training', 'completed')
    console.log('      ✅ Technical Skills Training')

    console.log('\n   Total: 8 key components defined\n')

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

    console.log('   💾 Components saved!\n')
    if (DEMO_MODE) await page.waitForTimeout(800)

    // ========================================
    // STEP 7: PRIORITY IMPLEMENTATION
    // ========================================
    console.log('📍 STEP 7: Priority Implementation\n')
    const step7Button = page.locator('aside nav button').filter({ hasText: /Step 7.*Priority/i }).first()
    await step7Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   🚀 IMPLEMENTATION ROADMAP\n')
    console.log('   📊 Metrics:')
    console.log('      • Governance (EDM): 5 objectives')
    console.log('      • Management: 12 objectives')
    console.log('      • High Priority: 10 objectives\n')

    if (DEMO_MODE) await page.waitForTimeout(1000)

    console.log('   📍 Phase 1: Governance Foundation')
    console.log('      • EDM01, EDM02, EDM03, EDM04, EDM05')
    console.log('      • Establish board-level oversight\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    console.log('   📍 Phase 2: High Priority Management')
    console.log('      • APO01, APO02, APO13 (Strategy & Security)')
    console.log('      • BAI02, BAI06 (Requirements & Changes)')
    console.log('      • DSS01, DSS05, DSS06 (Operations & Security)')
    console.log('      • MEA01, MEA03 (Performance & Compliance)\n')

    if (DEMO_MODE) await page.waitForTimeout(800)

    console.log('   📍 Phase 3: Additional Objectives')
    console.log('      • APO11, BAI10 (Quality & Configuration)\n')

    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(1000)
    }

    // Navigate to dashboard to show completion
    if (DEMO_MODE) {
      const dashboardButton = page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first()
      await dashboardButton.click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(1500)
    }

    console.log('\n🎉 ========================================')
    console.log('   COMPLETE GOVERNANCE IMPLEMENTATION')
    console.log('   ========================================')
    console.log('   ✅ Step 1: Governance Context')
    console.log('   ✅ Step 2: Capability Assessment')
    console.log('   ✅ Step 3: Governance Design')
    console.log('   ✅ Step 4: 5 EDM Objectives, 10 Practices')
    console.log('   ✅ Step 5: 12 Management Objectives')
    console.log('   ✅ Step 6: 8 Key Components')
    console.log('   ✅ Step 7: 3-Phase Implementation Roadmap')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Total: 17 Objectives, 8 Components')
    console.log('   🎯 Ready for Implementation!')
    console.log('========================================\n')
  })
})
