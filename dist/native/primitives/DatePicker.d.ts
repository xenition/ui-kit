import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DatePickerProps {
    /** Selected date — an ISO `YYYY-MM-DD` string or a `Date`. */
    value?: string | Date | null;
    /** Fires with the chosen civil date as an ISO `YYYY-MM-DD` string. */
    onChange?: (value: string) => void;
    /** Earliest selectable date (ISO `YYYY-MM-DD` or `Date`). */
    min?: string | Date;
    /** Latest selectable date (ISO `YYYY-MM-DD` or `Date`). */
    max?: string | Date;
    /** Shown on the trigger when no date is selected. */
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Locale for the month/weekday labels and the trigger's long date. */
    locale?: string;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Zero-asset date field — the native mirror of the web `DatePicker`. RN has no
 * `<input type="date">`, so this is a token-bound `Pressable` showing the
 * formatted date that opens a `Modal` with a dependency-free month grid (plain
 * `Date` math; no external date lib) and prev/next month chevrons. Same
 * `value`/`min`/`max`/`invalid`/`disabled` contract; the web `onChange(string)`
 * is preserved (fires the picked day as ISO `YYYY-MM-DD`). Adds a `placeholder`.
 * Days outside `min`/`max` are muted and disabled. No literal colors.
 */
export declare function DatePicker({ value, onChange, min, max, placeholder, invalid, disabled, locale, accessibilityLabel, style, }: DatePickerProps): React.ReactElement;
//# sourceMappingURL=DatePicker.d.ts.map