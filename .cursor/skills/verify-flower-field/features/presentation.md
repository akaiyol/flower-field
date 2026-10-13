# Responsive presentation and motion

## Sub-features
Desktop and narrow-screen composition; readable markings; rooted wind independent of growth; static automatic motion under reduced motion; visibility pausing if implemented.

## How to get to it (user POV)
Open the field at 1280, 390 and 320px. Toggle the browser/OS reduced-motion preference; stop gestures to inspect wind.

## Driving it with Playwright
Capture each width at intermediate and full growth. Inspect page-scale labels, clipping and overflow. Observe the slowest sway cycle plus continuation and secondary reversals; check stable roots and connected attachments. Enable reduced motion and confirm automatic animation stops while explicit growth input remains usable. Exercise actual offscreen and document visibility changes. Use #field, #growth and #parameters.

## Gotchas
Exclude wind from deterministic growth comparisons. Enlarged screenshots do not prove page-scale legibility. Viewport emulation does not establish physical-device touch behavior. Record input paths not exercised.

## Source and current coverage
field.css: responsive artwork and controls; field.js: ResizeObserver, frame/schedule/visibility and reduced-motion handlers. Harness proves six mobile plants/no overflow, static reduced motion, zero wind, and automatic wind advancement, and records a slow sway cycle. Actual hidden-tab/offscreen pauses and physical-device touch remain unverified.
