import * as React from 'react';
import type { SpendCategoryRowProps } from './SpendCategoryRow';
/** The V4 row takes exactly the base's props. */
export interface SpendCategoryRowV4Props extends SpendCategoryRowProps {
}
/**
 * **V4 spend-category row** — the web twin of the native
 * `SpendCategoryRowV4`, same props as {@link SpendCategoryRow}.
 *
 * ## Five changes
 *
 * 1. **The row's name contains the money.** `aria-label={category}` on a
 *    `role="button"` root prunes the subtree, so a reader heard "Groceries,
 *    button" and neither the amount nor the share — the two numbers the row is
 *    made of. The name is now the category, the share and the figure.
 * 2. **It is a real `<button>`**, not the module's `role="button"`-on-a-`div`
 *    helper with a hand-written Enter/Space handler.
 * 3. **Press is a state layer and focus is `ring-ring`.** There was no press
 *    feedback at all, and the focus ring was `ring-primary-300` — a ramp step,
 *    which keeps its light-mode orientation under `[data-theme="dark"]`.
 * 4. **It joins the shared row family**, so a category, a transaction and a
 *    settings row are one height and one set of gutters, and the row clears 44
 *    whether or not the optional glyph is there.
 * 5. **The captions take `muted-text`**, the contrast-corrected slot, where
 *    the base used `muted` — a ramp step with no contrast promise — as an ink.
 */
export declare const SpendCategoryRowV4: React.ForwardRefExoticComponent<SpendCategoryRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SpendCategoryRowV4.d.ts.map