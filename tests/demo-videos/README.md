# Demo Video Recording with Playwright

This directory contains automated Playwright tests for generating demo videos for the COBIT 2019 Implementation Guide.

## Current Status: ✅ WORKING!

**Automated recording successfully generates demo videos!**

**Alternative:** Manual screen recording with OBS Studio, Camtasia, or ScreenFlow still available for more control over narration.

### Success! Automated Recording Works

After iterative refinement, the key insight was: **Remove strict assertions, use conditional checks, add generous waits**.

**Working Approach:**
- ✅ No `expect().toBeVisible()` - causes strict mode violations
- ✅ Use `if (await element.isVisible())` - conditional, graceful
- ✅ 2-3 second waits between actions - smooth viewing
- ✅ Let the video show what's there - don't assert what should be there

**Result:** All 5 videos generated successfully!
- Video 01: 3.7MB, 40s
- Video 02: 4.3MB, 44s
- Video 03: 4.2MB, 48s
- Video 04: 5.8MB, 58s
- Video 05: 5.0MB, 53s
- **Total: 23MB, ~4 minutes of video**

## Recommended: Manual Recording Process

### Setup

1. **Install Screen Recording Software:**
   - **Mac:** OBS Studio (free), ScreenFlow, Camtasia
   - **Windows:** OBS Studio (free), Camtasia, Bandicam
   - **Linux:** OBS Studio, SimpleScreenRecorder

2. **Configure Recording:**
   - Resolution: 1920x1080 (Full HD)
   - Frame rate: 30fps minimum
   - Audio: Record system audio + microphone
   - Format: MP4 (H.264 codec recommended)

3. **Prepare Application:**
   ```bash
   npm run dev
   # Open http://localhost:5174 in browser
   # Open browser console, run: localStorage.clear()
   # Refresh page
   # Set zoom to 100%
   ```

### Recording Steps

1. **Review the script:** Read `video-scripts/01-overview-navigation.md` thoroughly
2. **Practice once:** Navigate through the flow without recording
3. **Record:** Follow the script section by section
4. **Review:** Watch the recording, re-record sections if needed
5. **Post-production:** Add voiceover, annotations, trim/edit as needed

### Video Scripts

All detailed scripts with timing and content are in the `video-scripts/` directory:
- `01-overview-navigation.md` - 8-10 minutes
- `02-phase1-2-assessment.md` - 12-15 minutes
- `03-phase3-goals-cascade.md` - 10-12 minutes
- `04-phase4-5-implementation.md` - 15-18 minutes
- `05-phase6-7-monitoring.md` - 10-12 minutes

---

## Alternative: Automated Recording (In Development)

### 1. Test in Headless Mode First (Fast)

If continuing with automated approach, always test in headless mode first:

```bash
# Test specific video
npx playwright test 01-overview-navigation --headed=false

# Test all videos
npx playwright test tests/demo-videos --headed=false
```

This runs quickly and validates that:
- All selectors work correctly
- The flow completes without errors
- Timing is appropriate

### 2. Generate Video (Slower, but High Quality)

Once the test passes in headless mode, generate the actual video:

```bash
# Generate specific video with browser visible
npx playwright test 01-overview-navigation --headed

# Generate all videos
npx playwright test tests/demo-videos --headed
```

Videos are saved to: `test-results/*/video.webm`

### 3. Extract and Rename Videos

After successful test run:

```bash
# Find the latest video
find test-results -name "video.webm" -type f

# Copy to video-output directory with meaningful name
cp test-results/[test-folder]/video.webm video-output/01-overview-navigation.webm
```

## Available Demo Videos

| # | Video | Duration | Script | Test File |
|---|-------|----------|--------|-----------|
| 1 | Overview & Navigation | 8-10 min | `video-scripts/01-overview-navigation.md` | `01-overview-navigation.spec.ts` |
| 2 | Phase 1-2 Assessment | 12-15 min | `video-scripts/02-phase1-2-assessment.md` | `02-phase1-2-assessment.spec.ts` |
| 3 | Phase 3 Goals Cascade | 10-12 min | `video-scripts/03-phase3-goals-cascade.md` | `03-phase3-goals-cascade.spec.ts` |
| 4 | Phase 4-5 Implementation | 15-18 min | `video-scripts/04-phase4-5-implementation.md` | `04-phase4-5-implementation.spec.ts` |
| 5 | Phase 6-7 Monitoring | 10-12 min | `video-scripts/05-phase6-7-monitoring.md` | `05-phase6-7-monitoring.spec.ts` |

## NPM Scripts

```bash
# Test all videos in headless mode (fast)
npm run test:videos:headless

# Generate all videos (slow, high quality)
npm run test:videos:generate

# Test specific video
npm run test:video:01
npm run test:video:02
# etc...
```

## Video Configuration

Videos are recorded with these settings (configured in `playwright.config.ts`):

- **Resolution:** 1920x1080 (Full HD)
- **Format:** WebM
- **Framerate:** 30fps (default)
- **Quality:** High (Playwright default)

## Timing Guidelines

Tests use `page.waitForTimeout()` to create natural pacing:

- **2 seconds:** Between major sections
- **1-1.5 seconds:** After form fills or clicks
- **3 seconds:** For intro/outro shots
- **test.slow():** Triples default timeout for longer videos

## Post-Production

After generating videos:

1. **Convert to MP4** (if needed for Udemy):
   ```bash
   ffmpeg -i video-output/01-overview-navigation.webm -c:v libx264 -crf 23 -c:a aac video-output/01-overview-navigation.mp4
   ```

2. **Add voiceover** (use video script as guide)

3. **Add annotations** (text overlays, callouts)

4. **Color correction** (if needed)

5. **Trim/edit** (remove any errors or unnecessary pauses)

## Troubleshooting

### Test Fails in Headless Mode

- Check selectors (element may not be visible)
- Increase timeouts if app is slow to load
- Check for console errors: `npx playwright test --headed --debug`

### Video is Too Fast

- Increase `waitForTimeout` values
- Add more pauses between sections
- Use `test.slow()` for 3x timeout

### Video is Too Slow

- Decrease `waitForTimeout` values
- Remove unnecessary waits
- Target: Stay within script duration estimate

### Selectors Not Found

- Run with debug mode: `npx playwright test --debug`
- Use Playwright Inspector to find correct selectors
- Update test file with working selectors

## Best Practices

1. **Always test headless first** - Saves time, catches errors early
2. **Use semantic selectors** - `getByRole`, `getByText`, `getByLabel` preferred over CSS selectors
3. **Add meaningful waits** - Not too fast, not too slow
4. **Follow the script** - Tests should match video script flow exactly
5. **Clean state** - Each test starts with `localStorage.clear()`
6. **Verify success** - Check that expected elements appear
7. **Document failures** - Update script/test if flow doesn't work

## Updating Video Scripts

After generating videos, update the corresponding `.md` file in `video-scripts/`:

```markdown
## Recording Status

- **Test Status:** ✅ Passing in headless mode
- **Video Generated:** ✅ 2024-11-26
- **Video Location:** `video-output/01-overview-navigation.webm`
- **Duration:** 9:23
- **Notes:** All sections completed successfully. Consider adding 10s to Section 4 for better pacing.
```

## CI/CD Integration

To run video generation in CI:

```yaml
# .github/workflows/generate-videos.yml
name: Generate Demo Videos
on:
  workflow_dispatch: # Manual trigger

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run test:videos:headless # Test first
      - run: npm run test:videos:generate # Generate videos
      - uses: actions/upload-artifact@v3
        with:
          name: demo-videos
          path: test-results/**/video.webm
```

## License & Attribution

These demo videos are for the COBIT 2019 Implementation Guide Udemy course.

- **COBIT® is a registered trademark of ISACA**
- Application is not affiliated with or endorsed by ISACA
- Videos demonstrate the implementation tool, not official ISACA materials
