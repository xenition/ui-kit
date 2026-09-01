import * as React from 'react';
import type { BillCardProps } from './BillCard';
/** Drop-in for {@link BillCardProps} — same props, a different design. */
export type BillCardV4Props = BillCardProps;
/**
 * BillCard — **V4** design. The clean, trust-first bill card: an elevated rounded
 * surface, the utility-kind glyph in a small brand-gradient disc (the signature
 * V4 touch), a status pill carrying text + glyph + color, and the amount due in
 * integer cents via `formatMoney`. Restraint by design — the money stays on the
 * calm surface; only the small disc is gradient. An optional pay `Button` (danger
 * tone when overdue) and whole-card click are preserved. Same props/behavior as
 * {@link BillCardProps}; token-only colors.
 */
export declare const BillCardV4: React.ForwardRefExoticComponent<BillCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BillCardV4.d.ts.map