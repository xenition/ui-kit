import * as React from 'react';
import type { ScanRowProps } from './ScanRow';
/** V4 layout choices for the "dispatch" design. */
export type ScanRowLayout = 'full' | 'compact';
/** Drop-in for {@link ScanRowProps} — same props, the V4 "dispatch" design. */
export interface ScanRowV4Props extends ScanRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: ScanRowLayout;
}
/**
 * ScanRow — **V4** "dispatch" design (native twin of the web V4). The confident,
 * operations-desk take on a scan event: an elevated rounded row with a soft
 * shadow, a decorative token-bar "barcode" placeholder (no scan dependency,
 * hidden from a11y), the code headline, a labelled glyph + word scan kind (never
 * color alone), a location line, and the time / operator at the trailing edge.
 * Tappable when `onPress` is set. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
export declare function ScanRowV4({ code, kind, location, time, operator, variant, onPress, testID, style, }: ScanRowV4Props): React.ReactElement;
//# sourceMappingURL=ScanRowV4.d.ts.map