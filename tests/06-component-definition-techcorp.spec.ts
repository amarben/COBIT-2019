import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

// Toggle this for development (false) vs final demo video (true)
const DEMO_MODE = process.env.DEMO_MODE === 'true'

test.describe('TechCorp Financial - Step 6: Component Definition', () => {
  test('define governance components across 6 categories', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    // Only enable cursor tracking for demo mode
    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 6: Component Definition')
    console.log('   Defining 48 Governance Components')
    console.log('========================================\n')
    logSpeedConfig()

    // Load app WITHOUT clearing localStorage (preserve Steps 1-5 data)
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('⏳ App loaded')

    // Navigate to Component Definition
    console.log('📍 Navigating to Component Definition...\n')
    const step6Button = page.locator('aside nav button').filter({ hasText: /Step 6.*Component Definition/i }).first()
    await step6Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(500))

    console.log('🔧 GOVERNANCE COMPONENTS\n')
    console.log('   Defining components across 6 categories...\n')

    // Helper function to add a component
    const addComponent = async (type: string, name: string, description: string, status: string) => {
      // Select type
      const typeSelect = page.locator('select').first()
      await typeSelect.selectOption(type)
      if (DEMO_MODE) await page.waitForTimeout(wait(150))

      // Fill name
      const nameInput = page.locator('input[placeholder*="Component name"]')
      await nameInput.click()
      await nameInput.fill(name)
      if (DEMO_MODE) await page.waitForTimeout(wait(150))

      // Fill description
      const descInput = page.locator('textarea[placeholder*="Description"]')
      await descInput.click()
      await descInput.fill(description)
      if (DEMO_MODE) await page.waitForTimeout(wait(150))

      // Click Add button
      const addButton = page.locator('button').filter({ hasText: /Add/i }).first()
      await addButton.click()
      await page.waitForLoadState('networkidle')
      if (DEMO_MODE) await page.waitForTimeout(wait(200))

      // Update status if not 'planned'
      if (status !== 'planned') {
        // Wait for component to appear and find its status dropdown (the smaller select with text-xs)
        const componentCard = page.locator('div.bg-gray-50').filter({ hasText: name }).first()
        await componentCard.waitFor({ state: 'visible' })
        const statusSelect = componentCard.locator('select.text-xs').first()
        await statusSelect.selectOption(status)
        if (DEMO_MODE) await page.waitForTimeout(wait(150))
      }
    }

    // Category 1: Organizational Structures (5 components)
    console.log('   📊 Category 1: Organizational Structures')

    await addComponent('organizational-structures', 'IT Steering Committee',
      'Executive governance body for strategic IT decisions', 'completed')
    console.log('      ✅ IT Steering Committee (completed)')

    await addComponent('organizational-structures', 'Technology Risk Committee',
      'Oversight of IT-related risks and cybersecurity', 'completed')
    console.log('      ✅ Technology Risk Committee (completed)')

    await addComponent('organizational-structures', 'Architecture Review Board',
      'Technical governance for architecture decisions', 'completed')
    console.log('      ✅ Architecture Review Board (completed)')

    await addComponent('organizational-structures', 'Cloud Center of Excellence',
      'Cloud governance and enablement', 'in-progress')
    console.log('      ✅ Cloud Center of Excellence (in-progress)')

    await addComponent('organizational-structures', 'Security Operations Center',
      '24/7 security monitoring and response', 'completed')
    console.log('      ✅ Security Operations Center (completed)')

    // Category 2: Processes & Practices (4 components)
    console.log('\n   ⚙️  Category 2: Processes & Practices')

    await addComponent('processes', 'Strategic Planning Process',
      'Annual IT strategic planning aligned with business strategy', 'completed')
    console.log('      ✅ Strategic Planning Process (completed)')

    await addComponent('processes', 'Portfolio Management Process',
      'Portfolio intake, prioritization, and optimization', 'completed')
    console.log('      ✅ Portfolio Management Process (completed)')

    await addComponent('processes', 'Enterprise Risk Management',
      'IT risk identification, assessment, and mitigation', 'completed')
    console.log('      ✅ Enterprise Risk Management (completed)')

    await addComponent('processes', 'Incident Management Process',
      'Detect, respond, and resolve incidents (P1 SLA: 4 hours)', 'completed')
    console.log('      ✅ Incident Management Process (completed)')

    // Category 3: Information Flows (3 components)
    console.log('\n   📄 Category 3: Information Flows')

    await addComponent('information', 'Governance Dashboard',
      'Executive dashboard for governance metrics', 'completed')
    console.log('      ✅ Governance Dashboard (completed)')

    await addComponent('information', 'Risk Register and Heat Maps',
      'Consolidated IT risk register with monthly updates', 'completed')
    console.log('      ✅ Risk Register and Heat Maps (completed)')

    await addComponent('information', 'Portfolio Performance Reports',
      'Portfolio health, budget, schedule, benefits tracking', 'completed')
    console.log('      ✅ Portfolio Performance Reports (completed)')

    // Category 4: Culture & Behavior (4 components)
    console.log('\n   🌟 Category 4: Culture & Behavior')

    await addComponent('culture', 'IT Code of Conduct',
      'Ethical standards for IT personnel with annual training', 'completed')
    console.log('      ✅ IT Code of Conduct (completed)')

    await addComponent('culture', 'Cybersecurity Awareness Program',
      'Monthly phishing simulations, quarterly security training', 'completed')
    console.log('      ✅ Cybersecurity Awareness Program (completed)')

    await addComponent('culture', 'Innovation Culture Program',
      'Hackathons, innovation time, idea portal', 'in-progress')
    console.log('      ✅ Innovation Culture Program (in-progress)')

    await addComponent('culture', 'Continuous Improvement Mindset',
      'Kaizen culture, retrospectives, blameless post-mortems', 'in-progress')
    console.log('      ✅ Continuous Improvement Mindset (in-progress)')

    // Category 5: Skills & Competencies (4 components)
    console.log('\n   🎓 Category 5: Skills & Competencies')

    await addComponent('skills', 'IT Competency Framework',
      'Role-based competency definitions for 45 IT job families', 'in-progress')
    console.log('      ✅ IT Competency Framework (in-progress)')

    await addComponent('skills', 'Technical Skills Training',
      '$2M annual budget - Cloud, DevOps, security, data skills', 'completed')
    console.log('      ✅ Technical Skills Training (completed)')

    await addComponent('skills', 'Leadership Development Program',
      'IT leadership pipeline - 50 IT managers in program', 'completed')
    console.log('      ✅ Leadership Development Program (completed)')

    await addComponent('skills', 'Agile and DevOps Coaching',
      '5 agile coaches supporting agile transformation', 'completed')
    console.log('      ✅ Agile and DevOps Coaching (completed)')

    // Category 6: Services & Infrastructure (5 components)
    console.log('\n   💻 Category 6: Services & Infrastructure')

    await addComponent('services', 'ServiceNow GRC Platform',
      'Integrated GRC tool - Risk, Compliance, Policy, Audit', 'completed')
    console.log('      ✅ ServiceNow GRC Platform (completed)')

    await addComponent('services', 'ServiceNow ITSM Platform',
      'Service desk, incident, change, problem management', 'completed')
    console.log('      ✅ ServiceNow ITSM Platform (completed)')

    await addComponent('services', 'Splunk Enterprise Security',
      'Security monitoring, 500+ log sources, 75 searches', 'completed')
    console.log('      ✅ Splunk Enterprise Security (completed)')

    await addComponent('services', 'Cloud Management Platform',
      'CloudHealth - Multi-cloud governance, cost management', 'in-progress')
    console.log('      ✅ Cloud Management Platform (in-progress)')

    await addComponent('services', 'Enterprise Architecture Tool',
      'LeanIX - Architecture repository and modeling', 'in-progress')
    console.log('      ✅ Enterprise Architecture Tool (in-progress)')

    // Scroll to top to show summary (demo mode only)
    if (DEMO_MODE) {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(wait(800))
    }

    // Save components
    console.log('\n💾 Saving component definitions...')
    const saveButton = page.getByRole('button', { name: /Save Components/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(500))

    console.log('✅ Components saved!\n')
    console.log('📊 SUMMARY:')
    console.log('   • 25 governance components defined')
    console.log('   • Organizational Structures: 5 | Processes: 4')
    console.log('   • Information Flows: 3 | Culture: 4')
    console.log('   • Skills: 4 | Services: 5')
    console.log('   • 18 completed, 7 in-progress\n')

    // Navigate to dashboard to show completion (demo mode only)
    if (DEMO_MODE) {
      await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(wait(1000))
    }

    console.log('🎉 Step 6 complete - Governance components defined!\n')
  })
})
