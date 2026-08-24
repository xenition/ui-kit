import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  toneColor,
  varianceMeta,
  PAYMENT_METHOD_META,
  type PaymentMethod,
} from './internal';

export interface ShiftPaymentBreakdown {
  /** Tender type. */
  method: PaymentMethod;
  /** Total taken with this tender, in integer **cents**. */
  amountCents: number;
  /** Transaction count for this tender. */
  count?: number;
}

export type ShiftReportVariant = 'summary' | 'detailed';

export interface ShiftReportProps {
  /** Cashier / operator name. */
  cashier?: string;
  /** Register / terminal id. */
  registerId?: string;
  /** Pre-formatted shift window (e.g. "9:00 AM – 5:00 PM"). */
  period?: string;
  /** Gross sales in integer **cents**. */
  grossSalesCents: number;
  /** Refunds issued in cents. */
  refundsCents?: number;
  /** Discounts given in cents. */
  discountsCents?: number;
  /** Tax collected in cents. */
  taxCents?: number;
  /** Net (gross − refunds) in cents; derived when omitted. */
  netSalesCents?: number;
  /** Transaction count over the shift. */
  transactionCount?: number;
  /** Expected cash in drawer, in cents (for the variance line). */
  expectedCashCents?: number;
  /** Counted cash in drawer, in cents (for the variance line). */
  countedCashCents?: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Per-tender breakdown. When empty a labelled {@link EmptyState} renders. */
  breakdown?: ShiftPaymentBreakdown[];
  /** `detailed` (default) shows the breakdown + cash variance; `summary` omits them. */
  variant?: ShiftReportVariant;
  /** Empty-state copy for a shift with no sales. */
  emptyLabel?: string;
  testID?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * End-of-shift Z-report card: header (cashier / register / window), the headline
 * metrics (gross, refunds, discounts, tax, net, transactions), an optional
 * per-tender breakdown, and a cash-count variance drawn as a **glyph + word**
 * pill (over/short/balanced — never color alone). All money is integer **cents**
 * via `formatMoney`. A shift with no sales renders an {@link EmptyState}.
 * Composed from `Card` + `StatusPill`; token-only colors.
 */
export function ShiftReport({
  cashier,
  registerId,
  period,
  grossSalesCents,
  refundsCents,
  discountsCents,
  taxCents,
  netSalesCents,
  transactionCount,
  expectedCashCents,
  countedCashCents,
  currency = 'USD',
  breakdown,
  variant = 'detailed',
  emptyLabel = 'No sales this shift',
  testID,
  style,
}: ShiftReportProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const detailed = variant === 'detailed';
  const gross = safeCents(grossSalesCents);
  const net = typeof netSalesCents === 'number' ? safeCents(netSalesCents) : gross - safeCents(refundsCents);
  const empty = gross === 0 && (!breakdown || breakdown.length === 0) && (transactionCount ?? 0) === 0;

  const hasVariance =
    detailed && typeof expectedCashCents === 'number' && typeof countedCashCents === 'number';
  const variance = hasVariance
    ? varianceMeta(safeCents(expectedCashCents), safeCents(countedCashCents))
    : null;

  const Metric = ({
    label,
    value,
    strong,
  }: {
    label: string;
    value: string;
    strong?: boolean;
  }): React.ReactElement => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
      <Text style={{ color: colors.muted, fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm, fontWeight: strong ? '600' : '400' }}>
        {label}
      </Text>
      <Text style={{ color: colors.onSurface, fontSize: strong ? tokens.typography.scale.base : tokens.typography.scale.sm, fontWeight: strong ? '700' : '500' }}>
        {value}
      </Text>
    </View>
  );

  return (
    <Card variant="outlined" padding="lg" style={[{ gap: tokens.spacing.md }, style]} testID={testID}>
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          Shift report
        </Text>
        {cashier || registerId || period ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[cashier, registerId ? `Reg ${registerId}` : null, period].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
      </View>

      {empty ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <>
          <View style={{ gap: 2 }}>
            <Metric label="Gross sales" value={formatMoney(gross, currency)} />
            {typeof refundsCents === 'number' ? (
              <Metric label="Refunds" value={`−${formatMoney(refundsCents, currency)}`} />
            ) : null}
            {typeof discountsCents === 'number' ? (
              <Metric label="Discounts" value={`−${formatMoney(discountsCents, currency)}`} />
            ) : null}
            {typeof taxCents === 'number' ? <Metric label="Tax" value={formatMoney(taxCents, currency)} /> : null}
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs }} />
            <Metric label="Net sales" value={formatMoney(net, currency)} strong />
            {typeof transactionCount === 'number' ? (
              <Metric label="Transactions" value={String(transactionCount)} />
            ) : null}
          </View>

          {detailed && breakdown && breakdown.length > 0 ? (
            <View style={{ gap: tokens.spacing.xs }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                By tender
              </Text>
              {breakdown.map((b, i) => (
                <View key={i} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <StatusPill meta={PAYMENT_METHOD_META[b.method]} variant="inline" size="sm" />
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm }}>
                    {formatMoney(b.amountCents, currency)}
                    {typeof b.count === 'number' ? (
                      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{`  (${b.count})`}</Text>
                    ) : null}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          {variance ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: tokens.spacing.sm,
                borderTopWidth: 1,
                borderTopColor: colors.border,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Cash variance</Text>
                <StatusPill meta={variance.meta} variant="soft" size="sm" />
              </View>
              <Text style={{ color: toneColor(colors, variance.meta.tone), fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                {variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : ''}
                {formatMoney(Math.abs(variance.deltaCents), currency)}
              </Text>
            </View>
          ) : null}
        </>
      )}
    </Card>
  );
}
