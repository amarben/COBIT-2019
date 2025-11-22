#!/bin/bash

export DEMO_MODE=true

echo "Generating missing videos for Steps 2, 3, 6..."

# Step 2
echo "Running Step 2..."
npx playwright test tests/02-capability-assessment-techcorp.spec.ts --workers=1
video=$(find test-results -name "video.webm" -type f | grep "02-" | head -1)
if [ -n "$video" ]; then
  cp "$video" videos/steps-1-7/step-02-video.webm
  echo "✓ Video saved: videos/steps-1-7/step-02-video.webm"
fi
sleep 2

# Step 3
echo "Running Step 3..."
npx playwright test tests/03-governance-design-techcorp.spec.ts --workers=1
video=$(find test-results -name "video.webm" -type f | grep "03-" | head -1)
if [ -n "$video" ]; then
  cp "$video" videos/steps-1-7/step-03-video.webm
  echo "✓ Video saved: videos/steps-1-7/step-03-video.webm"
fi
sleep 2

# Step 6
echo "Running Step 6..."
npx playwright test tests/06-component-definition-techcorp.spec.ts --workers=1
video=$(find test-results -name "video.webm" -type f | grep "06-" | head -1)
if [ -n "$video" ]; then
  cp "$video" videos/steps-1-7/step-06-video.webm
  echo "✓ Video saved: videos/steps-1-7/step-06-video.webm"
fi

echo ""
echo "All missing videos generated!"
ls -lh videos/steps-1-7/
