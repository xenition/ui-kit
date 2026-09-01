import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { listingGradient, listingInk, listingInkSoft, listingTile, listingBorder } from './internal/listing';

/** Tone slot for a breakdown segment — a near-white opacity step on the gradient. */
export type MortgageBreakdownTone = 'primary' | 'accent' | 'warn' | 'success';

/** One component of the monthly payment (principal+interest, tax, insurance, HOA…). */
export interface MortgageBreakdownItem {
  /** Legend label (e.g. "Principal & interest"). */
  label: string;
  /** This component's monthly amount, in integer **cents**. */
  cents: number;
  /** Segment tone; drives the bar/legend swatch opacity. Default `primary`. */
  tone?: MortgageBreakdownTone;
}

export interface MortgageSummaryProps {
  /** Total estimated monthly payment, in integer **cents** (the hero numeral). */
  monthlyCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Payment components — a stacked token bar + frosted legend tiles. */
  breakdown?: readonly MortgageBreakdownItem[];
  /** Down-payment summary line (e.g. "20% down · $80,000"). */
  downLabel?: string;
  /** Interest-rate summary line (e.g. "6.5% APR"). */
  rateLabel?: string;
  /** Loan-term summary line (e.g. "30-yr fixed"). */
  termLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/** Near-white opacity step per tone — keeps every fill token-derived and legible on the gradient. */
const TONE_ALPHA: Record<MortgageBreakdownTone, number> = {
  primary: 1,
  accent: 0.7,
  warn: 0.45,
  success: 0.25,
};

/**
 * MortgageSummary — a brand-gradient mortgage-results hero for the real-estate V4
 * "listing" line. A big near-white monthly payment numeral sits on the brand
 * gradient (`listingGradient`); the `breakdown` renders as a single stacked bar
 * of near-white opacity steps plus frosted legend tiles, and the down/rate/term
 * lines read as frosted chips. Presentational — shaped data only, nothing fetches
 * or computes amortization. Money is integer cents via `formatMoney`. Token-only
 * colors via `useXenitionTheme()` + the listing ramp helpers, dark-mode safe.
 */
export function MortgageSummary({
  monthlyCents,
  currency = 'USD',
  breakdown,
  downLabel,
  rateLabel,
  termLabel,
  style,
}: MortgageSummaryProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = listingInk(r);
  const inkSoft = listingInkSoft(r);

  const monthly = Math.max(0, Math.trunc(monthlyCents || 0));
  const segments = (breakdown ?? []).filter((b) => Math.trunc(b.cents || 0) > 0);
  const total = segments.reduce((sum, b) => sum + Math.trunc(b.cents), 0);
  const fillFor = (tone: MortgageBreakdownTone) => withAlpha(r.primary[50], TONE_ALPHA[tone]);

  const chips: string[] = [];
  if (downLabel) chips.push(downLabel);
  if (rateLabel) chips.push(rateLabel);
  if (termLabel) chips.push(termLabel);

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={listingGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ gap: tokens.spacing.xs }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            Estimated monthly payment
          </Text>
          <Text
            allowFontScaling={false}
            accessibilityLabel={`Estimated monthly payment ${formatMoney(monthly, currency)} per month`}
            style={{ color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }}
          >
            {`${formatMoney(monthly, currency)}`}
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>/mo</Text>
          </Text>
        </View>

        {segments.length > 0 && total > 0 ? (
          <View style={{ gap: tokens.spacing.md }}>
            {/* Stacked token bar. */}
            <View
              accessibilityRole="image"
              accessibilityLabel="Payment breakdown"
              style={{
                flexDirection: 'row',
                height: 12,
                borderRadius: tokens.radius.full,
                overflow: 'hidden',
                backgroundColor: listingTile(r),
              }}
            >
              {segments.map((b) => (
                <View
                  key={b.label}
                  style={{ width: `${(Math.trunc(b.cents) / total) * 100}%`, backgroundColor: fillFor(b.tone ?? 'primary') }}
                />
              ))}
            </View>

            {/* Frosted legend tiles. */}
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
              {segments.map((b) => (
                <View
                  key={b.label}
                  style={{
                    flexBasis: '47%',
                    flexGrow: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: listingTile(r),
                    borderWidth: 1,
                    borderColor: listingBorder(r),
                  }}
                >
                  <View style={{ width: 12, height: 12, borderRadius: tokens.radius.full, backgroundColor: fillFor(b.tone ?? 'primary') }} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text numberOfLines={1} style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
                      {b.label}
                    </Text>
                    <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                      {formatMoney(Math.trunc(b.cents), currency)}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {chips.length > 0 ? (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }}>
            {chips.map((c) => (
              <View
                key={c}
                style={{
                  paddingHorizontal: tokens.spacing.md,
                  paddingVertical: tokens.spacing.sm,
                  borderRadius: tokens.radius.full,
                  backgroundColor: listingTile(r),
                  borderWidth: 1,
                  borderColor: listingBorder(r),
                }}
              >
                <Text style={{ color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{c}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
