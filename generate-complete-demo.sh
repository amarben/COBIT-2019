#!/bin/bash

# =============================================================================
# Generate Complete Demo Video - Steps 1-7
# =============================================================================
# This script generates a single video showing the complete governance
# implementation workflow from Step 1 through Step 7.
#
# Usage:
#   ./generate-complete-demo.sh [options]
#
# Options:
#   --dev          Run in dev mode (faster, no cursor tracking)
#   --demo         Run in demo mode (slower, with cursor tracking) [default]
#   --sequential   Use sequential test (all steps in same browser) [new!]
#   --help         Show this help message
#
# Output:
#   - Video: test-results/00-complete-demo-steps-1-7-*/video.webm
#   - Duration: ~38 seconds (demo mode)
#   - Size: ~2MB
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default settings
MODE="demo"
TEST_FILE="tests/00-complete-demo-steps-1-7.spec.ts"

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --dev)
      MODE="dev"
      shift
      ;;
    --demo)
      MODE="demo"
      shift
      ;;
    --sequential)
      TEST_FILE="tests/00-sequential-steps-1-7.spec.ts"
      shift
      ;;
    --help|-h)
      head -n 24 "$0" | tail -n 21
      exit 0
      ;;
    *)
      echo -e "${RED}Error: Unknown option '$1'${NC}"
      echo "Run with --help for usage information"
      exit 1
      ;;
  esac
done

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         COBIT 2019 Complete Demo Video Generator          ║${NC}"
echo -e "${BLUE}║                    Steps 1-7 Workflow                      ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Display mode
if [ "$MODE" = "demo" ]; then
  echo -e "${GREEN}Mode: DEMO${NC} (with cursor tracking + visual pauses)"
  echo -e "Expected duration: ~38 seconds"
  export DEMO_MODE=true
else
  echo -e "${YELLOW}Mode: DEV${NC} (fast, no cursor tracking)"
  echo -e "Expected duration: ~20 seconds"
  unset DEMO_MODE
fi

echo -e "Test file: ${TEST_FILE##*/}"
echo ""
echo -e "${BLUE}Steps to be recorded:${NC}"
echo "  1. Governance Context"
echo "  2. Capability Assessment"
echo "  3. Governance Design"
echo "  4. Governance Objectives (EDM) - 5 objectives"
echo "  5. Management Objectives - 12 objectives"
echo "  6. Component Definition - 8 components"
echo "  7. Priority Implementation - 3-phase roadmap"
echo ""

# Check if dev server is running
echo -e "${YELLOW}Checking if dev server is running on port 5174...${NC}"
if ! curl -s http://localhost:5174 > /dev/null 2>&1; then
  echo -e "${RED}Error: Dev server not running on port 5174${NC}"
  echo ""
  echo "Please start the dev server first:"
  echo -e "  ${GREEN}npm run dev${NC}"
  echo ""
  exit 1
fi
echo -e "${GREEN}✓ Dev server is running${NC}"
echo ""

# Clean up old test results (optional)
echo -e "${YELLOW}Cleaning up old test results...${NC}"
rm -rf test-results/00-complete-demo-steps-1-7-*
echo -e "${GREEN}✓ Cleaned up${NC}"
echo ""

# Run the test
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Starting complete demo recording...${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

npx playwright test "$TEST_FILE" --workers=1

# Check if test passed
if [ $? -eq 0 ]; then
  echo ""
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}✓ Demo video generated successfully!${NC}"
  echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
  echo ""

  # Find the video file
  VIDEO_FILE=$(find test-results -name "video.webm" -path "*/00-complete-demo-steps-1-7-*/video.webm" | head -1)

  if [ -n "$VIDEO_FILE" ]; then
    VIDEO_SIZE=$(ls -lh "$VIDEO_FILE" | awk '{print $5}')
    echo -e "${GREEN}Video Location:${NC}"
    echo "  $VIDEO_FILE"
    echo ""
    echo -e "${GREEN}Video Size:${NC} $VIDEO_SIZE"
    echo ""

    # Get video duration using ffprobe if available
    if command -v ffprobe &> /dev/null; then
      DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VIDEO_FILE" 2>/dev/null | awk '{printf "%.1f", $1}')
      if [ -n "$DURATION" ]; then
        echo -e "${GREEN}Duration:${NC} ${DURATION}s"
        echo ""
      fi
    fi

    echo -e "${YELLOW}What was recorded:${NC}"
    echo "  ✓ Step 1: Governance Context"
    echo "  ✓ Step 2: Capability Assessment"
    echo "  ✓ Step 3: Governance Design"
    echo "  ✓ Step 4: 5 EDM Objectives (10 practices)"
    echo "  ✓ Step 5: 12 Management Objectives"
    echo "  ✓ Step 6: 8 Key Components"
    echo "  ✓ Step 7: 3-Phase Implementation Roadmap"
    echo ""
    echo -e "${GREEN}Summary:${NC}"
    echo "  • Total Objectives: 17 (5 EDM + 12 Management)"
    echo "  • Components: 8 governance enablers"
    echo "  • Implementation Phases: 3"
    echo ""

    # Offer to open the video
    echo -e "${YELLOW}Commands:${NC}"
    echo "  # View video:"
    echo -e "  ${GREEN}open \"$VIDEO_FILE\"${NC}"
    echo ""
    echo "  # View test report:"
    echo -e "  ${GREEN}npx playwright show-report${NC}"
    echo ""
  else
    echo -e "${YELLOW}Warning: Video file not found in expected location${NC}"
  fi
else
  echo ""
  echo -e "${RED}✗ Demo video generation failed${NC}"
  echo ""
  echo "Check the error output above for details."
  exit 1
fi
