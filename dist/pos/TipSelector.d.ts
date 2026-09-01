import * as React from 'react';
/**
 * Props for {@link TipSelector} — a big-target tip-percentage picker for the
 * register. Presentational only: the caller owns the selection state and
 * receives callbacks. Amounts are computed from `subtotalCents` (integer
 * **cents**) for display; the selected value is echoed back via callbacks.
 */
export interface TipSelectorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
    /** Base amount the tip percentage is applied to, in integer **cents**. */
    subtotalCents: number;
    /** ISO 4217 currency code for the computed amounts. Defaults to `'USD'`. */
    currency?: string;
    /** Preset tip percentages to offer. Defaults to `[15, 18, 20]`. */
    percents?: readonly number[];
    /** Currently selected preset percentage, or `null` for none/custom/no-tip. */
    selectedPercent?: number | null;
    /**
     * Explicit custom tip amount in integer **cents**, or `null` when no custom
     * tip is set. When non-null, the Custom option is shown as selected.
     */
    customCents?: number | null;
    /** Fired with the chosen preset percentage when a preset is pressed. */
    onSelectPercent?: (percent: number) => void;
    /** Fired when the "No tip" option is pressed. */
    onNoTip?: () => void;
    /**
     * Fired when the "Custom" option is pressed. When omitted, the Custom option
     * is not rendered.
     */
    onCustom?: () => void;
    /** Optional test id forwarded to the root element. */
    testID?: string;
}
/**
 * TipSelector — **V4** "register" design. A `radiogroup` of big (≥44px) tip
 * options: each preset shows the **% bold** and the computed amount
 * (`subtotal × pct / 100`) in `tabular-nums` below, plus a "No tip" and an
 * optional "Custom" option. The selected option fills **solid primary** with
 * on-primary ink; the rest stay calm on `surface` with a soft-primary hover.
 * Presentational only — selection is driven by props and reported via
 * callbacks. All colors from `--xen-*` token classes (no literals), dark-mode
 * safe.
 */
export declare const TipSelector: React.ForwardRefExoticComponent<TipSelectorProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TipSelector.d.ts.map