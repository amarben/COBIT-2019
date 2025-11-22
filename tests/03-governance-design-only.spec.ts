import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'

test.describe('TechCorp Financial - Step 3: Governance Design (Only)', () => {
  test('design governance framework with existing context', async ({ page }) => {
    test.setTimeout(600000)

    await enableCursorTracking(page)

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 3: Governance Design')
    console.log('   (Using existing Steps 1 & 2 context)')
    console.log('========================================\n')

    // Load the page - context should already exist from previous tests
    await page.goto('http://localhost:5174/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1500)

    // Navigate to Step 3
    console.log('📍 Navigating to Governance Design...')
    const designButton = page.locator('aside nav button').filter({ hasText: /Step 3.*Governance.*Design/i })
    await designButton.scrollIntoViewIfNeeded()
    await designButton.click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Wait for the design page to load
    await page.waitForSelector('text=COBIT 2019 Design Factors', { timeout: 15000 })
    await page.waitForTimeout(1500)

    console.log('\n🎨 COBIT 2019 DESIGN FACTORS')
    console.log('   Customizing framework for TechCorp...\n')

    // 1. Enterprise Strategy
    console.log('   1️⃣  Enterprise Strategy')
    const strategyTextarea = page.locator('textarea').first()
    await strategyTextarea.waitFor({ state: 'visible', timeout: 10000 })
    await strategyTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await strategyTextarea.click()
    await page.waitForTimeout(300)
    await strategyTextarea.pressSequentially('Digital transformation to become a leading online financial services provider. Expanding mobile banking capabilities, launching fintech partnerships, modernizing legacy core banking systems, and leveraging AI/ML for personalized customer experiences and fraud detection.', { delay: 20 })
    await page.waitForTimeout(800)

    // 2. Enterprise Goals Alignment
    console.log('   2️⃣  Enterprise Goals Alignment')
    const goalsTextarea = page.locator('textarea').nth(1)
    await goalsTextarea.click()
    await page.waitForTimeout(300)
    await goalsTextarea.pressSequentially('Financial goals (managed risk, compliance) drive robust governance and risk management frameworks. Customer goals (agility) require flexible IT architecture. Internal goals (managed security) prioritize cybersecurity investments. Learning goals (innovation) support emerging technology adoption.', { delay: 20 })
    await page.waitForTimeout(800)

    // 3. Risk Profile
    console.log('   3️⃣  Risk Profile')
    const riskTextarea = page.locator('textarea').nth(2)
    await riskTextarea.click()
    await page.waitForTimeout(300)
    await riskTextarea.pressSequentially('Conservative risk appetite due to regulatory oversight and fiduciary responsibilities. Primary risk concerns: cyber threats and data breaches, operational disruptions to banking services, regulatory non-compliance penalties, fraud and financial crimes, third-party vendor risks.', { delay: 20 })
    await page.waitForTimeout(800)

    // 4. IT Role
    console.log('   4️⃣  IT Role: Strategic')
    const itRoleSelect = page.locator('select').first()
    await itRoleSelect.selectOption('strategic')
    await page.waitForTimeout(800)

    // 5. Compliance Requirements
    console.log('   5️⃣  Compliance Requirements (6 regulations)')
    const complianceReqs = [
      'SOX (Sarbanes-Oxley Act)',
      'GDPR (Data Protection)',
      'PCI-DSS (Payment Card Security)',
      'GLBA (Financial Privacy)',
      'FFIEC Guidelines',
      'Basel III (Capital Requirements)'
    ]

    for (const req of complianceReqs) {
      const complianceInput = page.locator('input[placeholder*="GDPR"]').or(page.locator('input[placeholder*="compliance"]')).first()
      await complianceInput.click()
      await complianceInput.fill(req)
      await page.waitForTimeout(300)

      const addButton = page.getByRole('button', { name: 'Add' })
      await addButton.click()
      await page.waitForTimeout(500)
    }

    // 6. Threat Landscape
    console.log('   6️⃣  Threat Landscape')
    const threatTextarea = page.locator('textarea').nth(3)
    await threatTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await threatTextarea.click()
    await page.waitForTimeout(300)
    await threatTextarea.pressSequentially('High-value target for cybercriminals and organized crime. Increasing sophistication in ransomware, phishing, and social engineering attacks. State-sponsored APT (Advanced Persistent Threat) actors targeting financial sector. DDoS threats against online banking infrastructure. Insider threats from privileged access.', { delay: 20 })
    await page.waitForTimeout(800)

    // 7. Technology Adoption
    console.log('   7️⃣  Technology Adoption')
    const techTextarea = page.locator('textarea').nth(4)
    await techTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)
    await techTextarea.click()
    await page.waitForTimeout(300)
    await techTextarea.pressSequentially('Cloud-first strategy with hybrid deployment model. Adopting AI/ML for fraud detection, customer service chatbots, and risk analytics. Implementing zero-trust security architecture. API-driven microservices replacing monolithic systems. DevSecOps practices for continuous delivery.', { delay: 20 })
    await page.waitForTimeout(800)

    // Save the governance design
    console.log('\n   💾 Saving governance design...')
    const saveButton = page.getByRole('button', { name: /Save.*Governance.*Design/i })
    await saveButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await saveButton.click()
    await page.waitForTimeout(3000)

    console.log('   ✅ Step 3 complete!')
    console.log('\n🎉 Governance framework customized for TechCorp Financial Services\n')

    // Verify by going to dashboard
    await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
  })
})
