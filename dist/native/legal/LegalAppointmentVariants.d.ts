import * as React from 'react';
import type { LegalAppointmentProps } from './LegalAppointment';
/** Alternate design — identical Props to {@link LegalAppointment}, drop-in swap. */
export type LegalAppointmentV2Props = LegalAppointmentProps;
/** Alternate design — identical Props to {@link LegalAppointment}, drop-in swap. */
export type LegalAppointmentV3Props = LegalAppointmentProps;
/**
 * LegalAppointment, design v2 — an **elevated card** led by a prominent tinted
 * date block (type glyph over the date), with type + status pills, location /
 * client, and a confirm / cancel action row when actionable + still scheduled.
 * Same Props as {@link LegalAppointment}; a larger, calendar-block presentation
 * vs. the flat original. Token-pure; status is a glyph + word, never color alone.
 */
export declare function LegalAppointmentV2({ type, date, time, location, client, status, variant, actionable, onPress, onConfirm, onCancel, testID, style, }: LegalAppointmentV2Props): React.ReactElement;
/**
 * LegalAppointment, design v3 — a **compact single line**: a type glyph, the
 * date and time inline, and a trailing inline status, on a hairline divider.
 * Same Props as {@link LegalAppointment}; the tightest schedule row. Token-pure;
 * status stays a glyph + word, never color alone.
 */
export declare function LegalAppointmentV3({ type, date, time, location, client, status, onPress, testID, style, }: LegalAppointmentV3Props): React.ReactElement;
//# sourceMappingURL=LegalAppointmentVariants.d.ts.map