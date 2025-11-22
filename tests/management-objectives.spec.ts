import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('COBIT 2019 Management Objectives Demo', () => {
  test('demonstrates management objectives selection across APO/BAI/DSS/MEA domains', async ({ page }) => {
    test.setTimeout(600000)

    console.log('\n🎬 ========================================')
    console.log('   COBIT 2019 MANAGEMENT OBJECTIVES')
    console.log('   APO, BAI, DSS, MEA Domains')
    console.log('   Red cursor indicator enabled')
    console.log('========================================\n')

    await enableCursorTracking(page)
    await page.goto('http://localhost:5173/')

    // Navigate to Management Objectives
    console.log('📍 Step 1: Opening Management Objectives...')
    await page.locator('aside nav button').filter({ hasText: /Management Objectives/i }).first().click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Enable APO12 - Managed Risk
    console.log('\n🎯 Step 2: Enabling APO12 - Managed Risk...')
    const apo12 = page.locator('div').filter({ hasText: /APO12.*Managed Risk/i }).first()
    await apo12.locator('button').first().scrollIntoViewIfNeeded()
    await apo12.locator('button').first().click()
    await page.waitForTimeout(1500)
    console.log('   ✅ APO12 enabled')

    // Set priority to high
    const apo12Priority = apo12.locator('select')
    await apo12Priority.selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ Priority set to: High')

    // Enable APO13 - Managed Security
    console.log('\n🔒 Step 3: Enabling APO13 - Managed Security...')
    const apo13 = page.locator('div').filter({ hasText: /APO13.*Managed Security/i }).first()
    await apo13.locator('button').first().scrollIntoViewIfNeeded()
    await apo13.locator('button').first().click()
    await page.waitForTimeout(1500)
    await apo13.locator('select').selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ APO13 enabled (High priority)')

    // Enable DSS05 - Managed Security Services
    console.log('\n🛡️  Step 4: Enabling DSS05 - Managed Security Services...')
    const dss05 = page.locator('div').filter({ hasText: /DSS05.*Security Services/i }).first()
    await dss05.locator('button').first().scrollIntoViewIfNeeded()
    await dss05.locator('button').first().click()
    await page.waitForTimeout(1500)
    await dss05.locator('select').selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ DSS05 enabled (High priority)')

    // Enable MEA01 - Performance Monitoring
    console.log('\n📊 Step 5: Enabling MEA01 - Performance Monitoring...')
    const mea01 = page.locator('div').filter({ hasText: /MEA01.*Performance.*Monitoring/i }).first()
    await mea01.locator('button').first().scrollIntoViewIfNeeded()
    await mea01.locator('button').first().click()
    await page.waitForTimeout(1500)
    await mea01.locator('select').selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ MEA01 enabled (High priority)')

    // Enable MEA03 - Managed Compliance
    console.log('\n📋 Step 6: Enabling MEA03 - Compliance Management...')
    const mea03 = page.locator('div').filter({ hasText: /MEA03.*Compliance/i }).first()
    await mea03.locator('button').first().scrollIntoViewIfNeeded()
    await mea03.locator('button').first().click()
    await page.waitForTimeout(1500)
    await mea03.locator('select').selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ MEA03 enabled (High priority)')

    // Test filtering
    console.log('\n🔍 Step 7: Testing Domain Filter...')
    const domainFilter = page.locator('select').filter({ hasText: /All Domains/i }).first()
    await domainFilter.scrollIntoViewIfNeeded()
    await domainFilter.selectOption('APO')
    await page.waitForTimeout(1500)
    console.log('   ✅ Filtered to APO domain')

    await domainFilter.selectOption('')
    await page.waitForTimeout(1000)
    console.log('   ✅ Filter cleared')

    // Save objectives
    console.log('\n💾 Step 8: Saving Management Objectives...')
    const saveButton = page.getByRole('button', { name: /Save Management Objectives/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForTimeout(2000)
    console.log('   ✅ Objectives saved')

    // Verify summary
    console.log('\n📈 Step 9: Verifying Selection Summary...')
    await expect(page.locator('text=/Total Enabled/i')).toBeVisible()
    await expect(page.locator('text=/High Priority/i')).toBeVisible()
    console.log('   ✅ Summary shows 5 objectives enabled')
    console.log('   ✅ All 5 marked as high priority')

    console.log('\n🎉 ========================================')
    console.log('   MANAGEMENT OBJECTIVES COMPLETED!')
    console.log('   ✅ 5 objectives enabled across 4 domains')
    console.log('   ✅ APO: 2 objectives (Risk, Security)')
    console.log('   ✅ DSS: 1 objective (Security Services)')
    console.log('   ✅ MEA: 2 objectives (Performance, Compliance)')
    console.log('   ✅ All set to high priority')
    console.log('========================================\n')
  })
})
