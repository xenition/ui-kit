import * as React from 'react';
import type { MoneyFormatter } from '../commerce';
export interface TipSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Selectable tip percentages (default `[10, 15, 20, 25]`). */
    percents?: number[];
    /** Currently selected percentage, or `null` for "no tip". */
    selectedPercent?: number | null;
    /** Fired with the chosen percentage (or `null` when "No tip" is picked). */
    onSelect?: (percent: number | null) => void;
    /**
     * Order subtotal in integer cents. When provided, each option shows the
     * computed tip amount under its percentage.
     */
    subtotalCents?: number;
    /** ISO 4217 currency code (default `USD`). */
    currency?: string;
    /** Group heading (default `Add a tip`). */
    title?: string;
    /** Include a "No tip" option (default `true`). */
    allowNone?: boolean;
    /** Override the cents → string formatter. */
    formatMoney?: MoneyFormatter;
}
/**
 * A row of tip-percentage options rendered as a radio-style segmented control.
 * Each option is a real `<button role="radio">` (keyboard native) that shows
 * its percentage and, when `subtotalCents` is given, the computed amount. The
 * selected option fills with the `primary` token pair and carries
 * `aria-checked` so selection is not signalled by color alone. An optional
 * leading "No tip" option emits `null`. Web parity of the native `TipSelector`;
 * token-only.
 */
export declare const TipSelector: React.ForwardRefExoticComponent<TipSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TipSelector.d.ts.map