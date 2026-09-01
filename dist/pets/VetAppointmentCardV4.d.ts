import * as React from 'react';
import type { VetAppointmentCardProps } from './VetAppointmentCard';
/** V4 layout choices for the "companion" design. */
export type VetAppointmentCardLayout = 'card' | 'compact';
/** Drop-in for {@link VetAppointmentCardProps} — same props, the V4 "companion" design. */
export interface VetAppointmentCardV4Props extends VetAppointmentCardProps {
    /** V4 layout: `card` (default) or `compact` (dense single row). */
    variant?: VetAppointmentCardLayout;
}
/**
 * VetAppointmentCard — **V4** "companion" design (web parity of the native V4).
 * The warm, friendly take on a vet visit: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the reason glyph in a soft-primary
 * tinted well, a bold vet name, muted meta lines (date/time/pet/clinic), a
 * labelled status Badge, and the notes shown as a soft-primary chip. Open visits
 * (`upcoming`/`today`) keep the confirm + cancel actions. Same props/behavior as
 * {@link VetAppointmentCardProps}; status + reason both read via glyph + labelled
 * chip (never color alone). All colors from `--xen-*` token classes (no literals).
 */
export declare const VetAppointmentCardV4: React.ForwardRefExoticComponent<VetAppointmentCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VetAppointmentCardV4.d.ts.map