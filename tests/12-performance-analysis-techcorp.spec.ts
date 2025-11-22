import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'
const DEMO_MODE = process.env.DEMO_MODE === 'true'


test.describe('TechCorp Financial - Step 12: Performance Analysis', () => {
  test('analyze Q2 2024 performance, identify trends and root causes', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 12: Performance Analysis')
    console.log('   Q2 2024 Root Cause Analysis & Trends')
    console.log('========================================\n')
    logSpeedConfig()

    if (DEMO_MODE) await enableCursorTracking(page)

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Navigating to Performance Analysis...\n')
    await page.locator('aside nav button').filter({ hasText: /Performance Analysis/i }).click()
    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Scroll to top to start
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1000))

    console.log('📊 Q2 2024 PERFORMANCE ANALYSIS')
    console.log('   Analyzing 30 KPIs across all domains...\n')

    // Overall Performance Summary
    console.log('   📋 OVERALL PERFORMANCE SUMMARY:\n')

    const performanceSummary = [
      { category: 'KPIs Meeting Target (Green)', count: 7, percent: 23, icon: '🟢' },
      { category: 'KPIs Close to Target (Yellow)', count: 15, percent: 50, icon: '🟡' },
      { category: 'KPIs Below Target (Red)', count: 8, percent: 27, icon: '🔴' }
    ]

    performanceSummary.forEach(cat => {
      console.log(`   ${cat.icon} ${cat.category}: ${cat.count} (${cat.percent}%)`)
    })

    console.log('\n   PERFORMANCE TRENDS (vs. Q1 2024):')
    console.log('   ↑ Improved: 12 KPIs (40%)')
    console.log('   → Stable: 10 KPIs (33%)')
    console.log('   ↓ Declining: 8 KPIs (27%)\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll to EDM Analysis section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.2, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Governance Performance Analysis
    console.log('   🛡️  GOVERNANCE PERFORMANCE ANALYSIS (EDM):\n')

    const edmAnalysis = [
      {
        metric: 'Benefits Realization Rate',
        current: 62,
        target: 85,
        status: '🔴',
        rootCauses: [
          'Lack of formal benefits tracking process',
          'Business cases inconsistently define measurable benefits',
          'No accountability for benefits realization post-implementation',
          'Limited post-implementation reviews'
        ],
        actions: [
          'Implement benefits realization framework (Q3 2024)',
          'Train portfolio managers on benefits management',
          'Mandatory benefits tracking for projects >$500K',
          'Quarterly benefits review with business sponsors'
        ],
        expectedImpact: 'Improvement to 75% by Q4 2024, 85% by Q2 2025'
      },
      {
        metric: 'IT Risk Incidents',
        current: 5,
        target: 2,
        status: '🔴',
        rootCauses: [
          'Three incidents related to cloud misconfigurations',
          'Two incidents from inadequate change testing',
          'Increased attack sophistication'
        ],
        actions: [
          'CSPM (Cloud Security Posture Management) deployment',
          'Enhanced change testing for high-risk changes',
          'Security training focused on cloud security',
          'Architecture review board oversight of cloud designs'
        ],
        expectedImpact: 'Reduction to 3 incidents for full year 2024'
      },
      {
        metric: 'Stakeholder Satisfaction',
        current: 3.8,
        target: 4.2,
        status: '🟡',
        rootCauses: [
          'Inconsistent communication with business leaders',
          'Lack of transparency on IT initiative status',
          'Perceived slow response to business needs',
          'IT jargon in communications'
        ],
        actions: [
          'Monthly business relationship reviews',
          'Simplified executive dashboards',
          'Business relationship manager training',
          'Communication playbook for stakeholders'
        ],
        expectedImpact: 'Improvement to 4.0 by Q4 2024'
      }
    ]

    edmAnalysis.forEach((analysis, idx) => {
      console.log(`   ${analysis.status} ${idx + 1}. ${analysis.metric}`)
      console.log(`      Current: ${analysis.current}${typeof analysis.current === 'number' && analysis.current < 10 ? '' : '%'} | Target: ${analysis.target}${typeof analysis.target === 'number' && analysis.target < 10 ? '' : '%'}`)
      console.log(`\n      ROOT CAUSES:`)
      analysis.rootCauses.forEach(cause => console.log(`      • ${cause}`))
      console.log(`\n      CORRECTIVE ACTIONS:`)
      analysis.actions.forEach(action => console.log(`      ✓ ${action}`))
      console.log(`\n      EXPECTED IMPACT: ${analysis.expectedImpact}\n`)
      console.log('      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    })

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll to APO Analysis section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.4, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Strategic Alignment Analysis
    console.log('   🎯 STRATEGIC ALIGNMENT ANALYSIS (APO):\n')

    const apoAnalysis = [
      {
        metric: 'Strategic Initiative On-Time Delivery',
        current: 78,
        target: 90,
        status: '🟡',
        rootCauses: [
          'Requirements volatility in 40% of projects',
          'Resource constraints and priority changes',
          'Dependencies on vendor deliveries',
          'Technical complexity underestimated'
        ],
        actions: [
          'Agile methodology adoption for appropriate projects',
          'Requirements stability gates before initiation',
          'Vendor management improvements',
          'Enhanced estimation practices and buffers'
        ],
        expectedImpact: 'Improvement to 85% by Q1 2025'
      },
      {
        metric: 'IT Employee Turnover',
        current: 14,
        target: 10,
        status: '🔴',
        rootCauses: [
          'Competitive market for cloud and security talent',
          'Compensation benchmarking gaps identified',
          'Career development path clarity needed',
          'Work-life balance concerns (on-call burden)'
        ],
        actions: [
          'Compensation review and market adjustments ($2M budget)',
          'Career development framework and individual plans',
          'On-call burden reduction through automation',
          'Remote work flexibility enhancement',
          'Retention bonuses for critical roles'
        ],
        expectedImpact: 'Reduction to 11% by end of 2024'
      }
    ]

    apoAnalysis.forEach((analysis, idx) => {
      console.log(`   ${analysis.status} ${idx + 1}. ${analysis.metric}`)
      console.log(`      Current: ${analysis.current}% | Target: ${analysis.target}%`)
      console.log(`\n      ROOT CAUSES:`)
      analysis.rootCauses.forEach(cause => console.log(`      • ${cause}`))
      console.log(`\n      CORRECTIVE ACTIONS:`)
      analysis.actions.forEach(action => console.log(`      ✓ ${action}`))
      console.log(`\n      EXPECTED IMPACT: ${analysis.expectedImpact}\n`)
      console.log('      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    })

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll to DSS Analysis section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.55, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Operational Performance Analysis
    console.log('   ⚡ OPERATIONAL PERFORMANCE ANALYSIS (DSS):\n')

    const dssAnalysis = [
      {
        metric: 'Incident Resolution Time (P1)',
        current: '5.2 hours',
        target: '4 hours',
        status: '🔴',
        rootCauses: [
          'Complex distributed systems increase troubleshooting time',
          'Inadequate runbooks and documentation',
          'Skills gaps in cloud-native troubleshooting',
          'After-hours resource availability'
        ],
        actions: [
          'AIOps implementation for faster root cause identification',
          'Runbook completeness initiative (target 95% coverage)',
          'Cloud troubleshooting training',
          'Enhanced on-call structure and compensation'
        ],
        expectedImpact: 'Reduction to 4.5 hours by Q4 2024'
      },
      {
        metric: 'Project On-Time Delivery',
        current: 73,
        target: 85,
        status: '🔴',
        rootCauses: [
          'Optimistic initial estimates',
          'Scope creep in 35% of projects',
          'Resource allocation conflicts',
          'Integration complexity with legacy systems'
        ],
        actions: [
          'Estimation review by independent experts',
          'Stricter change control process',
          'Portfolio resource optimization',
          'Legacy modernization to reduce integration complexity'
        ],
        expectedImpact: 'Improvement to 80% by Q1 2025'
      },
      {
        metric: 'Change Success Rate',
        current: 92,
        target: 95,
        status: '🟡',
        rootCauses: [
          'Insufficient testing for 60% of failed changes',
          'Inadequate rollback plans',
          'Communication gaps',
          'Emergency changes bypassing testing'
        ],
        actions: [
          'Mandatory test environment validation',
          'Rollback plan review by CAB',
          'Enhanced change communication',
          'Post-implementation reviews for failures',
          'Reduction of emergency change usage'
        ],
        expectedImpact: 'Improvement to 94% by Q4 2024'
      }
    ]

    dssAnalysis.forEach((analysis, idx) => {
      console.log(`   ${analysis.status} ${idx + 1}. ${analysis.metric}`)
      console.log(`      Current: ${analysis.current} | Target: ${analysis.target}`)
      console.log(`\n      ROOT CAUSES:`)
      analysis.rootCauses.forEach(cause => console.log(`      • ${cause}`))
      console.log(`\n      CORRECTIVE ACTIONS:`)
      analysis.actions.forEach(action => console.log(`      ✓ ${action}`))
      console.log(`\n      EXPECTED IMPACT: ${analysis.expectedImpact}\n`)
      console.log('      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')
    })

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll to MEA Analysis section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.7, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    // Compliance Analysis
    console.log('   ✅ COMPLIANCE ANALYSIS (MEA):\n')

    console.log('   🔴 Regulatory Audit Findings: 2 material (Target: 0)\n')
    console.log('   FINDING 1: GDPR Data Mapping Incomplete (85% complete)')
    console.log('   Root Causes:')
    console.log('   • Insufficient resource allocation to data governance')
    console.log('   • Complexity of data landscape\n')
    console.log('   Corrective Actions:')
    console.log('   ✓ Data governance team expansion (3 FTEs)')
    console.log('   ✓ Data discovery tool implementation\n')

    console.log('   FINDING 2: SOX Control Documentation Gaps')
    console.log('   Root Causes:')
    console.log('   • Decentralized control documentation')
    console.log('   • Process changes not reflected in documentation\n')
    console.log('   Corrective Actions:')
    console.log('   ✓ Centralized control documentation repository')
    console.log('   ✓ Quarterly control documentation reviews')
    console.log('   ✓ Change management integration with SOX controls\n')
    console.log('   Expected Impact: Remediation by Q4 2024, zero findings target for 2025\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Benchmarking Analysis
    console.log('   📈 BENCHMARKING ANALYSIS\n')
    console.log('   Industry Peer Comparison (Financial Services >$1B revenue):\n')

    const benchmarking = [
      { metric: 'Governance Maturity', techcorp: '50th percentile', target: '75th', status: '🟡' },
      { metric: 'IT Budget as % Revenue', techcorp: '8.2%', peer: '7.8%', status: '🟡' },
      { metric: 'Cloud Adoption', techcorp: '75th percentile', target: '-', status: '🟢' },
      { metric: 'Cybersecurity Maturity', techcorp: '60th percentile', target: '90th', status: '🟡' },
      { metric: 'IT Staff Turnover', techcorp: '14%', peer: '12%', status: '🔴' },
      { metric: 'Digital Innovation', techcorp: '65th percentile', target: '-', status: '🟢' }
    ]

    benchmarking.forEach(bench => {
      const comparison = bench.peer ? `vs. peer avg ${bench.peer}` : bench.target ? `(target: ${bench.target})` : ''
      console.log(`   ${bench.status} ${bench.metric}: ${bench.techcorp} ${comparison}`)
    })

    console.log('\n   KEY INSIGHTS:')
    console.log('   • Strong technology adoption but governance maturity lags')
    console.log('   • Higher IT spend should drive better outcomes - efficiency opportunity')
    console.log('   • Turnover impacting capability building')
    console.log('   • Cybersecurity needs continued investment given threat landscape\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll to Benchmarking section
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.85, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(1500))

    console.log('💾 SAVING PERFORMANCE ANALYSIS\n')

    const saveButton = page.getByRole('button', { name: /save/i })
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.scrollIntoViewIfNeeded()
      await saveButton.click()
      if (DEMO_MODE) await page.waitForTimeout(wait(3000))
      console.log('   ✅ Performance analysis saved')
    }

    console.log('\n🎉 ========================================')
    console.log('   STEP 12 COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ KPIs Analyzed: 30')
    console.log('   ✅ Root Cause Analysis: 9 priority KPIs')
    console.log('   ✅ Corrective Actions: Defined for all gaps')
    console.log('   ✅ Benchmarking: Completed vs. peers')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Performance Status: Mixed (4R, 11Y, 0G)')
    console.log('   🎯 Improvement Initiatives: Identified')
    console.log('   ✅ Ready for Continuous Improvement')
    console.log('========================================\n')

    console.log('✨ Demo Step 12 completed successfully!\n')
  })
})
