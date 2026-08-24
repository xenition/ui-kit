import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney, type MoneyFormatter } from './money';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { CartSummaryProps } from './CartSummary';

/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV2Props = CartSummaryProps;

/**
 * CartSummary — design variant **V2**: an **elevated receipt** with a
 * highlighted total band. Where V1 is a flat bordered list, V2 floats on a
 * drop-shadow, separates the running lines from the total with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band so the
 * amount owed is unmistakable. Same props as {@link CartSummaryProps}.
 * Token-only; money is integer cents.
 */
export function CartSummaryV2({
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
}: CartSummaryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const Row = ({
    label,
    value,
    valueColor,
  }: {
    label: string;
    value: string;
    valueColor?: string;
  }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      <Text style={{ color: valueColor ?? colors.onSurface, fontSize: tokens.typography.scale.sm }}>{value}</Text>
    </View>
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          ...shadow('lg', tokens),
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
        <Row label="Discount" value={`−${format(discountCents, currency)}`} valueColor={colors.successText} />
      ) : null}

      <View
        style={{
          marginVertical: tokens.spacing.xs,
          borderTopWidth: 1,
          borderStyle: 'dashed',
          borderTopColor: colors.border,
        }}
      />

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

      {onCheckout ? (
        <Button size="md" onPress={onCheckout} style={{ marginTop: tokens.spacing.xs }}>
          {checkoutLabel}
        </Button>
      ) : null}
    </View>
  );
}
