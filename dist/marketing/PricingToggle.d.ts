import * as React from 'react';
export interface PricingToggleOption {
    /** Visible label ("Monthly", "Yearly", …). */
    label: React.ReactNode;
    /** Value reported via `onChange` when selected. */
    value: string;
    /** Optional small "save %" (or any) badge shown beside the label. */
    badge?: React.ReactNode;
}
export interface PricingToggleProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Segments to switch between (2+ supported). */
    options: PricingToggleOption[];
    /** Currently active option value (controlled). */
    value: string;
    /** Fires with the newly selected value. */
    onChange: (value: string) => void;
    /** Accessible label for the switch group. */
    label?: string;
}
/**
 * Monthly/yearly (or N-option) segmented switch that reports the active key
 * via `value`/`onChange`, with a per-option "save %" badge slot. Pairs with
 * `PricingTable` to swap billing periods.
 */
export declare const PricingToggle: React.ForwardRefExoticComponent<PricingToggleProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PricingToggle.d.ts.map