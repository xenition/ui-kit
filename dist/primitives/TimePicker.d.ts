import * as React from 'react';
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
    /** Accessible label for the trigger. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Zero-asset time field — a token-bound trigger showing `HH:MM` that opens a
 * popover with side-by-side hour (0–23) and minute (stepped by `minuteStep`)
 * columns. Web parity of the native `TimePicker`; `invalid` swaps the border to
 * `danger`. No literal colors (kit lint rule).
 */
export declare function TimePicker({ value, onChange, minuteStep, placeholder, invalid, disabled, accessibilityLabel, className, }: TimePickerProps): React.ReactElement;
//# sourceMappingURL=TimePicker.d.ts.map