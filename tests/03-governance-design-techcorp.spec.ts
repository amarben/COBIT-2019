import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

test.describe('TechCorp Financial - Step 3: Governance Design', () => {
  test('design tailored governance framework for TechCorp Financial Services', async ({ page }) => {
    test.setTimeout(timeout(300000)) // Base: 5 minutes

    await enableCursorTracking(page)

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 3: Governance Design')
    console.log('   Tailoring COBIT 2019 Framework')
    console.log('========================================\n')
    logSpeedConfig()

    await page.goto('http://localhost:5174/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    // Wait for app to fully load
    await page.waitForSelector('aside nav', { state: 'visible', timeout: 30000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(1000))

    console.log('📋 STEP 1: Setting Governance Context...\n')

    // Navigate to Step 1
    await page.locator('aside nav button').filter({ hasText: /Step 1.*Governance Context/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(1000))

    // Fill Step 1: Organization Details
    console.log('   ✏️  Filling organization details...')
    const orgName = page.getByPlaceholder(/Global Financial Services/i)
    await orgName.scrollIntoViewIfNeeded()
    await orgName.click()
    await orgName.pressSequentially('TechCorp Financial Services Inc.', { delay: typeDelay(100) })
    await page.waitForTimeout(1000)
    console.log('   ✅ Organization: TechCorp Financial Services Inc.')

    const industry = page.getByPlaceholder(/Banking and Financial Services/i)
    await industry.scrollIntoViewIfNeeded()
    await industry.click()
    await industry.pressSequentially('Banking and Financial Technology', { delay: typeDelay(80) })
    await page.waitForTimeout(1000)
    console.log('   ✅ Industry: Banking and Financial Technology')

    const size = page.getByPlaceholder(/5,000 employees/i)
    await size.scrollIntoViewIfNeeded()
    await size.click()
    await size.pressSequentially('8,500 employees, $3.2B annual revenue', { delay: typeDelay(80) })
    await page.waitForTimeout(1000)
    console.log('   ✅ Size: 8,500 employees, $3.2B annual revenue')

    const itRole = page.getByPlaceholder(/Key enabler/i)
    await itRole.scrollIntoViewIfNeeded()
    await itRole.click()
    await itRole.pressSequentially('Strategic enabler and core business differentiator for digital banking', { delay: typeDelay(60) })
    await page.waitForTimeout(1000)
    console.log('   ✅ IT Role: Strategic enabler\n')

    // Select 5 key enterprise goals
    console.log('   ✏️  Selecting 5 enterprise goals...')
    const goals = [
      'Managed business risk',
      'Compliance with external laws and regulations',
      'Agility to respond to changing business environment',
      'Optimization of internal business process functionality',
      'Product and business innovation culture'
    ]

    for (const goal of goals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await button.click()
      await page.waitForTimeout(wait(1200))
      console.log(`   ✅ ${goal.substring(0, 40)}...`)
    }

    const saveContextButton = page.getByRole('button', { name: /Save.*Context/i })
    await saveContextButton.scrollIntoViewIfNeeded()
    await saveContextButton.click()
    await page.waitForTimeout(wait(2000))
    console.log('   ✅ Step 1 complete\n')

    console.log('📊 STEP 2: Capability Assessment...\n')

    // Navigate to Step 2
    await page.locator('aside nav button').filter({ hasText: /Step 2.*Capability Assessment/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(1500))

    // Assess 7 key processes
    const assessments = [
      { id: 'EDM01', current: 2, target: 4, priority: 'high' },
      { id: 'EDM03', current: 2, target: 5, priority: 'high' },
      { id: 'APO12', current: 2, target: 4, priority: 'high' },
      { id: 'APO13', current: 2, target: 5, priority: 'high' },
      { id: 'BAI06', current: 2, target: 4, priority: 'medium' },
      { id: 'DSS05', current: 2, target: 4, priority: 'high' },
      { id: 'MEA03', current: 3, target: 4, priority: 'high' }
    ]

    console.log(`   Assessing ${assessments.length} processes`)
    for (const assessment of assessments) {
      const row = page.locator('tr').filter({ hasText: new RegExp(assessment.id) }).first()
      await row.scrollIntoViewIfNeeded()
      await page.waitForTimeout(wait(300))

      const currentSelect = row.locator('select').first()
      await currentSelect.selectOption(assessment.current.toString())
      await page.waitForTimeout(wait(300))

      const targetSelect = row.locator('select').nth(1)
      await targetSelect.selectOption(assessment.target.toString())
      await page.waitForTimeout(wait(300))

      const prioritySelect = row.locator('select').nth(2)
      await prioritySelect.selectOption(assessment.priority)
      await page.waitForTimeout(wait(300))
    }

    const saveAssessmentButton = page.getByRole('button', { name: /Save.*Assessment/i })
    await saveAssessmentButton.scrollIntoViewIfNeeded()
    await saveAssessmentButton.click()
    await page.waitForTimeout(wait(2000))
    console.log('   ✅ Step 2 complete\n')

    console.log('🎨 STEP 3: Governance Design...\n')

    // Navigate to Step 3
    console.log('   Navigating to Governance Design')
    await page.locator('aside nav button').filter({ hasText: /Step 3.*Governance.*Design/i }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(2000))

    // Wait for the design page to load and verify no error
    await page.waitForSelector('text=COBIT 2019 Design Factors', { timeout: 15000 })
    await page.waitForTimeout(wait(1500))

    console.log('   Filling 7 design factors...\n')

    // 1. Enterprise Strategy
    console.log('   1️⃣  Enterprise Strategy')
    const strategyTextarea = page.locator('textarea').first()
    await strategyTextarea.waitFor({ state: 'visible', timeout: 10000 })
    await strategyTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(500))
    await strategyTextarea.click()
    await page.waitForTimeout(wait(500))
    const strategyText = 'Digital transformation to become a leading online financial services provider. Expanding mobile banking capabilities, launching fintech partnerships, modernizing legacy core banking systems, and leveraging AI/ML for personalized customer experiences and fraud detection.'
    await strategyTextarea.fill(strategyText)
    await page.waitForTimeout(wait(800))

    // 2. Enterprise Goals Alignment
    console.log('   2️⃣  Enterprise Goals Alignment')
    const goalsTextarea = page.locator('textarea').nth(1)
    await goalsTextarea.click()
    await page.waitForTimeout(wait(500))
    const goalsText = 'Financial goals (managed risk, compliance) drive robust governance and risk management frameworks. Customer goals (agility) require flexible IT architecture. Internal goals (managed security) prioritize cybersecurity investments. Learning goals (innovation) support emerging technology adoption.'
    await goalsTextarea.fill(goalsText)
    await page.waitForTimeout(wait(800))

    // 3. Risk Profile
    console.log('   3️⃣  Risk Profile')
    const riskTextarea = page.locator('textarea').nth(2)
    await riskTextarea.click()
    await page.waitForTimeout(wait(500))
    const riskText = 'Conservative risk appetite due to regulatory oversight and fiduciary responsibilities. Primary risk concerns: cyber threats and data breaches, operational disruptions to banking services, regulatory non-compliance penalties, fraud and financial crimes, third-party vendor risks.'
    await riskTextarea.fill(riskText)
    await page.waitForTimeout(wait(800))

    // 4. IT Role
    console.log('   4️⃣  IT Role: Strategic')
    const itRoleSelect = page.locator('select').first()
    await itRoleSelect.selectOption('strategic')
    await page.waitForTimeout(wait(800))

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
      await page.waitForTimeout(wait(400))

      const addButton = page.getByRole('button', { name: 'Add' })
      await addButton.click()
      await page.waitForTimeout(wait(600))
    }

    // 6. Threat Landscape
    console.log('   6️⃣  Threat Landscape')
    const threatTextarea = page.locator('textarea').nth(3)
    await threatTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(500))
    await threatTextarea.click()
    await page.waitForTimeout(wait(500))
    const threatText = 'High-value target for cybercriminals and organized crime. Increasing sophistication in ransomware, phishing, and social engineering attacks. State-sponsored APT (Advanced Persistent Threat) actors targeting financial sector. DDoS threats against online banking infrastructure. Insider threats from privileged access.'
    await threatTextarea.fill(threatText)
    await page.waitForTimeout(wait(800))

    // 7. Technology Adoption
    console.log('   7️⃣  Technology Adoption')
    const techTextarea = page.locator('textarea').nth(4)
    await techTextarea.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(500))
    await techTextarea.click()
    await page.waitForTimeout(wait(500))
    const techText = 'Cloud-first strategy with hybrid deployment model. Adopting AI/ML for fraud detection, customer service chatbots, and risk analytics. Implementing zero-trust security architecture. API-driven microservices replacing monolithic systems. DevSecOps practices for continuous delivery.'
    await techTextarea.fill(techText)
    await page.waitForTimeout(wait(800))

    // Save the governance design
    console.log('\n   💾 Saving governance design...')
    const saveButton = page.getByRole('button', { name: /Save.*Governance.*Design/i })
    await saveButton.scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)
    await saveButton.click()
    await page.waitForTimeout(3000)

    console.log('   ✅ Step 3 complete!')
    console.log('\n🎉 Full workflow complete: Steps 1 → 2 → 3')
    console.log('   TechCorp governance framework tailored successfully\n')

    // Verify by going to dashboard
    await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(2000))
  })
})
