import * as React from 'react';
import type { CategoryChipProps } from './CategoryChip';
export interface CategoryChipV4Props extends CategoryChipProps {
    /** The chip's accessible name. Default ``(label) => `Category ${label}` ``. */
    formatLabel?: (label: string) => string;
}
/**
 * **V4 category chip** — same props as {@link CategoryChip} plus
 * `formatLabel`.
 *
 * ## Five changes
 *
 * 1. **The `soft` chip gets a ground of its own.** It was painted `surface` —
 *    and an `ArticleCard` renders it inside a `Card`, which is also `surface`.
 *    The chip was exactly the colour of the thing it sat on, so there was no
 *    chip. It now takes `card`, the token the theme added for a raised
 *    surface.
 * 2. **`accent` as ink becomes `accentText`.** That pairing was measured at
 *    1.32:1 and corrected in `Tag` some time ago; this component never got the
 *    correction, and it is the smallest type in the module.
 * 3. **`active` is not colour alone.** A one-pixel accent ring was the whole
 *    signal on a filter control. The active chip now takes weight as well, and
 *    both twins draw the ring on every variant rather than this one drawing it
 *    on `solid` and the web twin skipping it.
 * 4. **It announces as a toggle**, with the selected state on both platforms
 *    rather than a name that says "Category Sport" and stops.
 * 5. **A pressable chip clears 44 and presses as a state layer**, not
 *    `opacity: 0.7` — which, on a chip whose entire content is one small word,
 *    reads as unavailable.
 *
 * **Renders nothing without a label** (§4.5).
 */
export declare function CategoryChipV4({ label, variant, onPress, active, formatLabel, style, }: CategoryChipV4Props): React.ReactElement | null;
//# sourceMappingURL=CategoryChipV4.d.ts.map