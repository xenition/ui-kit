import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card } from '../primitives';
import { formatMoney, withAlpha } from './internal/format';
import type { PremiumSummaryProps } from './PremiumSummary';
import type { PremiumCadence } from './PolicyCard';

/** Drop-in replacement for {@link PremiumSummary} — identical props, distinct design. */
export type PremiumSummaryV2Props = PremiumSummaryProps;

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * PremiumSummary, alternate design **V2** — an elevated receipt. Line items are
 * laid out ledger-style with a hairline rule under each row (discounts as
 * `successText` credits with a leading `−`), then a full-width highlighted
 * **total band** — a tinted footer that makes the amount due the anchor. Total
 * defaults to the sum of `items` so it always reconciles. Same
 * `PremiumSummaryProps` (integer cents, `loading` state); drops in for
 * `PremiumSummary`. Token-pure.
 */
export function PremiumSummaryV2({
  items,
  totalCents,
  cadence = 'monthly',
  currency = 'USD',
  formatMoney: format = formatMoney,
  loading = false,
  style,
}: PremiumSummaryV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = Array.isArray(items) ? items : [];

  const derivedTotal = rows.reduce(
    (sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0),
    0
  );
  const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;

  if (loading) {
    return (
      <Card variant="elevated" padding="none" radius="md" style={[{ overflow: 'hidden' }, style]}>
        <View accessibilityLabel="Loading premium" style={{ padding: tokens.spacing.lg }}>
          {[0, 1, 2].map((i) => (
            <View
              key={i}
              style={{
                height: tokens.typography.scale.base,
                borderRadius: tokens.radius.sm,
                backgroundColor: colors.border,
                marginBottom: tokens.spacing.sm,
                width: i === 2 ? '50%' : '100%',
              }}
            />
          ))}
        </View>
        <View style={{ height: 56, backgroundColor: withAlpha(colors.primary, 0.08) }} />
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="none" radius="md" style={[{ overflow: 'hidden' }, style]}>
      <View style={{ paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.lg }}>
        {rows.map((it, i) => {
          const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
          const isCredit = cents < 0;
          return (
            <View
              key={`${it.label}-${i}`}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: withAlpha(colors.border, 0.6),
              }}
            >
              <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {it.label}
              </Text>
              <Text
                style={{
                  color: isCredit ? colors.successText : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
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

      <View
        style={{
          marginTop: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          paddingVertical: tokens.spacing.md,
          backgroundColor: withAlpha(colors.primary, 0.1),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}>
            Total due
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{CADENCE_LABEL[cadence]}</Text>
        </View>
        <Text
          accessibilityLabel={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
          style={{ color: colors.primaryText, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}
        >
          {format(total, currency)}
        </Text>
      </View>
    </Card>
  );
}
