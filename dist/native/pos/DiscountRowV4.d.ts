import * as React from 'react';
import { type DiscountType } from './internal';
import type { DiscountRowProps } from './DiscountRow';
/** Re-exported so consumers of the V4 line can type discount kinds. */
export type { DiscountType };
/** Drop-in for {@link DiscountRowProps} — same props, the V4 "register" design. */
export type DiscountRowV4Props = DiscountRowProps;
/**
 * DiscountRow — **V4** "register" design. The tactile checkout take on a discount
 * line: a tag glyph in a soft-tint disc, the label with its percent/amount basis,
 * an optional note, and the **negative money impact drawn big and bold** in
 * `tabular-nums` (the savings that matter at the counter) — plus a large (≥44px)
 * remove affordance. With no active discount it collapses to a crisp, rounded
 * dashed "Add discount" button that fires `onAdd`. Same props/behavior as
 * {@link DiscountRowProps}; token-only tints via `useXenitionTheme()` +
 * `withAlpha`. Savings tone = `success`; one accent = `primary`. Dark-mode safe.
 */
export declare function DiscountRowV4({ label, type, value, amountCents, currency, note, active, onEdit, onRemove, onAdd, addLabel, variant, testID, style, }: DiscountRowV4Props): React.ReactElement;
//# sourceMappingURL=DiscountRowV4.d.ts.map