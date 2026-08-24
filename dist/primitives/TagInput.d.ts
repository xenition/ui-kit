import * as React from 'react';
export interface TagInputProps {
    /** Controlled list of tokens. */
    value?: string[];
    /** Fires with the full next token list on add/remove. */
    onChange?: (value: string[]) => void;
    placeholder?: string;
    /** Reject a token that already exists (case-insensitive). Default true. */
    dedupe?: boolean;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the text field. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Free-text token input — type and press Enter to add a chip; press a chip's ✕
 * (or Backspace on the empty field) to remove one. Web parity of the native
 * `TagInput`; the wrapper border flips to `danger` when `invalid`. No literal
 * colors (kit lint rule).
 */
export declare function TagInput({ value, onChange, placeholder, dedupe, invalid, disabled, accessibilityLabel, className, }: TagInputProps): React.ReactElement;
//# sourceMappingURL=TagInput.d.ts.map