import * as React from 'react';
export interface SearchHeaderProps {
    /** Current query text (controlled). */
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    /** Fires on submit / Enter key. */
    onSubmit?: () => void;
    /** Trailing action slot (e.g. a filter button). */
    actions?: React.ReactNode;
    /** Show a clear (×) button when there is text. */
    clearable?: boolean;
    className?: string;
}
/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
export declare const SearchHeader: React.ForwardRefExoticComponent<SearchHeaderProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=SearchHeader.d.ts.map