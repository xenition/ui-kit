import * as React from 'react';
import type { LegalAppointmentProps } from './LegalAppointment';
/** Drop-in for {@link LegalAppointmentProps} — same props, the V4 "chambers" design. */
export type LegalAppointmentV4Props = LegalAppointmentProps;
/**
 * LegalAppointment — **V4** "chambers" design (web parity of the native V4). The
 * distinguished, chambers take on a scheduled appointment: an elevated rounded
 * card with a soft shadow, a leading soft-primary date-glyph block, the date +
 * time, type + status pills (each a glyph + word so state never rests on color
 * alone), and optional location / client. When `actionable` and still
 * `scheduled`, a confirm/cancel row of real `<button>`s is shown. When `onClick`
 * is set the card is a keyboard-activable `role="button"`. Reuses the base
 * `variant` (`default` / `compact`). All colors from `--xen-*` token classes
 * (no literals).
 */
export declare const LegalAppointmentV4: React.ForwardRefExoticComponent<LegalAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LegalAppointmentV4.d.ts.map