import { Page } from '@playwright/test'

/**
 * Setup helper: Runs Steps 1-6 to populate data for subsequent steps
 * This allows Steps 7+ to run independently without re-running previous steps
 */
export async function setupSteps1to6(page: Page, verbose = false) {
  const log = (msg: string) => {
    if (verbose) console.log(msg)
  }

  log('🔧 Setup: Populating data from Steps 1-6...')

  await page.goto('http://localhost:5174/')
  await page.evaluate(() => localStorage.clear())
  await page.reload()
  await page.waitForLoadState('networkidle')

  // STEP 4: Configure Governance Objectives (EDM)
  log('   Step 4: Governance Objectives...')
  const step4Button = page.locator('aside nav button').filter({ hasText: /Step 4.*Governance Objectives/i }).first()
  await step4Button.click()
  await page.waitForLoadState('networkidle')

  const edmObjectives = ['EDM01', 'EDM02', 'EDM03', 'EDM04', 'EDM05']
  for (const edmId of edmObjectives) {
    await page.locator('aside nav button').filter({ hasText: new RegExp(edmId, 'i') }).first().click()
    await page.waitForLoadState('networkidle')

    const card = page.locator('div.card').filter({ hasText: new RegExp(edmId, 'i') }).first()
    await card.locator('button').first().click() // Toggle

    // Enable 2 practices
    await card.locator('button').nth(1).click()
    await card.locator('button').nth(2).click()
  }

  log('      ✅ 5 EDM objectives configured')

  // STEP 5: Configure Management Objectives
  log('   Step 5: Management Objectives...')
  const step5Button = page.locator('aside nav button').filter({ hasText: /Step 5.*Management Objectives/i }).first()
  await step5Button.click()
  await page.waitForLoadState('networkidle')

  // APO Domain
  await page.locator('aside nav button').filter({ hasText: /APO.*Align/i }).first().click()
  await page.waitForLoadState('networkidle')

  const apoObjectives = [
    { id: 'APO01', priority: 'high' },
    { id: 'APO02', priority: 'high' },
    { id: 'APO11', priority: 'medium' },
    { id: 'APO13', priority: 'high' }
  ]

  for (const obj of apoObjectives) {
    const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption(obj.priority)
  }

  // BAI Domain
  await page.locator('aside nav button').filter({ hasText: /BAI.*Build/i }).first().click()
  await page.waitForLoadState('networkidle')

  const baiObjectives = [
    { id: 'BAI02', priority: 'high' },
    { id: 'BAI06', priority: 'high' },
    { id: 'BAI10', priority: 'medium' }
  ]

  for (const obj of baiObjectives) {
    const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption(obj.priority)
  }

  // DSS Domain
  await page.locator('aside nav button').filter({ hasText: /DSS.*Deliver/i }).first().click()
  await page.waitForLoadState('networkidle')

  const dssObjectives = [
    { id: 'DSS01', priority: 'high' },
    { id: 'DSS05', priority: 'high' },
    { id: 'DSS06', priority: 'high' }
  ]

  for (const obj of dssObjectives) {
    const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption(obj.priority)
  }

  // MEA Domain
  await page.locator('aside nav button').filter({ hasText: /MEA.*Monitor/i }).first().click()
  await page.waitForLoadState('networkidle')

  const meaObjectives = [
    { id: 'MEA01', priority: 'high' },
    { id: 'MEA03', priority: 'high' }
  ]

  for (const obj of meaObjectives) {
    const card = page.locator('div.card').filter({ hasText: new RegExp(obj.id, 'i') }).first()
    await card.scrollIntoViewIfNeeded()
    await card.locator('button').first().click()
    await card.locator('select').selectOption(obj.priority)
  }

  log('      ✅ 12 management objectives configured')

  // STEP 6: Add Components (minimal set)
  log('   Step 6: Components...')
  const step6Button = page.locator('aside nav button').filter({ hasText: /Step 6.*Component/i }).first()
  await step6Button.click()
  await page.waitForLoadState('networkidle')

  // Add a few key components
  const components = [
    { type: 'organizational-structures', name: 'IT Steering Committee', desc: 'Executive governance', status: 'completed' },
    { type: 'processes', name: 'Strategic Planning Process', desc: 'Annual IT planning', status: 'completed' },
    { type: 'services', name: 'ServiceNow GRC Platform', desc: 'GRC tool', status: 'completed' }
  ]

  for (const comp of components) {
    await page.locator('select').first().selectOption(comp.type)
    await page.locator('input[placeholder*="Component name"]').fill(comp.name)
    await page.locator('textarea[placeholder*="Description"]').fill(comp.desc)
    await page.locator('button').filter({ hasText: /Add/i }).first().click()
    await page.waitForLoadState('networkidle')

    if (comp.status !== 'planned') {
      const componentCard = page.locator('div.bg-gray-50').filter({ hasText: comp.name }).first()
      await componentCard.waitFor({ state: 'visible' })
      await componentCard.locator('select.text-xs').first().selectOption(comp.status)
    }
  }

  // Save components
  const saveButton = page.getByRole('button', { name: /Save Components/i })
  await saveButton.scrollIntoViewIfNeeded()
  await saveButton.click()
  await page.waitForLoadState('networkidle')

  log('      ✅ 3 components configured')
  log('✅ Setup complete: Data populated for Steps 7+\n')
}
