import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AppointmentSlotStatus = 'available' | 'selected' | 'held' | 'booked';
export interface AppointmentSlotProps {
    /** Display time, e.g. "9:30 AM". */
    time: string;
    /** Slot state; drives accent, fill, and interactivity. Default `available`. */
    status?: AppointmentSlotStatus;
    /** Optional secondary line (e.g. stylist name or "45 min"). */
    meta?: string;
    /** Fires when an interactive slot is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single bookable time slot rendered as a tappable pill. `status` carries the
 * meaning (never color alone): `selected` fills with the accent, `held`/`booked`
 * are disabled and labelled, `available` is an outlined tap target. The spoken
 * label always includes the status word, and `accessibilityState.selected` /
 * `.disabled` are set. Token-only colors via semantic slots + `withAlpha`.
 */
export declare function AppointmentSlot({ time, status, meta, onPress, style, }: AppointmentSlotProps): React.ReactElement;
//# sourceMappingURL=AppointmentSlot.d.ts.map