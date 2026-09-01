import * as React from 'react';
import type { PrescriptionRowProps } from './PrescriptionRow';
/** V4 layout choices for the "clinic" design. */
export type PrescriptionRowLayout = 'full' | 'compact';
/** Drop-in for {@link PrescriptionRowProps} — same props, the V4 "clinic" design. */
export interface PrescriptionRowV4Props extends PrescriptionRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: PrescriptionRowLayout;
}
/**
 * PrescriptionRow — **V4** "clinic" design. The calm, clinical take on a
 * medication row: an elevated rounded row with a soft shadow, a pill glyph, the
 * drug name, dose · directions · refills, and a status marker (active /
 * refill-due / paused / expired) drawn as a glyph + labelled Badge + token tone,
 * so it never relies on color alone (accessibility + the token contract). A
 * "Refill" action surfaces when a refill is due. Honors the V4 `variant` —
 * `full` (default) and `compact` (a denser single line that hides the secondary
 * detail line) — identical props/behavior to {@link PrescriptionRowProps}.
 * Token-only colors via `useXenitionTheme()`. Web/native parity of the V4 web
 * component. Informational UI only — not a medical device.
 */
export declare function PrescriptionRowV4({ name, dose, frequency, refillsLeft, status, onRefill, onPress, variant, style, }: PrescriptionRowV4Props): React.ReactElement;
//# sourceMappingURL=PrescriptionRowV4.d.ts.map