import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface OpenTextResponseProps {
    /** Controlled text value. */
    value: string;
    /** Fires with the next text on every edit. */
    onChange: (value: string) => void;
    /** Placeholder shown when empty. */
    placeholder?: string;
    /** Optional field label above the input. */
    label?: string;
    /** Visible line count → min height (mirrors the primitive `rows`). Default 4. */
    rows?: number;
    /** Max characters; when set a live `n / max` counter is shown. */
    maxLength?: number;
    /** Force the danger border + announce the error line. */
    error?: string;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A free-text answer field — wraps the token `Textarea` primitive and adds a
 * survey-friendly live character counter (when `maxLength` is set) that turns to
 * the danger tone as the limit is reached, plus an optional error line. Fully
 * controlled (`value`/`onChange`). No literal colors.
 */
export declare function OpenTextResponse({ value, onChange, placeholder, label, rows, maxLength, error, disabled, style, }: OpenTextResponseProps): React.ReactElement;
//# sourceMappingURL=OpenTextResponse.d.ts.map