import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TimeValue {
    /** Hour of day, 0–23. */
    h: number;
    /** Minute, 0–59. */
    m: number;
}
export interface TimePickerProps {
    /** Controlled time. */
    value?: TimeValue | null;
    /** Fires with the chosen `{ h, m }`. */
    onChange?: (value: TimeValue) => void;
    /** Minute granularity for the minute column (default 5). */
    minuteStep?: number;
    /** Shown on the trigger when no time is selected. */
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Zero-asset time field — a token-bound `Pressable` showing `HH:MM` that opens a
 * `Modal` with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * scroll columns. Same controlled `value`/`onChange` shape as the other native
 * pickers; `invalid` swaps the border to `danger`. No literal colors.
 */
export declare function TimePicker({ value, onChange, minuteStep, placeholder, invalid, disabled, accessibilityLabel, style, }: TimePickerProps): React.ReactElement;
//# sourceMappingURL=TimePicker.d.ts.map