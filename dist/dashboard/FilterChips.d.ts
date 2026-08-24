import * as React from 'react';
export interface FilterChipOption {
    value: string;
    label: string;
}
export interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Options as `{value,label}` objects or bare strings (used as both). */
    options: Array<FilterChipOption | string>;
    /** Currently selected value(s). */
    selected: string | string[];
    /** Fires with the next selection. Shape mirrors `multi`. */
    onChange: (next: string | string[]) => void;
    /** Allow multiple chips selected at once. */
    multi?: boolean;
    /** Lay chips in a horizontal scroller instead of wrapping. */
    scroll?: boolean;
}
/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set.
 */
export declare const FilterChips: React.ForwardRefExoticComponent<FilterChipsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=FilterChips.d.ts.map