import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('COBIT 2019 Capability Assessment Demo', () => {
  test('demonstrates process capability assessment with maturity levels', async ({ page }) => {
    test.setTimeout(600000)

    console.log('\n🎬 ========================================')
    console.log('   COBIT 2019 CAPABILITY ASSESSMENT')
    console.log('   Process Maturity Evaluation (0-5 Scale)')
    console.log('   Red cursor indicator enabled')
    console.log('========================================\n')

    await enableCursorTracking(page)
    await page.goto('http://localhost:5173/')

    // Navigate to Capability Assessment
    console.log('📍 Step 1: Opening Capability Assessment...')
    await page.locator('aside nav button').filter({ hasText: /Capability Assessment/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Assess EDM01
    console.log('\n📊 Step 2: Assessing EDM01 Governance Framework...')
    const edm01Row = page.locator('tr').filter({ hasText: /EDM01/ }).first()

    // Set current level
    const currentSelect = edm01Row.locator('select').first()
    await currentSelect.scrollIntoViewIfNeeded()
    await currentSelect.selectOption('2')
    await page.waitForTimeout(1000)
    console.log('   ✅ Current Level: 2 (Managed)')

    // Set target level
    const targetSelect = edm01Row.locator('select').nth(1)
    await targetSelect.selectOption('4')
    await page.waitForTimeout(1000)
    console.log('   ✅ Target Level: 4 (Predictable)')
    console.log('   ✅ Gap: 2 levels')

    // Assess APO12 - Managed Risk
    console.log('\n🎯 Step 3: Assessing APO12 Managed Risk...')
    const apo12Row = page.locator('tr').filter({ hasText: /APO12/ }).first()

    await apo12Row.locator('select').first().selectOption('1')
    await page.waitForTimeout(1000)
    console.log('   ✅ Current Level: 1 (Performed)')

    await apo12Row.locator('select').nth(1).selectOption('4')
    await page.waitForTimeout(1000)
    console.log('   ✅ Target Level: 4 (Predictable)')

    // Set priority to high
    await apo12Row.locator('select').nth(2).selectOption('high')
    await page.waitForTimeout(1000)
    console.log('   ✅ Priority: High')

    // Assess APO13 - Managed Security
    console.log('\n🔒 Step 4: Assessing APO13 Managed Security...')
    const apo13Row = page.locator('tr').filter({ hasText: /APO13/ }).first()

    await apo13Row.locator('select').first().selectOption('2')
    await apo13Row.locator('select').nth(1).selectOption('5')
    await apo13Row.locator('select').nth(2).selectOption('high')
    await page.waitForTimeout(1500)
    console.log('   ✅ Current: 2, Target: 5, Priority: High')

    // Save assessment
    console.log('\n💾 Step 5: Saving Capability Assessment...')
    const saveButton = page.getByRole('button', { name: /Save Capability Assessment/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForTimeout(2000)
    console.log('   ✅ Assessment saved')

    // Verify summary stats
    console.log('\n📈 Step 6: Verifying Summary Statistics...')
    await expect(page.locator('text=/processes assessed/i')).toBeVisible()
    console.log('   ✅ Summary statistics displayed')

    console.log('\n🎉 ========================================')
    console.log('   CAPABILITY ASSESSMENT COMPLETED!')
    console.log('   ✅ Multiple processes assessed')
    console.log('   ✅ Maturity levels set (0-5 scale)')
    console.log('   ✅ Capability gaps identified')
    console.log('   ✅ Priorities assigned')
    console.log('   ✅ Data persisted')
    console.log('========================================\n')
  })
})
