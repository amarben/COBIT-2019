#!/bin/bash
cd "/Users/amarbendou/Documents/Claude/COBIT 2019"

# Optimize Steps 8-12 - these are mostly read-only display steps
for STEP in 08 09 10 11 12; do
  FILE="tests/${STEP}-*.spec.ts"
  if [ -f $FILE ]; then
    # Add DEMO_MODE flag
    sed -i '' '3i\
const DEMO_MODE = process.env.DEMO_MODE === '\''true'\''\
' "$FILE"
    
    # Change timeout
    sed -i '' 's/test.setTimeout(600000)/test.setTimeout(120000)/' "$FILE"
    
    # Make cursor tracking conditional
    sed -i '' 's/await enableCursorTracking(page)/if (DEMO_MODE) { await enableCursorTracking(page) }/' "$FILE"
    
    # Make waitForTimeout conditional
    sed -i '' 's/await page.waitForTimeout(\([0-9]*\))/if (DEMO_MODE) await page.waitForTimeout(\1)/' "$FILE"
    
    # Fix goto URL
    sed -i '' 's|http://localhost:5173/|http://localhost:5174/|g' "$FILE"
    
    # Add localStorage clear
    sed -i '' '/await page.goto/a\
    await page.evaluate(() => localStorage.clear())\
    await page.reload()
' "$FILE"
  fi
done

echo "Optimization complete"
