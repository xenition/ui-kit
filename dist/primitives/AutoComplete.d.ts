import * as React from 'react';
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
    /** Fires with the chosen option when a suggestion is picked. */
    onSelect?: (option: AutoCompleteOption) => void;
    placeholder?: string;
    /** Max suggestions to render (default 6). */
    maxResults?: number;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    /** Accessible label for the input. */
    accessibilityLabel?: string;
    className?: string;
}
/**
 * Inline autocomplete — a token-bound `<input>` with a filtered suggestion list
 * that drops in beneath it as you type. Filters `options` by label substring,
 * caps at `maxResults`, and reports text via `onChange` and the chosen row via
 * `onSelect`. Web parity of the native `AutoComplete`. No literal colors (kit
 * lint rule).
 */
export declare function AutoComplete({ options, value, onChange, onSelect, placeholder, maxResults, invalid, disabled, accessibilityLabel, className, }: AutoCompleteProps): React.ReactElement;
//# sourceMappingURL=AutoComplete.d.ts.map