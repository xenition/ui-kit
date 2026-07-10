import * as React from 'react';
export interface ComboboxOption {
    label: string;
    value: string;
}
export interface ComboboxProps {
    options: ComboboxOption[];
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}
/** Searchable single-select (typeahead) bound to the theme tokens. */
export declare function Combobox({ options, value, onChange, placeholder, className, }: ComboboxProps): React.ReactElement;
//# sourceMappingURL=Combobox.d.ts.map