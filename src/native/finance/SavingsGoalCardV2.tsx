import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card } from '../primitives';
import { ProgressRing } from '../charts';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney } from '../commerce/money';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV2Props = SavingsGoalCardProps;

/**
 * SavingsGoalCard, redesigned (v2): a **big ProgressRing hero**. A large,
 * percent-labeled ring is centered at the top, with the title, the saved /
 * target line, and the "to go" caption stacked and centered beneath it — a
 * focused, single-goal spotlight. Distinct at a glance from v1's small ring
 * beside a left-aligned block. Same props, guarded target, integer cents.
 */
export function SavingsGoalCardV2({
  title,
  savedCents,
  targetCents,
  currency = 'USD',
  deadline,
  color = 'success',
  formatMoney: format = formatMoney,
  style,
}: SavingsGoalCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
  const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
  const pct = target > 0 ? Math.min(saved / target, 1) : 0;
  const remaining = Math.max(target - saved, 0);

  return (
    <Card style={style}>
      <View style={{ alignItems: 'center', gap: tokens.spacing.md }}>
        <ProgressRing
          value={pct * 100}
          max={100}
          size={132}
          strokeWidth={12}
          color={color}
          accessibilityLabel={`${title}, ${Math.round(pct * 100)}% saved`}
        />
        <View style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}
          >
            {title}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
            <MoneyAmount cents={saved} currency={currency} tone="neutral" size="md" />
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              / {format(target, currency)}
            </Text>
          </View>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {format(remaining, currency)} to go{deadline != null ? ` · by ${deadline}` : ''}
          </Text>
        </View>
      </View>
    </Card>
  );
}
