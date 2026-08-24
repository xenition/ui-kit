import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { formatMoney } from './internal/format';
import type { PremiumSummaryProps } from './PremiumSummary';
import type { PremiumCadence } from './PolicyCard';

/** Drop-in replacement for {@link PremiumSummary} — identical props, distinct design. */
export type PremiumSummaryV3Props = PremiumSummaryProps;

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * PremiumSummary, alternate design **V3** — total-first and chrome-free. The
 * amount due leads at the top in large type with its cadence; the itemized
 * lines follow as quiet secondary rows (discounts as `successText` credits).
 * The total still defaults to the sum of `items`, so the headline can never
 * disagree with the breakdown. No card border — separation is spacing. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export function PremiumSummaryV3({
  items,
  totalCents,
  cadence = 'monthly',
  currency = 'USD',
  formatMoney: format = formatMoney,
  loading = false,
  style,
}: PremiumSummaryV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = Array.isArray(items) ? items : [];

  const derivedTotal = rows.reduce(
    (sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0),
    0
  );
  const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;

  if (loading) {
    return (
      <View accessibilityLabel="Loading premium" style={[{ gap: tokens.spacing.sm }, style]}>
        <View
          style={{
            height: tokens.typography.scale['3xl'],
            width: '55%',
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.border,
          }}
        />
        {[0, 1].map((i) => (
          <View
            key={i}
            style={{
              height: tokens.typography.scale.sm,
              width: i === 1 ? '40%' : '70%',
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
        ))}
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <Text
          accessibilityLabel={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}
        >
          {format(total, currency)}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{CADENCE_LABEL[cadence]}</Text>
      </View>

      <View style={{ gap: tokens.spacing.xs }}>
        {rows.map((it, i) => {
          const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
          const isCredit = cents < 0;
          return (
            <View
              key={`${it.label}-${i}`}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }}
            >
              <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                {it.label}
              </Text>
              <Text
                style={{
                  color: isCredit ? colors.successText : colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: '600',
                }}
              >
                {isCredit ? '−' : ''}
                {format(Math.abs(cents), currency)}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
