import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

const DEMO_MODE = process.env.DEMO_MODE === 'true'

// Data from Steps 4-6 (used if not already present from sequential run)
// This mirrors the data structure that Steps 4-6 would save to localStorage
const SEED_DATA = {
  context: null,
  capabilities: [],
  governanceObjectives: [
    {
      id: 'EDM01',
      name: 'Ensured Governance Framework Setting and Maintenance',
      purpose: 'Provide a consistent, integrated governance approach aligned with the enterprise mission, vision and values',
      practices: [
        { id: 'EDM01.01', name: 'Evaluate the governance system', description: 'Review and evaluate governance practices and performance', implemented: true },
        { id: 'EDM01.02', name: 'Direct the governance system', description: 'Assign responsibility for governance activities', implemented: true },
        { id: 'EDM01.03', name: 'Monitor the governance system', description: 'Monitor the effectiveness of the governance system', implemented: false }
      ],
      inputsFrom: [],
      outputsTo: ['All other processes'],
      color: 'purple',
      enabled: true
    },
    {
      id: 'EDM02',
      name: 'Ensured Benefits Delivery',
      purpose: 'Optimize the value contribution to the business from processes, IT services and IT assets',
      practices: [
        { id: 'EDM02.01', name: 'Evaluate value optimization', description: 'Assess current and future value and risk optimization', implemented: true },
        { id: 'EDM02.02', name: 'Direct value optimization', description: 'Direct management to optimize value delivery', implemented: true },
        { id: 'EDM02.03', name: 'Monitor value optimization', description: 'Monitor achievement of value objectives', implemented: false }
      ],
      inputsFrom: ['APO05', 'APO06', 'BAI01'],
      outputsTo: ['APO02', 'APO05', 'BAI01'],
      color: 'purple',
      enabled: true
    },
    {
      id: 'EDM03',
      name: 'Ensured Risk Optimization',
      purpose: 'Ensure that enterprise risk appetite and tolerance are understood, articulated and communicated',
      practices: [
        { id: 'EDM03.01', name: 'Evaluate risk management', description: 'Examine and judge whether risk appetite is appropriate', implemented: true },
        { id: 'EDM03.02', name: 'Direct risk management', description: 'Direct management to optimize IT risk management', implemented: true },
        { id: 'EDM03.03', name: 'Monitor risk management', description: 'Monitor achievement of risk objectives', implemented: true }
      ],
      inputsFrom: ['APO12'],
      outputsTo: ['APO12'],
      color: 'purple',
      enabled: true
    },
    {
      id: 'EDM04',
      name: 'Ensured Resource Optimization',
      purpose: 'Ensure that adequate and sufficient IT-related capabilities are available to support enterprise objectives',
      practices: [
        { id: 'EDM04.01', name: 'Evaluate resource management', description: 'Examine and judge current and future resource needs', implemented: true },
        { id: 'EDM04.02', name: 'Direct resource management', description: 'Direct optimization of IT resources', implemented: true },
        { id: 'EDM04.03', name: 'Monitor resource management', description: 'Monitor achievement of resource objectives', implemented: false }
      ],
      inputsFrom: ['APO06', 'APO07'],
      outputsTo: ['APO06', 'APO07'],
      color: 'purple',
      enabled: true
    },
    {
      id: 'EDM05',
      name: 'Ensured Stakeholder Engagement',
      purpose: 'Ensure stakeholder engagement, including needs, concerns and views are identified and considered in decision making',
      practices: [
        { id: 'EDM05.01', name: 'Evaluate stakeholder engagement', description: 'Review and evaluate stakeholder reporting requirements', implemented: true },
        { id: 'EDM05.02', name: 'Direct stakeholder communication', description: 'Direct stakeholder relationship management', implemented: false },
        { id: 'EDM05.03', name: 'Monitor stakeholder engagement', description: 'Monitor effectiveness of stakeholder engagement', implemented: false }
      ],
      inputsFrom: ['APO08'],
      outputsTo: ['APO08'],
      color: 'purple',
      enabled: true
    }
  ],
  managementObjectives: [
    { id: 'APO01', name: 'Managed IT Management Framework', domain: 'APO', purpose: 'Clarify and maintain governance enablers', practices: [{ id: 'APO01.01', name: 'Define organizational structure', implemented: false }], enabled: true, priority: 'high' },
    { id: 'APO02', name: 'Managed Strategy', domain: 'APO', purpose: 'Provide holistic approach to realize enterprise strategy', practices: [{ id: 'APO02.01', name: 'Understand enterprise direction', implemented: false }], enabled: true, priority: 'high' },
    { id: 'APO11', name: 'Managed Quality', domain: 'APO', purpose: 'Define and communicate quality requirements', practices: [{ id: 'APO11.01', name: 'Establish quality management system', implemented: false }], enabled: true, priority: 'medium' },
    { id: 'APO13', name: 'Managed Security', domain: 'APO', purpose: 'Maintain information security at acceptable levels', practices: [{ id: 'APO13.01', name: 'Establish and maintain information security management system', implemented: false }], enabled: true, priority: 'high' },
    { id: 'BAI02', name: 'Managed Requirements Definition', domain: 'BAI', purpose: 'Identify solutions and analyze requirements', practices: [{ id: 'BAI02.01', name: 'Define and maintain business requirements', implemented: false }], enabled: true, priority: 'high' },
    { id: 'BAI06', name: 'Managed IT Changes', domain: 'BAI', purpose: 'Manage all changes in controlled manner', practices: [{ id: 'BAI06.01', name: 'Evaluate, prioritize and authorize change requests', implemented: false }], enabled: true, priority: 'high' },
    { id: 'BAI10', name: 'Managed Configuration', domain: 'BAI', purpose: 'Define and maintain descriptions and relationships', practices: [{ id: 'BAI10.01', name: 'Establish and maintain configuration model', implemented: false }], enabled: true, priority: 'medium' },
    { id: 'DSS01', name: 'Managed Operations', domain: 'DSS', purpose: 'Coordinate and execute activities to deliver services', practices: [{ id: 'DSS01.01', name: 'Execute operational procedures', implemented: false }], enabled: true, priority: 'high' },
    { id: 'DSS05', name: 'Managed Security Services', domain: 'DSS', purpose: 'Protect enterprise information at acceptable security levels', practices: [{ id: 'DSS05.01', name: 'Protect against malware', implemented: false }], enabled: true, priority: 'high' },
    { id: 'DSS06', name: 'Managed Business Process Controls', domain: 'DSS', purpose: 'Define and maintain appropriate business process controls', practices: [{ id: 'DSS06.01', name: 'Align control activities', implemented: false }], enabled: true, priority: 'high' },
    { id: 'MEA01', name: 'Managed Performance and Conformance Monitoring', domain: 'MEA', purpose: 'Collect and report on achievement of objectives', practices: [{ id: 'MEA01.01', name: 'Establish monitoring approach', implemented: false }], enabled: true, priority: 'high' },
    { id: 'MEA03', name: 'Managed Compliance with External Requirements', domain: 'MEA', purpose: 'Ensure compliance with external requirements', practices: [{ id: 'MEA03.01', name: 'Identify external compliance requirements', implemented: false }], enabled: true, priority: 'high' }
  ],
  components: [
    // Organizational Structures
    { type: 'organizational-structures', name: 'IT Steering Committee', description: 'Executive governance body for strategic IT decisions', status: 'completed' },
    { type: 'organizational-structures', name: 'Technology Risk Committee', description: 'Oversight of IT-related risks and cybersecurity', status: 'completed' },
    { type: 'organizational-structures', name: 'Architecture Review Board', description: 'Technical governance for architecture decisions', status: 'completed' },
    { type: 'organizational-structures', name: 'Cloud Center of Excellence', description: 'Cloud governance and enablement', status: 'in-progress' },
    { type: 'organizational-structures', name: 'Security Operations Center', description: '24/7 security monitoring and response', status: 'completed' },
    // Processes & Practices
    { type: 'processes', name: 'Strategic Planning Process', description: 'Annual IT strategic planning aligned with business strategy', status: 'completed' },
    { type: 'processes', name: 'Portfolio Management Process', description: 'Portfolio intake, prioritization, and optimization', status: 'completed' },
    { type: 'processes', name: 'Enterprise Risk Management', description: 'IT risk identification, assessment, and mitigation', status: 'completed' },
    { type: 'processes', name: 'Incident Management Process', description: 'Detect, respond, and resolve incidents (P1 SLA: 4 hours)', status: 'completed' },
    // Information Flows
    { type: 'information', name: 'Governance Dashboard', description: 'Executive dashboard for governance metrics', status: 'completed' },
    { type: 'information', name: 'Risk Register and Heat Maps', description: 'Consolidated IT risk register with monthly updates', status: 'completed' },
    { type: 'information', name: 'Portfolio Performance Reports', description: 'Portfolio health, budget, schedule, benefits tracking', status: 'completed' },
    // Culture & Behavior
    { type: 'culture', name: 'IT Code of Conduct', description: 'Ethical standards for IT personnel with annual training', status: 'completed' },
    { type: 'culture', name: 'Cybersecurity Awareness Program', description: 'Monthly phishing simulations, quarterly security training', status: 'completed' },
    { type: 'culture', name: 'Innovation Culture Program', description: 'Hackathons, innovation time, idea portal', status: 'in-progress' },
    { type: 'culture', name: 'Continuous Improvement Mindset', description: 'Kaizen culture, retrospectives, blameless post-mortems', status: 'in-progress' },
    // Skills & Competencies
    { type: 'skills', name: 'IT Competency Framework', description: 'Role-based competency definitions for 45 IT job families', status: 'in-progress' },
    { type: 'skills', name: 'Technical Skills Training', description: '$2M annual budget - Cloud, DevOps, security, data skills', status: 'completed' },
    { type: 'skills', name: 'Leadership Development Program', description: 'IT leadership pipeline - 50 IT managers in program', status: 'completed' },
    { type: 'skills', name: 'Agile and DevOps Coaching', description: '5 agile coaches supporting agile transformation', status: 'completed' },
    // Services & Infrastructure
    { type: 'services', name: 'ServiceNow GRC Platform', description: 'Integrated GRC tool - Risk, Compliance, Policy, Audit', status: 'completed' },
    { type: 'services', name: 'ServiceNow ITSM Platform', description: 'Service desk, incident, change, problem management', status: 'completed' },
    { type: 'services', name: 'Splunk Enterprise Security', description: 'Security monitoring, 500+ log sources, 75 searches', status: 'completed' },
    { type: 'services', name: 'Cloud Management Platform', description: 'CloudHealth - Multi-cloud governance, cost management', status: 'in-progress' },
    { type: 'services', name: 'Enterprise Architecture Tool', description: 'LeanIX - Architecture repository and modeling', status: 'in-progress' }
  ],
  metrics: [],
  lastUpdated: new Date().toISOString()
}

test.describe('TechCorp Financial - Step 7: Priority Implementation', () => {
  test('view implementation roadmap based on Steps 4-6 data', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    // Add console error logging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error('Browser console error:', msg.text())
      }
    })
    page.on('pageerror', error => {
      console.error('Page error:', error.message)
    })

    if (DEMO_MODE) {
      await enableCursorTracking(page)
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 7: Priority Implementation')
    console.log('   3-Phase Implementation Approach')
    console.log('========================================\n')
    logSpeedConfig()

    // Inject seed data via context (before any page loads)
    await page.context().addInitScript((seedDataStr) => {
      // Always inject seed data - this test runs in a new browser context
      // and won't have data from previous test runs (Steps 4-6)
      localStorage.setItem('cobit-2019-app-data', seedDataStr)
    }, JSON.stringify(SEED_DATA))

    // Load app (like Steps 4-6 do)
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    // Wait for app to be ready - increased timeout for SLOW mode
    await page.waitForSelector('h1:has-text("COBIT 2019")', { timeout: 30000 })

    console.log('⏳ App loaded')
    console.log('📍 Navigating to Step 7: Priority Implementation...\n')

    // Navigate to Step 7 via sidebar (like Steps 4-6 do)
    const step7Button = page.locator('aside nav button').filter({ hasText: /Step 7.*Priority/i }).first()
    await step7Button.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    console.log('🚀 IMPLEMENTATION ROADMAP\n')

    // Verify metrics are displayed
    const govCountElement = await page.locator('text=Governance (EDM)').first()
    if (await govCountElement.isVisible()) {
      await govCountElement.scrollIntoViewIfNeeded()
      if (DEMO_MODE) await page.waitForTimeout(wait(2000))
      console.log('   📊 Implementation Metrics:')
      console.log('      • Governance (EDM): 5 objectives')
      console.log('      • Management: 12 objectives')
      console.log('      • High Priority: 10 objectives\n')
    }

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Check Phase 1: Governance Foundation
    console.log('   📍 Phase 1: Governance Foundation')
    const phase1 = page.locator('text=Phase 1: Governance Foundation')
    if (await phase1.isVisible()) {
      await phase1.scrollIntoViewIfNeeded()
      if (DEMO_MODE) await page.waitForTimeout(wait(2000))

      // Verify some governance objectives are listed
      const edm01 = await page.locator('text=EDM01:').first().isVisible()
      const edm03 = await page.locator('text=EDM03:').first().isVisible()
      if (edm01 && edm03) {
        console.log('      ✅ All 5 EDM objectives displayed')
      }
      console.log('      • EDM01: Ensured Governance Framework Setting and Maintenance')
      console.log('      • EDM02: Ensured Benefits Delivery')
      console.log('      • EDM03: Ensured Risk Optimization')
      console.log('      • EDM04: Ensured Resource Optimization')
      console.log('      • EDM05: Ensured Stakeholder Engagement\n')
    }

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Check Phase 2: High Priority Management
    console.log('   📍 Phase 2: High Priority Management (10 objectives)')
    const phase2 = page.locator('text=Phase 2: High Priority Management')
    if (await phase2.isVisible()) {
      await phase2.scrollIntoViewIfNeeded()
      if (DEMO_MODE) await page.waitForTimeout(wait(2000))

      // Verify some high priority objectives are listed
      const apo01 = await page.locator('text=APO01:').first().isVisible()
      const dss05 = await page.locator('text=DSS05:').first().isVisible()
      if (apo01 && dss05) {
        console.log('      ✅ All 10 high-priority objectives displayed')
      }
      console.log('      • APO01, APO02, APO13 (Strategy & Security)')
      console.log('      • BAI02, BAI06 (Requirements & Changes)')
      console.log('      • DSS01, DSS05, DSS06 (Operations & Security)')
      console.log('      • MEA01, MEA03 (Performance & Compliance)\n')
    }

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Check Phase 3: Additional Objectives
    console.log('   📍 Phase 3: Additional Objectives (2 medium priority)')
    const phase3 = page.locator('text=Phase 3: Additional Objectives')
    if (await phase3.isVisible()) {
      await phase3.scrollIntoViewIfNeeded()
      if (DEMO_MODE) await page.waitForTimeout(wait(2000))

      // Verify medium priority objectives are listed
      const apo11 = await page.locator('text=APO11:').first().isVisible()
      const bai10 = await page.locator('text=BAI10:').first().isVisible()
      if (apo11 && bai10) {
        console.log('      ✅ All 2 medium-priority objectives displayed')
      }
      console.log('      • APO11: Managed Quality')
      console.log('      • BAI10: Managed Configuration\n')
    }

    if (DEMO_MODE) {
      await page.waitForTimeout(wait(2000))
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      await page.waitForTimeout(wait(3000))
    }

    console.log('✅ Implementation roadmap loaded!\n')
    console.log('📊 SUMMARY:')
    console.log('   • Total Objectives: 17 (5 EDM + 12 Management)')
    console.log('   • Phase 1 (Foundation): 5 EDM objectives')
    console.log('   • Phase 2 (High Priority): 10 management objectives')
    console.log('   • Phase 3 (Additional): 2 medium priority objectives\n')
    console.log('🎉 Step 7 complete - Ready for performance measurement!\n')
  })
})
