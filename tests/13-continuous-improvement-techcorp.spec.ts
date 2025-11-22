import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

test.describe('TechCorp Financial - Step 13: Continuous Improvement', () => {
  test('launch Q3 2024 strategic improvement initiatives', async ({ page }) => {
    test.setTimeout(timeout(300000)) // Base: 5 minutes

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 13: Continuous Improvement')
    console.log('   6 Strategic Improvement Initiatives')
    console.log('========================================\n')
    logSpeedConfig()

    await enableCursorTracking(page)

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Navigating to Continuous Improvement...\n')
    await page.locator('aside nav button').filter({ hasText: /Continuous Improvement/i }).click()
    await page.waitForTimeout(wait(2000))

    // Scroll to top to start
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1000))

    console.log('🚀 CONTINUOUS IMPROVEMENT FRAMEWORK')
    console.log('   Plan-Do-Check-Act (PDCA) cycle integrated with COBIT...\n')

    // Improvement Framework
    console.log('   📋 IMPROVEMENT APPROACH:\n')
    console.log('   • Plan-Do-Check-Act (PDCA) cycle')
    console.log('   • Integrated with COBIT governance model')
    console.log('   • Four improvement categories:\n')
    console.log('     1. Capability maturity improvements (closing assessment gaps)')
    console.log('     2. Performance optimization (improving KPIs)')
    console.log('     3. Process efficiency (reducing waste, automation)')
    console.log('     4. Innovation and transformation (emerging capabilities)\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 1
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.12, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Strategic Improvement Initiatives
    console.log('   💡 Q3 2024 STRATEGIC IMPROVEMENT INITIATIVES:\n')

    // Initiative 1
    console.log('   📊 INITIATIVE 1: Benefits Realization Framework\n')
    console.log('   Category: Capability Maturity (EDM02)')
    console.log('   Sponsor: Chief Portfolio Officer')
    console.log('   Team: 5 portfolio managers, 2 business analysts')
    console.log('   Timeline: July - October 2024')
    console.log('   Budget: $500,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Implement standardized benefits identification and tracking')
    console.log('   • Train 25 portfolio and project managers')
    console.log('   • Establish quarterly benefits review process')
    console.log('   • Pilot with top 20 strategic programs\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • Benefits realization rate: 62% → 75% by Q1 2025')
    console.log('   • 100% projects >$500K with defined measurable benefits')
    console.log('   • Stakeholder satisfaction with value transparency: 3.2 → 4.0\n')
    console.log('   STATUS: 🔄 40% complete (September 2024)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 2
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.24, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Initiative 2
    console.log('   ☁️  INITIATIVE 2: Cloud Center of Excellence (CCoE) Expansion\n')
    console.log('   Category: Capability Maturity + Innovation')
    console.log('   Sponsor: Chief Technology Officer')
    console.log('   Team: 12 cloud architects, engineers, FinOps specialists')
    console.log('   Timeline: June 2024 - June 2025')
    console.log('   Budget: $2,500,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Accelerate cloud migration while ensuring governance')
    console.log('   • Cloud cost optimization (target 20% reduction)')
    console.log('   • Security and compliance by design')
    console.log('   • Cloud skills enablement (50 certifications)\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • Cloud workloads: 60% → 80% by mid-2025')
    console.log('   • Cloud security incidents reduced by 50%')
    console.log('   • Cloud cost reduction of 20% ($4M savings)')
    console.log('   • 95% compliance with cloud architecture standards\n')
    console.log('   STATUS: 🔄 25% complete (team hired, framework defined)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 3
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.36, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Initiative 3
    console.log('   🤖 INITIATIVE 3: AIOps for Incident Management\n')
    console.log('   Category: Performance Optimization (DSS02)')
    console.log('   Sponsor: VP Operations')
    console.log('   Team: 4 operations engineers, 2 data scientists')
    console.log('   Timeline: August 2024 - February 2025')
    console.log('   Budget: $800,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Implement AI-powered incident prediction and diagnosis')
    console.log('   • Reduce incident detection time by 60%')
    console.log('   • Reduce P1 incident resolution time: 5.2 → 3.5 hours')
    console.log('   • Automated remediation for common incidents\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • Mean Time to Detect (MTTD): 30 minutes')
    console.log('   • Mean Time to Resolve (MTTR) P1: 3.5 hours')
    console.log('   • 30% of incidents auto-remediated')
    console.log('   • Reduction in major incidents by 25%\n')
    console.log('   STATUS: 🔄 15% complete (vendor selection, requirements)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 4
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.48, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Initiative 4
    console.log('   👥 INITIATIVE 4: Talent Retention and Development Program\n')
    console.log('   Category: Performance Optimization (APO07)')
    console.log('   Sponsor: Chief Human Resources Officer')
    console.log('   Team: CHRO team, IT Leadership')
    console.log('   Timeline: July 2024 - June 2025')
    console.log('   Budget: $3,000,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Reduce IT turnover from 14% to <10%')
    console.log('   • Implement IT competency framework and career paths')
    console.log('   • Compensation market alignment')
    console.log('   • Leadership development program')
    console.log('   • Diversity and inclusion initiatives\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • Voluntary turnover: <10%')
    console.log('   • Employee engagement: 4.2/5.0')
    console.log('   • Internal promotion rate: 30%')
    console.log('   • Diversity hiring: 40% from underrepresented groups\n')
    console.log('   STATUS: 🔄 30% complete (compensation adjustments, framework drafted)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 5
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.60, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Initiative 5
    console.log('   🔒 INITIATIVE 5: Zero Trust Architecture Implementation\n')
    console.log('   Category: Capability Maturity (APO13, DSS05)')
    console.log('   Sponsor: Chief Information Security Officer')
    console.log('   Team: 15 security engineers and architects')
    console.log('   Timeline: January 2024 - December 2025 (multi-phase)')
    console.log('   Budget: $5,000,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Implement zero trust security model')
    console.log('   • Reduce security incidents by 40%')
    console.log('   • Improve security incident detection and response')
    console.log('   • Meet regulatory security requirements (NYDFS)\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • 100% critical apps with zero trust controls by end 2025')
    console.log('   • Security incidents reduced by 40%')
    console.log('   • Mean Time to Detect (MTTD): <1 hour')
    console.log('   • Security audit findings: zero material findings\n')
    console.log('   STATUS: 🔄 35% complete (identity and access phase operational)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Initiative 6
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.72, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Initiative 6
    console.log('   📊 INITIATIVE 6: Data Governance Program\n')
    console.log('   Category: Capability Maturity + Compliance (APO14, MEA03)')
    console.log('   Sponsor: Chief Data Officer')
    console.log('   Team: 8 data governance specialists')
    console.log('   Timeline: April 2024 - June 2025')
    console.log('   Budget: $1,800,000\n')
    console.log('   OBJECTIVES:')
    console.log('   • Establish enterprise data governance framework')
    console.log('   • Complete data mapping for GDPR compliance')
    console.log('   • Improve data quality from 87% to 95%')
    console.log('   • Implement data catalog and lineage\n')
    console.log('   SUCCESS METRICS:')
    console.log('   • Data governance framework approved and operational')
    console.log('   • GDPR data mapping 100% complete')
    console.log('   • Data quality score: 95%')
    console.log('   • Data catalog: 80% coverage of critical data assets\n')
    console.log('   STATUS: 🔄 50% complete (framework approved, data mapping 90%)\n')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Portfolio Dashboard
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.80, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Improvement Portfolio Dashboard
    console.log('   📊 IMPROVEMENT PORTFOLIO DASHBOARD:\n')

    const portfolioMetrics = [
      { metric: 'Total Active Initiatives', value: '6 strategic + 24 tactical' },
      { metric: 'Total Investment', value: '$13.6M for strategic initiatives' },
      { metric: 'Expected Benefits', value: '$12M cost savings + risk reduction + capability gains' },
      { metric: 'On-track Initiatives', value: '4' },
      { metric: 'At-risk Initiatives', value: '2 (talent retention, AIOps - resource constraints)' }
    ]

    portfolioMetrics.forEach(metric => {
      console.log(`   • ${metric.metric}: ${metric.value}`)
    })

    console.log('\n   QUARTERLY IMPROVEMENT REVIEWS:')
    console.log('   • Portfolio review by IT Steering Committee')
    console.log('   • Benefits realization tracking')
    console.log('   • Resource allocation and prioritization')
    console.log('   • Lessons learned and best practice sharing\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Lessons Learned
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.85, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Lessons Learned
    console.log('   💡 LESSONS LEARNED (Q1-Q2 2024):\n')

    const lessonsLearned = [
      {
        lesson: 'Executive Sponsorship is Critical',
        insight: 'Initiatives with active executive sponsors deliver 35% faster. Governance initiatives require Board/C-suite engagement.'
      },
      {
        lesson: 'Change Management Cannot Be Underestimated',
        insight: 'Technology is easy, people are hard. Benefits depend on adoption and behavior change.'
      },
      {
        lesson: 'Start Small, Scale Fast',
        insight: 'Pilots and iterative approaches reduce risk. Early wins build momentum and stakeholder confidence.'
      },
      {
        lesson: 'Metrics Drive Accountability',
        insight: 'What gets measured gets done. Clear, objective metrics essential for continuous improvement.'
      },
      {
        lesson: 'Cross-functional Collaboration',
        insight: 'Governance requires partnership between IT, Risk, Compliance, Business. Breaking silos accelerates improvement.'
      }
    ]

    lessonsLearned.forEach((item, idx) => {
      console.log(`   ${idx + 1}. ${item.lesson}`)
      console.log(`      → ${item.insight}\n`)
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    await page.waitForTimeout(wait(2000))

    // Scroll to Future Roadmap
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.90, behavior: 'smooth' }))
    await page.waitForTimeout(wait(1500))

    // Future Roadmap
    console.log('   🗺️  FUTURE IMPROVEMENT ROADMAP (2025 and Beyond):\n')

    console.log('   2025 STRATEGIC THEMES:\n')
    console.log('   1. OPTIMIZATION AND MATURITY')
    console.log('      • Achieve average capability of 3.5 across all objectives')
    console.log('      • Performance metrics: 80% green, 20% yellow, 0% red')
    console.log('      • Embed continuous improvement culture\n')

    console.log('   2. INNOVATION ACCELERATION')
    console.log('      • Establish innovation management capability (APO04)')
    console.log('      • GenAI/AI adoption for productivity and new capabilities')
    console.log('      • API economy and ecosystem partnerships\n')

    console.log('   3. RESILIENCE AND TRUST')
    console.log('      • Cybersecurity excellence (target 90th percentile)')
    console.log('      • Business continuity and operational resilience')
    console.log('      • Regulatory compliance leadership\n')

    console.log('   4. SUSTAINABLE IT')
    console.log('      • ESG and sustainability initiatives')
    console.log('      • Green IT and carbon footprint reduction')
    console.log('      • Responsible and ethical technology use\n')

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    // Scroll to Final Completion Banner
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.95, behavior: 'smooth' }))
    await page.waitForTimeout(wait(2000))

    console.log('💾 TRACKING IMPROVEMENT INITIATIVES\n')

    const saveButton = page.getByRole('button', { name: /save/i })
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.scrollIntoViewIfNeeded()
      await saveButton.click()
      await page.waitForTimeout(wait(2000))
      console.log('   ✅ Improvement initiatives saved')
    }

    console.log('\n🎉 ========================================')
    console.log('   STEP 13 COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ Strategic Initiatives Launched: 6')
    console.log('   ✅ Total Investment: $13.6M')
    console.log('   ✅ Expected Benefits: $12M+ savings + capabilities')
    console.log('   ✅ Lessons Learned: 5 key insights')
    console.log('   ✅ Future Roadmap: Defined for 2025+')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Initiatives On Track: 4/6')
    console.log('   🎯 2025 Focus: Optimization, Innovation, Resilience')
    console.log('   ✅ CONTINUOUS IMPROVEMENT ACTIVE')
    console.log('========================================\n')

    console.log('\n🏆 ========================================')
    console.log('   TECHCORP COBIT 2019 IMPLEMENTATION')
    console.log('   ALL 13 STEPS COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ Governance Context Defined')
    console.log('   ✅ Capability Assessment Completed')
    console.log('   ✅ Governance Design Established')
    console.log('   ✅ 40 Objectives Configured (32 enabled)')
    console.log('   ✅ 48 Components Defined')
    console.log('   ✅ 127 Practices Tracked (54% implemented)')
    console.log('   ✅ 30 KPIs Established')
    console.log('   ✅ 26 Enablers Deployed (66% complete)')
    console.log('   ✅ Continuous Monitoring Active')
    console.log('   ✅ Performance Analysis Completed')
    console.log('   ✅ 6 Strategic Improvements Launched')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   🎯 Investment: $5.6M + $13.6M improvements')
    console.log('   📈 Maturity: 2.4 → 3.5 target by 2025')
    console.log('   🌟 TechCorp is now a governance leader!')
    console.log('========================================\n')

    console.log('✨ Demo Step 13 and FULL IMPLEMENTATION completed successfully!\n')
  })
})
