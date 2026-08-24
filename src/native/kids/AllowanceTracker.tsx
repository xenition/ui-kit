import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Button, Progress } from '../primitives';

export interface AllowanceGoal {
  /** What the child is saving for, e.g. "New bike". */
  label: string;
  /** Target amount. */
  target: number;
}

export interface AllowanceTrackerProps {
  /** Current wallet balance. `NaN`/undefined renders the empty state. */
  balance: number;
  /** Currency symbol prefix. */
  currency?: string;
  /** Amount earned this period. */
  earned?: number;
  /** Amount spent this period. */
  spent?: number;
  /** Optional savings goal; drives a progress bar from `balance`→`target`. */
  goal?: AllowanceGoal;
  /** Loading placeholder state. */
  loading?: boolean;
  /** Copy shown when there is no balance set. */
  emptyLabel?: string;
  /** Fires to add funds / give allowance. */
  onAdd?: () => void;
  /** Fires to withdraw / spend. */
  onWithdraw?: () => void;
  style?: StyleProp<ViewStyle>;
}

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * A child's allowance wallet: a headline balance, an earned/spent split, an
 * optional savings-goal progress bar, and add/withdraw actions. Renders an
 * explicit empty state when no balance is set. Every color traces to a
 * `SemanticColors` token — no literals.
 */
export function AllowanceTracker({
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
}: AllowanceTrackerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.lg,
      padding: tokens.spacing.lg,
      gap: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading allowance" style={container}>
        <View style={{ height: 12, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        <View style={{ height: 26, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
      </View>
    );
  }

  if (!Number.isFinite(balance)) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>Allowance</Text>
        <View style={{ alignItems: 'center', paddingVertical: tokens.spacing.lg, gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
            🐷
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
        </View>
      </View>
    );
  }

  const goalPct =
    goal && goal.target > 0 ? Math.max(0, Math.min(100, (balance / goal.target) * 100)) : undefined;

  return (
    <View accessibilityLabel={`Balance ${fmt(currency, balance)}`} style={container}>
      <View style={{ gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Balance</Text>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
          {fmt(currency, balance)}
        </Text>
      </View>

      {typeof earned === 'number' || typeof spent === 'number' ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
          {typeof earned === 'number' ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Earned</Text>
              <Text style={{ color: colors.success, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {`+${fmt(currency, earned)}`}
              </Text>
            </View>
          ) : null}
          {typeof spent === 'number' ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Spent</Text>
              <Text style={{ color: colors.danger, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
                {`−${fmt(currency, spent)}`}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}

      {goal && goalPct !== undefined ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              🎯 {goal.label}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {fmt(currency, balance)} / {fmt(currency, goal.target)}
            </Text>
          </View>
          <Progress value={balance} max={goal.target} tone="success" />
        </View>
      ) : null}

      {onAdd || onWithdraw ? (
        <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
          {onAdd ? (
            <Button size="sm" variant="soft" tone="success" onPress={onAdd} style={{ flex: 1 }}>
              Add
            </Button>
          ) : null}
          {onWithdraw ? (
            <Button size="sm" variant="outline" onPress={onWithdraw} style={{ flex: 1 }}>
              Spend
            </Button>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
