import * as React from 'react';
export type CartLineVariant = 'default' | 'compact';
export interface CartLineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Item name. */
    name: string;
    /** Quantity on the ticket. */
    quantity: number;
    /** Unit price in integer **cents**. */
    unitPriceCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** Modifier / option chips (e.g. "No onion", "Large"). */
    modifiers?: string[];
    /** Free-text note for the line. */
    note?: string;
    /** Per-line discount already applied, in cents (shown struck from the total). */
    discountCents?: number;
    /** Quantity-change handler. When absent the line is read-only (qty as text). */
    onQuantityChange?: (quantity: number) => void;
    /** Minimum quantity for the stepper (default 1). */
    min?: number;
    /** Maximum quantity for the stepper. */
    max?: number;
    /** Void / remove handler; renders a remove control when provided. */
    onVoid?: () => void;
    /** Void control accessible label (default `Void {name}`). */
    voidLabel?: string;
    /** Marks the line voided — struck through + muted, stepper hidden. */
    voided?: boolean;
    /** Density. `compact` hides modifiers/notes. */
    variant?: CartLineVariant;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * One line on the register ticket — the DOM parity of the native `CartLine`
 * (sibling of the commerce `CartLineItem`): name, an inline
 * {@link QuantityStepper} (or read-only qty), modifiers/notes, an optional
 * per-line discount, the line total, and a void control. A `voided` line strikes
 * through and mutes (state by text + style, never color alone). Money is integer
 * **cents** via `formatMoney`. When `onClick` is set the whole row is a keyboard-
 * operable `role="button"`. Token-only.
 */
export declare const CartLine: React.ForwardRefExoticComponent<CartLineProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CartLine.d.ts.map