import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps } from './CampaignProgress';

/** Drop-in for {@link CampaignProgressProps} — same props, the V4 "rally" design. */
export type CampaignProgressV4Props = CampaignProgressProps;

/**
 * CampaignProgress — **V4** "rally" design. The warm, mission-driven take on a
 * goal meter: a bold raised numeral, a thick rounded track on a soft-primary
 * well, and the percent + donor/days meta as soft chips; when the goal is met it
 * celebrates with a labelled success note (never color alone). Honors both
 * `variant`s (`bar` / `thermometer`) and every `tone`, identical props/behavior
 * to {@link CampaignProgressProps}. Announced via the `progressbar` role and
 * printed as a percentage + amounts. Token-only colors via `useXenitionTheme()`.
 */
export function CampaignProgressV4({
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  daysLeft,
  variant = 'bar',
  tone = 'primary',
  hideAmounts = false,
  style,
}: CampaignProgressV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = goalPct(raisedCents, goalCents);
  const pctLabel = `${Math.round(pct)}%`;
  const met = pct >= 100;
  const fillColor = tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
  const track = withAlpha(colors.primary, 0.15);

  const meta = [
    typeof donorCount === 'number' ? `${donorCount} donors` : null,
    typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
  ].filter(Boolean) as string[];

  const a11y = {
    accessibilityRole: 'progressbar' as const,
    accessibilityValue: { min: 0, max: 100, now: Math.round(pct) },
    accessibilityLabel: `${pctLabel} of goal raised`,
  };

  const metaChips =
    meta.length > 0 ? (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }}>
        {meta.map((m) => (
          <View key={m} style={{ backgroundColor: withAlpha(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 2 }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{m}</Text>
          </View>
        ))}
      </View>
    ) : null;

  if (variant === 'thermometer') {
    return (
      <View style={[{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-end' }, style]}>
        <View {...a11y} style={{ width: tokens.spacing.lg, height: 140, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden', justifyContent: 'flex-end' }}>
          <View style={{ width: '100%', height: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>{pctLabel}</Text>
          {!hideAmounts ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{`${formatMoney(raisedCents, currency)} of ${formatMoney(goalCents, currency)}`}</Text>
          ) : null}
          {met ? <Text style={{ color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>🎉 Goal reached</Text> : null}
          {metaChips}
        </View>
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.sm }, style]}>
      {!hideAmounts ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{formatMoney(raisedCents, currency)}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{`of ${formatMoney(goalCents, currency)}`}</Text>
        </View>
      ) : null}
      <View {...a11y} style={{ width: '100%', height: 14, borderRadius: tokens.radius.full, backgroundColor: track, overflow: 'hidden' }}>
        <View style={{ height: '100%', width: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text style={{ color: met ? colors.success : fillColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {met ? `🎉 ${pctLabel} — goal reached` : pctLabel}
        </Text>
        {metaChips}
      </View>
    </View>
  );
}
