import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps } from './CampaignProgress';

/** Drop-in alternate of {@link CampaignProgressProps} — identical prop contract. */
export type CampaignProgressV2Props = CampaignProgressProps;

/**
 * CampaignProgress — design variant **V2**: a **thermometer with a hero total**.
 * A tall vertical column fills bottom-up to `raised/goal` (divide-by-zero guarded
 * via `goalPct`, clamped to [0,100]) beside an oversized raised amount, the goal,
 * a percent, and the donor/days meta. Progress is exposed through the
 * `progressbar` role AND printed as a percentage + amounts, so state never rests
 * on color alone. Same props as {@link CampaignProgressProps}. Token-only; money
 * is integer cents formatted through `formatMoney`.
 */
export function CampaignProgressV2({
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  daysLeft,
  tone = 'primary',
  hideAmounts = false,
  style,
}: CampaignProgressV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = goalPct(raisedCents, goalCents);
  const pctLabel = `${Math.round(pct)}%`;
  const fillHeight = `${pct}%` as `${number}%`;

  const fillColor =
    tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;
  const fillText =
    tone === 'success' ? colors.successText : tone === 'accent' ? colors.accentText : colors.primaryText;

  const meta = [
    typeof donorCount === 'number' ? `${donorCount} donors` : null,
    typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
  ].filter(Boolean);

  return (
    <View style={[{ flexDirection: 'row', gap: tokens.spacing.lg, alignItems: 'stretch' }, style]}>
      <View
        accessibilityRole="progressbar"
        accessibilityValue={{ min: 0, max: 100, now: Math.round(pct) }}
        accessibilityLabel={`${pctLabel} of goal raised`}
        style={{
          width: tokens.spacing.xl,
          minHeight: 180,
          borderRadius: tokens.radius.full,
          backgroundColor: tokens.ramps.neutral[100] ?? colors.border,
          borderWidth: 1,
          borderColor: colors.border,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ width: '100%', height: fillHeight, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
      </View>

      <View style={{ flex: 1, justifyContent: 'center', gap: tokens.spacing.xs }}>
        {!hideAmounts ? (
          <>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
              {formatMoney(raisedCents, currency)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {`raised of ${formatMoney(goalCents, currency)} goal`}
            </Text>
          </>
        ) : null}
        <Text style={{ color: fillText, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>{`${pctLabel} funded`}</Text>
        {meta.length > 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.join(' · ')}</Text>
        ) : null}
      </View>
    </View>
  );
}
