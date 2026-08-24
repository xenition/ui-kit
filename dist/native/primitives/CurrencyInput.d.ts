import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface CurrencyInputProps {
    /** Controlled numeric amount (major units, e.g. dollars). */
    value?: number | null;
    /** Fires with the parsed number (or `null` when the field is cleared). */
    onChange?: (value: number | null) => void;
    /** Leading currency glyph shown in the badge. */
    symbol?: string;
    /** Fractional digits to allow while typing (default 2). */
    precision?: number;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    containerStyle?: StyleProp<ViewStyle>;
}
/**
 * Currency field — a token-bound `TextInput` with a leading currency badge that
 * accepts digits and a single decimal point (capped to `precision`) and reports
 * the parsed `number` (or `null`) via `onChange`. Border flips to `danger` when
 * `invalid`; uses the `decimal-pad` keyboard. No literal colors.
 */
export declare function CurrencyInput({ value, onChange, symbol, precision, placeholder, invalid, disabled, accessibilityLabel, containerStyle, }: CurrencyInputProps): React.ReactElement;
//# sourceMappingURL=CurrencyInput.d.ts.map