import * as React from 'react';
import { type DiscountType } from './internal';
export type DiscountRowVariant = 'default' | 'compact';
export interface DiscountRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
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
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * A discount line on the ticket — the DOM parity of the native `DiscountRow`. In
 * its resolved state it shows the label, the percent/amount basis, an optional
 * note, the negative money impact (integer **cents** via `formatMoney`, drawn in
 * the `success`/savings tone), and a remove control. With no active discount it
 * collapses to a dashed "Add discount" `<button>` that fires `onAdd`. Token-only
 * colors; real buttons for the actions.
 */
export declare const DiscountRow: React.ForwardRefExoticComponent<DiscountRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DiscountRow.d.ts.map