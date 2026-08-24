import * as React from 'react';
export type AppointmentSlotStatus = 'available' | 'selected' | 'held' | 'booked';
export interface AppointmentSlotProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
    /** Display time, e.g. "9:30 AM". */
    time: string;
    /** Slot state; drives accent, fill, and interactivity. Default `available`. */
    status?: AppointmentSlotStatus;
    /** Optional secondary line (e.g. stylist name or "45 min"). */
    meta?: string;
    /** Fires when an interactive slot is activated. */
    onClick?: () => void;
}
/**
 * A single bookable time slot rendered as a real `<button>`. `status` carries
 * the meaning (never color alone): `selected` fills with the primary and sets
 * `aria-pressed`; `held`/`booked` are disabled + labelled; `available` is an
 * outlined tap target. The accessible name always includes the status word.
 * Token-only colors.
 */
export declare const AppointmentSlot: React.ForwardRefExoticComponent<AppointmentSlotProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=AppointmentSlot.d.ts.map