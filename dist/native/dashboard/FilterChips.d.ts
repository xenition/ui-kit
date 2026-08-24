import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FilterChipOption {
    value: string;
    label: string;
}
export interface FilterChipsProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A row of selectable filter chips (single- or multi-select). The selected
 * chip(s) fill with the `primary` token. Token-only; wraps by default, or lays
 * out in a horizontal scroller when `scroll` is set.
 */
export declare function FilterChips({ options, selected, onChange, multi, scroll, style, }: FilterChipsProps): React.ReactElement;
//# sourceMappingURL=FilterChips.d.ts.map