# Reversible growth input

## Sub-features
Rightward swipe/scroll introduces plants across the field and develops each from a short stem into a full bloom. Leftward travel reverses both. Staggered timelines share one progress value; placement and seed persist.

## How to get to it (user POV)
Use #field to drag/swipe or scroll horizontally. Right grows, left rewinds; Shift+vertical wheel is also supported. #growth and artwork arrow keys/Home/End provide alternatives.

## Driving it with Playwright
Drive real horizontal wheel and implemented touch/pointer swipe paths separately. Record baseline, intermediate and full-growth frames, input and progress. Inspect stem extension, markings following visible stem, leaf emergence, bowl formation and petal opening. Reverse to matching progress with wind disabled and compare identities and geometry. Exercise endpoints, mid-gesture reversal, short repeated inputs, large deltas, touch cancellation and unintended page scroll.

## Gotchas
Plant count alone misses within-plant development. Scaling finished sprites alone does not establish the developmental sequence. Internal setters cannot prove gestures. Growth must be bounded and reversal must not rerandomize plants.

## Source and current coverage
field.js: setGrowth(), wheel/pointer/keyboard listeners, draw() local stage calculation. The harness proves horizontal wheel, pointer drag, Chromium touch, bounded endpoints and pixel-identical reversal under reduced motion. Mid-gesture cancellation and physical-device behavior remain unverified.
