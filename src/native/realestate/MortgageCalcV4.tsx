import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, Slider, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MortgageCalcProps, MortgageEstimate } from './MortgageCalc';

/** Drop-in for {@link MortgageCalcProps} — same props, the V4 "listing" design. */
export type MortgageCalcV4Props = MortgageCalcProps;

/** Standard amortized monthly payment. Guards a zero rate (straight division). */
function monthlyPayment(loanCents: number, annualRatePct: number, termYears: number): number {
  const n = Math.max(termYears, 1) * 12;
  const r = annualRatePct / 100 / 12;
  if (r <= 0) return Math.round(loanCents / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((loanCents * r * factor) / (factor - 1));
}

const clampPct = (n: number): number => (n < 0 ? 0 : n > 100 ? 100 : n);

/**
 * MortgageCalc — **V4** "listing" design. The editorial, price-forward take on
 * the estimator: the computed **monthly payment as a big numeral** up top, then
 * soft-primary sliders for down-payment and interest rate over a fixed home
 * price, and a small principal-vs-interest breakdown bar beneath. Same
 * props/behavior as {@link MortgageCalcProps} — the compute logic and `onChange`
 * estimate are preserved; a zero rate falls back to straight division. Token-only
 * colors via `useXenitionTheme()`; the money display uses the shared `formatMoney`.
 */
export function MortgageCalcV4({
  priceCents,
  currency = 'USD',
  downPercent = 20,
  ratePercent = 6.5,
  termYears = 30,
  title = 'Monthly payment',
  onChange,
  style,
}: MortgageCalcV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [down, setDown] = React.useState(clampPct(downPercent));
  const [rate, setRate] = React.useState(ratePercent);

  const downCents = Math.round((priceCents * down) / 100);
  const loanCents = Math.max(priceCents - downCents, 0);
  const monthlyCents = monthlyPayment(loanCents, rate, termYears);

  // Principal-vs-interest split over the life of the loan, for the breakdown bar.
  const totalPaidCents = monthlyCents * Math.max(termYears, 1) * 12;
  const interestCents = Math.max(totalPaidCents - loanCents, 0);
  const principalPct = totalPaidCents > 0 ? Math.round((loanCents / totalPaidCents) * 100) : 0;

  const emit = React.useCallback(
    (nextDownPct: number, nextRatePct: number): void => {
      const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
      const loan = Math.max(priceCents - d, 0);
      const estimate: MortgageEstimate = {
        monthlyCents: monthlyPayment(loan, nextRatePct, termYears),
        loanCents: loan,
        downCents: d,
      };
      onChange?.(estimate);
    },
    [onChange, priceCents, termYears]
  );

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{title}</Text>
      <Text
        accessibilityLabel={`Estimated monthly payment ${formatMoney(monthlyCents, currency)}`}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}
      >
        {formatMoney(monthlyCents, currency)}
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>/mo</Text>
      </Text>

      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Down payment</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {`${Math.round(down)}%`}
          </Text>
        </View>
        <Slider
          value={down}
          min={0}
          max={100}
          step={1}
          onValueChange={(v) => {
            const next = clampPct(v);
            setDown(next);
            emit(next, rate);
          }}
        />
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>Interest rate</Text>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {`${rate.toFixed(2)}%`}
          </Text>
        </View>
        <Slider
          value={rate}
          min={0}
          max={15}
          step={0.05}
          onValueChange={(v) => {
            setRate(v);
            emit(down, v);
          }}
        />
      </View>

      {/* Principal-vs-interest breakdown bar. */}
      <View style={{ gap: tokens.spacing.xs }}>
        <View
          accessibilityRole="image"
          accessibilityLabel={`Principal ${principalPct} percent of total paid, interest ${100 - principalPct} percent`}
          style={{
            flexDirection: 'row',
            height: 8,
            borderRadius: tokens.radius.full,
            overflow: 'hidden',
            backgroundColor: withAlpha(colors.primary, 0.1),
          }}
        >
          <View style={{ width: `${principalPct}%`, height: '100%', backgroundColor: colors.primary }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`Principal ${formatMoney(loanCents, currency)}`}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`Interest ${formatMoney(interestCents, currency)}`}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`Loan ${formatMoney(loanCents, currency)}`}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {`${termYears} yr · ${formatMoney(downCents, currency)} down`}
        </Text>
      </View>
    </View>
  );
}
