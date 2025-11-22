import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'
const DEMO_MODE = process.env.DEMO_MODE === 'true'


test.describe('TechCorp Financial - Step 9: Enabler Deployment', () => {
  test('deploy governance enablers across policies, tools, skills, and culture', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 9: Enabler Deployment')
    console.log('   26 Enablers Across 4 Categories')
    console.log('========================================\n')
    logSpeedConfig()

    if (DEMO_MODE) await enableCursorTracking(page)

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Navigating to Enabler Deployment...\n')
    await page.locator('aside nav button').filter({ hasText: /Enabler Deployment/i }).click()
    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Scroll to top to start
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1000))

    console.log('🚀 GOVERNANCE ENABLERS')
    console.log('   Deploying enablers to support governance objectives...\n')

    // Category 1: Policies and Procedures
    console.log('   📋 CATEGORY 1: Policies and Procedures (85% Complete)\n')

    const policies = [
      {
        name: 'IT Governance Policy',
        status: 'Completed',
        version: 'v2.1',
        approved: 'March 2024',
        scope: 'Governance framework, roles, decision rights'
      },
      {
        name: 'Enterprise Risk Management Policy',
        status: 'Completed',
        version: 'v3.0',
        approved: 'January 2024',
        scope: 'Risk appetite, assessment, treatment'
      },
      {
        name: 'Information Security Policy Framework',
        status: 'Completed',
        version: 'Multiple',
        approved: '2024',
        scope: '15 security policies, annual review cycle'
      },
      {
        name: 'Change Management SOPs',
        status: 'Completed',
        version: 'v1.5',
        approved: '2024',
        scope: '8 procedures, CAB charter, escalation'
      },
      {
        name: 'Business Continuity & DR Plans',
        status: 'Completed',
        version: 'Multiple',
        approved: '2024',
        scope: '25 app-specific BC/DR plans, bi-annual testing'
      },
      {
        name: 'Vendor Management Policy',
        status: 'Completed',
        version: 'v2.0',
        approved: '2024',
        scope: 'Vendor lifecycle, risk assessment'
      },
      {
        name: 'Data Governance Policy',
        status: 'In Progress',
        version: 'Draft',
        approved: 'Pending',
        scope: 'Data classification, privacy, quality'
      }
    ]

    policies.forEach((policy, idx) => {
      const statusIcon = policy.status === 'Completed' ? '✅' : '🔄'
      console.log(`   ${statusIcon} ${idx + 1}. ${policy.name}`)
      console.log(`      Status: ${policy.status} | Version: ${policy.version}`)
      console.log(`      Scope: ${policy.scope}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll down to show Tools section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.25, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Category 2: Tools and Technologies
    console.log('   💻 CATEGORY 2: Tools and Technologies (70% Complete)\n')

    const tools = [
      {
        name: 'ServiceNow GRC Platform',
        status: 'Completed',
        deployed: 'February 2024',
        modules: 'Risk, Compliance, Policy, Audit',
        users: '150 licenses',
        investment: '$800K'
      },
      {
        name: 'ServiceNow ITSM Platform',
        status: 'Completed',
        deployed: 'Production',
        modules: 'Incident, Problem, Change, Service Catalog',
        users: 'All IT staff',
        investment: '$1.2M'
      },
      {
        name: 'Splunk Enterprise Security (SIEM)',
        status: 'Completed',
        deployed: 'Production',
        modules: '500+ log sources, 75 correlation searches',
        users: 'SOC team',
        investment: '$1.5M'
      },
      {
        name: 'Cloud Security Posture Management',
        status: 'Completed',
        deployed: 'Production',
        modules: 'Palo Alto Prisma Cloud - AWS, Azure',
        users: 'Security & Cloud teams',
        investment: '$400K'
      },
      {
        name: 'Identity and Access Management',
        status: 'In Progress (75%)',
        deployed: 'Phased rollout',
        modules: 'Okta Enterprise - Target: Full SSO Q4 2024',
        users: 'All employees',
        investment: '$600K'
      },
      {
        name: 'Cloud FinOps Platform',
        status: 'In Progress (60%)',
        deployed: 'Implementation',
        modules: 'CloudHealth - Target: Q3 2024',
        users: 'FinOps team',
        investment: '$300K'
      },
      {
        name: 'Enterprise Architecture Tool',
        status: 'In Progress (50%)',
        deployed: 'Implementation',
        modules: 'LeanIX - Target: Q4 2024',
        users: 'Architecture team',
        investment: '$250K'
      }
    ]

    tools.forEach((tool, idx) => {
      const statusIcon = tool.status.includes('Completed') ? '✅' : '🔄'
      console.log(`   ${statusIcon} ${idx + 1}. ${tool.name}`)
      console.log(`      Status: ${tool.status}`)
      console.log(`      Modules: ${tool.modules}`)
      console.log(`      Investment: ${tool.investment}`)
      console.log()
    })

    console.log('   Total Technology Investment: $5.05M\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll down to show Skills section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.5, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Category 3: Skills Development
    console.log('   🎓 CATEGORY 3: Skills Development (60% Complete)\n')

    const skillsPrograms = [
      {
        name: 'COBIT 2019 Foundation Training',
        status: 'Completed',
        participants: '45 IT leaders and governance team',
        certifications: '12 COBIT certified',
        investment: '$50K'
      },
      {
        name: 'Cloud Certifications Program',
        status: 'In Progress',
        participants: 'Target: 50 cloud-certified engineers',
        certifications: '32 certified (AWS, Azure, GCP)',
        investment: '$200K annually'
      },
      {
        name: 'Cybersecurity Skills Development',
        status: 'Completed',
        participants: 'Security team',
        certifications: '18 (CISSP, CISM, Security+, CEH)',
        investment: '$150K'
      },
      {
        name: 'Agile and DevOps Training',
        status: 'Completed',
        participants: '200 IT staff trained',
        certifications: 'CSM, DevOps Foundation',
        investment: '$100K'
      },
      {
        name: 'Risk Management Training',
        status: 'Completed',
        participants: '85 risk owners and first-line',
        certifications: 'Internal certification',
        investment: '$40K'
      },
      {
        name: 'Data Privacy and GDPR Training',
        status: 'Completed',
        participants: 'Mandatory for all IT staff',
        certifications: '98% completion rate',
        investment: '$30K'
      }
    ]

    skillsPrograms.forEach((program, idx) => {
      const statusIcon = program.status === 'Completed' ? '✅' : '🔄'
      console.log(`   ${statusIcon} ${idx + 1}. ${program.name}`)
      console.log(`      Status: ${program.status}`)
      console.log(`      Participants: ${program.participants}`)
      console.log(`      Certifications: ${program.certifications}`)
      console.log()
    })

    console.log('   Total Training Investment: $570K annually\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll down to show Culture section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Category 4: Culture and Behavior
    console.log('   🌟 CATEGORY 4: Culture and Behavior (50% Complete)\n')

    const cultureInitiatives = [
      {
        name: 'Governance Culture Initiative',
        status: 'In Progress',
        activities: 'Town halls, governance champions, awareness campaigns',
        goal: 'Embed governance mindset across IT',
        metrics: 'Governance awareness: 78%'
      },
      {
        name: 'Cybersecurity Awareness Program',
        status: 'Completed',
        activities: 'Monthly phishing sims, quarterly training, 50 security champions',
        goal: 'Security-first culture',
        metrics: 'Phishing click rate: <5%'
      },
      {
        name: 'Continuous Improvement Program',
        status: 'In Progress',
        activities: 'Retrospectives, kaizen events, improvement boards',
        goal: '100 improvements implemented annually',
        metrics: 'Current: 65 improvements YTD'
      },
      {
        name: 'Customer-Centric Service Culture',
        status: 'In Progress',
        activities: 'Service design thinking, customer journey mapping',
        goal: 'IT as trusted business partner',
        metrics: 'Customer satisfaction: 3.8/5.0'
      }
    ]

    cultureInitiatives.forEach((initiative, idx) => {
      const statusIcon = initiative.status === 'Completed' ? '✅' : '🔄'
      console.log(`   ${statusIcon} ${idx + 1}. ${initiative.name}`)
      console.log(`      Status: ${initiative.status}`)
      console.log(`      Activities: ${initiative.activities}`)
      console.log(`      Metrics: ${initiative.metrics}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll down to show Summary section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.85, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Deployment Summary
    console.log('   📊 ENABLER DEPLOYMENT SUMMARY\n')

    const deploymentSummary = [
      { category: 'Policies & Procedures', total: 8, completed: 7, percent: 85, status: '🟢' },
      { category: 'Tools & Technologies', total: 9, completed: 4, percent: 70, status: '🟡' },
      { category: 'Skills Development', total: 6, completed: 4, percent: 60, status: '🟡' },
      { category: 'Culture & Behavior', total: 4, completed: 1, percent: 50, status: '🟡' }
    ]

    deploymentSummary.forEach(cat => {
      console.log(`   ${cat.status} ${cat.category}: ${cat.completed}/${cat.total} (${cat.percent}%)`)
    })

    console.log('\n   Overall Enabler Deployment: 16/27 Completed (66%)')
    console.log('   Total Investment: $5.6M + $570K annual training\n')

    console.log('💾 TRACKING ENABLER DEPLOYMENT\n')

    const saveButton = page.getByRole('button', { name: /save/i })
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.scrollIntoViewIfNeeded()
      await saveButton.click()
      if (DEMO_MODE) await page.waitForTimeout(wait(3000))
      console.log('   ✅ Enabler deployment status saved')
    }

    console.log('\n🎉 ========================================')
    console.log('   STEP 9 COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ Policies & Procedures: 85% deployed')
    console.log('   ✅ Tools & Technologies: 70% deployed ($5.05M)')
    console.log('   ✅ Skills Development: 60% deployed ($570K/yr)')
    console.log('   ✅ Culture Programs: 50% deployed')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Total Enablers: 26')
    console.log('   📈 Overall Deployment: 66% complete')
    console.log('   💰 Total Investment: $5.6M + annual costs')
    console.log('   ✅ Ready for Continuous Monitoring')
    console.log('========================================\n')

    console.log('✨ Demo Step 9 completed successfully!\n')
  })
})
