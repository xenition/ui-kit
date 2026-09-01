import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Drop-in for {@link ReceiptViewProps} — same props, the V4 "register" design. */
export type ReceiptViewV4Props = ReceiptViewProps;
/**
 * ReceiptView — **V4** "register" design. The tactile checkout take on a printed
 * receipt: a monospace-feel item list, a clean subtotal / discount / tax / tip
 * block, and — after a **dashed tear line** — the **grand total big and bold** in
 * `tabular-nums` weight (the number that closes the sale). Header (merchant +
 * address + order ref), tenders with derived change, and a footer are preserved.
 * Money is integer **cents** throughout via `formatMoney`. An empty item list
 * renders a labelled {@link EmptyState}. Same props/behavior as
 * {@link ReceiptViewProps}; token-only via `useXenitionTheme()`.
 */
export declare function ReceiptViewV4({ merchant, addressLines, orderNumber, timestamp, items, currency, subtotalCents, discountCents, taxCents, tipCents, totalCents, tenders, footer, variant, emptyLabel, testID, style, }: ReceiptViewV4Props): React.ReactElement;
//# sourceMappingURL=ReceiptViewV4.d.ts.map