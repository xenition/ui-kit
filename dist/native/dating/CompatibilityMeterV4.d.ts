import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
export interface CompatibilityMeterV4Props extends CompatibilityMeterProps {
    /** Render the percentage. Default `'82%'`. */
    formatValue?: (value: number) => string;
}
/**
 * **V4 compatibility meter** — same props as {@link CompatibilityMeter} plus
 * `formatValue`.
 *
 * ## Five changes
 *
 * 1. **`compact` is a meter.** It draws a percentage and a band word, and the
 *    base announced it as `role="text"` — so a screen-reader user got a
 *    sentence where every other variant of the same component gave them a
 *    value they could compare. `ProfileCard`'s compact row is the *only*
 *    place the score appears in a list, which is exactly where comparing
 *    matters. All three variants are now `progressbar` with the same
 *    `accessibilityValue`.
 * 2. **The band reaches the bar's number.** On the bar variant the base drew
 *    "82% · Great match" in `muted` — the one variant where the band colour
 *    was thrown away, and `muted` is a ramp step with no contrast promise
 *    besides. It takes the band's corrected ink now, as the ring already did.
 * 3. **`muted` is not spent as a 4px ring and a status dot.** The low band
 *    painted both from the `muted` *fill* slot — a ramp step with no contrast
 *    promise, in the two roles that most need one. The low band's ring takes
 *    the hairline instead, and the dot is gone: the numeral is already drawn
 *    in the band's own ink, so the dot was a second, weaker copy of it. The
 *    pill's ground is a neutral track composited into `surface` rather than a
 *    translucent tone wash that changes colour with whatever is behind it.
 * 4. **The bar is the band's own colour.** `ProgressTone` has no `accent` and
 *    no `neutral`, so the base routed the "Some overlap" band through `warn` —
 *    a status colour for a middling match, on a bar that disagreed with the
 *    number printed directly above it. The meter draws its own two-`View` bar
 *    against the same neutral track the compact pill uses.
 * 5. **The number is formattable.** `formatValue` replaces the hard-coded
 *    `${n}%`, so a locale that does not write percent that way can say so.
 */
export declare function CompatibilityMeterV4({ score, label, showValue, variant, size, loading, formatValue, style, }: CompatibilityMeterV4Props): React.ReactElement;
//# sourceMappingURL=CompatibilityMeterV4.d.ts.map