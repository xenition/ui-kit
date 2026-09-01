import * as React from 'react';
import type { TagFilterBarProps } from './TagFilterBar';
export interface TagFilterBarV4Props extends TagFilterBarProps {
    /** How a chip's label and count read together. Default `'Enterprise, 12'`. */
    formatFilterLabel?: (label: string, count?: number) => string;
}
/**
 * **V4 tag filter bar** — same props as {@link TagFilterBar} plus
 * `formatFilterLabel`.
 *
 * ## Six changes
 *
 * 1. **A selected chip is readable.** Native filled with `colors[tone]` and
 *    inked with `colors.onSurface` for every tone but `primary` and `accent` —
 *    body ink on a saturated brand fill, with no contrast promise at all. And
 *    `neutral` filled the chip with `colors.muted`, a **text** token. Both go
 *    through `toneFill` / `toneOnOf`, so every fill wears its own paired ink.
 *    The web twin was already correct here; the same prop was unreadable on
 *    one platform only.
 * 2. **The idle chip's ground is opaque.** It was a 4% wash of `onSurface`,
 *    so the chip's rendered colour depended on whatever the bar was sitting
 *    over.
 * 3. **Chips clear 44**, which a 8px-padded pill did not.
 * 4. **Clear is a real button.** Red text alone is a colour-only affordance
 *    with no target; it gains a ground, a border and a full-height box.
 * 5. **The count joins the chip's name.** It was rendered on screen and never
 *    announced.
 * 6. **Selection is announced once.** The base said `accessibilityState`
 *    *and* appended ", selected" to the label, so a reader said it twice.
 *    Plus rule B.
 */
export declare function TagFilterBarV4({ tags, selected, onToggle, onClear, tone, emptyLabel, formatFilterLabel, style, }: TagFilterBarV4Props): React.ReactElement;
//# sourceMappingURL=TagFilterBarV4.d.ts.map