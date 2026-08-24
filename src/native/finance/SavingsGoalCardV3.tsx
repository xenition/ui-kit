import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney } from '../commerce/money';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV3Props = SavingsGoalCardProps;

/** Quarter milestones notched into the track. */
const MILESTONES = [25, 50, 75] as const;

/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from v1/v2's rings. Same props.
 */
export function SavingsGoalCardV3({
  title,
  savedCents,
  targetCents,
  currency = 'USD',
  deadline,
  color = 'success',
  formatMoney: format = formatMoney,
  style,
}: SavingsGoalCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
  const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
  const pct = target > 0 ? Math.min(saved / target, 1) : 0;
  const remaining = Math.max(target - saved, 0);

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          padding: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '700',
          }}
        >
          {title}
        </Text>
        <Text style={{ color: colors[color], fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          {Math.round(pct * 100)}%
        </Text>
      </View>

      <View
        accessibilityRole="progressbar"
        accessibilityLabel={`${title}, ${Math.round(pct * 100)}% saved`}
        style={{
          height: 8,
          borderRadius: tokens.radius.full,
          backgroundColor: withAlpha(colors[color], 0.15),
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: `${Math.round(pct * 100)}%`,
            backgroundColor: colors[color],
            borderRadius: tokens.radius.full,
          }}
        />
        {MILESTONES.map((m) => (
          <View
            key={m}
            style={{
              position: 'absolute',
              left: `${m}%`,
              top: 0,
              bottom: 0,
              width: 2,
              backgroundColor: colors.surface,
            }}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
        <MoneyAmount cents={saved} currency={currency} tone="neutral" size="sm" />
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          / {format(target, currency)} · {format(remaining, currency)} to go
          {deadline != null ? ` · by ${deadline}` : ''}
        </Text>
      </View>
    </View>
  );
}
