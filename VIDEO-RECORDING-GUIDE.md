# COBIT 2019 Demo Videos - Recording Guide

## Quick Start

**✅ Automated Recording Now Available!** Playwright tests successfully generate demo videos.

**Alternative:** Manual screen recording with OBS Studio, Camtasia, or ScreenFlow still recommended for more control over narration and editing.

## Automated Recording Success

After iterative refinement, automated Playwright recording now works! Key learnings:
- **Remove strict assertions** - Let the video show what's there without expecting specific elements
- **Use conditional checks** - `if (await element.isVisible())` instead of `expect().toBeVisible()`
- **Generous waits** - 2-3 second pauses between actions for smooth viewing
- **No navigation state assumptions** - Don't assume phases are expanded/collapsed

**Result:** ✅ Video 01 generated successfully (3.7MB, 40 seconds) using `npm run test:video:01`

## Recording Setup

### 1. Software

**Free Option (Recommended):**
- **OBS Studio** (https://obsproject.com/) - Free, cross-platform, professional quality

**Paid Options:**
- **Camtasia** - Easy to use, built-in editing
- **ScreenFlow** (Mac) - Professional features
- **Bandicam** (Windows) - Lightweight

### 2. Configuration

```
Resolution: 1920x1080 (Full HD)
Frame Rate: 30fps minimum
Audio: System audio + microphone
Format: MP4 (H.264 codec)
Quality: High (for Udemy)
```

### 3. Application Setup

```bash
# Start the application
npm run dev

# Open browser to http://localhost:5174
# Open browser console (F12)
# Clear storage:
localStorage.clear()

# Refresh page (Cmd+R / Ctrl+R)
# Set browser zoom to 100%
# Close dev tools
# Make browser full screen or maximized
```

## Video Scripts

All detailed scripts are in the `video-scripts/` directory:

| Video | Duration | Script | Topics |
|-------|----------|--------|--------|
| 1 | 8-10 min | `01-overview-navigation.md` | App overview, 7-phase approach, navigation, data persistence |
| 2 | 12-15 min | `02-phase1-2-assessment.md` | Programme initiation, governance context, focus areas, capability assessment, issues |
| 3 | 10-12 min | `03-phase3-goals-cascade.md` | Enterprise goals, alignment goals, objectives, design factors |
| 4 | 15-18 min | `04-phase4-5-implementation.md` | Business case, quick wins, roadmap, EDM, APO/BAI/DSS/MEA, RACI charts |
| 5 | 10-12 min | `05-phase6-7-monitoring.md` | Benefits tracking, KPIs, lag/lead indicators, effectiveness review, continuous improvement |

**Total Course Duration:** ~55-65 minutes

## Recording Process

### For Each Video:

1. **Read the script** (`video-scripts/XX-name.md`)
   - Review all sections
   - Understand the flow
   - Note timing estimates

2. **Practice once** (no recording)
   - Navigate through the application
   - Follow the script actions
   - Get comfortable with the flow

3. **Record**
   - Start recording software
   - Follow script section by section
   - Pause between sections if needed (edit out later)
   - Don't worry about perfection - edit in post

4. **Review**
   - Watch the recording
   - Check for errors or unclear sections
   - Re-record specific sections if needed

5. **Post-Production**
   - Add voiceover (following script text)
   - Add text overlays for key points
   - Add chapter markers
   - Trim pauses/errors
   - Color correction if needed
   - Export at 1080p for Udemy

## Script Format

Each script includes:

- **Section breakdown** with timing estimates
- **Exact actions** to perform (click here, type this)
- **What to show** on screen
- **Voiceover text** (what to say)
- **Key points** to emphasize
- **Visual aids** to add in post-production

## Example: Recording Video 1

```markdown
SECTION 1: Landing on Dashboard (30 seconds)
[Screen: Application landing on Dashboard]

"Welcome to the COBIT 2019 Implementation Guide..."
→ Show dashboard for 2 seconds

SECTION 2: The 7-Phase Approach (2 minutes)
[Action: Click Phase 1 to expand]
→ Wait 1.5 seconds
"Phase 1: What Are the Drivers?..."
→ Show expanded phase
[Action: Click Phase 2 to expand]
...
```

## Tips for Great Videos

### Before Recording:
- ✅ Close unnecessary apps/notifications
- ✅ Disable desktop notifications
- ✅ Hide desktop icons (if showing desktop)
- ✅ Clear browser cache and localStorage
- ✅ Practice the flow once
- ✅ Have a glass of water nearby
- ✅ Test audio levels

### During Recording:
- 🎯 Follow the script closely
- 🎯 Take your time - don't rush
- 🎯 Pause between sections (edit out later)
- 🎯 If you make a mistake, pause, then restart that section
- 🎯 Keep cursor movements smooth
- 🎯 Click deliberately (not too fast)
- 🎯 Allow UI to load fully before next action

### After Recording:
- ✅ Review immediately while fresh
- ✅ Note timestamps of any issues
- ✅ Re-record problem sections if needed
- ✅ Save raw recording before editing
- ✅ Back up files in multiple locations

## Post-Production Checklist

- [ ] Add voiceover following script
- [ ] Add text overlays for key concepts
- [ ] Add chapter markers for each major section
- [ ] Trim out pauses and mistakes
- [ ] Add intro/outro slides
- [ ] Color correction (if needed)
- [ ] Audio normalization
- [ ] Export settings:
  - Resolution: 1920x1080
  - Frame rate: 30fps
  - Codec: H.264
  - Bitrate: 8-10 Mbps
  - Audio: AAC, 192 kbps, 48kHz

## Udemy Requirements

- **Resolution:** 1920x1080 (Full HD) - required for Udemy
- **Aspect Ratio:** 16:9
- **File Format:** MP4
- **Video Codec:** H.264
- **Audio Codec:** AAC
- **Frame Rate:** 25-30 fps
- **File Size:** < 4GB per video

## Questions?

Refer to individual video scripts in `video-scripts/` directory for detailed guidance on each video.

Good luck with your recordings! 🎥
