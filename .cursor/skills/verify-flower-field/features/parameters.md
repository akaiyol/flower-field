# Meaningful numeric controls

## Sub-features
Numeric inputs change artwork geometry or motion. Prioritize seed, openness, curl, bowl depth and view in the first study; final controls/ranges remain implementation decisions. Identical seed and parameters reproduce static geometry.

## How to get to it (user POV)
Open #study through its Study controls summary. Use the labeled ranges in #parameters, #reset and #export.

## Driving it with Playwright
Change each exposed control through its actual UI and record the documented visual effect. Repeat matching seed/parameters/progress with motion disabled. Inspect minimum, maximum and combined extremes. Verify reset and export if shipped. Controls use IDs seed, petalCount, openness, petalCurl, petalLength, centerDepth, yaw, pitch, windStrength and windRate.

## Gotchas
Decorative label changes do not satisfy meaningful controls. Separate inputs from sampled coordinates. Do not claim meanings for Wang’s numbers. Reset and export are implemented.

## Source and current coverage
field.js: controls, params, build(), bloom(), reset/export handlers. Harness drives each geometry range with keyboard input and proves changed pixels and exact reset. Export is downloaded and parsed; extreme geometry is captured for visual inspection. Wind strength and reduced motion are tested separately.
