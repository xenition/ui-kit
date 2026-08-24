import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SearchHeaderProps {
    /** Current query text (controlled). */
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    /** Fires on submit / return key. */
    onSubmit?: () => void;
    /** Trailing action slot (e.g. a filter button). */
    actions?: React.ReactNode;
    /** Show a clear (×) button when there is text. */
    clearable?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A search bar header: a token-bound search field with a leading glyph, an
 * optional clear button, and a trailing action slot. Token-only.
 */
export declare function SearchHeader({ value, onChangeText, placeholder, onSubmit, actions, clearable, style, }: SearchHeaderProps): React.ReactElement;
//# sourceMappingURL=SearchHeader.d.ts.map