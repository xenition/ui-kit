import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { shadow } from '../primitives/internal/elevation';
import { withAlpha } from '../primitives/internal/color';
import type { AllowanceTrackerProps } from './AllowanceTracker';

/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV2Props = AllowanceTrackerProps;

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * AllowanceTracker, redesigned (v2): a **wallet hero card**. A big centered
 * balance leads; the savings goal renders as a circular ring medallion showing
 * the percent to target; earned and spent sit in two tinted stat pills below.
 * Add/Spend anchor the card. Lifted with a shadow and a mount-fade. Distinct
 * from v1's left-aligned figure + linear bar. Same props, same empty state.
 */
export function AllowanceTrackerV2({
  balance,
  currency = '$',
  earned,
  spent,
  goal,
  loading = false,
  emptyLabel = 'No allowance set up yet',
  onAdd,
  onWithdraw,
  style,
}: AllowanceTrackerV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
      ...shadow('md', tokens),
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading allowance" style={container}>
        <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
          <View style={{ height: 12, width: '30%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 28, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  if (!Number.isFinite(balance)) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
            🐷
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  const goalPct =
    goal && goal.target > 0 ? Math.max(0, Math.min(100, Math.round((balance / goal.target) * 100))) : undefined;

  return (
    <Animated.View
      accessibilityLabel={`Balance ${fmt(currency, balance)}`}
      style={[container, { opacity: enter.opacity, transform: enter.transform }]}
    >
      <View style={{ alignItems: 'center', gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, textTransform: 'uppercase', letterSpacing: 1 }}>
          Balance
        </Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
          {fmt(currency, balance)}
        </Text>
      </View>

      {goal && goalPct !== undefined ? (
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: tokens.radius.full,
              borderWidth: 8,
              borderColor: withAlpha(colors.success, 0.35),
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: withAlpha(colors.success, 0.06),
            }}
          >
            <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {`${goalPct}%`}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>to goal</Text>
          </View>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            🎯 {goal.label} · {fmt(currency, goal.target)}
          </Text>
        </View>
      ) : null}

      {typeof earned === 'number' || typeof spent === 'number' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {typeof earned === 'number' ? (
            <View style={{ flex: 1, gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.md, backgroundColor: withAlpha(colors.success, 0.1) }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Earned</Text>
              <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                {`+${fmt(currency, earned)}`}
              </Text>
            </View>
          ) : null}
          {typeof spent === 'number' ? (
            <View style={{ flex: 1, gap: 2, borderRadius: tokens.radius.md, padding: tokens.spacing.md, backgroundColor: withAlpha(colors.danger, 0.1) }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Spent</Text>
              <Text style={{ color: colors.dangerText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
                {`−${fmt(currency, spent)}`}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {onAdd || onWithdraw ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAdd ? (
            <Button size="md" variant="primary" tone="success" onPress={onAdd} style={{ flex: 1 }}>
              Add
            </Button>
          ) : null}
          {onWithdraw ? (
            <Button size="md" variant="outline" onPress={onWithdraw} style={{ flex: 1 }}>
              Spend
            </Button>
          ) : null}
        </View>
      ) : null}
    </Animated.View>
  );
}
