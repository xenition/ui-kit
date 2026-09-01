import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { formatMoney } from './internal';

/**
 * Props for {@link CheckoutSummary} — the register's subtotal → total
 * breakdown with a full-width **Charge** CTA. Presentational only: every value
 * is passed in as integer **cents** and the caller owns the charge action.
 */
export interface CheckoutSummaryProps {
  /** Pre-tax, pre-tip line-item subtotal, in integer **cents**. */
  subtotalCents: number;
  /** Tax amount, in integer **cents**. Row hidden when omitted. */
  taxCents?: number;
  /** Discount amount, in integer **cents**; shown as a negative credit row. Hidden when omitted or `0`. */
  discountCents?: number;
  /** Tip amount, in integer **cents**. Row hidden when omitted or `0`. */
  tipCents?: number;
  /** The grand total to charge, in integer **cents** — the big bold number. */
  totalCents: number;
  /** ISO 4217 currency code for all amounts. Defaults to `'USD'`. */
  currency?: string;
  /** Item count shown beside the total (e.g. `3 items`). Hidden when omitted. */
  itemCount?: number;
  /** Fired when the Charge button is pressed. */
  onCharge?: () => void;
  /**
   * Charge button label. Receives the formatted total so callers can override
   * the copy; defaults to `Charge {total}` (e.g. `Charge $42.00`).
   */
  chargeLabel?: (formattedTotal: string) => string;
  /** When `true`, the Charge button shows a busy state and is disabled. */
  charging?: boolean;
  /** Optional test id forwarded to the root view. */
  testID?: string;
}

interface Row {
  key: string;
  label: string;
  amountCents: number;
  negative?: boolean;
}

/**
 * CheckoutSummary — **V4** "register" design. The tactile close-of-sale panel:
 * a compact **breakdown list** (subtotal, optional discount/tax/tip) in calm
 * `tabular-nums`, a hairline, then the **grand total big and bold** — the
 * number the counter is built around. A full-width primary **Charge** button
 * (≥44px) repeats the total so the tap target reads the amount. Money is
 * integer **cents** throughout via `formatMoney`; token-only colors via
 * `useXenitionTheme()`, dark-mode safe.
 */
export function CheckoutSummary({
  subtotalCents,
  taxCents,
  discountCents,
  tipCents,
  totalCents,
  currency = 'USD',
  itemCount,
  onCharge,
  chargeLabel,
  charging = false,
  testID,
}: CheckoutSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const rows: Row[] = [{ key: 'subtotal', label: 'Subtotal', amountCents: subtotalCents }];
  if (typeof discountCents === 'number' && discountCents > 0) {
    rows.push({ key: 'discount', label: 'Discount', amountCents: discountCents, negative: true });
  }
  if (typeof taxCents === 'number') {
    rows.push({ key: 'tax', label: 'Tax', amountCents: taxCents });
  }
  if (typeof tipCents === 'number' && tipCents > 0) {
    rows.push({ key: 'tip', label: 'Tip', amountCents: tipCents });
  }

  const formattedTotal = formatMoney(totalCents, currency);
  const label = chargeLabel ? chargeLabel(formattedTotal) : `Charge ${formattedTotal}`;

  return (
    <View
      testID={testID}
      style={{
        gap: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
        padding: tokens.spacing.lg,
      }}
    >
      <View accessibilityRole="list" accessibilityLabel="Order breakdown" style={{ gap: tokens.spacing.xs }}>
        {rows.map((row) => (
          <View
            key={row.key}
            accessibilityRole="text"
            accessibilityLabel={`${row.label}, ${row.negative ? 'minus ' : ''}${formatMoney(row.amountCents, currency)}`}
            style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}
          >
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{row.label}</Text>
            <Text
              style={{
                color: row.negative ? colors.success : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontVariant: ['tabular-nums'],
              }}
            >
              {row.negative ? '−' : ''}
              {formatMoney(row.amountCents, currency)}
            </Text>
          </View>
        ))}
      </View>

      {/* hairline before the big bold total */}
      <View style={{ height: 1, backgroundColor: colors.border }} />

      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <View>
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: '800',
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}
          >
            Total
          </Text>
          {typeof itemCount === 'number' ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
              {itemCount} item{itemCount === 1 ? '' : 's'}
            </Text>
          ) : null}
        </View>
        <Text
          allowFontScaling={false}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '800',
            fontVariant: ['tabular-nums'],
          }}
        >
          {formattedTotal}
        </Text>
      </View>

      <Button
        variant="primary"
        size="lg"
        onPress={onCharge}
        disabled={charging}
        loading={charging}
        accessibilityLabel={label}
        style={{ minHeight: 44, width: '100%' }}
      >
        {charging ? 'Charging…' : label}
      </Button>
    </View>
  );
}
