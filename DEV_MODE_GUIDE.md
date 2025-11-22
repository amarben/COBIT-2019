# Dev Mode vs Demo Mode - Performance Guide

## Quick Summary

We've implemented a **DEMO_MODE** flag that dramatically speeds up the test/fix development cycle while maintaining the ability to generate high-quality demo videos.

## Performance Comparison

### Step 4: Governance Objectives Test

| Mode | Duration | Use Case | Cursor Tracking | Visual Pauses | Dashboard Nav |
|------|----------|----------|-----------------|---------------|---------------|
| **Dev Mode** | 3.8s | Development/Testing | ❌ No | ❌ No | ❌ No |
| **Demo Mode** | 7.3s | Final Video | ✅ Yes | ✅ Yes | ✅ Yes |

**Speed improvement: 52% faster in dev mode**

## Time Savings in Development Cycle

### Scenario: 3 Iterations to Fix Bugs

**Dev Mode (recommended):**
```
Attempt 1: 3.8s (fail)
Attempt 2: 3.8s (fail)
Attempt 3: 3.8s (success)
─────────────────────
Total: ~11 seconds
```

**Demo Mode:**
```
Attempt 1: 7.3s (fail)
Attempt 2: 7.3s (fail)
Attempt 3: 7.3s (success)
─────────────────────
Total: ~22 seconds
```

**Dev mode saves 11 seconds per 3 iterations = 2x faster debugging**

## Usage

### Development & Testing (Default)

```bash
# Fast mode - no visual delays, no cursor tracking
npx playwright test tests/04-governance-objectives-techcorp.spec.ts
```

**Output:** `1 passed (3.8s)`

### Final Demo Video Generation

```bash
# Full demo mode - with visual pauses and cursor tracking
DEMO_MODE=true npx playwright test tests/04-governance-objectives-techcorp.spec.ts
```

**Output:** `1 passed (7.3s)` + video with red cursor tracking

## What Changes Between Modes?

### Removed in Dev Mode:
1. **Cursor tracking** (`enableCursorTracking()`) - saves ~500ms
2. **Visual pauses**:
   - Initial page load pause: 500ms
   - After each objective toggle (5x): 1500ms total
   - Scroll animation: 800ms
   - Save confirmation: 500ms
3. **Dashboard navigation** at end - saves ~1s

### Kept in Dev Mode:
- All smart waits (`waitForLoadState('networkidle')`)
- Selector-based waits (`waitForSelector`)
- All functional test logic

## Implementation Pattern

```typescript
// Toggle at the top of test file
const DEMO_MODE = process.env.DEMO_MODE === 'true'

// Conditional features
if (DEMO_MODE) {
  await enableCursorTracking(page)
}

if (DEMO_MODE) await page.waitForTimeout(500) // Visual pause

if (DEMO_MODE) {
  await page.locator('aside nav button').filter({ hasText: /Dashboard/i }).first().click()
}
```

## When to Use Each Mode

### Use Dev Mode (default) when:
- ✅ Developing new test features
- ✅ Debugging test failures
- ✅ Running tests in CI/CD
- ✅ Quick validation of changes
- ✅ Iterating on selectors

### Use Demo Mode when:
- ✅ Generating final demo video
- ✅ Creating educational content
- ✅ Recording for stakeholder presentations
- ✅ Documenting features visually

## Additional Optimizations Considered

### Could Remove (but didn't):
- **Network idle waits:** These are essential for reliability
- **Selector waits:** Also critical for stability
- **Scroll into view:** Needed for correct element interaction

### Future Optimizations:
- **Parallel execution:** If multiple independent steps exist
- **Screenshot-only mode:** Skip video encoding for faster CI
- **Headless optimization:** Browser might run faster headless vs headed

## Best Practices

1. **Always develop in dev mode** - iterate fast
2. **Test demo mode works** before creating final video
3. **Use environment variable** - don't hardcode DEMO_MODE
4. **Document which mode** the video was created with
5. **Keep both modes working** - regression test both

## Migration Guide for Other Tests

To add dev mode to existing tests:

1. Add flag at top:
```typescript
const DEMO_MODE = process.env.DEMO_MODE === 'true'
```

2. Wrap cursor tracking:
```typescript
if (DEMO_MODE) {
  await enableCursorTracking(page)
}
```

3. Make visual pauses conditional:
```typescript
if (DEMO_MODE) await page.waitForTimeout(500)
```

4. Skip non-essential final actions:
```typescript
if (DEMO_MODE) {
  // Dashboard navigation, final scrolls, etc.
}
```

## Impact on CI/CD

Dev mode is perfect for CI/CD pipelines:

```yaml
# .github/workflows/playwright.yml
- name: Run Playwright tests
  run: npx playwright test
  # Runs in dev mode by default (fast)

- name: Generate demo videos (manual trigger)
  run: DEMO_MODE=true npx playwright test
  # Only when explicitly needed
```

## Conclusion

By separating development concerns (speed, reliability) from demo concerns (visual clarity), we achieve:

- **50% faster development cycle**
- **Same high-quality demo videos**
- **No compromise on test reliability**
- **Easy toggle between modes**

**Recommendation:** Always use dev mode during development. Only enable demo mode for final video generation.
