import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** A key emitted by the keypad. Digit keys are the character itself. */
export type KeypadKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'decimal' | 'doubleZero' | 'backspace' | 'clear';
export type RegisterKeypadVariant = 'amount' | 'number' | 'pin';
export interface RegisterKeypadProps {
    /** Current entry string (controlled). Digits, and a single `.` for `amount`. */
    value?: string;
    /** Called with the next entry string for value-mutating keys. */
    onChange?: (next: string) => void;
    /** Called with every raw key press (including backspace/clear). */
    onKeyPress?: (key: KeypadKey) => void;
    /**
     * Layout mode. `amount` shows a decimal key, `number` swaps it for a `00`
     * key, `pin` masks the display and drops the decimal (bottom-left is clear).
     */
    variant?: RegisterKeypadVariant;
    /** Render the running entry above the grid (default `true`). */
    showDisplay?: boolean;
    /** Prefix drawn before the display value (e.g. a currency symbol). */
    displayPrefix?: string;
    /** Placeholder shown when the entry is empty. */
    placeholder?: string;
    /** Max entry length (guards runaway input). Default 12. */
    maxLength?: number;
    /** Block all keys and dim the grid. */
    disabled?: boolean;
    /** Accessible label for the whole keypad (default `Register keypad`). */
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A numeric entry grid for a register — tenders, quantities, and PINs. Keys are
 * emitted through `onKeyPress`, and value-mutating keys additionally fold into a
 * controlled `value` via `onChange` (append digit, single decimal, `00`,
 * backspace, clear). `pin` masks the display. Token-only: every surface, border,
 * and glyph color traces to a compiled theme token, and each key is a labelled
 * `button` for screen readers. No dependencies.
 */
export declare function RegisterKeypad({ value, onChange, onKeyPress, variant, showDisplay, displayPrefix, placeholder, maxLength, disabled, accessibilityLabel, style, }: RegisterKeypadProps): React.ReactElement;
//# sourceMappingURL=RegisterKeypad.d.ts.map