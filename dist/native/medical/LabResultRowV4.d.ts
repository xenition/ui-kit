import * as React from 'react';
import type { LabResultRowProps } from './LabResultRow';
/** V4 layout choices for the "clinic" design. */
export type LabResultRowLayout = 'full' | 'compact';
/** Drop-in for {@link LabResultRowProps} — same props, the V4 "clinic" design. */
export interface LabResultRowV4Props extends LabResultRowProps {
    /** V4 layout: `full` (default) or `compact` (denser single line). */
    variant?: LabResultRowLayout;
}
/**
 * LabResultRow — **V4** "clinic" design. The calm, clinical take on a lab
 * result: an elevated rounded row with a soft shadow, the analyte name, a big
 * legible **tabular-nums** value + unit, and a normal / low / high / critical
 * flag. Out-of-range values are colored by tone and marked with an ↑/↓ arrow
 * plus a labelled status Badge, so an abnormal result is never signalled by
 * color alone (accessibility + the token contract). Honors the V4 `variant` —
 * `full` (default, shows the reference range) and `compact` (a denser single
 * line that hides the reference-range detail) — identical props/behavior to
 * {@link LabResultRowProps}. Token-only colors via `useXenitionTheme()`.
 * Web/native parity of the V4 web component. Informational UI only — not a
 * medical device.
 */
export declare function LabResultRowV4({ name, value, unit, referenceRange, status, collectedAt, onPress, variant, style, }: LabResultRowV4Props): React.ReactElement;
//# sourceMappingURL=LabResultRowV4.d.ts.map