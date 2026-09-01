import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { TextV4 } from '../primitives/TextV4';
import { rowMetrics } from '../dashboard/internal/row-v4';
import { formatMoney } from './money';
import { StatusBadgeV4 } from './StatusBadgeV4';
import type { OrderSummaryProps } from './OrderSummary';
import {
  MONEY_LABEL_SIZE,
  MONEY_TOTAL_SIZE,
  MONEY_VALUE_SIZE,
  summaryRowStyle,
  summaryRuleStyle,
} from './internal/money-v4';

/** What an `OrderSummaryV4` shows in place of its line list when there are none. */
export interface OrderSummaryV4Empty {
  /** Headline. Default `No items in this order`. */
  title?: React.ReactNode;
  /** Supporting line under the headline. */
  description?: React.ReactNode;
  /** One action — a button, a link back to the catalog. */
  action?: React.ReactNode;
}

export interface OrderSummaryV4Props extends OrderSummaryProps {
  /**
   * The word on the status badge. Defaults to the capitalized `status`.
   *
   * Exposed because the six lifecycle names are a *data* vocabulary, not a
   * user-facing one: a marketplace calls `fulfilled` "Shipped to you", a
   * subscription calls `paid` "Active", and neither should have to redraw the
   * badge to say so.
   */
  statusLabel?: string;
  /**
   * What to show when `items` is empty. Brief §4.5: a component with nothing to
   * show renders an empty state, never a blank bordered box.
   */
  empty?: OrderSummaryV4Empty;
}

/**
 * **V4 order summary** — the native twin of the web `OrderSummaryV4`, the base
 * {@link OrderSummary}'s props plus {@link OrderSummaryV4Props.statusLabel} and
 * {@link OrderSummaryV4Props.empty}, a different design line.
 *
 * The read-only half of the money surface `CartSummaryV4` opens: a header, the
 * lines, the totals, one rule, the total. Everything `CartSummaryV4`'s doc says
 * about the row metric, the single rule, the total's type step, tabular figures
 * and the `card` ground applies here verbatim — the two are one recipe, held in
 * `internal/money-v4.ts`, which is the whole point. On top of that:
 *
 * 1. **The hairline between order lines is gone.** The base drew a rule between
 *    every line *and* a rule above the totals — two weights of separation on a
 *    surface whose entire job is one column of numbers. The V4 data line keeps
 *    **exactly one** horizontal rule and lets spacing do the rest (§9), and
 *    that one rule sits above the total, because that is the only boundary a
 *    reader actually needs marked.
 * 2. **The status is `StatusBadgeV4`, not a pill this file drew** (brief §1.6,
 *    §1.7). The base composed the base `StatusBadge`, a tinted pill with a
 *    label and nothing else — so `paid` and `cancelled` differed only by hue.
 *    The V4 badge ships an icon *and* a word, and its status → tone / glyph /
 *    ink table lives in `internal/status-v4.ts` where both twins and every
 *    other component that prints a status read one copy of it.
 * 3. **The empty order renders an empty state**, not a bordered box with a
 *    header and a hole in it (§4.5).
 *
 * `CheckoutSummaryV4` is the same component under its checkout-time name,
 * exported from this file exactly as the base and both variants already do — it
 * has never had a file of its own and does not get one here.
 */
export function OrderSummaryV4({
  items,
  subtotalCents,
  shippingCents,
  taxCents,
  totalCents,
  currency = 'USD',
  status,
  statusLabel,
  orderNumber,
  title = 'Order summary',
  empty,
  formatMoney: format = formatMoney,
  style,
}: OrderSummaryV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const metrics = rowMetrics(theme);
  const rowStyle = summaryRowStyle(theme);

  const row = (key: string, label: string, value: string): React.ReactElement => (
    <View key={key} testID={`xen-summary-row-${key}`} style={rowStyle}>
      <TextV4 size={MONEY_LABEL_SIZE} tone="mutedText">
        {label}
      </TextV4>
      <TextV4 size={MONEY_VALUE_SIZE} tone="onSurface" numeric="tabular">
        {value}
      </TextV4>
    </View>
  );

  return (
    <CardV4
      variant="elevated"
      radius="lg"
      padding="none"
      testID="xen-order-summary"
      style={[
        // §1.4's headline fix. `CardV4` paints `colors.surface`, which is the
        // page colour; `colors.card` is the slot that was split out so a raised
        // surface reads as raised in dark mode too.
        { backgroundColor: colors.card, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: metrics.gap,
          paddingHorizontal: metrics.padX,
          paddingTop: tokens.spacing.xs,
          paddingBottom: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
          {typeof title === 'string' ? (
            <TextV4 size="lg" weight="semibold" tone="onSurface">
              {title}
            </TextV4>
          ) : (
            title
          )}
          {orderNumber ? (
            <TextV4 size="xs" tone="mutedText" numeric="tabular">
              {`#${orderNumber}`}
            </TextV4>
          ) : null}
        </View>
        {status ? (
          // §1.7: a V4 composite composes V4 children. `StatusBadgeV4` owns the
          // status → tone / glyph / ink table for both twins (it lives in
          // `internal/status-v4.ts`), so an order recap and an order list
          // cannot show two different marks for "shipped" — and rule §1.6's
          // "an icon AND a word" is answered in one place rather than in every
          // component that happens to print a status.
          //
          // The `testID` sits on a wrapper because `StatusBadgeV4` takes only a
          // `style` on this twin; naming the badge is a spec's need, not a
          // reason to widen another component's props.
          <View testID={`xen-status-badge-${status}`}>
            <StatusBadgeV4 status={status}>{statusLabel}</StatusBadgeV4>
          </View>
        ) : null}
      </View>

      {items.length === 0 ? (
        <View testID="xen-order-empty" style={{ paddingHorizontal: metrics.padX }}>
          <EmptyStateV4
            title={empty?.title ?? 'No items in this order'}
            description={empty?.description}
            action={empty?.action}
          />
        </View>
      ) : (
        <View testID="xen-order-lines">
          {items.map((item, i) => (
            <View
              key={i}
              testID="xen-order-line"
              // The row metric again, two-line because a line carries a variant
              // and a quantity under its title. No rule between lines —
              // spacing is the separation (§9).
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: metrics.gap,
                paddingHorizontal: metrics.padX,
                paddingVertical: tokens.spacing.sm,
                minHeight: metrics.twoLine,
              }}
            >
              <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs }}>
                <TextV4 size="base" weight="semibold" tone="onSurface" numberOfLines={1}>
                  {item.title}
                </TextV4>
                {item.variantTitle ? (
                  <TextV4 size="sm" tone="mutedText" numberOfLines={1}>
                    {item.variantTitle}
                  </TextV4>
                ) : null}
                <TextV4 size="xs" tone="mutedText" numeric="tabular">
                  {`Qty ${item.quantity}`}
                </TextV4>
              </View>
              <TextV4
                testID="xen-order-line-total"
                size={MONEY_VALUE_SIZE}
                tone="onSurface"
                numeric="tabular"
              >
                {format(item.unitPriceCents * item.quantity, currency)}
              </TextV4>
            </View>
          ))}
        </View>
      )}

      {row('subtotal', 'Subtotal', format(subtotalCents, currency))}
      {typeof shippingCents === 'number'
        ? row('shipping', 'Shipping', shippingCents === 0 ? 'Free' : format(shippingCents, currency))
        : null}
      {typeof taxCents === 'number' ? row('tax', 'Tax', format(taxCents, currency)) : null}

      <View testID="xen-summary-rule" style={summaryRuleStyle(theme)} />

      <View testID="xen-summary-row-total" style={rowStyle}>
        <TextV4 size={MONEY_TOTAL_SIZE} weight="semibold" tone="onSurface">
          Total
        </TextV4>
        <TextV4
          testID="xen-order-total"
          size={MONEY_TOTAL_SIZE}
          weight="bold"
          tone="onSurface"
          numeric="tabular"
        >
          {format(totalCents, currency)}
        </TextV4>
      </View>
    </CardV4>
  );
}

/**
 * The checkout-time name for the same surface.
 *
 * `CheckoutSummary` has never had a file of its own — it is a named export from
 * `OrderSummary.tsx` on both twins, and so are its V2 and V3 variants. Keeping
 * that shape is deliberate: an order recap before payment and after it are the
 * same object, and giving the pre-payment name its own component is how two
 * files drift into two designs for one screen.
 */
export { OrderSummaryV4 as CheckoutSummaryV4 };
export type { OrderSummaryV4Props as CheckoutSummaryV4Props };
