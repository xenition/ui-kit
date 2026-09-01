import * as React from 'react';
import type { SplitBillRowProps } from './SplitBillRow';
/** Drop-in for {@link SplitBillRowProps} — same props, the V4 "register" design. */
export type SplitBillRowV4Props = SplitBillRowProps;
/**
 * SplitBillRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a split-bill row: a guest/share label with its item
 * count, this party's **share drawn big and bold** in `tabular-nums`, and a clear
 * **paid/unpaid** state — settled parties get a soft-success glow with a `✓ Paid`
 * flag (word, not color alone); unpaid parties get a large (≥44px) primary "pay"
 * settle control. `selected` draws an accent ring reflected in `aria-pressed`;
 * when `onClick` is set the row is a keyboard-operable `role="button"`. Same
 * props/behavior as {@link SplitBillRowProps}; all colors from `--xen-*` token
 * classes (no literals). Dark-mode safe.
 */
export declare const SplitBillRowV4: React.ForwardRefExoticComponent<SplitBillRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SplitBillRowV4.d.ts.map