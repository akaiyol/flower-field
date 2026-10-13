---
name: verify-flower-field
description: Verify the standalone Flower Field at desktop and narrow widths, including artwork loading, leaf counts, ruler legibility, motion and reduced motion. Use after renderer or layout changes.
---

# Verify flower field

From the repository root, install test dependencies with `npm install` and install Chromium with `npx playwright install chromium`, then run `npm test`. Pass an evidence path with `npm test -- /absolute/evidence/path`; the default is `verification-output/` (ignored by Git). `PLAYWRIGHT_MODULE` can point to an existing Playwright installation.

The website itself requires no npm packages or build step. Open `index.html` or serve this directory with a static HTTP server.

The helper creates an isolated Chromium browser and a loopback server restricted to public project files. It checks image loading, 11 desktop / 6 mobile plants, two leaves per plant, 8 numeric labels per stem on the right side, minor ticks, computed label sizes, page overflow, and stem alignment with the page bottom at 1280/390/320px. It records a full principal sway cycle plus continuation, checks static reduced motion, and proves the ruler guard rejects missing labels and the historical tiny-font collision in isolated page fixtures. It closes its own browser and server in `finally` and retains screenshots, motion frames and results.

Inspect screenshots at actual scale and all distinct blooms and leaves enlarged. Use [critique-flower-field](../critique-flower-field/SKILL.md) for appearance and completeness: passing assertions do not establish aesthetic acceptance. Hidden-tab and offscreen pause handlers remain in the renderer, but this helper does not claim a real hidden-tab visibility test.

For a README screenshot, capture the field itself rather than browser chrome or unrelated UI. `docs/flower-field.png` is generated from the desktop render. Keep evidence from failed runs; do not publish unless the user authorized it.
