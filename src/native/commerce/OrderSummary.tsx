import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { StatusBadge, type OrderStatus } from './StatusBadge';
import { formatMoney, type MoneyFormatter } from './money';

export interface OrderLine {
  /** Product title. */
  title: string;
  /** Chosen variant label. */
  variantTitle?: string;
  /** Quantity ordered. */
  quantity: number;
  /** Unit price in integer cents. */
  unitPriceCents: number;
}

export interface OrderSummaryProps {
  /** Line items in the order. */
  items: OrderLine[];
  /** Sum of line totals, in cents. */
  subtotalCents: number;
  /** Shipping cost in cents ("Free" when 0). */
  shippingCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Order lifecycle status → renders a `StatusBadge`. */
  status?: OrderStatus;
  /** Order reference number/id shown in the header. */
  orderNumber?: string;
  /** Heading text (default `Order summary`). */
  title?: React.ReactNode;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * Read-only recap of a placed (or about-to-be-placed) order — the native
 * mirror of the web `OrderSummary` / `CheckoutSummary`: line items with
 * per-line totals, the subtotal/shipping/tax/total rows, and an optional status
 * badge. No interactivity. Token-only; money is integer cents throughout.
 */
export function OrderSummary({
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
}: OrderSummaryProps): React.ReactElement {
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
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: tokens.spacing.md }}>
        <View>
          {typeof title === 'string' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
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

      <View>
        {items.map((item, i) => (
          <View
            key={i}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: tokens.spacing.md,
              paddingVertical: tokens.spacing.sm,
              borderTopWidth: i === 0 ? 0 : 1,
              borderTopColor: colors.border,
            }}
          >
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                {item.title}
              </Text>
              {item.variantTitle ? (
                <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  {item.variantTitle}
                </Text>
              ) : null}
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                Qty {item.quantity}
              </Text>
            </View>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
              {format(item.unitPriceCents * item.quantity, currency)}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ gap: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: tokens.spacing.sm }}>
        <Row label="Subtotal" value={format(subtotalCents, currency)} />
        {typeof shippingCents === 'number' ? (
          <Row label="Shipping" value={shippingCents === 0 ? 'Free' : format(shippingCents, currency)} />
        ) : null}
        {typeof taxCents === 'number' ? <Row label="Tax" value={format(taxCents, currency)} /> : null}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>Total</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
            {format(totalCents, currency)}
          </Text>
        </View>
      </View>
    </View>
  );
}

export { OrderSummary as CheckoutSummary };
