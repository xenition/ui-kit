import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney } from '../commerce/money';
import { MoneyAmount } from './MoneyAmount';

export interface InvoiceLineProps {
  /** Line description (product / service). */
  description: string;
  /** Unit price in integer **cents**. */
  unitPriceCents: number;
  /** Quantity (default `1`). */
  quantity?: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /**
   * Line total in **cents**. When omitted it is computed as
   * `unitPriceCents × quantity` — integer math, so no float drift.
   */
  amountCents?: number;
  /** Render as the emphasized total row (heavier weight, no unit breakdown). */
  emphasized?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * One invoice / receipt line: a description with a `qty × unit` sub-line and a
 * right-aligned line total. The total defaults to `unitPriceCents * quantity`
 * (integer cents — exact), rendered neutral-toned through {@link MoneyAmount}.
 * `emphasized` styles it as the grand-total row. Token-bound throughout.
 */
export function InvoiceLine({
  description,
  unitPriceCents,
  quantity = 1,
  currency = 'USD',
  amountCents,
  emphasized = false,
  style,
}: InvoiceLineProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const qty = Number.isFinite(quantity) ? quantity : 1;
  const total = typeof amountCents === 'number' ? amountCents : Math.trunc(unitPriceCents) * qty;
  const showBreakdown = !emphasized && qty !== 1;

  return (
    <View
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={2}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: emphasized ? '700' : '500',
          }}
        >
          {description}
        </Text>
        {showBreakdown ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {qty} × {formatMoney(Number.isFinite(unitPriceCents) ? Math.trunc(unitPriceCents) : 0, currency)}
          </Text>
        ) : null}
      </View>
      <MoneyAmount
        cents={total}
        currency={currency}
        tone="neutral"
        size={emphasized ? 'md' : 'sm'}
        style={emphasized ? { fontWeight: '700' } : undefined}
      />
    </View>
  );
}
