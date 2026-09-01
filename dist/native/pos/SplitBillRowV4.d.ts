import * as React from 'react';
import type { SplitBillRowProps } from './SplitBillRow';
/** Drop-in for {@link SplitBillRowProps} — same props, the V4 "register" design. */
export type SplitBillRowV4Props = SplitBillRowProps;
/**
 * SplitBillRow — **V4** "register" design. The tactile checkout take on a
 * split-bill row: a guest/share label with its item count, this party's **share
 * drawn big and bold** in `tabular-nums`, and a clear **paid/unpaid** state —
 * settled parties get a soft-success glow with a `✓ Paid` flag (word, not color
 * alone) and a large (≥44px) check control; unpaid parties get a primary "Pay"
 * settle affordance (≥44px). `selected` draws an accent ring reflected in
 * `accessibilityState`. Same props/behavior as {@link SplitBillRowProps};
 * token-only tints via `useXenitionTheme()` + `withAlpha`. Dark-mode safe.
 */
export declare function SplitBillRowV4({ label, amountCents, currency, itemCount, paid, selected, paidCents, onPress, onTogglePaid, variant, testID, style, }: SplitBillRowV4Props): React.ReactElement;
//# sourceMappingURL=SplitBillRowV4.d.ts.map