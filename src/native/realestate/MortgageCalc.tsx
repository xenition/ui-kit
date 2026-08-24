import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, Input, formatMoney } from '../primitives';

/** The derived figures a {@link MortgageCalc} reports on each change. */
export interface MortgageEstimate {
  /** Monthly principal + interest payment, in integer cents. */
  monthlyCents: number;
  /** Financed amount (price − down payment), in integer cents. */
  loanCents: number;
  /** Down payment, in integer cents. */
  downCents: number;
}

export interface MortgageCalcProps {
  /** Home price in integer minor units (cents). */
  priceCents: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Initial down-payment percent (default 20). */
  downPercent?: number;
  /** Initial annual interest rate percent (default 6.5). */
  ratePercent?: number;
  /** Loan term in years (default 30). */
  termYears?: number;
  /** Card heading. */
  title?: string;
  /** Fires whenever an input changes, with the recomputed estimate. */
  onChange?: (estimate: MortgageEstimate) => void;
  style?: StyleProp<ViewStyle>;
}

/** Standard amortized monthly payment. Guards a zero rate (straight division). */
function monthlyPayment(loanCents: number, annualRatePct: number, termYears: number): number {
  const n = Math.max(termYears, 1) * 12;
  const r = annualRatePct / 100 / 12;
  if (r <= 0) return Math.round(loanCents / n);
  const factor = Math.pow(1 + r, n);
  return Math.round((loanCents * r * factor) / (factor - 1));
}

const clampPct = (n: number): number => (n < 0 ? 0 : n > 100 ? 100 : n);
const parseNum = (s: string): number => {
  const v = parseFloat(s.replace(/[^0-9.]/g, ''));
  return Number.isFinite(v) ? v : 0;
};

/**
 * Interactive mortgage estimator — editable down-payment and interest-rate
 * fields over a fixed home price, computing the amortized monthly payment plus
 * the financed loan amount. Fully self-contained (no fetch); reports every
 * recompute through `onChange`. Rate/percent inputs are clamped and parsed
 * defensively, and a zero rate falls back to straight division. Token-only
 * colors; the money display uses the shared `formatMoney`.
 */
export function MortgageCalc({
  priceCents,
  currency = 'USD',
  downPercent = 20,
  ratePercent = 6.5,
  termYears = 30,
  title = 'Monthly payment',
  onChange,
  style,
}: MortgageCalcProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const [downPct, setDownPct] = React.useState(String(downPercent));
  const [ratePct, setRatePct] = React.useState(String(ratePercent));

  const down = clampPct(parseNum(downPct));
  const rate = parseNum(ratePct);
  const downCents = Math.round((priceCents * down) / 100);
  const loanCents = Math.max(priceCents - downCents, 0);
  const monthlyCents = monthlyPayment(loanCents, rate, termYears);

  const emit = React.useCallback(
    (nextDownPct: number, nextRatePct: number): void => {
      const d = Math.round((priceCents * clampPct(nextDownPct)) / 100);
      const loan = Math.max(priceCents - d, 0);
      onChange?.({ monthlyCents: monthlyPayment(loan, nextRatePct, termYears), loanCents: loan, downCents: d });
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
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{title}</Text>
      <Text
        accessibilityLabel={`Estimated monthly payment ${formatMoney(monthlyCents, currency)}`}
        style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}
      >
        {`${formatMoney(monthlyCents, currency)}/mo`}
      </Text>

      <View style={{ flexDirection: 'row', gap: tokens.spacing.md }}>
        <Input
          label="Down %"
          testID="xen-re-mortgage-down"
          keyboardType="numeric"
          value={downPct}
          containerStyle={{ flex: 1 }}
          onChangeText={(t) => {
            setDownPct(t);
            emit(parseNum(t), rate);
          }}
        />
        <Input
          label="Rate %"
          testID="xen-re-mortgage-rate"
          keyboardType="numeric"
          value={ratePct}
          containerStyle={{ flex: 1 }}
          onChangeText={(t) => {
            setRatePct(t);
            emit(down, parseNum(t));
          }}
        />
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
