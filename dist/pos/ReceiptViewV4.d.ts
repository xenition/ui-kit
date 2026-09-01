import * as React from 'react';
import type { ReceiptViewProps } from './ReceiptView';
/** Drop-in for {@link ReceiptViewProps} — same props, the V4 "register" design. */
export type ReceiptViewV4Props = ReceiptViewProps;
/**
 * ReceiptView — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a printed receipt: a monospace-feel item list, a clean
 * subtotal / discount / tax / tip block, and — after a **dashed tear line** — the
 * **grand total big and bold** in `tabular-nums` (the number that closes the
 * sale). Header (merchant + address + order ref), tenders with derived change,
 * and a footer are preserved. Money is integer **cents** throughout via
 * `formatMoney`. An empty item list renders a labelled {@link EmptyState}. Same
 * props/behavior as {@link ReceiptViewProps}; all colors from `--xen-*` token
 * classes (no literals).
 */
export declare const ReceiptViewV4: React.ForwardRefExoticComponent<ReceiptViewProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReceiptViewV4.d.ts.map