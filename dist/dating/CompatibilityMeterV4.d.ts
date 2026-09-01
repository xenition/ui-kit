import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
export interface CompatibilityMeterV4Props extends CompatibilityMeterProps {
    /** Render the score. Default `'85%'`. */
    formatValue?: (value: number) => string;
}
/**
 * **V4 compatibility meter** — the web twin of the native
 * `CompatibilityMeterV4`, same props as {@link CompatibilityMeter} plus
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **`compact` is a meter.** It drew a percentage and a band word inside a
 *    pill and exposed **no role at all** on web, so a screen reader got a
 *    sentence fragment and no value; native downgraded the same variant to
 *    plain prose. All three variants now report `role="progressbar"` with the
 *    number on it, which is what the component exists to say.
 * 2. **The ring is one ring.** Same three diameters and the same 4 stroke on
 *    both twins, composed from the spacing scale — see {@link RING_SIZE}.
 * 3. **The band's colour reaches the bar's own value text**, as it already did
 *    on web and did not on native, and it is the contrast-corrected `*Text`
 *    slot rather than the fill: `text-success` is a *fill* token, and a fill
 *    has no contrast promise as ink.
 * 4. **The bar's fill is the band's own tone.** The base ran the ring, the dot
 *    and the value text through one table and the bar through a second, which
 *    mapped the `accent` band onto `warn` — so a middling match was drawn in
 *    the colour that means something has gone wrong, and the bar disagreed with
 *    the number printed above it. The bar is drawn here rather than delegated
 *    to `Progress` for exactly that reason: `ProgressTone` has no `accent` and
 *    no `neutral`, and inventing a mapping is how the two disagreed.
 *
 * The skeleton is the opaque shared mix, not `bg-neutral-200` — a ramp step
 * that is a near-white slab on a dark page.
 */
export declare const CompatibilityMeterV4: React.ForwardRefExoticComponent<CompatibilityMeterV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompatibilityMeterV4.d.ts.map