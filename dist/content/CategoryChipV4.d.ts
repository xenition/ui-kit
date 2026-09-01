import * as React from 'react';
import type { CategoryChipProps } from './CategoryChip';
export interface CategoryChipV4Props extends CategoryChipProps {
    /**
     * Build the pressable chip's accessible name. Default
     * ``(label) => `Category ${label}` ``.
     */
    formatLabel?: (label: string) => string;
}
/**
 * **V4 category chip** — the web twin of the native `CategoryChipV4`, same
 * props as {@link CategoryChip} plus `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a chip.** It was `bg-surface`, the same token as
 *    the `Card` it is rendered inside, so a section label on an article card
 *    was a floating word with no container at all.
 * 2. **`accent` as ink becomes `accentText`.** The raw pairing measures
 *    1.32:1 — the kit already corrected it in `Tag` and never came back here.
 * 3. **`active` is not colour alone.** It gains weight as well as the border,
 *    and the border rule is now identical on both twins.
 * 4. **A pressable chip is a real `<button>`** that clears 44 and announces as
 *    a toggle, not a `<span>` with `role="button"`, a `tabIndex` and a
 *    hand-written Enter/Space handler.
 * 5. **Press is the state layer**, not `opacity: 0.7` — which is the band the
 *    kit spends on *disabled*.
 */
export declare const CategoryChipV4: React.ForwardRefExoticComponent<CategoryChipV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=CategoryChipV4.d.ts.map