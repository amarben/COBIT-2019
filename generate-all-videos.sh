#!/bin/bash

# Script to generate demo videos for all TechCorp COBIT 2019 implementation steps
# Each test will run individually to ensure proper video generation

echo "🎬 Generating TechCorp COBIT 2019 Demo Videos"
echo "=============================================="
echo ""

# Array of test files in order
tests=(
    "00-end-to-end-workflow-techcorp.spec.ts"
    "01-governance-context-techcorp.spec.ts"
    "06-component-definition-techcorp.spec.ts"
    "07-priority-implementation-techcorp.spec.ts"
    "08-performance-measurement-techcorp.spec.ts"
    "09-enabler-deployment-techcorp.spec.ts"
    "10-continuous-monitoring-techcorp.spec.ts"
    "11-internal-assessment-techcorp.spec.ts"
    "12-performance-analysis-techcorp.spec.ts"
    "13-continuous-improvement-techcorp.spec.ts"
)

total=${#tests[@]}
current=0

for test in "${tests[@]}"; do
    current=$((current + 1))
    echo "[$current/$total] Running: $test"
    echo "----------------------------------------"

    npx playwright test "tests/$test" --project=chromium

    if [ $? -eq 0 ]; then
        echo "✅ $test completed successfully"
    else
        echo "❌ $test failed"
    fi

    echo ""
done

echo "=============================================="
echo "✨ Video generation complete!"
echo ""
echo "Videos are located in: test-results/"
echo ""
echo "To view videos, check the test-results directory:"
echo "  find test-results -name 'video.webm'"
echo ""
