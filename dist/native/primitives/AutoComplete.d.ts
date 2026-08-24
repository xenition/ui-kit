import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface AutoCompleteOption {
    label: string;
    value: string;
}
export interface AutoCompleteProps {
    /** Suggestions to filter against the typed text. */
    options: AutoCompleteOption[];
    /** Controlled input text. */
    value?: string;
    /** Fires with the new input text on every keystroke. */
    onChange?: (text: string) => void;
    /** Fires with the chosen option when a suggestion is tapped. */
    onSelect?: (option: AutoCompleteOption) => void;
    placeholder?: string;
    /** Max suggestions to render (default 6). */
    maxResults?: number;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Inline autocomplete — a token-bound `TextInput` with a filtered suggestion
 * list that drops in beneath it as you type (no `Modal`, unlike `Combobox`).
 * Filters `options` by label substring, caps at `maxResults`, and reports the
 * text via `onChange` and the chosen row via `onSelect`. Border flips to
 * `danger` when `invalid`. No literal colors.
 */
export declare function AutoComplete({ options, value, onChange, onSelect, placeholder, maxResults, invalid, disabled, accessibilityLabel, style, }: AutoCompleteProps): React.ReactElement;
//# sourceMappingURL=AutoComplete.d.ts.map