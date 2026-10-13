---
name: verify-flower-field
description: Verify the procedural Flower Field, reversible growth input, geometry controls, responsive presentation and motion in a real browser.
---

# Verify Flower Field

The maintained verification workflow is [verify-flower-field](../../../.cursor/skills/verify-flower-field/SKILL.md). Read that skill and its feature map before verifying this renderer.

Run `npm test -- /private/tmp/flower-field-verification/review` from the repository root after installing Playwright and Chromium as documented there. The procedural harness lives at `.cursor/skills/verify-flower-field/verify.cjs`. The old `scripts/verify.cjs` exercises the retired SVG/raster renderer and is retained only as historical reference.

Use `docs/approved-field.png` as the visual target and `docs/current-study.png` as the current implementation screenshot. Passing assertions do not establish visual acceptance. Follow the adjacent critique skill for rendered review and keep physical-device and actual hidden-tab checks explicitly unverified until exercised.
