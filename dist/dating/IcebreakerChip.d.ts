import * as React from 'react';
export type IcebreakerChipSize = 'sm' | 'md';
export type IcebreakerChipVariant = 'soft' | 'outline' | 'solid';
export interface IcebreakerChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'value'> {
    /** The prompt shown on the chip (e.g. "Coffee or tea?"). */
    label: string;
    /** Value reported to `onClick`; falls back to `label`. */
    value?: string;
    /** Selected/answered state (drawn AND announced via `aria-pressed`, never color-only). */
    selected?: boolean;
    /** Disabled (already used / unavailable). */
    disabled?: boolean;
    /** Visual weight. Defaults to `soft`. */
    variant?: IcebreakerChipVariant;
    /** Size scale. Defaults to `md`. */
    size?: IcebreakerChipSize;
    /** Leading glyph (emoji). */
    glyph?: string;
    /** Fires the chip's `value` (or `label`) when clicked. */
    onClick?: (value: string) => void;
}
/**
 * Tappable conversation-starter chip — the web parity of the native icebreaker. A
 * person picks a prompt to break the ice; `selected` reflects an already-chosen
 * prompt and is surfaced to screen readers via `aria-pressed` (not color alone).
 * A real `<button>` so it is keyboard-operable by default. Token classes only —
 * no literal colors.
 */
export declare const IcebreakerChip: React.ForwardRefExoticComponent<IcebreakerChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=IcebreakerChip.d.ts.map