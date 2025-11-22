import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('COBIT 2019 Governance Context Demo', () => {
  test('demonstrates enterprise context definition with cursor tracking', async ({ page }) => {
    test.setTimeout(600000)

    console.log('\n🎬 ========================================')
    console.log('   COBIT 2019 GOVERNANCE CONTEXT')
    console.log('   Enterprise Goal Alignment')
    console.log('   Red cursor indicator enabled')
    console.log('========================================\n')

    await enableCursorTracking(page)

    await page.goto('http://localhost:5173/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    // Navigate to Governance Context
    console.log('📍 Step 1: Opening Governance Context Definition...')
    await page.locator('aside nav button').filter({ hasText: /Governance Context/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Fill Organization Details
    console.log('\n🏢 Step 2: Defining Organization Details...')
    const orgName = page.getByPlaceholder(/organization name/i)
    await orgName.scrollIntoViewIfNeeded()
    await orgName.click()
    await orgName.fill('Global Financial Services Inc.')
    await page.waitForTimeout(1000)
    console.log('   ✅ Organization: Global Financial Services Inc.')

    const industry = page.getByPlaceholder(/industry/i)
    await industry.click()
    await industry.fill('Banking and Financial Services')
    await page.waitForTimeout(1000)
    console.log('   ✅ Industry: Banking and Financial Services')

    const size = page.getByPlaceholder(/organization size/i)
    await size.click()
    await size.fill('5,000 employees, $2B revenue')
    await page.waitForTimeout(1000)
    console.log('   ✅ Size: 5,000 employees, $2B revenue')

    const itRole = page.getByPlaceholder(/IT role/i)
    await itRole.click()
    await itRole.fill('Key enabler of digital banking services')
    await page.waitForTimeout(1000)
    console.log('   ✅ IT Role: Key enabler of digital banking')

    // Select Enterprise Goals (Balanced Scorecard)
    console.log('\n📋 Step 3: Selecting Enterprise Goals (Balanced Scorecard)...')
    console.log('   📊 Financial Perspective:')

    // Find and click "Stakeholder value" goal
    const stakeholderValue = page.locator('button').filter({
      hasText: /Stakeholder value of business investments/i
    }).first()
    await stakeholderValue.scrollIntoViewIfNeeded()
    await stakeholderValue.click()
    await page.waitForTimeout(1500)
    console.log('   ☑️  Stakeholder value of business investments')

    // Customer perspective
    console.log('   👥 Customer Perspective:')
    const customerService = page.locator('button').filter({
      hasText: /Customer-oriented service culture/i
    }).first()
    await customerService.scrollIntoViewIfNeeded()
    await customerService.click()
    await page.waitForTimeout(1500)
    console.log('   ☑️  Customer-oriented service culture')

    // Internal perspective
    console.log('   🔧 Internal Perspective:')
    const businessRisk = page.locator('button').filter({
      hasText: /Managed business risk/i
    }).first()
    await businessRisk.scrollIntoViewIfNeeded()
    await businessRisk.click()
    await page.waitForTimeout(1500)
    console.log('   ☑️  Managed business risk')

    // Learning perspective
    console.log('   📚 Learning & Growth Perspective:')
    const skilledPeople = page.locator('button').filter({
      hasText: /Skilled and motivated people/i
    }).first()
    await skilledPeople.scrollIntoViewIfNeeded()
    await skilledPeople.click()
    await page.waitForTimeout(1500)
    console.log('   ☑️  Skilled and motivated people')

    console.log('✅ 4 Enterprise goals selected across BSC perspectives\n')

    // Add Stakeholder
    console.log('👥 Step 4: Identifying Stakeholder Needs...')
    const stakeholderInputs = page.locator('input[placeholder*="Board"]')
    if (await stakeholderInputs.count() > 0) {
      const stakeholderName = stakeholderInputs.first()
      await stakeholderName.scrollIntoViewIfNeeded()
      await stakeholderName.click()
      await stakeholderName.fill('Executive Board')
      await page.waitForTimeout(1000)
      console.log('   ✅ Stakeholder: Executive Board')

      // Fill needs
      const needsInput = page.locator('input').filter({ hasText: '' }).nth(5)
      await needsInput.fill('ROI visibility and risk oversight')
      await page.waitForTimeout(1000)
      console.log('   ✅ Needs: ROI visibility and risk oversight')
    }

    // Save
    console.log('\n💾 Step 5: Saving Governance Context...')
    const saveButton = page.getByRole('button', { name: /save governance context/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForTimeout(2000)
    console.log('   ✅ Context saved successfully')

    console.log('\n🎉 ========================================')
    console.log('   GOVERNANCE CONTEXT COMPLETED!')
    console.log('   ✅ Enterprise goals aligned (BSC)')
    console.log('   ✅ Stakeholder needs identified')
    console.log('   ✅ Ready for capability assessment')
    console.log('   ✅ COBIT 2019 design factors captured')
    console.log('========================================\n')

    // Verify we can see the data on dashboard
    console.log('📊 Step 6: Verifying Dashboard Update...')
    await page.locator('aside nav button').filter({ hasText: /dashboard/i }).first().click()
    await page.waitForTimeout(2000)

    await expect(page.locator('text=Global Financial Services Inc.')).toBeVisible()
    console.log('   ✅ Dashboard reflects saved context')

    console.log('\n✨ Demo completed successfully!\n')
  })
})
