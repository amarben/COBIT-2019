/**
 * Demo Video Speed Configuration System
 *
 * This module provides dynamic speed control for demo video generation.
 *
 * Speed Modes:
 * - FAST (0.2x): Minimal delays, for testing and quick generation (~2-3 min/test)
 * - NORMAL (1.0x): Standard timing, balanced speed (~5-7 min/test)
 * - SLOW (2.0x): Human-paced tutorials, for final videos (~10-15 min/test)
 *
 * Usage:
 *   export DEMO_SPEED=fast   # Quick testing
 *   export DEMO_SPEED=normal # Default
 *   export DEMO_SPEED=slow   # Final video generation
 */

// Speed multiplier configuration
const SPEED_MULTIPLIERS = {
  fast: 0.2,
  normal: 1.0,
  slow: 2.0
} as const

type DemoSpeed = keyof typeof SPEED_MULTIPLIERS

// Get speed mode from environment variable
const DEMO_SPEED = (process.env.DEMO_SPEED || 'normal') as DemoSpeed
const SPEED_MULTIPLIER = SPEED_MULTIPLIERS[DEMO_SPEED] || SPEED_MULTIPLIERS.normal

/**
 * Scale wait times based on current speed mode
 * @param ms Base wait time in milliseconds
 * @returns Scaled wait time
 */
export const wait = (ms: number): number => {
  return Math.round(ms * SPEED_MULTIPLIER)
}

/**
 * Scale typing delays based on current speed mode
 * @param ms Base typing delay in milliseconds
 * @returns Scaled typing delay
 */
export const typeDelay = (ms: number): number => {
  return Math.round(ms * SPEED_MULTIPLIER)
}

/**
 * Calculate test timeout with speed scaling + buffer
 * @param baseMs Base timeout in milliseconds
 * @returns Scaled timeout with 3-minute buffer
 */
export const timeout = (baseMs: number): number => {
  const scaledTimeout = Math.round(baseMs * SPEED_MULTIPLIER)
  const buffer = 180000 // 3 minutes buffer
  return scaledTimeout + buffer
}

/**
 * Log current speed configuration at test start
 */
export function logSpeedConfig(): void {
  console.log(`⚡ Demo Speed Mode: ${DEMO_SPEED.toUpperCase()} (${SPEED_MULTIPLIER}x multiplier)`)
  console.log(`   Set DEMO_SPEED=fast|normal|slow to change speed`)
  console.log(`   Examples:`)
  console.log(`     - wait(1000) = ${wait(1000)}ms`)
  console.log(`     - typeDelay(100) = ${typeDelay(100)}ms`)
  console.log(`     - timeout(300000) = ${timeout(300000)}ms`)
  console.log('')
}

/**
 * Get current speed mode
 */
export function getSpeedMode(): DemoSpeed {
  return DEMO_SPEED
}

/**
 * Get current speed multiplier
 */
export function getSpeedMultiplier(): number {
  return SPEED_MULTIPLIER
}
