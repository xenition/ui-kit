import * as React from 'react';
import type { FieldCardProps, FieldStatus } from './FieldCard';
export interface FieldCardV4Props extends FieldCardProps {
    /** Override the status names — four English words lived inside the component. */
    statusLabels?: Partial<Record<FieldStatus, string>>;
    /**
     * Render the area. Default is the value and its unit separated by a space.
     *
     * A prop because the separator is a locale decision: `12.4 ha`, `12,4 ha`
     * and `30.6 acres` are all correct somewhere, and a component that
     * concatenates them itself is guessing.
     */
    formatArea?: (area: number | string, unit?: string) => string;
}
/**
 * **V4 field card** — same props as {@link FieldCard} plus `statusLabels` and
 * `formatArea`.
 *
 * ## Four changes
 *
 * 1. **Press is a state layer**, not `opacity: 0.85` on the card's content —
 *    which is the signal M3 spends 0.38 on to mean *disabled*.
 * 2. **Type comes from `TextV4`, and captions take `mutedText`** — the slot
 *    with a contrast promise, rather than the `muted` ramp step the base used
 *    as ink three times.
 * 3. **The area is formatted, not concatenated.** See `formatArea`.
 * 4. **The card is `CardV4`'s raised ground.** In a scrolling list on a dark
 *    page the base had only its border to separate it from the page.
 *
 * `variant="compact"` still drops the secondary line. **Renders nothing
 * without a `name`** (§4.5).
 */
export declare function FieldCardV4({ name, area, areaUnit, crop, soilType, location, status, icon, variant, statusLabels, formatArea, onPress, style, }: FieldCardV4Props): React.ReactElement | null;
//# sourceMappingURL=FieldCardV4.d.ts.map