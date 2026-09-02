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
 * ScanRow — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a scan event: an elevated rounded row with
 * a soft shadow, a decorative token-bar "barcode" placeholder (no scan
 * dependency, hidden from a11y), the code headline, a labelled glyph + word scan
 * kind (never color alone), a location line, and the time / operator at the
 * trailing edge. Clickable when `onClick` is set. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that drops the location /
 * operator meta) — identical props/behavior to {@link ScanRowProps}. All colors
 * from `--xen-*` token classes (no literals).
 */
export declare const ScanRowV4: React.ForwardRefExoticComponent<ScanRowV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ScanRowV4.d.ts.map