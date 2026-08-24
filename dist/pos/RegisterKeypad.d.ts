import * as React from 'react';
/** A key emitted by the keypad. Digit keys are the character itself. */
export type KeypadKey = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'decimal' | 'doubleZero' | 'backspace' | 'clear';
export type RegisterKeypadVariant = 'amount' | 'number' | 'pin';
export interface RegisterKeypadProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onKeyPress' | 'children'> {
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
}
/**
 * A numeric entry grid for a register — tenders, quantities, and PINs, the DOM
 * parity of the native keypad. Keys are emitted through `onKeyPress`, and
 * value-mutating keys additionally fold into a controlled `value` via `onChange`
 * (append digit, single decimal, `00`, backspace, clear). `pin` masks the
 * display. Token-only: every surface, border, and glyph color traces to a
 * `--xen-*` token class, and each key is a real, labelled `<button>` for
 * keyboard + screen-reader use. No dependencies.
 */
export declare const RegisterKeypad: React.ForwardRefExoticComponent<RegisterKeypadProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=RegisterKeypad.d.ts.map