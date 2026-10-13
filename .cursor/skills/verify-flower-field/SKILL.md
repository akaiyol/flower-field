---
name: verify-flower-field
description: Verify Flower Field's procedural artwork, numeric controls, rightward swipe/scroll growth, reverse growth, responsive presentation and motion through the browser UI.
---

# Verify Flower Field

## References
The fully grown field targets `docs/approved-field.png`, the preserved README screenshot. `docs/original-reference.png` informs folded geometry and numeric bowls. Judge visual identity against the approved field; do not substitute the artist's grayscale style. The original algorithm and numeric meanings are unknown.

## Launch
From `/Users/yolanda/Documents/ChatGPT/flower-field 2`, install test dependencies with `npm install` and `npx playwright install chromium`. Run `npm test -- /private/tmp/flower-field-verification/review`. The executable helper is `node .cursor/skills/verify-flower-field/verify.cjs /private/tmp/flower-field-verification/review`. It starts its own ephemeral loopback server and isolated headless Chromium, waits for canvas growth observations, and closes both in `finally`.

To reuse the bundled installation in this environment, use:

```sh
PLAYWRIGHT_MODULE=/Users/yolanda/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright node .cursor/skills/verify-flower-field/verify.cjs /private/tmp/flower-field-verification/review
```

For a human preview, `npm start` serves port 4173; readiness is an HTTP 200 at `/` with `#field` and a populated `#art` canvas. Stop only that owned preview process when it is no longer needed. No runtime dependencies or build are required.

## Doctor
Run `pwd`, `git status --short`, and `node --check field.js`. Confirm this checkout, not the legacy folder. The helper additionally waits for `#art[data-progress="1.000000"]`, 11 plants on desktop and all growth stages at 1. Unexpected failures require doctor and a fresh isolated run; do not reuse a wedged browser. Missing Playwright or Chromium is an environment prerequisite, not a product failure.

## Drive
Use features/README.md. Viewports are 1280, 390 and 320 CSS pixels. The harness exercises real horizontal wheel, mouse pointer drag, Chromium-native touch via CDP, keyboard arrows/Home/End, `#growth`, every geometry input in `#parameters`, reset and export. Use visible controls rather than setting internal progress. Read-only canvas data attributes observe progress, plant stages, seed and animation time; actual canvas pixels establish visual changes and deterministic reversal.

Reverse at matching seed, viewport and progress with reduced motion enabled. Verify empty, partial and full growth, bounds and both plant introduction and within-plant development. Ordinary vertical scrolling is not mapped to growth; horizontal wheel and Shift+vertical wheel are. Physical touch and actual hidden-tab behavior remain separate from browser emulation.

## Evidence
Pass a unique directory under `/private/tmp/flower-field-verification/` for each retained run. The helper saves desktop/mobile screenshots, intermediate growth frames, an extreme-geometry view, exported parameters, ordered wind frames and results.json. Record source revision or diff identity in accompanying run notes. Browser errors fail the run. Keep failed evidence too.

Inspect actual page scale, then distinct blooms enlarged: lavender dotwork, folds, numeric bowl, same-side stem labels, continuity, negative space, clipping and repetition. Passing assertions cannot establish aesthetic fidelity or prove all extreme geometry is free of self-intersections. Observe wind extrema and reversal in the ordered frames. Real hidden-tab and offscreen tests are required before claiming those pauses work.

## Cleanup
The helper closes only its owned browser and server on success/failure; evidence survives. Confirm results.json has cleanup=true and screenshots still exist after completion. Do not kill by process name or close the user's browser. A deliberately retained human preview is reported separately from the verification server.

## Helpers
`verify.cjs` is executable; invocation appears above. `PLAYWRIGHT_MODULE` optionally selects an existing Playwright installation. The legacy SVG/raster harness is not used: procedural canvas geometry replaces raster-head counts and SVG text assertions. The remaster retains 11 desktop/6 mobile plants, two leaves, normalized same-side rulers and rooted motion, with pixel evidence rather than DOM-only artwork proof.

## Completion
Report covered paths, evidence and unresolved gaps. Current implementation is a first visual study awaiting human review. Do not automatically commit, publish, create a PR or deploy.
