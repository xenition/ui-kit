import * as React from 'react';
import type { TagFilterBarProps } from './TagFilterBar';
export interface TagFilterBarV4Props extends TagFilterBarProps {
    /**
     * How a chip's accessible name is built from its label and its count.
     * Default `` `${label}, ${count}` ``, or the bare label when there is none.
     */
    formatFilterLabel?: (label: string, count?: number) => string;
}
/**
 * **V4 tag filter bar** — the web twin of the native `TagFilterBarV4`, same
 * props as {@link TagFilterBar} plus `formatFilterLabel`.
 *
 * ## Five changes
 *
 * 1. **A selected chip is readable, on both twins.** Native filled with
 *    `colors[tone]` and inked with `colors.onSurface` for every tone but
 *    `primary` and `accent` — body ink on a saturated brand fill, with no
 *    contrast promise anywhere in it — and `neutral` filled the chip with
 *    `colors.muted`, a **text** token. The fill and its ink now come from one
 *    table, so they can never disagree about which tone they are.
 * 2. **The idle chip's ground is opaque.** Web painted a `bg-neutral-100` ramp
 *    step and native a translucent wash whose rendered colour depended on
 *    whatever the caller put behind the bar.
 * 3. **The chips and the Clear control clear 44**, and Clear is a real button
 *    with a border rather than a word of red text floating in the row.
 * 4. **The count joins the chip's name.** It was drawn and never announced, so
 *    a reader could not tell a filter with 40 matches from one with none.
 * 5. **Selection is announced once.** The base said `aria-pressed` *and*
 *    appended ", selected" to the label, so a screen reader said it twice.
 *
 * Rule B applies throughout: a press is the M3 state layer, not an opacity.
 */
export declare const TagFilterBarV4: React.ForwardRefExoticComponent<TagFilterBarV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TagFilterBarV4.d.ts.map