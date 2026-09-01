import * as React from 'react';
import { type DiscountType } from './internal';
import type { DiscountRowProps } from './DiscountRow';
/** Re-exported so consumers of the V4 line can type discount kinds. */
export type { DiscountType };
/** Drop-in for {@link DiscountRowProps} — same props, the V4 "register" design. */
export type DiscountRowV4Props = DiscountRowProps;
/**
 * DiscountRow — **V4** "register" design (web parity of the native V4). The
 * tactile checkout take on a discount line: a tag glyph in a soft-tint disc, the
 * label with its percent/amount basis, an optional note, and the **negative money
 * impact drawn big and bold** in `tabular-nums` (the savings that matter at the
 * counter) — plus a large (≥44px) remove affordance. With no active discount it
 * collapses to a crisp, rounded dashed "Add discount" `<button>` that fires
 * `onAdd`. Same props/behavior as {@link DiscountRowProps}; all colors from
 * `--xen-*` token classes (no literals). One accent = **primary**; savings tone =
 * `success`. Dark-mode safe.
 */
export declare const DiscountRowV4: React.ForwardRefExoticComponent<DiscountRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DiscountRowV4.d.ts.map