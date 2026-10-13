---
name: maintain-verification-skill
description: Audit Flower Field's verification skill, harness and feature map against source and live behavior after renderer or interaction changes.
---

# Maintain Flower Field verification

## When
Use when requested or when application changes make verification stale. Target ../verify-flower-field/SKILL.md. Missing runtime blocks live coverage; it does not make accepted requirements obsolete.

## How
1. Check the feature-map index against sibling files for missing, duplicate or dead entries. Read source and recent changes before claiming drift.
2. For a runnable app, launch one read-only source subagent per feature concurrently within available slots. Each returns a feature summary, cited source entry points, likely drift and one live recipe. Children neither edit nor drive browsers. If runtime is absent, record that prerequisite without empty source audits.
3. Reconcile overlapping recipes. The coordinator alone drives one isolated browser session and owned server using verify-flower-field. Exercise every implemented feature and mapped input path. Accepted but absent behavior remains a product gap.
4. Run doctor before driving and after surprises. Reset or relaunch a stuck UI. Preserve evidence after all cleanup, including failed attempts. Re-drive every changed harness path before marking it verified.
5. Edit only verification-owned skills, maps and helpers. Incorrect instructions are doc drift; working behavior lacking a drive is a harness gap; broken or missing accepted behavior is a product gap. Never fix product code during this audit or rewrite acceptance to hide regressions.
6. Review changed files and tear down owned resources. Keep run notes outside the repository. Do not create a branch, PR or push unless separately requested.

## Output
Report clean only when every mapped feature has source and live coverage; changed when corrections were made and exercised; blocked when required coverage could not finish, naming the prerequisite. List edits even in a blocked audit. Unexecuted instructions remain draft.

## Checks
Retain screenshot fidelity, meaningful numeric controls, plant introduction plus within-plant growth, deterministic reversal, responsive presentation and motion/accessibility coverage. DOM changes do not establish visible growth; source handlers do not prove input or visibility behavior.
