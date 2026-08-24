import * as React from 'react';
import { type ScanKind } from './internal';
export interface ScanRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
    /** The scanned code / barcode value (headline, monospace-ish). */
    code: string;
    /** Scan kind — glyph + word, never color alone. */
    kind: ScanKind;
    /** Location / station where the scan happened. */
    location?: string;
    /** Human timestamp (e.g. `10:42:07`). */
    time?: string;
    /** Operator / device that produced the scan. */
    operator?: string;
    /** Makes the row clickable (drill into the scan). */
    onClick?: () => void;
}
/**
 * A single scan event row. The kit ships no barcode renderer, so the code is
 * shown as text beside a **token-bar placeholder** that evokes a barcode
 * (alternating neutral-ramp bars, purely decorative and hidden from a11y). The
 * scan kind is carried by a glyph + word chip. Clickable when `onClick` is set.
 * All colors are theme tokens — no literal colors, no scan/barcode dependency.
 * Web parity of the native `ScanRow`.
 */
export declare const ScanRow: React.ForwardRefExoticComponent<ScanRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScanRow.d.ts.map