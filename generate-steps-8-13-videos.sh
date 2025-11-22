#!/bin/bash

# Script to generate and preserve videos for Steps 8-13
# Runs each test separately and copies the video before cleanup

export DEMO_MODE=true

echo "Generating videos for Steps 8-13..."
echo "=================================="

# Array of test files
tests=(
  "tests/08-performance-measurement-techcorp.spec.ts"
  "tests/09-enabler-deployment-techcorp.spec.ts"
  "tests/10-continuous-monitoring-techcorp.spec.ts"
  "tests/11-internal-assessment-techcorp.spec.ts"
  "tests/12-performance-analysis-techcorp.spec.ts"
  "tests/13-continuous-improvement-techcorp.spec.ts"
)

# Create output directory
mkdir -p videos/steps-8-13

# Run each test and preserve video
for test in "${tests[@]}"; do
  step_num=$(echo "$test" | grep -o '[0-9]\+' | head -1)
  echo ""
  echo "Running Step $step_num..."

  # Run the test
  npx playwright test "$test" --workers=1

  # Find and copy the video
  video=$(find test-results -name "video.webm" -type f | grep "${step_num}-" | head -1)

  if [ -n "$video" ]; then
    cp "$video" "videos/steps-8-13/step-${step_num}-video.webm"
    echo "✓ Video saved: videos/steps-8-13/step-${step_num}-video.webm"
  else
    echo "⚠ No video found for Step $step_num"
  fi

  # Small delay between tests
  sleep 2
done

echo ""
echo "=================================="
echo "All videos generated!"
echo ""
echo "Videos saved in: videos/steps-8-13/"
ls -lh videos/steps-8-13/
