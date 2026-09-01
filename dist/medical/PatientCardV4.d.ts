import * as React from 'react';
import type { PatientCardProps } from './PatientCard';
/** V4 layout choices for the "clinic" design. */
export type PatientCardLayout = 'full' | 'compact';
/** Drop-in for {@link PatientCardProps} — same props, the V4 "clinic" design. */
export interface PatientCardV4Props extends PatientCardProps {
    /** V4 layout: `full` (card, default) or `compact` (dense single row). */
    variant?: PatientCardLayout;
}
/**
 * PatientCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a patient roster / chart-header row: an elevated rounded card
 * with a soft shadow, the avatar + name + an age·sex·MRN demographic line, an
 * optional room, and a labelled clinical-status badge whose meaning is carried
 * by a glyph + label as well as tone (never color alone). When `onClick` is set
 * the card is a keyboard-activatable `role="button"`. Honors the V4 `variant` —
 * `full` (card, default) and `compact` (a dense single row) — identical
 * props/behavior to {@link PatientCardProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
export declare const PatientCardV4: React.ForwardRefExoticComponent<PatientCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PatientCardV4.d.ts.map