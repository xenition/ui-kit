import * as React from 'react';
export interface DateRange {
    /** Range start as ISO `YYYY-MM-DD` (or null when unset). */
    start: string | null;
    /** Range end as ISO `YYYY-MM-DD` (or null when unset). */
    end: string | null;
}
export interface DateRangePickerProps {
    /** Controlled `{ start, end }` range. */
    value?: DateRange;
    /** Fires with the updated range whenever either end changes. */
    onChange?: (value: DateRange) => void;
    /** Earliest selectable date (ISO `YYYY-MM-DD`). */
    min?: string;
    /** Latest selectable date (ISO `YYYY-MM-DD`). */
    max?: string;
    /** Labels above each end. */
    startLabel?: string;
    endLabel?: string;
    /** Renders the danger border state on both ends. */
    invalid?: boolean;
    disabled?: boolean;
    className?: string;
}
/**
 * Two-ended date range — composes two web {@link DatePicker}s (start + end) and
 * keeps them consistent: the start's `max` is bounded by the chosen end and the
 * end's `min` by the chosen start, so an invalid crossing can't be picked. Web
 * parity of the native `DateRangePicker`. No literal colors (kit lint rule).
 */
export declare function DateRangePicker({ value, onChange, min, max, startLabel, endLabel, invalid, disabled, className, }: DateRangePickerProps): React.ReactElement;
//# sourceMappingURL=DateRangePicker.d.ts.map