import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusBadge } from './StatusBadge';
import { formatMoney, type MoneyFormatter } from './money';
import type { OrderSummaryProps } from './OrderSummary';

/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV3Props = OrderSummaryProps;

/**
 * OrderSummary — design variant **V3**: **minimal and total-first**. Where V1/V2
 * lead with a header and itemized rows, V3 opens with the grand total set large
 * (status badge + order number tucked alongside as metadata), then lists the
 * line items and subtotal/shipping/tax beneath as muted fine print. No box, no
 * shadow. Same props as {@link OrderSummaryProps}. Read-only; token-only; cents.
 */
export function OrderSummaryV3({
  items,
  subtotalCents,
  shippingCents,
  taxCents,
  totalCents,
  currency = 'USD',
  status,
  orderNumber,
  title = 'Order summary',
  formatMoney: format = formatMoney,
  style,
}: OrderSummaryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const Line = ({ label, value }: { label: string; value: string }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{value}</Text>
    </View>
  );

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {status ? <StatusBadge status={status} /> : null}
          {orderNumber ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>#{orderNumber}</Text>
          ) : null}
        </View>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
          {format(totalCents, currency)}
        </Text>
        {typeof title === 'string' ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }}>
            {title.toUpperCase()}
          </Text>
        ) : (
          title
        )}
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {items.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>No items</Text>
        ) : (
          items.map((item, i) => (
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: tokens.spacing.sm }}>
              <Text numberOfLines={1} style={{ flex: 1, minWidth: 0, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {item.title}
                {item.variantTitle ? ` · ${item.variantTitle}` : ''} ×{item.quantity}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {format(item.unitPriceCents * item.quantity, currency)}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={{ gap: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: tokens.spacing.sm }}>
        <Line label="Subtotal" value={format(subtotalCents, currency)} />
        {typeof shippingCents === 'number' ? (
          <Line label="Shipping" value={shippingCents === 0 ? 'Free' : format(shippingCents, currency)} />
        ) : null}
        {typeof taxCents === 'number' ? <Line label="Tax" value={format(taxCents, currency)} /> : null}
      </View>
    </View>
  );
}

export { OrderSummaryV3 as CheckoutSummaryV3 };
