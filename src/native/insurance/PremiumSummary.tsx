import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';
import type { PremiumCadence } from './PolicyCard';

/** One line in the premium breakdown. A negative `amountCents` is a credit. */
export interface PremiumLineItem {
  /** Line label (e.g. "Base premium", "Multi-policy discount", "Taxes & fees"). */
  label: string;
  /** Amount in integer **cents**; negative = discount/credit. */
  amountCents: number;
}

export interface PremiumSummaryProps {
  /** Ordered breakdown lines (base, riders, discounts, taxes …). */
  items: PremiumLineItem[];
  /**
   * Total premium in integer **cents**. When omitted it is derived by summing
   * `items`, so the printed total always reconciles with the lines shown.
   */
  totalCents?: number;
  /** Billing cadence label suffix (default `monthly`). */
  cadence?: PremiumCadence;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Loading skeleton flag — renders placeholder rows instead of data. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const CADENCE_LABEL: Record<PremiumCadence, string> = {
  monthly: 'per month',
  quarterly: 'per quarter',
  annual: 'per year',
};

/**
 * An itemized premium breakdown card: labelled lines (discounts shown as
 * `success`-toned credits with a leading `−`) summing to a bold total. The
 * total defaults to the sum of `items` so it can never disagree with the lines.
 * All amounts are integer cents via `formatMoney` (two decimals, no drift), and
 * every color traces to a `SemanticColors` slot. Supports a `loading` state.
 */
export function PremiumSummary({
  items,
  totalCents,
  cadence = 'monthly',
  currency = 'USD',
  formatMoney: format = formatMoney,
  loading = false,
  style,
}: PremiumSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const rows = Array.isArray(items) ? items : [];

  const derivedTotal = rows.reduce(
    (sum, it) => sum + (Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0),
    0
  );
  const total = totalCents != null ? Math.trunc(totalCents) : derivedTotal;

  if (loading) {
    return (
      <Card style={style}>
        <View accessibilityLabel="Loading premium">
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
      </Card>
    );
  }

  return (
    <Card style={style}>
      <View style={{ gap: tokens.spacing.sm }}>
        {rows.map((it, i) => {
          const cents = Number.isFinite(it.amountCents) ? Math.trunc(it.amountCents) : 0;
          const isCredit = cents < 0;
          return (
            <View
              key={`${it.label}-${i}`}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: tokens.spacing.md }}
            >
              <Text numberOfLines={1} style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                {it.label}
              </Text>
              <Text
                style={{
                  color: isCredit ? colors.success : colors.onSurface,
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
          paddingTop: tokens.spacing.md,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <View style={{ gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            Total
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {CADENCE_LABEL[cadence]}
          </Text>
        </View>
        <Text
          accessibilityLabel={`Total premium ${format(total, currency)} ${CADENCE_LABEL[cadence]}`}
          style={{ color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}
        >
          {format(total, currency)}
        </Text>
      </View>
    </Card>
  );
}
