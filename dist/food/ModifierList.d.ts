import * as React from 'react';
import type { MoneyFormatter } from '../commerce';
/** How many options may be selected at once. */
export type ModifierSelectionMode = 'single' | 'multi';
export interface ModifierOption {
    /** Stable id passed back to `onToggle`. */
    id: string;
    /** Human label (e.g. "Extra cheese"). */
    label: string;
    /** Price delta in integer cents (e.g. +150). Zero/absent shows nothing. */
    priceCents?: number;
    /** Whether this option is currently selected. */
    selected?: boolean;
    /** Disable this individual option. */
    disabled?: boolean;
}
export interface ModifierListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Options to render. When empty an `emptyLabel` row is shown. */
    options: ModifierOption[];
    /** `single` (radio) or `multi` (checkbox) selection (default `multi`). */
    mode?: ModifierSelectionMode;
    /** Group heading (e.g. "Add-ons", "Choose a size"). */
    title?: string;
    /** Marks the group required; renders a "Required" hint next to the title. */
    required?: boolean;
    /** Fired with the toggled option id. */
    onToggle?: (id: string) => void;
    /** ISO 4217 currency code for price deltas (default `USD`). */
    currency?: string;
    /** Copy shown when `options` is empty (default `No options`). */
    emptyLabel?: string;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A selectable list of dish modifiers / add-ons. `mode` picks the semantics:
 * `single` behaves like a radio group (each cell `role="radio"`), `multi` like
 * checkboxes (`role="checkbox"`). Each option is a real `<button>` (keyboard
 * native) carrying `aria-checked` so selected state is not signalled by color
 * alone; a token-drawn check/dot glyph is also shown. Renders an empty row when
 * there are no options. Web parity of the native `ModifierList`; token-only.
 */
export declare const ModifierList: React.ForwardRefExoticComponent<ModifierListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ModifierList.d.ts.map