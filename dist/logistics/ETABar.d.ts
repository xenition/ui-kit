import * as React from 'react';
export type ETAStatus = 'on-time' | 'ahead' | 'delayed' | 'arrived';
export interface ETABarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Journey completion, 0–100 (clamped, NaN-safe). */
    progress?: number;
    /** ETA punctuality — carried by glyph + word, never color alone. */
    status?: ETAStatus;
    /** Human ETA text (e.g. `12:40 PM`, `~25 min`). */
    eta?: string;
    /** Origin label, shown at the left end. */
    origin?: string;
    /** Destination label, shown at the right end. */
    destination?: string;
    /** Render a muted, indeterminate placeholder while the ETA is unknown. */
    loading?: boolean;
}
/**
 * A horizontal journey/ETA progress bar for a shipment or vehicle: a token fill
 * sized to `progress`, with an origin→destination label row and a glyph + word
 * punctuality status. Exposes a `progressbar` role with `aria-valuenow` so the
 * completion is announced, not inferred from the fill color. No literal colors —
 * the fill and track come from theme tokens. Web parity of the native `ETABar`.
 */
export declare const ETABar: React.ForwardRefExoticComponent<ETABarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ETABar.d.ts.map