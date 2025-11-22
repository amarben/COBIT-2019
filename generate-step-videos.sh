#!/bin/bash

# =============================================================================
# Generate Individual Step Videos - Steps 1-13
# =============================================================================
# This script generates separate videos for each step (1-13).
# Steps run sequentially to build up data.
#
# Usage:
#   ./generate-step-videos.sh [options]
#
# Options:
#   --steps STEPS  Comma-separated list of steps to generate (e.g., "4,5,7")
#                  Default: all steps (1,2,3,4,5,6,7,8,9,10,11,12,13)
#   --dev          Run in dev mode (faster, no cursor tracking)
#   --demo         Run in demo mode (slower, with cursor tracking) [default]
#   --speed SPEED  Video speed: fast (0.2x), normal (1.0x), slow (2.0x) [default: slow]
#   --help         Show this help message
#
# Output:
#   - 13 separate video files, one per step
#   - Each video stored in test-results/<step-name>/video.webm
# =============================================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Default settings
MODE="demo"
STEPS="1,2,3,4,5,6,7"
DEMO_SPEED="slow"  # Default to slow (2.0x) for final videos

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --steps)
      STEPS="$2"
      shift 2
      ;;
    --dev)
      MODE="dev"
      shift
      ;;
    --demo)
      MODE="demo"
      shift
      ;;
    --speed)
      DEMO_SPEED="$2"
      if [[ ! "$DEMO_SPEED" =~ ^(fast|normal|slow)$ ]]; then
        echo -e "${RED}Error: Invalid speed '$DEMO_SPEED'. Must be: fast, normal, or slow${NC}"
        exit 1
      fi
      shift 2
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

# Convert comma-separated steps to array
IFS=',' read -ra STEP_ARRAY <<< "$STEPS"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        COBIT 2019 Individual Step Video Generator         ║${NC}"
echo -e "${BLUE}║              Sequential Steps with Data Flow               ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Display mode
if [ "$MODE" = "demo" ]; then
  echo -e "${GREEN}Mode: DEMO${NC} (with cursor tracking + visual pauses)"
  export DEMO_MODE=true
else
  echo -e "${YELLOW}Mode: DEV${NC} (fast, no cursor tracking)"
  unset DEMO_MODE
fi

# Export and display speed configuration
export DEMO_SPEED
SPEED_UPPER=$(echo "$DEMO_SPEED" | tr '[:lower:]' '[:upper:]')
echo -e "${GREEN}Speed: ${SPEED_UPPER}${NC}"
case "$DEMO_SPEED" in
  fast)   echo "  (0.2x multiplier - ~2-3 min/test for testing)" ;;
  normal) echo "  (1.0x multiplier - ~5-7 min/test for balanced)" ;;
  slow)   echo "  (2.0x multiplier - ~10-15 min/test for final videos)" ;;
esac

echo ""
echo -e "${BLUE}Steps to generate:${NC} ${STEP_ARRAY[*]}"
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

# Helper functions to get step file and name
get_step_file() {
  case $1 in
    1) echo "tests/01-governance-context-techcorp.spec.ts" ;;
    2) echo "tests/02-capability-assessment-techcorp.spec.ts" ;;
    3) echo "tests/03-governance-design-techcorp.spec.ts" ;;
    4) echo "tests/04-governance-objectives-techcorp.spec.ts" ;;
    5) echo "tests/05-management-objectives-techcorp.spec.ts" ;;
    6) echo "tests/06-component-definition-techcorp.spec.ts" ;;
    7) echo "tests/07-priority-implementation-techcorp.spec.ts" ;;
    8) echo "tests/08-performance-measurement-techcorp.spec.ts" ;;
    9) echo "tests/09-enabler-deployment-techcorp.spec.ts" ;;
    10) echo "tests/10-continuous-monitoring-techcorp.spec.ts" ;;
    11) echo "tests/11-internal-assessment-techcorp.spec.ts" ;;
    12) echo "tests/12-performance-analysis-techcorp.spec.ts" ;;
    13) echo "tests/13-continuous-improvement-techcorp.spec.ts" ;;
    *) echo "" ;;
  esac
}

get_step_name() {
  case $1 in
    1) echo "Governance Context" ;;
    2) echo "Capability Assessment" ;;
    3) echo "Governance Design" ;;
    4) echo "Governance Objectives (EDM)" ;;
    5) echo "Management Objectives" ;;
    6) echo "Component Definition" ;;
    7) echo "Priority Implementation" ;;
    8) echo "Performance Measurement" ;;
    9) echo "Enabler Deployment" ;;
    10) echo "Continuous Monitoring" ;;
    11) echo "Internal Assessment" ;;
    12) echo "Performance Analysis" ;;
    13) echo "Continuous Improvement" ;;
    *) echo "" ;;
  esac
}

# Track statistics
TOTAL_STEPS=${#STEP_ARRAY[@]}
COMPLETED_STEPS=0
FAILED_STEPS=0
START_TIME=$(date +%s)

echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Starting sequential video generation...${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

# Run each step
for STEP_NUM in "${STEP_ARRAY[@]}"; do
  STEP_FILE=$(get_step_file "$STEP_NUM")
  STEP_NAME=$(get_step_name "$STEP_NUM")

  if [ -z "$STEP_FILE" ]; then
    echo -e "${RED}Error: Invalid step number '$STEP_NUM'${NC}"
    echo "Valid steps: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13"
    exit 1
  fi

  if [ ! -f "$STEP_FILE" ]; then
    echo -e "${RED}Error: Test file not found: $STEP_FILE${NC}"
    exit 1
  fi

  echo -e "${CYAN}──────────────────────────────────────────────────────────${NC}"
  echo -e "${CYAN}Step $STEP_NUM: $STEP_NAME${NC}"
  echo -e "${CYAN}──────────────────────────────────────────────────────────${NC}"
  echo ""

  # Run the test
  if npx playwright test "$STEP_FILE" --workers=1; then
    COMPLETED_STEPS=$((COMPLETED_STEPS + 1))
    echo ""
    echo -e "${GREEN}✓ Step $STEP_NUM completed successfully${NC}"

    # Find and copy video file
    STEP_NUM_PADDED=$(printf "%02d" "$STEP_NUM")
    VIDEO_FILE=$(find test-results -name "video.webm" -path "*/${STEP_NUM_PADDED}-*" -type f | head -1)

    if [ -n "$VIDEO_FILE" ]; then
      VIDEO_SIZE=$(ls -lh "$VIDEO_FILE" | awk '{print $5}')
      echo -e "${GREEN}  Video: $VIDEO_FILE (${VIDEO_SIZE})${NC}"

      # Copy video to videos folder with step number prefix
      mkdir -p videos
      DEST_FILE="videos/Step-${STEP_NUM_PADDED}-$(echo "$STEP_NAME" | sed 's/ /-/g').webm"
      cp "$VIDEO_FILE" "$DEST_FILE"
      echo -e "${GREEN}  Copied to: $DEST_FILE${NC}"
    else
      echo -e "${YELLOW}  Warning: Video not found for step $STEP_NUM${NC}"
    fi
  else
    FAILED_STEPS=$((FAILED_STEPS + 1))
    echo ""
    echo -e "${RED}✗ Step $STEP_NUM failed${NC}"
    echo ""
    echo "Do you want to continue with remaining steps? (y/n)"
    read -r CONTINUE
    if [ "$CONTINUE" != "y" ] && [ "$CONTINUE" != "Y" ]; then
      echo "Aborting..."
      exit 1
    fi
  fi

  echo ""
done

# Calculate elapsed time
END_TIME=$(date +%s)
ELAPSED=$((END_TIME - START_TIME))
MINUTES=$((ELAPSED / 60))
SECONDS=$((ELAPSED % 60))

echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}Video Generation Complete!${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

echo -e "${GREEN}Statistics:${NC}"
echo "  • Total Steps: $TOTAL_STEPS"
echo "  • Completed: $COMPLETED_STEPS"
echo "  • Failed: $FAILED_STEPS"
echo "  • Time Elapsed: ${MINUTES}m ${SECONDS}s"
echo ""

# List all generated videos
echo -e "${YELLOW}Generated Videos:${NC}"
for STEP_NUM in "${STEP_ARRAY[@]}"; do
  STEP_NAME=$(get_step_name "$STEP_NUM")
  VIDEO_FILE=$(find test-results -name "video.webm" -path "*/$STEP_NUM*-techcorp*/video.webm" -o -path "*/$STEP_NUM*STANDALONE*/video.webm" | head -1)

  if [ -n "$VIDEO_FILE" ]; then
    VIDEO_SIZE=$(ls -lh "$VIDEO_FILE" | awk '{print $5}')
    echo -e "  ${GREEN}✓${NC} Step $STEP_NUM ($STEP_NAME): $VIDEO_SIZE"
    echo "    $VIDEO_FILE"
  else
    echo -e "  ${RED}✗${NC} Step $STEP_NUM ($STEP_NAME): Not found"
  fi
done

echo ""
echo -e "${YELLOW}Next Steps:${NC}"
echo "  # View all videos:"
echo -e "  ${GREEN}open test-results/*/video.webm${NC}"
echo ""
echo "  # View test report:"
echo -e "  ${GREEN}npx playwright show-report${NC}"
echo ""

if [ $FAILED_STEPS -eq 0 ]; then
  echo -e "${GREEN}All videos generated successfully! ✓${NC}"
  echo ""
  exit 0
else
  echo -e "${YELLOW}Some videos failed to generate.${NC}"
  echo "Check the error output above for details."
  echo ""
  exit 1
fi
