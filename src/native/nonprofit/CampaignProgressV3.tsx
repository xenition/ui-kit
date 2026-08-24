import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps } from './CampaignProgress';

/** Drop-in alternate of {@link CampaignProgressProps} — identical prop contract. */
export type CampaignProgressV3Props = CampaignProgressProps;

/**
 * CampaignProgress — design variant **V3**: a **slim inline bar**. A single hair
 * bar with the percent sitting on its right and the raised/goal (or meta) tucked
 * underneath — the lightest possible meter, sized to `raised/goal` with the
 * divide-by-zero guarded via `goalPct`. Progress is exposed through the
 * `progressbar` role AND printed as a percentage, so state never rests on color
 * alone. Same props as {@link CampaignProgressProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
export function CampaignProgressV3({
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  daysLeft,
  tone = 'primary',
  hideAmounts = false,
  style,
}: CampaignProgressV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = goalPct(raisedCents, goalCents);
  const pctLabel = `${Math.round(pct)}%`;
  const fillWidth = `${pct}%` as `${number}%`;

  const fillColor =
    tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
  const fillText =
    tone === 'success' ? colors.successText : tone === 'accent' ? colors.accentText : colors.primaryText;

  const meta = [
    typeof donorCount === 'number' ? `${donorCount} donors` : null,
    typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
  ].filter(Boolean);

  const sub = !hideAmounts
    ? `${formatMoney(raisedCents, currency)} of ${formatMoney(goalCents, currency)}`
    : meta.join(' · ');

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
          accessibilityLabel={`${pctLabel} of goal raised`}
          style={{
            flex: 1,
            height: 6,
            borderRadius: tokens.radius.full,
            backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
            overflow: 'hidden',
          }}
        >
          <View style={{ height: '100%', width: fillWidth, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
        </View>
        <Text style={{ color: fillText, fontSize: tokens.typography.scale.sm, fontWeight: '800', minWidth: 40, textAlign: 'right' }}>
          {pctLabel}
        </Text>
      </View>
      {sub ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{sub}</Text>
          {!hideAmounts && meta.length > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{meta.join(' · ')}</Text>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
