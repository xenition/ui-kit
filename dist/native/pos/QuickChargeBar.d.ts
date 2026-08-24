import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type QuickChargeBarVariant = 'bar' | 'inline';
export interface QuickChargeBarProps {
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
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * The register's charge affordance — a sticky footer showing the running total
 * (integer **cents** via `formatMoney`) and item count beside a primary Charge
 * button. An empty cart (`itemCount === 0`) disables charging and swaps the
 * total for an `emptyLabel` hint, so the empty state is conveyed by text and the
 * button's `accessibilityState.disabled`, never color alone. `loading` shows the
 * `Button` spinner. Composed from the `Button` primitive; token-only colors.
 */
export declare function QuickChargeBar({ totalCents, currency, itemCount, onCharge, chargeLabel, loading, disabled, emptyLabel, secondaryAction, variant, testID, style, }: QuickChargeBarProps): React.ReactElement;
//# sourceMappingURL=QuickChargeBar.d.ts.map