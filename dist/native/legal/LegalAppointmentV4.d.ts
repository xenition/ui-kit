import * as React from 'react';
import type { LegalAppointmentProps } from './LegalAppointment';
/** Drop-in for {@link LegalAppointmentProps} — same props, the V4 "chambers" design. */
export type LegalAppointmentV4Props = LegalAppointmentProps;
/**
 * LegalAppointment — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary date-glyph
 * block, the date + time, type + status pills (each a glyph + word so state never
 * rests on color alone), and optional location / client. When `actionable` and
 * still `scheduled`, a confirm/cancel button row is shown. Tappable when
 * `onPress` is set. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function LegalAppointmentV4({ type, date, time, location, client, status, variant, actionable, onPress, onConfirm, onCancel, testID, style, }: LegalAppointmentV4Props): React.ReactElement;
//# sourceMappingURL=LegalAppointmentV4.d.ts.map