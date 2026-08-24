import * as React from 'react';
export type SplitBillRowVariant = 'even' | 'custom';
export interface SplitBillRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Party label (e.g. "Guest 1", "Card ending 4242"). */
    label: string;
    /** This party's share in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /** How many items assigned to this split (shown when > 0). */
    itemCount?: number;
    /** Already settled — shows a "Paid" flag (word, not color alone). */
    paid?: boolean;
    /** Selection state for the active party being edited/charged. */
    selected?: boolean;
    /** Amount already tendered against this split, in cents. */
    paidCents?: number;
    /** Toggle-paid handler; renders a settle control. */
    onTogglePaid?: () => void;
    /** `even` (default) is an equal share; `custom` hints an editable amount. */
    variant?: SplitBillRowVariant;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * One party's slice when a bill is split — the DOM parity of the native
 * `SplitBillRow`: label, item count, this party's amount (integer **cents** via
 * `formatMoney`), a remaining/paid indicator, and a settle toggle. `paid` is
 * conveyed by a **glyph + word** flag, never color alone; `selected` draws an
 * accent ring reflected in `aria-pressed`. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
export declare const SplitBillRow: React.ForwardRefExoticComponent<SplitBillRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SplitBillRow.d.ts.map