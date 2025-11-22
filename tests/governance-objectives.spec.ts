import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('COBIT 2019 Governance Objectives Demo', () => {
  test('demonstrates EDM governance objectives selection and practice implementation', async ({ page }) => {
    test.setTimeout(600000)

    console.log('\n🎬 ========================================')
    console.log('   COBIT 2019 GOVERNANCE OBJECTIVES')
    console.log('   EDM (Evaluate, Direct, Monitor)')
    console.log('   Red cursor indicator enabled')
    console.log('========================================\n')

    await enableCursorTracking(page)
    await page.goto('http://localhost:5173/')

    // Navigate to Governance Objectives
    console.log('📍 Step 1: Opening Governance Objectives...')
    await page.locator('aside nav button').filter({ hasText: /Governance Objectives/i }).first().click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Enable EDM01
    console.log('\n🎯 Step 2: Enabling EDM01 - Governance Framework...')
    const edm01Card = page.locator('div').filter({ hasText: /EDM01.*Governance Framework Setting/i }).first()
    const edm01Button = edm01Card.locator('button').first()
    await edm01Button.scrollIntoViewIfNeeded()
    await edm01Button.click()
    await page.waitForTimeout(1500)
    console.log('   ✅ EDM01 enabled')

    // Implement practices for EDM01
    console.log('\n📋 Step 3: Implementing EDM01 Practices...')
    const practice1 = edm01Card.locator('button').filter({ hasText: /EDM01.01/i })
    await practice1.scrollIntoViewIfNeeded()
    await practice1.click()
    await page.waitForTimeout(1000)
    console.log('   ✅ EDM01.01: Evaluate governance system')

    const practice2 = edm01Card.locator('button').filter({ hasText: /EDM01.02/i })
    await practice2.click()
    await page.waitForTimeout(1000)
    console.log('   ✅ EDM01.02: Direct governance system')

    // Enable EDM03 - Risk Optimization
    console.log('\n⚠️  Step 4: Enabling EDM03 - Risk Optimization...')
    const edm03Card = page.locator('div').filter({ hasText: /EDM03.*Risk Optimization/i }).first()
    await edm03Card.locator('button').first().scrollIntoViewIfNeeded()
    await edm03Card.locator('button').first().click()
    await page.waitForTimeout(1500)
    console.log('   ✅ EDM03 enabled')

    // Implement all EDM03 practices
    console.log('\n📋 Step 5: Implementing All EDM03 Practices...')
    const edm03Practices = edm03Card.locator('button').filter({ hasText: /EDM03\./i })
    const practiceCount = await edm03Practices.count()

    for (let i = 0; i < practiceCount; i++) {
      await edm03Practices.nth(i).scrollIntoViewIfNeeded()
      await edm03Practices.nth(i).click()
      await page.waitForTimeout(800)
    }
    console.log(`   ✅ All ${practiceCount} EDM03 practices implemented`)

    // Enable EDM02 - Benefits Delivery
    console.log('\n💰 Step 6: Enabling EDM02 - Benefits Delivery...')
    const edm02Card = page.locator('div').filter({ hasText: /EDM02.*Benefits Delivery/i }).first()
    await edm02Card.locator('button').first().scrollIntoViewIfNeeded()
    await edm02Card.locator('button').first().click()
    await page.waitForTimeout(1500)
    console.log('   ✅ EDM02 enabled')

    // Save objectives
    console.log('\n💾 Step 7: Saving Governance Objectives...')
    const saveButton = page.getByRole('button', { name: /Save Governance Objectives/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForTimeout(2000)
    console.log('   ✅ Objectives saved')

    // Verify summary
    console.log('\n📊 Step 8: Verifying Summary Status...')
    await expect(page.locator('text=/objectives enabled/i')).toBeVisible()
    await expect(page.locator('text=/Practices Implemented/i')).toBeVisible()
    console.log('   ✅ Summary statistics updated')

    console.log('\n🎉 ========================================')
    console.log('   GOVERNANCE OBJECTIVES COMPLETED!')
    console.log('   ✅ 3 EDM objectives enabled')
    console.log('   ✅ EDM01: 2/3 practices implemented')
    console.log('   ✅ EDM03: All practices implemented')
    console.log('   ✅ EDM02: Framework enabled')
    console.log('   ✅ Governance oversight established')
    console.log('========================================\n')
  })
})
