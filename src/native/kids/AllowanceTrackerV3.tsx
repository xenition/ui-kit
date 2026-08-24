import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Badge, Button } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { AllowanceTrackerProps } from './AllowanceTracker';

/** Same public contract as {@link AllowanceTracker} — a drop-in alternate design. */
export type AllowanceTrackerV3Props = AllowanceTrackerProps;

function fmt(currency: string, amount: number): string {
  return `${currency}${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

/**
 * AllowanceTracker, redesigned (v3): a **compact balance row**. A piggy glyph, a
 * tiny "Balance" caption over the figure, an optional goal-percent chip, and a
 * small Add/Spend pair — all on one dense line for embedding in a list. The
 * opposite of v2's tall hero card. Same props, same empty state.
 */
export function AllowanceTrackerV3({
  balance,
  currency = '$',
  goal,
  loading = false,
  emptyLabel = 'No allowance set up yet',
  onAdd,
  onWithdraw,
  style,
}: AllowanceTrackerV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const container: StyleProp<ViewStyle> = [
    {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.md,
      backgroundColor: colors.surface,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: tokens.radius.md,
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
    },
    style,
  ];

  if (loading) {
    return (
      <View accessibilityLabel="Loading allowance" style={container}>
        <View style={{ width: 28, height: 28, borderRadius: tokens.radius.full, backgroundColor: colors.border }} />
        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ height: 9, width: '25%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
          <View style={{ height: 14, width: '45%', borderRadius: tokens.radius.sm, backgroundColor: colors.border }} />
        </View>
      </View>
    );
  }

  if (!Number.isFinite(balance)) {
    return (
      <View accessibilityLabel={emptyLabel} style={container}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          🐷
        </Text>
        <Text style={{ flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyLabel}</Text>
      </View>
    );
  }

  const goalPct =
    goal && goal.target > 0 ? Math.max(0, Math.min(100, Math.round((balance / goal.target) * 100))) : undefined;

  return (
    <View accessibilityLabel={`Balance ${fmt(currency, balance)}`} style={container}>
      <View
        style={{
          width: 32,
          height: 32,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: withAlpha(colors.success, 0.12),
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          🐷
        </Text>
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Balance</Text>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
          {fmt(currency, balance)}
        </Text>
      </View>

      {goalPct !== undefined ? (
        <Badge tone="success" variant="soft" size="sm">
          {`🎯 ${goalPct}%`}
        </Badge>
      ) : null}

      {onAdd ? (
        <Button size="sm" variant="soft" tone="success" onPress={onAdd}>
          Add
        </Button>
      ) : null}
      {onWithdraw ? (
        <Button size="sm" variant="outline" onPress={onWithdraw}>
          Spend
        </Button>
      ) : null}
    </View>
  );
}
