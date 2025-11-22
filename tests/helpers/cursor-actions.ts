import { Page, Locator } from '@playwright/test'

/**
 * Helper functions that automatically move cursor before actions
 * Ensures cursor is always visible in video recordings
 */

/**
 * Move mouse cursor to element location
 */
async function moveCursorTo(page: Page, element: Locator) {
  try {
    const box = await element.boundingBox()
    if (box) {
      // Smooth movement to element center
      await page.mouse.move(
        box.x + box.width / 2,
        box.y + box.height / 2,
        { steps: 10 }
      )
      await page.waitForTimeout(50) // Brief pause so cursor is visible
    }
  } catch (e) {
    // Element not visible, skip cursor movement
  }
}

/**
 * Click with visible cursor movement
 */
export async function click(page: Page, element: Locator) {
  await moveCursorTo(page, element)
  await element.click()
}

/**
 * Type text with visible cursor
 */
export async function type(page: Page, element: Locator, text: string, delay: number = 50) {
  await moveCursorTo(page, element)
  await element.click() // Focus the element
  await page.waitForTimeout(50)
  await element.pressSequentially(text, { delay })
}

/**
 * Select option with visible cursor
 */
export async function select(page: Page, element: Locator, value: string) {
  await moveCursorTo(page, element)
  await element.selectOption(value)
}

/**
 * Scroll element into view with cursor movement
 */
export async function scrollIntoView(page: Page, element: Locator) {
  await element.scrollIntoViewIfNeeded()
  await moveCursorTo(page, element)
}
