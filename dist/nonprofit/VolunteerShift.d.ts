import * as React from 'react';
export interface VolunteerShiftProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
    /** Role / task name, e.g. `Food Bank Sorter`. */
    role: string;
    /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
    date?: string;
    /** Pre-formatted time window, e.g. `9:00 AM – 12:00 PM`. */
    time?: string;
    /** Location line. */
    location?: string;
    /** Number of slots already filled. */
    filled?: number;
    /** Total slots available (a zero/negative capacity is guarded). */
    capacity?: number;
    /** Whether the viewer is already signed up for this shift. */
    signedUp?: boolean;
    /** Fires when the viewer clicks to sign up (never fires when full). */
    onSignUp?: () => void;
    /** Fires when a signed-up viewer clicks to cancel. */
    onCancel?: () => void;
    /** Block the action button (web `Button` has no `loading`, so it is disabled). */
    loading?: boolean;
}
/**
 * Web parity of the native `VolunteerShift`: a volunteer-shift row — role,
 * date/time/location meta, a slots-filled meter, and a sign-up / cancel action.
 * Capacity fill is guarded against a zero capacity and clamped. Full shifts are
 * badged and the action is disabled; signed-up state is announced via
 * `aria-pressed` on the action button — not color alone. All colors come from
 * the `--xen-*` token classes — no literal colors.
 */
export declare const VolunteerShift: React.ForwardRefExoticComponent<VolunteerShiftProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VolunteerShift.d.ts.map