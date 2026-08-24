import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { formatMoney, goalPct } from './internal';

/** Layout of a {@link CampaignProgress}. */
export type CampaignProgressVariant = 'bar' | 'thermometer';
export type CampaignProgressTone = 'primary' | 'success' | 'accent';

export interface CampaignProgressProps {
  /** Amount raised so far, integer **cents**. */
  raisedCents: number;
  /** Fundraising goal, integer **cents**. A zero/negative goal is guarded. */
  goalCents: number;
  /** ISO 4217 currency for money formatting (default `USD`). */
  currency?: string;
  /** Optional donor count shown in the meta row. */
  donorCount?: number;
  /** Optional days-left figure shown in the meta row. */
  daysLeft?: number;
  /** `bar` (default) is a horizontal fill; `thermometer` is a vertical fill. */
  variant?: CampaignProgressVariant;
  /** Fill color slot (default `primary`). */
  tone?: CampaignProgressTone;
  /** Hide the raised/goal headline (keep only the meter). */
  hideAmounts?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A goal-progress meter for a campaign — a horizontal `bar` or a vertical
 * `thermometer`. The fill is sized to `raised/goal` with the divide-by-zero
 * guarded (`goalPct`) and clamped to [0, 100]. Progress is announced through the
 * `progressbar` role AND printed as a percentage + raised/goal amounts, so state
 * never rests on color alone. Money is integer cents formatted via `formatMoney`.
 * All colors come from the compiled theme tokens — no literal colors.
 */
export function CampaignProgress({
  raisedCents,
  goalCents,
  currency = 'USD',
  donorCount,
  daysLeft,
  variant = 'bar',
  tone = 'primary',
  hideAmounts = false,
  style,
}: CampaignProgressProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const pct = goalPct(raisedCents, goalCents);
  const pctLabel = `${Math.round(pct)}%`;

  const fillColor =
    tone === 'success' ? colors.success : tone === 'accent' ? colors.accent : colors.primary;

  const meta = [
    typeof donorCount === 'number' ? `${donorCount} donors` : null,
    typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
  ].filter(Boolean);

  const a11y = {
    accessibilityRole: 'progressbar' as const,
    accessibilityValue: { min: 0, max: 100, now: Math.round(pct) },
    accessibilityLabel: `${pctLabel} of goal raised`,
  };

  if (variant === 'thermometer') {
    return (
      <View style={[{ flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-end' }, style]}>
        <View
          {...a11y}
          style={{
            width: tokens.spacing.lg,
            height: 140,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ width: '100%', height: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
        </View>
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>{pctLabel}</Text>
          {!hideAmounts ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {`${formatMoney(raisedCents, currency)} of ${formatMoney(goalCents, currency)}`}
            </Text>
          ) : null}
          {meta.length > 0 ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.join(' · ')}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {!hideAmounts ? (
        <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
            {formatMoney(raisedCents, currency)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {`of ${formatMoney(goalCents, currency)}`}
          </Text>
        </View>
      ) : null}
      <View
        {...a11y}
        style={{
          width: '100%',
          height: 12,
          borderRadius: tokens.radius.full,
          backgroundColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <View style={{ height: '100%', width: `${pct}%`, backgroundColor: fillColor, borderRadius: tokens.radius.full }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: fillColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>{pctLabel}</Text>
        {meta.length > 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{meta.join(' · ')}</Text>
        ) : null}
      </View>
    </View>
  );
}
