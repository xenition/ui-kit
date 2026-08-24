import * as React from 'react';
import { type CashMovementKind } from './internal';
export type CashDrawerRowVariant = 'default' | 'total';
export interface CashDrawerRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Movement kind — drives the glyph + default label. */
    kind: CashMovementKind;
    /** Override the default movement label. */
    label?: string;
    /** Amount in integer **cents**. */
    amountCents: number;
    /** ISO 4217 currency (default USD). */
    currency?: string;
    /**
     * For `kind="variance"`: the expected amount to compare `amountCents`
     * (counted) against — resolves an over/short/balanced pill and signed delta.
     */
    expectedCents?: number;
    /** Optional muted sub-line (e.g. count of transactions). */
    detail?: string;
    /** `total` renders emphasized (bold, top rule) for a subtotal/expected line. */
    variant?: CashDrawerRowVariant;
    /** Parity alias for `data-testid`. */
    testID?: string;
}
/**
 * One row of a cash-drawer count / register audit — the DOM parity of the native
 * `CashDrawerRow`: opening float, cash sales, pay-ins/outs, expected, counted,
 * and the variance. Money is integer **cents** via `formatMoney`, with in/out
 * movements signed. For `kind="variance"`, pass `expectedCents` and the counted
 * `amountCents` to draw an over/short/balanced **glyph + word** pill and a signed
 * delta — state by text, never color alone. When `onClick` is set the row is a
 * keyboard-operable `role="button"`. Token-only.
 */
export declare const CashDrawerRow: React.ForwardRefExoticComponent<CashDrawerRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CashDrawerRow.d.ts.map