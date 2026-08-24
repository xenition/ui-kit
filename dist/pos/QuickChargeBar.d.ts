import * as React from 'react';
export type QuickChargeBarVariant = 'bar' | 'inline';
export interface QuickChargeBarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Order total in integer **cents**. */
    totalCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Item count — when `0` the bar disables and shows the empty hint. */
    itemCount?: number;
    /** Charge handler. */
    onCharge?: () => void;
    /** Charge button copy (default `Charge`). The total is appended. */
    chargeLabel?: string;
    /** Show a spinner and block the charge (payment in flight). */
    loading?: boolean;
    /** Force-disable regardless of item count. */
    disabled?: boolean;
    /** Copy shown (in place of the total) when the cart is empty. */
    emptyLabel?: string;
    /** Secondary action slot (e.g. a "Split" button) rendered before Charge. */
    secondaryAction?: React.ReactNode;
    /** `bar` (default) is a bordered sticky footer; `inline` drops the chrome. */
    variant?: QuickChargeBarVariant;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * The register's charge affordance — the DOM parity of the native
 * `QuickChargeBar`. A sticky footer showing the running total (integer **cents**
 * via `formatMoney`) and item count beside a primary Charge button. An empty
 * cart (`itemCount === 0`) disables charging and swaps the total for an
 * `emptyLabel` hint, so the empty state is conveyed by text and the button's
 * `disabled` attribute, never color alone. The web `Button` has no `loading`
 * prop, so `loading` maps to `disabled` + an inline `Spinner`. Composed from the
 * `Button` primitive; token-only colors.
 */
export declare const QuickChargeBar: React.ForwardRefExoticComponent<QuickChargeBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=QuickChargeBar.d.ts.map