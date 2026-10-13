---
name: create-verification-skill
description: Create or extend Flower Field's real-browser verification harness and feature map for the procedural remaster and reversible growth interaction.
---

# Create Flower Field verification

## When
Use when the artwork becomes runnable or a new user-facing feature needs coverage. This checkout now has a static Canvas application and an executable Playwright harness. Extend the existing harness first; unexecuted new paths remain draft.

## How
1. Inspect this checkout's actual application entry point, run commands, dependencies and UI. Do not substitute the separate legacy checkout.
2. Update ../verify-flower-field/SKILL.md and its feature map from observed implementation. Keep accepted requirements separate from implemented behavior. Missing behavior is a product gap, not permission to remove the requirement.
3. Prefer an existing browser harness. Otherwise create an executable Playwright helper owned by the verification skill. Serve only public assets on an ephemeral loopback port and use an isolated browser. Document exact dependency, launch, readiness, drive and teardown commands after proving them; do not invent selectors in advance.
4. Exercise actual wheel, pointer/touch and visible control paths. Internal progress setters cannot establish input handling. Instrumentation may observe progress and geometry but must not replace user actions.
5. Record input direction, progress and rendered state before/after. Compare reversal at the same seed, viewport and progress, with wind disabled through a supported control or reduced-motion preference. Document numeric tolerances.
6. Prove launch, doctor, one mapped feature, evidence capture and cleanup end to end. Confirm evidence survives cleanup. Clean up after failed attempts too. If application files are absent, report that prerequisite and retain draft status.

## Output
Updated verification skill, feature map, documented executable helpers when available, and evidence for the feature actually driven. State implemented, verified and pending coverage separately. Use maintain-verification-skill as the upkeep loop. Do not automatically publish, push or create a PR.

## Checks
Full growth uses the README screenshot as its visual target. Reversal restores the same plants rather than rerandomizing them. Every command claimed runnable has been exercised in this checkout.
