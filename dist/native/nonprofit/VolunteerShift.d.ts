import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface VolunteerShiftProps {
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
    /** Fires when the viewer taps to sign up (never fires when full). */
    onSignUp?: () => void;
    /** Fires when a signed-up viewer taps to cancel. */
    onCancel?: () => void;
    /** Block the action button. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A volunteer-shift row: role, date/time/location meta, a slots-filled meter,
 * and a sign-up / cancel action. Capacity fill is guarded against a zero
 * capacity and clamped. Full shifts are badged and the action is disabled;
 * signed-up state is announced via `accessibilityState.selected` on the button —
 * not color alone. All colors come from the compiled theme tokens — no literal
 * colors.
 */
export declare function VolunteerShift({ role, date, time, location, filled, capacity, signedUp, onSignUp, onCancel, loading, style, }: VolunteerShiftProps): React.ReactElement;
//# sourceMappingURL=VolunteerShift.d.ts.map