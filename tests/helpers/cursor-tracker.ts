import { Page } from '@playwright/test'

/**
 * Enable enhanced cursor tracking with forced visibility
 * This ensures the cursor is always visible during automated interactions
 */
export async function enableCursorTracking(page: Page) {
  await page.addInitScript(() => {
    const initCursor = () => {
      // Create cursor indicator
      const cursor = document.createElement('div')
      cursor.id = 'playwright-cursor-tracker'
      cursor.style.cssText = `
        position: fixed;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: rgba(255, 0, 0, 0.8);
        border: 3px solid white;
        pointer-events: none;
        z-index: 999999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 15px rgba(255, 0, 0, 0.6), 0 0 30px rgba(255, 0, 0, 0.3);
        transition: transform 0.15s ease-out;
        display: block;
        opacity: 1;
      `
      document.body.appendChild(cursor)

      // Store cursor position
      let cursorX = 0
      let cursorY = 0

      // Update cursor position
      const updateCursorPosition = (x: number, y: number) => {
        cursorX = x
        cursorY = y
        cursor.style.left = x + 'px'
        cursor.style.top = y + 'px'
        cursor.style.display = 'block'
        cursor.style.opacity = '1'
      }

      // Track mouse movement
      document.addEventListener('mousemove', (e) => {
        updateCursorPosition(e.pageX, e.pageY)
      })

      // Enhanced pulse effect on click
      document.addEventListener('click', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.8)'
        cursor.style.backgroundColor = 'rgba(255, 100, 0, 0.9)'
        setTimeout(() => {
          cursor.style.transform = 'translate(-50%, -50%) scale(1)'
          cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'
        }, 250)
      })

      // Track mouse down for visual feedback
      document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.3)'
        cursor.style.backgroundColor = 'rgba(255, 50, 0, 0.9)'
      })

      document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)'
        cursor.style.backgroundColor = 'rgba(255, 0, 0, 0.8)'
      })

      // Keep cursor visible and centered initially
      updateCursorPosition(window.innerWidth / 2, window.innerHeight / 2)

      // Ensure cursor stays visible even without mouse events
      setInterval(() => {
        const cursorElement = document.getElementById('playwright-cursor-tracker')
        if (cursorElement && cursorElement.style.display !== 'block') {
          cursorElement.style.display = 'block'
          cursorElement.style.opacity = '1'
        }
      }, 100)
    }

    // Wait for DOM to be ready
    if (document.body) {
      initCursor()
    } else if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initCursor)
    } else {
      setTimeout(initCursor, 100)
    }
  })
}

/**
 * Move cursor to element before interacting (use this before clicks/typing)
 */
export async function moveCursorToElement(page: Page, element: any) {
  try {
    const box = await element.boundingBox()
    if (box) {
      // Move to center of element with smooth animation
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 10 })
    }
  } catch (e) {
    // Element not visible or no bounding box, skip cursor movement
  }
}

/**
 * Enhanced click with visible cursor movement
 */
export async function clickWithCursor(page: Page, element: any) {
  await moveCursorToElement(page, element)
  await page.waitForTimeout(100) // Brief pause so cursor is visible
  await element.click()
}

/**
 * Enhanced typing with visible cursor
 */
export async function typeWithCursor(page: Page, element: any, text: string, delay: number = 50) {
  await moveCursorToElement(page, element)
  await page.waitForTimeout(100)
  await element.click()
  await page.waitForTimeout(50)
  await element.pressSequentially(text, { delay })
}

/**
 * Enhanced select with visible cursor
 */
export async function selectWithCursor(page: Page, element: any, value: string) {
  await moveCursorToElement(page, element)
  await page.waitForTimeout(100)
  await element.selectOption(value)
}
