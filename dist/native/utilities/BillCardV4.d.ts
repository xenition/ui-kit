import * as React from 'react';
import type { BillCardProps } from './BillCard';
/** Drop-in for {@link BillCardProps} — same props, a different design. */
export type BillCardV4Props = BillCardProps;
/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated
 * rounded surface, the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch), a status pill carrying text + glyph + color, and the
 * amount due in integer cents via `formatMoney`. Restraint by design — the money
 * stays on the calm surface; only the small disc is gradient. An optional pay
 * `Button` (danger tone when overdue) and whole-card press are preserved. Same
 * props as {@link BillCardProps}; token-only colors.
 */
export declare function BillCardV4({ kind, provider, accountNumber, amountCents, dueDate, status, currency, formatMoney: format, payLabel, onPay, paying, onPress, style, }: BillCardV4Props): React.ReactElement;
//# sourceMappingURL=BillCardV4.d.ts.map