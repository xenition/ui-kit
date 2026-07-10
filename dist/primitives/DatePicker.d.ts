import * as React from 'react';
export interface DatePickerProps {
    /** ISO date string (yyyy-mm-dd). */
    value: string;
    onChange: (value: string) => void;
    min?: string;
    max?: string;
    disabled?: boolean;
    invalid?: boolean;
    className?: string;
}
/** Native, zero-asset date input bound to the theme tokens. */
export declare function DatePicker({ value, onChange, min, max, disabled, invalid, className, }: DatePickerProps): React.ReactElement;
//# sourceMappingURL=DatePicker.d.ts.map