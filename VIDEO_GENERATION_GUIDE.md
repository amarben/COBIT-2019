# 🎬 Video Generation Guide

Quick guide for generating demo videos.

## 🚀 Quick Start

### Generate Complete Demo (One Video - Steps 1-7)

```bash
./generate-complete-demo.sh
```

### Generate Individual Step Videos

```bash
./generate-step-videos.sh
```

## 📋 Prerequisites

1. **Start dev server:** `npm run dev` (port 5174)
2. **Verify Playwright:** `npx playwright --version`

## 🎥 Scripts Available

### 1. generate-complete-demo.sh
- Generates **1 video** showing all Steps 1-7
- Duration: ~38 seconds
- Size: ~2MB
- Best for: Presentations, quick demos

```bash
# Demo mode (with cursor tracking)
./generate-complete-demo.sh --demo

# Dev mode (faster, no cursor)
./generate-complete-demo.sh --dev
```

### 2. generate-step-videos.sh
- Generates **7 separate videos** (one per step)
- Duration: ~60 seconds total
- Best for: Detailed tutorials, documentation

```bash
# All steps
./generate-step-videos.sh

# Specific steps only
./generate-step-videos.sh --steps 4,5,7

# Dev mode
./generate-step-videos.sh --dev
```

## 📹 Video Output

Videos saved to: `test-results/*/video.webm`

**Complete Demo:**
- `00-complete-demo-steps-1-7-*/video.webm`

**Individual Steps:**
- `01-governance-context-*/video.webm`
- `02-capability-assessment-*/video.webm`
- `03-governance-design-*/video.webm`
- `04-governance-objectives-*/video.webm`
- `05-management-objectives-*/video.webm`
- `06-component-definition-*/video.webm`
- `07-priority-implementation-STANDALONE-*/video.webm`

## 🛠️ Options

| Option | Description |
|--------|-------------|
| `--demo` | Demo mode (slower, with cursor tracking) |
| `--dev` | Dev mode (faster, no cursor tracking) |
| `--steps X,Y,Z` | Generate only specific steps |
| `--help` | Show help message |

## 📊 What Gets Recorded

**Complete Demo includes:**
1. ✅ Step 1: Governance Context
2. ✅ Step 2: Capability Assessment
3. ✅ Step 3: Governance Design
4. ✅ Step 4: 5 EDM Objectives (10 practices)
5. ✅ Step 5: 12 Management Objectives
6. ✅ Step 6: 8 Components
7. ✅ Step 7: 3-Phase Implementation Roadmap

## 🎯 Quick Commands

```bash
# Generate complete demo
./generate-complete-demo.sh

# Generate individual steps
./generate-step-videos.sh

# View all videos
open test-results/*/video.webm

# View test report
npx playwright show-report

# Convert to MP4 (if needed)
ffmpeg -i test-results/00-complete-demo-*/video.webm demo.mp4
```

## 🔧 Troubleshooting

**Dev server not running?**
```bash
npm run dev
```

**Video not generated?**
- Check test passed (look for green checkmark)
- Verify `video: 'on'` in `playwright.config.ts`

## 📚 More Info

- Data Dependencies: `tests/DATA_DEPENDENCY_GUIDE.md`
- Review Summary: `tests/REVIEW_SUMMARY.md`

---

**Last Updated:** 2025-11-05
