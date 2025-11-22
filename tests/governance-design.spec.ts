import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('COBIT 2019 Governance Design Demo', () => {
  test('demonstrates governance framework design with design factors', async ({ page }) => {
    test.setTimeout(600000)

    console.log('\n🎬 ========================================')
    console.log('   COBIT 2019 GOVERNANCE DESIGN')
    console.log('   Design Factors Customization')
    console.log('   Red cursor indicator enabled')
    console.log('========================================\n')

    await enableCursorTracking(page)
    await page.goto('http://localhost:5173/')

    // First set up context (prerequisite)
    console.log('📍 Setup: Creating basic context...')
    await page.locator('aside nav button').filter({ hasText: /Governance Context/i }).click()
    await page.waitForTimeout(1000)

    await page.getByPlaceholder(/organization name/i).fill('Tech Innovators Inc.')
    await page.getByPlaceholder(/industry/i).fill('Technology')
    await page.waitForTimeout(500)

    await page.getByRole('button', { name: /Save Governance Context/i }).click()
    await page.waitForTimeout(1500)

    // Navigate to Governance Design
    console.log('\n📍 Step 1: Opening Governance Design...')
    await page.locator('aside nav button').filter({ hasText: /Governance Design/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Enterprise Strategy
    console.log('\n🎯 Step 2: Defining Enterprise Strategy...')
    const strategyTextarea = page.locator('textarea').first()
    await strategyTextarea.scrollIntoViewIfNeeded()
    await strategyTextarea.click()
    await strategyTextarea.fill('Cloud-first digital transformation strategy focused on AI/ML capabilities and market leadership in SaaS solutions')
    await page.waitForTimeout(1500)
    console.log('   ✅ Enterprise strategy defined')

    // Risk Profile
    console.log('\n⚠️  Step 3: Documenting Risk Profile...')
    const riskTextarea = page.locator('textarea').nth(2)
    await riskTextarea.scrollIntoViewIfNeeded()
    await riskTextarea.click()
    await riskTextarea.fill('Moderate risk appetite with focus on innovation; key risks: data security, rapid scaling challenges, competitive threats')
    await page.waitForTimeout(1500)
    console.log('   ✅ Risk profile documented')

    // IT Role
    console.log('\n💻 Step 4: Defining IT Role...')
    const itRoleSelect = page.locator('select').filter({ hasText: /Support|Factory|Turnaround|Strategic/i })
    await itRoleSelect.scrollIntoViewIfNeeded()
    await itRoleSelect.selectOption('strategic')
    await page.waitForTimeout(1000)
    console.log('   ✅ IT Role: Strategic (critical for current and future)')

    // Compliance Requirements
    console.log('\n📋 Step 5: Adding Compliance Requirements...')
    const complianceInput = page.getByPlaceholder(/GDPR|SOX/i)
    await complianceInput.scrollIntoViewIfNeeded()

    await complianceInput.fill('GDPR')
    await page.getByRole('button', { name: /Add/i }).first().click()
    await page.waitForTimeout(1000)
    console.log('   ✅ Added: GDPR')

    await complianceInput.fill('SOC 2')
    await page.getByRole('button', { name: /Add/i }).first().click()
    await page.waitForTimeout(1000)
    console.log('   ✅ Added: SOC 2')

    await complianceInput.fill('ISO 27001')
    await page.getByRole('button', { name: /Add/i }).first().click()
    await page.waitForTimeout(1000)
    console.log('   ✅ Added: ISO 27001')

    // Threat Landscape
    console.log('\n🛡️  Step 6: Describing Threat Landscape...')
    const threatTextarea = page.locator('textarea').filter({ hasText: '' }).last()
    await threatTextarea.scrollIntoViewIfNeeded()
    await threatTextarea.click()
    await threatTextarea.fill('High-value target for ransomware and state-sponsored attacks; increasing phishing sophistication; supply chain vulnerabilities')
    await page.waitForTimeout(1500)
    console.log('   ✅ Threat landscape described')

    // Save design
    console.log('\n💾 Step 7: Saving Governance Design...')
    const saveButton = page.getByRole('button', { name: /Save Governance Design/i })
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    await page.waitForTimeout(2000)
    console.log('   ✅ Design saved')

    // Verify design recommendations
    console.log('\n📊 Step 8: Reviewing Design Recommendations...')
    await expect(page.locator('text=/Design Recommendations/i')).toBeVisible()
    console.log('   ✅ Design recommendations generated')

    console.log('\n🎉 ========================================')
    console.log('   GOVERNANCE DESIGN COMPLETED!')
    console.log('   ✅ All 7 design factors configured')
    console.log('   ✅ Enterprise strategy defined')
    console.log('   ✅ Risk profile documented')
    console.log('   ✅ Compliance requirements (3) added')
    console.log('   ✅ Recommendations generated')
    console.log('========================================\n')
  })
})
