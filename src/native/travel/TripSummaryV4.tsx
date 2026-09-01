import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { journeyGradient, journeyInk, journeyInkSoft } from './internal/journey';
import type { TripSummaryProps } from './TripSummary';

/** Drop-in for {@link TripSummaryProps} — same props, the V4 "journey" design. */
export type TripSummaryV4Props = TripSummaryProps;

/**
 * TripSummary — **V4** "journey" design. The boarding-pass recap: a
 * brand-gradient hero total up top (the grand total in near-white `journeyInk`
 * — the signature V4 lift), then the itemized line items on the clean surface
 * below, split from the hero by a dashed boarding-pass tear line. When
 * `totalCents` is omitted the total is summed from `items`. Money is integer
 * cents formatted through {@link formatMoney}. Same props/behavior as
 * {@link TripSummaryProps}; token-only colors via `useXenitionTheme()`.
 */
export function TripSummaryV4({
  destination,
  dates,
  travelers,
  items = [],
  totalCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  title = 'Trip summary',
  action,
  style,
}: TripSummaryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;

  const derived = items.reduce((sum, it) => sum + (it.cents || 0), 0);
  const total = typeof totalCents === 'number' ? totalCents : derived;

  const metaLine = [
    dates,
    typeof travelers === 'number' ? `${travelers} traveler${travelers === 1 ? '' : 's'}` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const ink = journeyInk(r);
  const inkSoft = journeyInkSoft(r);

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Gradient hero total — near-white ink on the journey ground */}
      <GradientSurface colors={journeyGradient(r)} style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}>
        <View style={{ gap: 2 }}>
          <Text
            accessibilityRole="header"
            style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
          >
            {title}
          </Text>
          <Text style={{ color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {destination}
          </Text>
          {metaLine ? (
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>{metaLine}</Text>
          ) : null}
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>Total</Text>
          <Text style={{ color: ink, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
            {format(total, currency)}
          </Text>
        </View>
      </GradientSurface>

      {/* Line items on the clean surface, below the dashed tear line */}
      <View
        style={{
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          borderTopWidth: 1,
          borderStyle: 'dashed',
          borderTopColor: colors.border,
        }}
      >
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
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No items</Text>
        )}

        {action ? <View>{action}</View> : null}
      </View>
    </View>
  );
}
