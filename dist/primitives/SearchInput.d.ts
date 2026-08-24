import * as React from 'react';
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    /** Controlled query text. */
    value?: string;
    /** Fires with the new query text. */
    onChangeText?: (text: string) => void;
    /** Fires when the clear (✕) affordance is pressed. */
    onClear?: () => void;
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the input. */
    accessibilityLabel?: string;
    /** Wrapper className override. */
    className?: string;
}
/**
 * Search field — a token-bound `<input>` with a leading search glyph and a
 * trailing clear (✕) button that appears once there is text. Web parity of the
 * native `SearchInput`; `invalid` swaps the border to `danger`. No literal
 * colors (kit lint rule).
 */
export declare const SearchInput: React.ForwardRefExoticComponent<SearchInputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SearchInput.d.ts.map