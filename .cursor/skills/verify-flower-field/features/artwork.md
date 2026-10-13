# Procedural artwork

## Sub-features
Lavender dotwork on black; folded petals attached to a numeric bowl; slender stems and same-side rulers; varied plants and negative space. Full growth resembles the README screenshot. Wang’s reference informs structure without overriding the user’s style.

## How to get to it (user POV)
Open index.html or the local preview. The initial field is fully grown; use the Growth slider or End on the focused artwork to restore it.

## Driving it with Playwright
Reach full growth through real input. Capture 1280/390/320px views and enlarged distinct bloom variants. Compare silhouette, density, folds, bowl projection, attachments, text orientation and clipping. Use #field and #growth.

## Gotchas
Raster-head reuse cannot prove generated geometry. Legacy plant counts are historical contracts, not automatically remaster requirements. Judge visibility at actual page scale.

## Source and current coverage
field.js: bloom() projects cubic petal ribbons with continuous silhouettes and numeric bowl glyphs; fieldLayout restores the reference composition; leaf(), stem() and draw() generate the rest. The harness captures full and partial states at three widths. Visual likeness requires rendered review.
