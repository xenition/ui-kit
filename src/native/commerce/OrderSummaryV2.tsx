import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusBadge } from './StatusBadge';
import { formatMoney, type MoneyFormatter } from './money';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { OrderSummaryProps } from './OrderSummary';

/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV2Props = OrderSummaryProps;

/**
 * OrderSummary — design variant **V2**: an **elevated receipt**. Where V1 is a
 * flat bordered recap, V2 floats on a shadow, prefixes each line with a
 * neutral **`×qty` chip**, separates items from totals with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band. Same
 * props as {@link OrderSummaryProps}. Read-only; token-only; integer cents.
 */
export function OrderSummaryV2({
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
}: OrderSummaryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const Row = ({ label, value }: { label: string; value: string }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>{value}</Text>
    </View>
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          ...shadow('lg', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View style={{ flex: 1, minWidth: 0 }}>
          {typeof title === 'string' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
              {title}
            </Text>
          ) : (
            title
          )}
          {orderNumber ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>#{orderNumber}</Text>
          ) : null}
        </View>
        {status ? <StatusBadge status={status} /> : null}
      </View>

      <View style={{ gap: tokens.spacing.sm }}>
        {items.length === 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No items</Text>
        ) : (
          items.map((item, i) => (
            <View
              key={i}
              style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}
            >
              <View
                style={{
                  borderRadius: tokens.radius.sm,
                  backgroundColor: tokens.ramps.neutral[100],
                  paddingVertical: 2,
                  paddingHorizontal: tokens.spacing.xs,
                }}
              >
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                  ×{item.quantity}
                </Text>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                  {item.title}
                </Text>
                {item.variantTitle ? (
                  <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                    {item.variantTitle}
                  </Text>
                ) : null}
              </View>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {format(item.unitPriceCents * item.quantity, currency)}
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={{ borderTopWidth: 1, borderStyle: 'dashed', borderTopColor: colors.border }} />

      <View style={{ gap: tokens.spacing.xs }}>
        <Row label="Subtotal" value={format(subtotalCents, currency)} />
        {typeof shippingCents === 'number' ? (
          <Row label="Shipping" value={shippingCents === 0 ? 'Free' : format(shippingCents, currency)} />
        ) : null}
        {typeof taxCents === 'number' ? <Row label="Tax" value={format(taxCents, currency)} /> : null}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderRadius: tokens.radius.md,
          backgroundColor: withAlpha(colors.primary, 0.08),
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          Total
        </Text>
        <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {format(totalCents, currency)}
        </Text>
      </View>
    </View>
  );
}

export { OrderSummaryV2 as CheckoutSummaryV2 };
