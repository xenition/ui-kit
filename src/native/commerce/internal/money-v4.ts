/**
 * The one recipe shared by the **V4 money surfaces** on native —
 * `CartSummaryV4`, `OrderSummaryV4` / `CheckoutSummaryV4`, and the trailing
 * figure of `CartLineItemV4`.
 *
 * The native twin of `src/commerce/internal/money-v4.ts`: the same names, the
 * same order, resolved off `useXenitionTheme()` because React Native cannot
 * read a CSS custom property. Read that file for why each value is what it is —
 * a change to one of these is an obviously incomplete change until the other
 * moves too, which is the only mechanism that has ever kept two twins from
 * drifting.
 */

import type { TextStyle, ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { rowMetrics } from '../../dashboard/internal/row-v4';
import type { TextSize } from '../../primitives/Text';

/**
 * A summary row: label at the leading end, figure at the trailing end, on the
 * row family's one-line height (M3's list-item container, 56 = `2xl + sm`),
 * imported from the row module rather than restated.
 *
 * `alignItems: 'baseline'` because the two halves are both text and a reader
 * compares them along the baseline — the same decision `PriceTagV4` makes
 * between a price and its struck original.
 */
export function summaryRowStyle(theme: XenitionNativeTheme): ViewStyle {
  const { oneLine, padX, gap } = rowMetrics(theme);
  return {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap,
    paddingHorizontal: padX,
    minHeight: oneLine,
  };
}

/**
 * The **one** horizontal rule a money surface keeps, above the total.
 *
 * A 1px view, `colors.border`, and nothing else (§4.4). It runs flush rather
 * than inset: §4.4 insets a separator only to clear a leading slot, and a money
 * row has none. The `1` is a hairline — a geometric minimum, not a step on the
 * spacing scale — and is the same 1 the web twin's `h-px` writes.
 */
export function summaryRuleStyle(theme: XenitionNativeTheme): ViewStyle {
  return { height: 1, width: '100%', backgroundColor: theme.colors.border };
}

/** A summary row's label — `base`, the row family's title step. */
export const MONEY_LABEL_SIZE: TextSize = 'base';

/** A summary row's figure — the same step as its label, so the pair reads as one line. */
export const MONEY_VALUE_SIZE: TextSize = 'base';

/**
 * The total — **one step up the scale**, never a colour (brief §3, §1.3).
 *
 * `base` → `lg`. The base line set the total at the same size as the tax line
 * above it, which leaves the one figure the surface exists to deliver
 * indistinguishable from its inputs at a glance (§6: hierarchy before styling).
 */
export const MONEY_TOTAL_SIZE: TextSize = 'lg';

/**
 * The trailing figure of a cart line — one step under a `PriceTagV4` at `md`,
 * because a line total is a component of the total, not the decision itself.
 */
export const MONEY_LINE_SIZE = 'sm' as const;

/**
 * Tabular figures, as the style object a `Text` takes.
 *
 * Brief §1.2: money is tabular on every figure that appears in a column or a
 * stack. `TextV4 numeric="tabular"` says the same thing for the components that
 * compose it; this is for the few places a raw `Text` is unavoidable.
 */
export const TABULAR: TextStyle = { fontVariant: ['tabular-nums'] };

/**
 * `Subtotal`, or `Subtotal (3 items)` when the caller knows the count.
 *
 * Pluralised here rather than at two call sites so the cart summary and the
 * order summary cannot disagree about the wording, and singular-aware because
 * "1 items" is the tell that a string was concatenated rather than written.
 */
export function subtotalLabel(itemCount?: number): string {
  if (itemCount === undefined) return 'Subtotal';
  return `Subtotal (${itemCount} ${itemCount === 1 ? 'item' : 'items'})`;
}
