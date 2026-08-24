import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, formatMoney, type MoneyFormatter } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';

/** A priced line in the trip cost breakdown. */
export interface TripLineItem {
  /** Label, e.g. `'Flights'`. */
  label: string;
  /** Amount in integer minor units (cents). Negative renders as a discount. */
  cents: number;
}

export interface TripSummaryProps {
  /** Trip/destination headline. */
  destination: string;
  /** Pre-formatted date range, e.g. `'Sep 3 – Sep 10'`. */
  dates?: string;
  /** Number of travelers. */
  travelers?: number;
  /** Itemized costs; summed into the total when `totalCents` is omitted. */
  items?: readonly TripLineItem[];
  /** Explicit grand total in cents (overrides the derived sum). */
  totalCents?: number;
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter. */
  formatMoney?: MoneyFormatter;
  /** Heading text (default `Trip summary`). */
  title?: React.ReactNode;
  /** Trailing action slot (e.g. a checkout button). */
  action?: React.ReactNode;
  /** Surface treatment (visual diversity). Default `'classic'` — the original look. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A read-only recap of a trip — destination, dates, traveler count, an
 * itemized cost breakdown, and a grand total. When `totalCents` is omitted the
 * total is summed from `items` (guarded against an empty list). Money is
 * integer cents formatted through {@link formatMoney}. Token-only colors.
 */
export function TripSummary({
  destination,
  dates,
  travelers,
  items = [],
  totalCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  title = 'Trip summary',
  action,
  appearance = 'classic',
  style,
}: TripSummaryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
  const total = typeof totalCents === 'number' ? totalCents : derived;

  const metaLine = [
    dates,
    typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View
      style={[
        appearanceStyle(appearance, colors, tokens),
        {
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
        },
        style,
      ]}
    >
      <View style={{ gap: 2 }}>
        <Text accessibilityRole="header" style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {title}
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {destination}
        </Text>
        {metaLine ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{metaLine}</Text>
        ) : null}
      </View>

      {items.length > 0 ? (
        <View style={{ gap: tokens.spacing.sm }}>
          {items.map((it, i) => (
            <View
              key={`${it.label}-${i}`}
              style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', gap: tokens.spacing.md }}
            >
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{it.label}</Text>
              <Text
                style={{
                  color: it.cents < 0 ? colors.successText : colors.onSurface,
                  fontSize: tokens.typography.scale.sm,
                }}
              >
                {format(it.cents, currency)}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      <View style={{ height: 1, backgroundColor: colors.border }} />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Total</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
          {format(total, currency)}
        </Text>
      </View>

      {action ? <View>{action}</View> : null}
    </View>
  );
}
