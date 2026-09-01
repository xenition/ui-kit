import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives/Card';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  safeCents,
  toneColor,
  varianceMeta,
  withAlpha,
  PAYMENT_METHOD_META,
  type PosTone,
} from './internal';
import type { ShiftReportProps } from './ShiftReport';

/** Drop-in for {@link ShiftReportProps} — same props, the V4 "register" design. */
export type ShiftReportV4Props = ShiftReportProps;

/**
 * ShiftReport — **V4** "register" design. The tactile end-of-shift Z-report: the
 * headline numbers (gross sales, transactions, cash counted, variance) become a
 * crisp **grid of big-numeral stat tiles** you can read across the counter, gross
 * sales carrying the one accent. Refunds / discounts / tax / net stay as a
 * compact ledger beneath. The variance tile is colored by over/short (icon + word
 * pill, never color alone). Optional per-tender breakdown; a shift with no sales
 * renders an {@link EmptyState}. All money is integer **cents** via `formatMoney`.
 * Same props/behavior as {@link ShiftReportProps}; token-only tints via
 * `useXenitionTheme()`.
 */
export function ShiftReportV4({
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
}: ShiftReportV4Props): React.ReactElement {
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

  const StatTile = ({
    label,
    value,
    tone,
  }: {
    label: string;
    value: string;
    tone?: PosTone;
  }): React.ReactElement => {
    const tint = tone ? toneColor(colors, tone) : null;
    return (
      <View
        style={{
          flex: 1,
          gap: 2,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          backgroundColor: tint ? withAlpha(tint, 0.14) : withAlpha(colors.onSurface, 0.05),
        }}
      >
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
          {label}
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: tint ?? colors.onSurface,
            fontSize: tokens.typography.scale.xl,
            fontWeight: '800',
          }}
        >
          {value}
        </Text>
      </View>
    );
  };

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
          {/* Big-numeral stat grid — the numbers that matter at the counter. */}
          <View style={{ gap: tokens.spacing.sm }}>
            <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
              <StatTile label="Gross sales" value={formatMoney(gross, currency)} tone="primary" />
              {typeof transactionCount === 'number' ? (
                <StatTile label="Transactions" value={String(transactionCount)} />
              ) : (
                <StatTile label="Net sales" value={formatMoney(net, currency)} />
              )}
            </View>
            {typeof countedCashCents === 'number' || variance ? (
              <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
                {typeof countedCashCents === 'number' ? (
                  <StatTile label="Cash counted" value={formatMoney(safeCents(countedCashCents), currency)} />
                ) : null}
                {variance ? (
                  <View
                    style={{
                      flex: 1,
                      gap: 2,
                      borderRadius: tokens.radius.md,
                      padding: tokens.spacing.md,
                      backgroundColor: withAlpha(toneColor(colors, variance.meta.tone), 0.14),
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '500' }}>
                        Variance
                      </Text>
                      <StatusPill meta={variance.meta} variant="inline" size="sm" />
                    </View>
                    <Text
                      allowFontScaling={false}
                      style={{
                        color: toneColor(colors, variance.meta.tone),
                        fontSize: tokens.typography.scale.xl,
                        fontWeight: '800',
                      }}
                    >
                      {variance.deltaCents > 0 ? '+' : variance.deltaCents < 0 ? '−' : ''}
                      {formatMoney(Math.abs(variance.deltaCents), currency)}
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>

          {/* Compact ledger — the supporting line items. */}
          <View style={{ gap: 2 }}>
            {typeof refundsCents === 'number' ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Refunds</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                  {`−${formatMoney(refundsCents, currency)}`}
                </Text>
              </View>
            ) : null}
            {typeof discountsCents === 'number' ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Discounts</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                  {`−${formatMoney(discountsCents, currency)}`}
                </Text>
              </View>
            ) : null}
            {typeof taxCents === 'number' ? (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Tax</Text>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '500' }}>
                  {formatMoney(taxCents, currency)}
                </Text>
              </View>
            ) : null}
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: tokens.spacing.xs }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', paddingVertical: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                Net sales
              </Text>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {formatMoney(net, currency)}
              </Text>
            </View>
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
        </>
      )}
    </Card>
  );
}
