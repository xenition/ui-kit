import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives/Button';
import { formatMoney, type MoneyFormatter } from './money';
import type { CartSummaryProps } from './CartSummary';

/** Drop-in alternate of {@link CartSummaryProps} — identical prop contract. */
export type CartSummaryV3Props = CartSummaryProps;

/**
 * CartSummary — design variant **V3**: **minimal and total-first**. Where V1/V2
 * build up subtotal → … → total, V3 leads with the grand total set large under
 * a small caption, then lists the muted breakdown lines beneath it as fine
 * print. No box, no shadow — just type hierarchy and a full-width checkout.
 * Same props as {@link CartSummaryProps}. Token-only; money is integer cents.
 */
export function CartSummaryV3({
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
}: CartSummaryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const Line = ({ label, value }: { label: string; value: string }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{value}</Text>
    </View>
  );

  return (
    <View style={[{ gap: tokens.spacing.md }, style]}>
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, letterSpacing: 1, fontWeight: '600' }}>
          TOTAL
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
          {format(totalCents, currency)}
        </Text>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        <Line label="Subtotal" value={format(subtotalCents, currency)} />
        {typeof shippingCents === 'number' ? (
          <Line label="Shipping" value={shippingCents === 0 ? 'Free' : format(shippingCents, currency)} />
        ) : null}
        {typeof taxCents === 'number' ? <Line label="Tax" value={format(taxCents, currency)} /> : null}
        {typeof discountCents === 'number' && discountCents > 0 ? (
          <Line label="Discount" value={`−${format(discountCents, currency)}`} />
        ) : null}
      </View>

      {onCheckout ? (
        <Button size="lg" onPress={onCheckout} style={{ alignSelf: 'stretch' }}>
          {checkoutLabel}
        </Button>
      ) : null}
    </View>
  );
}
