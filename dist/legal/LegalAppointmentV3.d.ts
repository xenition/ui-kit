import * as React from 'react';
import type { LegalAppointmentProps } from './LegalAppointment';
/** Same public contract as {@link LegalAppointment} — a drop-in alternate design. */
export type LegalAppointmentV3Props = LegalAppointmentProps;
/**
 * LegalAppointment, redesigned (v3): a **dense schedule line**. The type glyph, the
 * client + date·time over a location subtitle, an inline status word, and a compact
 * Confirm — hairline-bordered for a list. The opposite of v2's card. Same props,
 * token-only.
 */
export declare const LegalAppointmentV3: React.ForwardRefExoticComponent<LegalAppointmentProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LegalAppointmentV3.d.ts.map