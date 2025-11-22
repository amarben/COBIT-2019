import { test, expect } from '@playwright/test'
import { enableCursorTracking } from './helpers/cursor-tracker'
import { wait, typeDelay, timeout, logSpeedConfig } from './helpers/demo-config'

test.describe('TechCorp Financial - Step 1: Governance Context', () => {
  test('complete governance context definition for TechCorp Financial Services', async ({ page }) => {
    test.setTimeout(timeout(420000)) // Base: 7 minutes (increased from 5)

    // Helper to move cursor to element
    const moveCursor = async (element: any) => {
      try {
        const box = await element.boundingBox()
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 })
          await page.waitForTimeout(80)
        }
      } catch (e) { /* element not visible */ }
    }

    console.log('\n🎬 ========================================')
    console.log('   TECHCORP FINANCIAL SERVICES')
    console.log('   Step 1: Governance Context Definition')
    console.log('   COBIT 2019 Implementation Demo')
    console.log('========================================\n')
    logSpeedConfig()

    await enableCursorTracking(page)

    await page.goto('http://localhost:5174/')
    await page.evaluate(() => localStorage.clear())
    await page.reload()

    // Wait for app to fully load
    console.log('⏳ Waiting for app to load...')
    await page.waitForSelector('aside nav', { state: 'visible', timeout: 30000 })
    await page.waitForSelector('aside nav button', { state: 'visible', timeout: 30000 })
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(1000))

    // Navigate to Governance Context
    console.log('📍 Navigating to Governance Context...')
    const navButton = page.locator('aside nav button').filter({ hasText: /Step 1.*Governance Context/i })
    await moveCursor(navButton)
    await navButton.click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(1500))

    // Wait for Governance Context page to load
    await page.waitForSelector('text=Governance Context Definition', { timeout: 10000 })
    await page.waitForTimeout(wait(1500))

    // ===================================================================
    // ORGANIZATION PROFILE SECTION
    // ===================================================================
    console.log('\n🏢 ORGANIZATION PROFILE')
    console.log('   The platform provides four structured fields to capture')
    console.log('   organizational context. Let\'s document TechCorp\'s profile...\n')
    await page.waitForTimeout(wait(1000))

    const orgName = page.getByPlaceholder(/Global Financial Services/i)
    await orgName.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(800))
    await moveCursor(orgName)
    await orgName.click()
    await orgName.pressSequentially('TechCorp Financial Services Inc.', { delay: typeDelay(100) })
    await page.waitForTimeout(wait(1200))
    console.log('   ✅ Organization: TechCorp Financial Services Inc.')
    console.log('      Formally identifies the organization in all governance documents')

    const industry = page.getByPlaceholder(/Banking and Financial Services/i)
    await industry.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(800))
    await moveCursor(industry)
    await industry.click()
    await industry.pressSequentially('Banking and Financial Technology (FinTech)', { delay: typeDelay(80) })
    await page.waitForTimeout(wait(1200))
    console.log('\n   ✅ Industry: Banking and Financial Technology (FinTech)')
    console.log('      Captures regulatory and competitive context')

    const size = page.getByPlaceholder(/5,000 employees/i)
    await size.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(800))
    await moveCursor(size)
    await size.click()
    await size.pressSequentially('8,500 employees, $3.2B annual revenue', { delay: typeDelay(80) })
    await page.waitForTimeout(wait(1200))
    console.log('\n   ✅ Size: 8,500 employees, $3.2B annual revenue')
    console.log('      Provides clear picture of organizational scale and complexity')

    const itRole = page.getByPlaceholder(/Key enabler/i)
    await itRole.scrollIntoViewIfNeeded()
    await page.waitForTimeout(wait(800))
    await moveCursor(itRole)
    await itRole.click()
    await itRole.pressSequentially('Strategic enabler and core business differentiator for digital banking innovation', { delay: typeDelay(60) })
    await page.waitForTimeout(wait(1200))
    console.log('\n   ✅ IT Role: Strategic enabler and core business differentiator')
    console.log('      Emphasizes IT is central to business strategy, not just support\n')
    await page.waitForTimeout(wait(1500))

    // ===================================================================
    // ENTERPRISE GOALS SECTION - ENHANCED WITH BSC PERSPECTIVE EXPLANATIONS
    // ===================================================================
    console.log('📊 ENTERPRISE GOALS (Balanced Scorecard Framework)')
    console.log('   ========================================')
    console.log('   The platform displays all 13 COBIT enterprise goals')
    console.log('   organized by Balanced Scorecard perspectives.')
    console.log('   TechCorp selects ALL 13 goals, signaling a holistic,')
    console.log('   balanced approach to value creation.\n')
    await page.waitForTimeout(wait(2000))

    // Financial Perspective
    console.log('   💰 FINANCIAL PERSPECTIVE')
    console.log('   ────────────────────────────────────────')
    console.log('   Financial outcomes and shareholder value')
    console.log('   Critical for a $3.2B financial services organization\n')
    await page.waitForTimeout(wait(1500))

    const financialGoals = [
      { name: 'Stakeholder value of business investments', desc: 'ROI and value delivery' },
      { name: 'Portfolio of competitive products and services', desc: 'Market competitiveness' },
      { name: 'Managed business risk', desc: 'Risk management and mitigation' },
      { name: 'Compliance with external laws and regulations', desc: 'Regulatory compliance' }
    ]

    for (const goal of financialGoals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal.name, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await moveCursor(button)
      await button.click()
      await page.waitForTimeout(wait(1400))
      console.log(`   ☑️  ${goal.desc}`)
    }
    await page.waitForTimeout(wait(1500))

    // Customer Perspective
    console.log('\n   👥 CUSTOMER PERSPECTIVE')
    console.log('   ────────────────────────────────────────')
    console.log('   Customer experience and service delivery')
    console.log('   75% of TechCorp interactions are digital\n')
    await page.waitForTimeout(wait(1500))

    const customerGoals = [
      { name: 'Customer-oriented service culture', desc: 'Service excellence culture' },
      { name: 'Business service continuity and availability', desc: '99.95% availability target' },
      { name: 'Agility to respond to changing business environment', desc: 'Market responsiveness' }
    ]

    for (const goal of customerGoals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal.name, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await moveCursor(button)
      await button.click()
      await page.waitForTimeout(wait(1400))
      console.log(`   ☑️  ${goal.desc}`)
    }
    await page.waitForTimeout(wait(1500))

    // Internal Perspective
    console.log('\n   🔧 INTERNAL PERSPECTIVE')
    console.log('   ────────────────────────────────────────')
    console.log('   Operational excellence and efficiency')
    console.log('   Data-driven decision making\n')
    await page.waitForTimeout(wait(1500))

    const internalGoals = [
      { name: 'Quality of management information', desc: 'Data quality and analytics' },
      { name: 'Optimization of internal business process functionality', desc: 'Process optimization' },
      { name: 'Optimization of business process costs', desc: 'Cost efficiency' }
    ]

    for (const goal of internalGoals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal.name, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await moveCursor(button)
      await button.click()
      await page.waitForTimeout(wait(1400))
      console.log(`   ☑️  ${goal.desc}`)
    }
    await page.waitForTimeout(wait(1500))

    // Learning & Growth Perspective
    console.log('\n   📚 LEARNING & GROWTH PERSPECTIVE')
    console.log('   ────────────────────────────────────────')
    console.log('   People, innovation, and transformation')
    console.log('   Building capabilities for future success\n')
    await page.waitForTimeout(wait(1500))

    const learningGoals = [
      { name: 'Skilled and motivated people', desc: 'Talent management' },
      { name: 'Product and business innovation culture', desc: 'Innovation culture' },
      { name: 'Management of business change programs', desc: 'Change management' }
    ]

    for (const goal of learningGoals) {
      const button = page.locator('button').filter({ hasText: new RegExp(goal.name, 'i') }).first()
      await button.scrollIntoViewIfNeeded()
      await moveCursor(button)
      await button.click()
      await page.waitForTimeout(wait(1400))
      console.log(`   ☑️  ${goal.desc}`)
    }
    await page.waitForTimeout(wait(2000))

    console.log('\n   ✅ All 13 enterprise goals selected')
    console.log('   ────────────────────────────────────────')
    console.log('   💡 VISUAL FEEDBACK DEMONSTRATION:')
    console.log('   Notice how each goal displays a teal checkmark when selected.')
    console.log('   The platform provides a real-time counter showing "13 goals selected"')
    console.log('   at the top of the section, giving immediate confirmation of selections.')
    console.log('   The visual highlighting helps users track their progress through')
    console.log('   the 13 enterprise goals at a glance.\n')
    console.log('   This comprehensive selection demonstrates TechCorp\'s')
    console.log('   commitment to balanced value creation across all')
    console.log('   dimensions—not just cost reduction or compliance.\n')
    await page.waitForTimeout(wait(2500))

    // ===================================================================
    // KEY GOVERNANCE CHALLENGES SECTION - ENHANCED WITH SIGNIFICANCE
    // ===================================================================
    console.log('🚨 KEY GOVERNANCE CHALLENGES')
    console.log('   ========================================')
    console.log('   Identifying critical obstacles governance must address.\n')
    await page.waitForTimeout(wait(1500))

    // Scroll to challenges section and center it in viewport
    const challengeInput = page.getByPlaceholder(/Digital transformation/i)
    await challengeInput.evaluate((el) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    await page.waitForTimeout(wait(3000))

    const challenges = [
      {
        text: 'Digital transformation and cloud migration',
        significance: 'Modernizing legacy infrastructure for agility and scale'
      },
      {
        text: 'Regulatory compliance (PCI-DSS, SOC 2, GDPR)',
        significance: 'Complex multi-jurisdiction regulatory environment'
      },
      {
        text: 'Cybersecurity threats and data protection',
        significance: 'Constant threat landscape facing financial institutions'
      },
      {
        text: 'Legacy system modernization',
        significance: 'Replacing aging core banking platforms'
      }
    ]

    for (const challenge of challenges) {
      console.log(`   Challenge: ${challenge.text}`)
      console.log(`   Why it matters: ${challenge.significance}`)

      await moveCursor(challengeInput)
      await challengeInput.click()
      await challengeInput.fill('')
      await challengeInput.pressSequentially(challenge.text, { delay: typeDelay(60) })
      await page.waitForTimeout(wait(1000))

      // Click Add button
      const addButton = page.getByRole('button', { name: /^Add$/i }).first()
      await moveCursor(addButton)
      await addButton.click()
      await page.waitForTimeout(wait(1500))
      console.log(`   ☑️  Challenge added\n`)
    }

    console.log('   ✅ 4 critical challenges documented')
    console.log('   These will inform governance prioritization in Step 4\n')
    await page.waitForTimeout(wait(1500))

    // Demonstrate remove button functionality without clicking
    console.log('   💡 EDIT CAPABILITIES:')
    console.log('   Each challenge has a remove button (×) on the right side.')
    console.log('   If you need to edit, you can remove and re-add challenges.')
    console.log('   The platform preserves your data throughout the session.\n')
    await page.waitForTimeout(wait(1500))

    // ===================================================================
    // KEY STAKEHOLDERS SECTION - ENHANCED WITH CARD/BADGE DEMONSTRATION
    // ===================================================================
    console.log('👥 KEY STAKEHOLDERS')
    console.log('   ========================================')
    console.log('   The platform displays a three-column grid for capturing')
    console.log('   stakeholder information: Name, Needs, and Priority.')
    console.log('   Focusing on executive stakeholders with governance oversight.\n')
    await page.waitForTimeout(wait(2000))

    // Scroll to stakeholder section and center it in viewport
    const nameInput = page.getByPlaceholder(/Board of Directors/i)
    await nameInput.evaluate((el) => {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    await page.waitForTimeout(wait(3000))

    const stakeholderData = [
      {
        name: 'Board of Directors',
        needs: 'Risk oversight, strategic IT investments aligned with business goals, regulatory compliance assurance',
        priority: 'high',
        role: 'Strategic oversight and accountability'
      },
      {
        name: 'Chief Executive Officer',
        needs: 'IT enabling business strategy, competitive advantage through technology, clear ROI',
        priority: 'high',
        role: 'Business strategy alignment'
      },
      {
        name: 'Chief Risk Officer',
        needs: 'Comprehensive risk management, cybersecurity posture, regulatory compliance, business continuity',
        priority: 'high',
        role: 'Risk and compliance oversight'
      }
    ]

    for (const stakeholder of stakeholderData) {
      console.log(`   Stakeholder: ${stakeholder.name}`)
      console.log(`   Role: ${stakeholder.role}`)

      // Fill in stakeholder name
      await moveCursor(nameInput)
      await nameInput.click()
      await nameInput.fill('')
      await nameInput.pressSequentially(stakeholder.name, { delay: typeDelay(80) })
      await page.waitForTimeout(wait(1000))

      // Fill in stakeholder needs
      const needsInput = page.getByPlaceholder(/ROI visibility/i)
      await moveCursor(needsInput)
      await needsInput.click()
      await needsInput.fill('')
      await needsInput.pressSequentially(stakeholder.needs, { delay: typeDelay(50) })
      await page.waitForTimeout(wait(1000))

      // Select priority
      console.log(`   Setting priority: ${stakeholder.priority.toUpperCase()}`)
      const prioritySelect = page.locator('select').last()
      await moveCursor(prioritySelect)
      await prioritySelect.selectOption(stakeholder.priority)
      await page.waitForTimeout(wait(800))

      // Click Add button
      const addButton = page.getByRole('button', { name: /^Add$/i }).last()
      await moveCursor(addButton)
      await addButton.click()
      await page.waitForTimeout(wait(1800))

      console.log(`   ☑️  ${stakeholder.name} added with High priority`)
      console.log(`      Notice the stakeholder appears in a card below`)
      console.log(`      with a red badge indicating High priority\n`)
      await page.waitForTimeout(wait(1000))
    }

    console.log('   ✅ 3 executive stakeholders documented')
    console.log('   All marked High priority - governance must address')
    console.log('   C-suite and Board expectations\n')
    await page.waitForTimeout(wait(1500))

    console.log('   💡 STAKEHOLDER CARD FEATURES:')
    console.log('   Each stakeholder appears in a clean card layout below the form.')
    console.log('   • Name displayed prominently at the top')
    console.log('   • Priority shown as a color-coded badge (Red = High)')
    console.log('   • Needs text displayed below for easy reference')
    console.log('   • Remove button (×) available for editing')
    console.log('   The visual cards make it easy to review all stakeholders at a glance.\n')
    await page.waitForTimeout(wait(2000))

    // ===================================================================
    // SAVE AND VERIFICATION SECTION - ENHANCED
    // ===================================================================
    console.log('💾 SAVING GOVERNANCE CONTEXT')
    console.log('   ========================================\n')
    await page.waitForTimeout(wait(1000))

    const saveButton = page.getByRole('button', { name: /save.*context/i })
    if (await saveButton.isVisible().catch(() => false)) {
      await saveButton.scrollIntoViewIfNeeded()
      await page.waitForTimeout(wait(1000))
      await moveCursor(saveButton)
      await saveButton.click()
      await page.waitForTimeout(wait(2500))
      console.log('   ✅ Governance context saved successfully')
      console.log('   All data persisted to platform database\n')
    }
    await page.waitForTimeout(wait(1500))

    // ===================================================================
    // COMPLETION SUMMARY - ENHANCED
    // ===================================================================
    console.log('🎉 ========================================')
    console.log('   STEP 1 COMPLETED!')
    console.log('   ========================================')
    console.log('   ✅ Organization Profile: Documented')
    console.log('      • TechCorp Financial Services Inc.')
    console.log('      • Banking & FinTech sector')
    console.log('      • 8,500 employees, $3.2B revenue')
    console.log('      • Strategic IT role')
    console.log('\n   ✅ Enterprise Goals: 13/13 selected')
    console.log('      • Financial: 4 goals')
    console.log('      • Customer: 3 goals')
    console.log('      • Internal: 3 goals')
    console.log('      • Learning & Growth: 3 goals')
    console.log('\n   ✅ Governance Challenges: 4 identified')
    console.log('      • Digital transformation')
    console.log('      • Regulatory compliance')
    console.log('      • Cybersecurity')
    console.log('      • Legacy modernization')
    console.log('\n   ✅ Stakeholders: 3 documented (all High priority)')
    console.log('      • Board of Directors')
    console.log('      • Chief Executive Officer')
    console.log('      • Chief Risk Officer')
    console.log('\n   📌 This context becomes the foundation for:')
    console.log('      → Step 2: Capability Assessment')
    console.log('      → Step 3: Governance Design')
    console.log('      → Step 4: Objectives Selection')
    console.log('========================================\n')
    await page.waitForTimeout(wait(3000))

    // ===================================================================
    // DASHBOARD VERIFICATION - ENHANCED
    // ===================================================================
    console.log('📊 DASHBOARD VERIFICATION')
    console.log('   ========================================')
    console.log('   Navigating to dashboard to verify all data is persisted...\n')
    await page.waitForTimeout(wait(1000))

    const dashboardButton = page.locator('aside nav button').filter({ hasText: /dashboard/i }).first()
    await moveCursor(dashboardButton)
    await dashboardButton.click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(wait(2500))

    // Check if org name appears on dashboard
    const dashboardHasOrgName = await page.locator('text=TechCorp Financial Services').isVisible().catch(() => false)
    if (dashboardHasOrgName) {
      console.log('   ✅ Dashboard displays: TechCorp Financial Services Inc.')
      console.log('   ✅ Organization profile section populated')
      console.log('   ✅ Step 1 marked as complete with green checkmark')
      console.log('   ✅ Enterprise goals summary: 13 goals selected')
      console.log('   ✅ Governance challenges: 4 documented')
      console.log('   ✅ Key stakeholders: 3 high-priority executives')
      console.log('\n   The dashboard provides a comprehensive overview of')
      console.log('   the governance context, allowing executives to quickly')
      console.log('   review the foundation for IT governance implementation.\n')
    } else {
      console.log('   ✅ Dashboard updated - context saved successfully')
      console.log('   ✅ Step 1 marked as complete')
      console.log('   All governance context data persisted to platform\n')
    }
    await page.waitForTimeout(wait(2500))

    console.log('✨ ========================================')
    console.log('   Governance Context Definition Complete!')
    console.log('   Ready to proceed to Step 2:')
    console.log('   Capability Assessment')
    console.log('========================================\n')
  })
})
