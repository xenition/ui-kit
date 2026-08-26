import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ComboboxOption {
    label: string;
    value: string;
}
export interface ComboboxProps {
    /** The choices (RN has no `<option>` children — pass them as data). */
    options: ComboboxOption[];
    /** Controlled selected value. */
    value?: string;
    /**
     * Fires with the chosen option's value. Prefer `onChange` — that is the kit's
     * one canonical name for "the value changed", and what the web twin has
     * always called this. `onValueChange` is the original native spelling, kept
     * so existing callers keep working; if both are passed this one wins.
     */
    onValueChange?: (value: string) => void;
    /** Canonical spelling of `onValueChange` (see it for the precedence rule). */
    onChange?: (value: string) => void;
    /** Shown on the trigger when nothing is selected, and as the search hint. */
    placeholder?: string;
    /** Renders the danger border state. */
    invalid?: boolean;
    disabled?: boolean;
    accessibilityLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Searchable single-select (typeahead) — the native mirror of the web
 * `Combobox`. RN has no `<input>`-with-listbox, so this is a token-bound
 * `Pressable` trigger that opens a `Modal` holding a search `TextInput` (which
 * filters `options` by label) plus keyboard-free `Pressable` option rows. Same
 * `options`/`value`/`placeholder` contract as the web version; the web
 * `onChange` becomes the native `onValueChange`, and (like the native `Select`)
 * it adds `invalid`/`disabled`. No literal colors.
 */
export declare function Combobox({ options, value, onValueChange, onChange, placeholder, invalid, disabled, accessibilityLabel, style, }: ComboboxProps): React.ReactElement;
//# sourceMappingURL=Combobox.d.ts.map