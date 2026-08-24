import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type DiscountType } from './internal';
export type DiscountRowVariant = 'default' | 'compact';
export interface DiscountRowProps {
    /** Discount label (e.g. "Loyalty 10%", "Manager comp"). */
    label?: string;
    /** How the discount is expressed. */
    type?: DiscountType;
    /** The raw value: a percentage (0–100) for `percent`, else cents for `amount`. */
    value?: number;
    /** The resolved money impact in integer **cents** (always shown negative). */
    amountCents?: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Optional reason / authorization note. */
    note?: string;
    /**
     * When `false` (or omitted with an `onAdd`), the row renders an "Add
     * discount" affordance instead of a resolved discount.
     */
    active?: boolean;
    /** Edit handler; makes the resolved row tappable. */
    onEdit?: () => void;
    /** Remove handler; renders a remove control. */
    onRemove?: () => void;
    /** Add handler; used by the empty/add affordance. */
    onAdd?: () => void;
    /** Copy for the add affordance (default `Add discount`). */
    addLabel?: string;
    /** Density. */
    variant?: DiscountRowVariant;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A discount line on the ticket. In its resolved state it shows the label, the
 * percent/amount basis, an optional note, the negative money impact (integer
 * **cents** via `formatMoney`, drawn in the `success`/savings tone), and a
 * remove control. With no active discount it collapses to a dashed "Add
 * discount" button that fires `onAdd`. Token-only colors; a11y button roles.
 */
export declare function DiscountRow({ label, type, value, amountCents, currency, note, active, onEdit, onRemove, onAdd, addLabel, variant, testID, style, }: DiscountRowProps): React.ReactElement;
//# sourceMappingURL=DiscountRow.d.ts.map