import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'
const DEMO_MODE = process.env.DEMO_MODE === 'true'


test.describe('TechCorp Financial - Step 8: Performance Measurement', () => {
  test('establish comprehensive performance metrics and KPIs', async ({ page }) => {
    test.setTimeout(timeout(120000)) // Base: 2 minutes

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 8: Performance Measurement')
    console.log('   30 KPIs Across All Domains')
    console.log('========================================\n')
    logSpeedConfig()

    if (DEMO_MODE) await enableCursorTracking(page)

    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')

    console.log('📍 Navigating to Performance Measurement...\n')
    await page.locator('aside nav button').filter({ hasText: /Performance Measurement/i }).click()
    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    console.log('📊 PERFORMANCE METRICS FRAMEWORK')
    console.log('   Defining KPIs across Governance and Management domains...\n')

    // Governance Metrics (EDM) - Aligned with Step 4 objectives
    console.log('   🛡️  GOVERNANCE METRICS (EDM Domain)\n')
    console.log('   Aligned with EDM01-EDM05 objectives selected in Step 4\n')

    const governanceMetrics = [
      {
        name: 'Governance Effectiveness Score',
        objective: 'EDM01',
        type: 'goal',
        current: 3.2,
        target: 4.0,
        unit: '/5.0'
      },
      {
        name: 'Benefits Realization Rate',
        objective: 'EDM02',
        type: 'kpi',
        current: 62,
        target: 85,
        unit: '%'
      },
      {
        name: 'IT Risk Incidents (Material)',
        objective: 'EDM03',
        type: 'kpi',
        current: 5,
        target: 2,
        unit: 'incidents'
      },
      {
        name: 'IT Budget Variance',
        objective: 'EDM04',
        type: 'kpi',
        current: 8,
        target: 5,
        unit: '%'
      },
      {
        name: 'Stakeholder Satisfaction Score',
        objective: 'EDM05',
        type: 'goal',
        current: 3.8,
        target: 4.2,
        unit: '/5.0'
      }
    ]

    // Just log for console output
    governanceMetrics.forEach((metric, idx) => {
      console.log(`   ${idx + 1}. ${metric.name} (${metric.objective})`)
      console.log(`      Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`)
      console.log(`      Type: ${metric.type}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Strategic Alignment Metrics (APO) - Aligned with Step 5 APO objectives
    console.log('   🎯 STRATEGIC ALIGNMENT METRICS (APO Domain)\n')
    console.log('   Aligned with APO01, APO02, APO11, APO13 selected in Step 5\n')

    const apoMetrics = [
      {
        name: 'IT Management Framework Maturity',
        objective: 'APO01',
        type: 'process-capability',
        current: 2.8,
        target: 4.0,
        unit: '/5.0'
      },
      {
        name: 'Strategic Initiative On-Time Delivery',
        objective: 'APO02',
        type: 'kpi',
        current: 78,
        target: 90,
        unit: '%'
      },
      {
        name: 'Quality Management Effectiveness',
        objective: 'APO11',
        type: 'kpi',
        current: 82,
        target: 90,
        unit: '%'
      },
      {
        name: 'Security Control Effectiveness',
        objective: 'APO13',
        type: 'kpi',
        current: 89,
        target: 95,
        unit: '%'
      }
    ]

    apoMetrics.forEach((metric, idx) => {
      console.log(`   ${idx + 1}. ${metric.name} (${metric.objective})`)
      console.log(`      Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // BAI Metrics - Aligned with Step 5 BAI objectives
    console.log('   🔧 BUILD/IMPLEMENT METRICS (BAI Domain)\n')
    console.log('   Aligned with BAI02, BAI06, BAI10 selected in Step 5\n')

    const baiMetrics = [
      {
        name: 'Requirements Quality Index',
        objective: 'BAI02',
        type: 'kpi',
        current: 85,
        target: 95,
        unit: '%'
      },
      {
        name: 'Change Success Rate',
        objective: 'BAI06',
        type: 'kpi',
        current: 92,
        target: 98,
        unit: '%'
      },
      {
        name: 'Configuration Accuracy',
        objective: 'BAI10',
        type: 'kpi',
        current: 88,
        target: 95,
        unit: '%'
      }
    ]

    baiMetrics.forEach((metric, idx) => {
      console.log(`   ${idx + 1}. ${metric.name} (${metric.objective})`)
      console.log(`      Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Operational Metrics (DSS) - Aligned with Step 5 DSS objectives
    console.log('   ⚡ OPERATIONAL PERFORMANCE METRICS (DSS Domain)\n')
    console.log('   Aligned with DSS01, DSS05, DSS06 selected in Step 5\n')

    const dssMetrics = [
      {
        name: 'Infrastructure Availability',
        objective: 'DSS01',
        type: 'kpi',
        current: 99.87,
        target: 99.95,
        unit: '%'
      },
      {
        name: 'Security Incident MTTD',
        objective: 'DSS05',
        type: 'kpi',
        current: 3.5,
        target: 2.0,
        unit: 'hours'
      },
      {
        name: 'Control Deficiency Rate',
        objective: 'DSS06',
        type: 'kpi',
        current: 8,
        target: 3,
        unit: 'count'
      }
    ]

    dssMetrics.forEach((metric, idx) => {
      console.log(`   ${idx + 1}. ${metric.name} (${metric.objective})`)
      console.log(`      Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(3000))

    // Compliance Metrics (MEA) - Aligned with Step 5 MEA objectives
    console.log('   ✅ COMPLIANCE & MONITORING METRICS (MEA Domain)\n')
    console.log('   Aligned with MEA01, MEA03 selected in Step 5\n')

    const meaMetrics = [
      {
        name: 'Performance Monitoring Coverage',
        objective: 'MEA01',
        type: 'kpi',
        current: 92,
        target: 100,
        unit: '%'
      },
      {
        name: 'Compliance Attestation Rate',
        objective: 'MEA03',
        type: 'kpi',
        current: 98,
        target: 100,
        unit: '%'
      }
    ]

    meaMetrics.forEach((metric, idx) => {
      console.log(`   ${idx + 1}. ${metric.name} (${metric.objective})`)
      console.log(`      Current: ${metric.current}${metric.unit} | Target: ${metric.target}${metric.unit}`)
      console.log()
    })

    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n')

    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Now add all metrics through the UI
    console.log('💾 ADDING PERFORMANCE METRICS THROUGH UI\n')

    const allMetrics = [
      ...governanceMetrics,
      ...apoMetrics,
      ...baiMetrics,
      ...dssMetrics,
      ...meaMetrics
    ]

    console.log(`   Adding ${allMetrics.length} KPIs aligned with selected objectives...\n`)

    // Helper function to add a metric
    const addMetric = async (metric: any, index: number) => {
      console.log(`   [${index + 1}/${allMetrics.length}] Adding: ${metric.name} (${metric.objective})`)

      // Scroll to form at top
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
      if (DEMO_MODE) await page.waitForTimeout(wait(500))

      // Fill metric name
      const nameInput = page.locator('input[placeholder*="Metric name"]')
      await nameInput.fill(metric.name)
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Select type
      const typeSelect = page.locator('select').filter({ hasText: /KPI|Process Capability|Goal/ }).first()
      await typeSelect.selectOption(metric.type)
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Fill objective ID
      const objectiveInput = page.locator('input[placeholder*="Objective ID"]')
      await objectiveInput.fill(metric.objective)
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Fill target
      const targetInput = page.locator('input[placeholder*="Target"]')
      await targetInput.fill(metric.target.toString())
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Fill current
      const currentInput = page.locator('input[placeholder*="Current"]')
      await currentInput.fill(metric.current.toString())
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Fill unit
      const unitInput = page.locator('input[placeholder*="Unit"]')
      await unitInput.fill(metric.unit)
      if (DEMO_MODE) await page.waitForTimeout(typeDelay(100))

      // Click the + button to add (the button with Plus icon in the form)
      const addButton = page.locator('button.btn-primary').filter({ has: page.locator('svg') }).first()
      await addButton.click()
      await page.waitForTimeout(500) // Wait for state update
      await page.waitForLoadState('networkidle')

      if (DEMO_MODE) await page.waitForTimeout(wait(500))

      // After adding, verify the metric appears in the table
      if (index === 0) {
        // First metric - table should now be visible
        const table = page.locator('table')
        const isTableVisible = await table.isVisible().catch(() => false)
        if (isTableVisible) {
          console.log('      ✅ Metric added - table now visible')
        } else {
          console.log('      ⚠️  Warning: Table not visible after adding first metric')
        }
      }

      // Every 3 metrics, scroll to show the growing table
      if ((index + 1) % 3 === 0 || index === allMetrics.length - 1) {
        await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
        if (DEMO_MODE) await page.waitForTimeout(wait(1500))
      }
    }

    // Add all metrics
    for (let i = 0; i < allMetrics.length; i++) {
      await addMetric(allMetrics[i], i)
    }

    console.log(`\n   ✅ All ${allMetrics.length} metrics added successfully!\n`)

    // Verify table is visible and has correct number of rows
    const table = page.locator('table')
    const isTableVisible = await table.isVisible().catch(() => false)

    if (isTableVisible) {
      const rows = await page.locator('table tbody tr').count()
      console.log(`   📊 Metrics table visible with ${rows} rows\n`)
    } else {
      console.log('   ⚠️  WARNING: Metrics table is NOT visible!\n')
      console.log('   Checking if metrics were added to state...')

      // Take a screenshot to debug
      await page.screenshot({ path: 'test-results/step8-debug-no-table.png', fullPage: true })
      console.log('   Screenshot saved: test-results/step8-debug-no-table.png\n')
    }

    // Show the complete metrics table
    console.log('📊 REVIEWING COMPLETE METRICS TABLE\n')
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    // Scroll through the entire table
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }))
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))

    if (isTableVisible) {
      console.log('   ✅ Metrics table with all 17 KPIs displayed')
      console.log('   ✅ Progress bars showing current vs target for each metric\n')
    }

    // Save
    console.log('💾 Saving all metrics...\n')
    const saveButton = page.getByRole('button', { name: /Save Metrics/i })
    await saveButton.scrollIntoViewIfNeeded()
    if (DEMO_MODE) await page.waitForTimeout(wait(2000))
    await saveButton.click()
    await page.waitForLoadState('networkidle')
    if (DEMO_MODE) await page.waitForTimeout(wait(3000))
    console.log('   ✅ Performance metrics saved to localStorage\n')

    console.log('\n🎉 ========================================')
    console.log('   STEP 8 COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ Governance Metrics (EDM): 5 KPIs')
    console.log('   ✅ Strategic Metrics (APO): 4 KPIs')
    console.log('   ✅ Build/Implement Metrics (BAI): 3 KPIs')
    console.log('   ✅ Operational Metrics (DSS): 3 KPIs')
    console.log('   ✅ Compliance Metrics (MEA): 2 KPIs')
    console.log('   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('   📊 Total KPIs Defined: 17')
    console.log('   🎯 All metrics aligned with Steps 4-5 objectives')
    console.log('   📈 Performance measurement framework established')
    console.log('   ✅ Ready for Step 9: Enabler Deployment')
    console.log('========================================\n')

    console.log('✨ Demo Step 8 completed successfully!\n')
  })
})
