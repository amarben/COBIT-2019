import { Page, Locator } from '@playwright/test'

/**
 * Move cursor to element with smooth animation
 */
async function moveTo(page: Page, element: Locator) {
  try {
    const box = await element.boundingBox()
    if (box) {
      await page.mouse.move(
        box.x + box.width / 2,
        box.y + box.height / 2,
        { steps: 10 }
      )
      await page.waitForTimeout(80) // Pause so cursor is visible
    }
  } catch (e) {
    // Element not visible
  }
}

/**
 * Scroll into view and move cursor
 */
export async function scrollAndMove(page: Page, element: Locator) {
  await element.scrollIntoViewIfNeeded()
  await moveTo(page, element)
}

/**
 * Click with cursor movement
 */
export async function clickWithCursor(page: Page, element: Locator) {
  await moveTo(page, element)
  await element.click()
}

/**
 * Type with cursor movement
 */
export async function typeWithCursor(page: Page, element: Locator, text: string, delay: number) {
  await moveTo(page, element)
  await element.click()
  await page.waitForTimeout(50)
  await element.pressSequentially(text, { delay })
}

/**
 * Select with cursor movement
 */
export async function selectWithCursor(page: Page, element: Locator, value: string) {
  await moveTo(page, element)
  await element.selectOption(value)
}
