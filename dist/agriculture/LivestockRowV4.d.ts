import * as React from 'react';
import type { LivestockHealth, LivestockRowProps } from './LivestockRow';
export interface LivestockRowV4Props extends LivestockRowProps {
    /** Override the health names — three English words lived inside the component. */
    healthLabels?: Partial<Record<LivestockHealth, string>>;
    /** Shown in place of the head count when it is unknown. Default `'—'`. */
    unknownCountLabel?: string;
    /** Format the head count. Default `String(count)`. */
    formatCount?: (count: number) => string;
}
/**
 * **V4 livestock row** — the web twin of the native `LivestockRowV4`, same
 * props as {@link LivestockRow} plus `healthLabels`, `unknownCountLabel` and
 * `formatCount`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line**, so its height, padding, hover
 *    fill and separator inset are the decisions every other row in the kit
 *    makes rather than this component's own.
 * 2. **The head count is tabular and formattable.** A column of pen counts
 *    that does not line up is a column nobody can scan, and `1,240` is not
 *    `1.240` everywhere.
 * 3. **Captions take `muted-text`**, the slot with a contrast promise.
 * 4. **Health is a badge word beside the tone**, never colour alone.
 *
 * **Renders nothing without a `species`** (§4.5).
 */
export declare const LivestockRowV4: React.ForwardRefExoticComponent<LivestockRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LivestockRowV4.d.ts.map