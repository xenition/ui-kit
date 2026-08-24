import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Free-text token input — type and submit (return) to add a chip; press a chip's
 * ✕ (or backspace on the empty field) to remove one. Selected tokens render as
 * token-bound chips; the wrapper border flips to `danger` when `invalid`. All
 * colors, radii, and spacing come from `useXenitionTheme()`. No literal colors.
 */
export declare function TagInput({ value, onChange, placeholder, dedupe, invalid, disabled, accessibilityLabel, style, }: TagInputProps): React.ReactElement;
//# sourceMappingURL=TagInput.d.ts.map