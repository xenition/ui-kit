import * as React from 'react';
import type { HealthStatus, VehicleHealthRowProps } from './VehicleHealthRow';
export interface VehicleHealthRowV4Props extends VehicleHealthRowProps {
    /** Override the status words — four English words lived inside. */
    statusLabels?: Partial<Record<HealthStatus, string>>;
    /** Draw the separator under the row. Default `false`. */
    last?: boolean;
}
/**
 * **V4 vehicle health row** — same props as {@link VehicleHealthRow} plus
 * `statusLabels` and `last`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding and
 *    separator inset match every other row in the kit.
 * 2. **Status is a word and a glyph, not a tint.** A row of coloured dots down
 *    a diagnostics list is unreadable to a colour-blind driver, which is the
 *    one user this screen exists for.
 * 3. **`unknown` stops borrowing a status colour** — see {@link HEALTH_META}.
 * 4. **The reading is tabular** and the ink is the contrast-corrected slot.
 *
 * **Renders nothing without a `system`** (§4.5).
 */
export declare function VehicleHealthRowV4({ system, status, reading, glyph, percent, variant, statusLabels, last, style, }: VehicleHealthRowV4Props): React.ReactElement | null;
//# sourceMappingURL=VehicleHealthRowV4.d.ts.map