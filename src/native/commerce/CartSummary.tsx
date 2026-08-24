import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney, type MoneyFormatter } from './money';

export interface CartSummaryProps {
  /** Sum of line totals, in integer cents. */
  subtotalCents: number;
  /** Shipping cost in cents. Rendered as "Free" when exactly 0. */
  shippingCents?: number;
  /** Tax in cents. */
  taxCents?: number;
  /** Discount in cents (shown negative). */
  discountCents?: number;
  /** Grand total in cents. */
  totalCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Checkout handler; renders a checkout button when provided. */
  onCheckout?: () => void;
  /** Checkout button label (default `Checkout`). */
  checkoutLabel?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * Cart totals block — the native mirror of the web `CartSummary`: subtotal /
 * shipping / tax / (discount) / total rows plus an optional checkout button.
 * Every amount is integer cents formatted through {@link formatMoney}. Token-only.
 */
export function CartSummary({
  subtotalCents,
  shippingCents,
  taxCents,
  discountCents,
  totalCents,
  currency = 'USD',
  onCheckout,
  checkoutLabel = 'Checkout',
  formatMoney: format = formatMoney,
  style,
}: CartSummaryProps): React.ReactElement {
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
          gap: tokens.spacing.sm,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <Row label="Subtotal" value={format(subtotalCents, currency)} />
      {typeof shippingCents === 'number' ? (
        <Row label="Shipping" value={shippingCents === 0 ? 'Free' : format(shippingCents, currency)} />
      ) : null}
      {typeof taxCents === 'number' ? <Row label="Tax" value={format(taxCents, currency)} /> : null}
      {typeof discountCents === 'number' && discountCents > 0 ? (
        <Row label="Discount" value={`−${format(discountCents, currency)}`} />
      ) : null}
      <View
        style={{
          marginTop: tokens.spacing.xs,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: tokens.spacing.sm,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          Total
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
          {format(totalCents, currency)}
        </Text>
      </View>
      {onCheckout ? (
        <Button size="md" onPress={onCheckout} style={{ marginTop: tokens.spacing.sm }}>
          {checkoutLabel}
        </Button>
      ) : null}
    </View>
  );
}
