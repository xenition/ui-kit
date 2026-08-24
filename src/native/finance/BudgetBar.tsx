import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { MiniBar } from '../charts';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface BudgetBarProps {
  /** Category / budget name. */
  label: string;
  /** Amount spent so far, in integer **cents**. */
  spentCents: number;
  /** Budget ceiling, in integer **cents**. */
  limitCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A labelled budget progress bar: spent-of-limit with a fill whose tone shifts
 * as the budget is consumed — `success` under 75%, `warn` from 75–100%,
 * `danger` once over. Amounts are integer cents (two-decimal, no drift) and the
 * "remaining / over" line is a signed {@link MoneyAmount}. `limitCents <= 0` is
 * guarded (ratio pinned, no divide-by-zero). Token-bound throughout.
 */
export function BudgetBar({
  label,
  spentCents,
  limitCents,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: BudgetBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
  const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
  const ratio = limit > 0 ? spent / limit : spent > 0 ? 1 : 0;
  const remaining = limit - spent; // positive = left, negative = over

  const fillColor = ratio > 1 ? 'danger' : ratio >= 0.75 ? 'warn' : 'success';

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600', flex: 1 }}
        >
          {label}
        </Text>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {format(spent, currency)} / {format(limit, currency)}
        </Text>
      </View>
      <MiniBar
        value={ratio * 100}
        max={100}
        color={fillColor}
        height={8}
        accessibilityLabel={`${label}, ${Math.round(ratio * 100)}% of budget used`}
      />
      <View style={{ flexDirection: 'row', gap: tokens.spacing.xs }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {remaining >= 0 ? 'Remaining' : 'Over budget'}
        </Text>
        <MoneyAmount
          cents={remaining}
          currency={currency}
          tone={remaining >= 0 ? 'muted' : 'expense'}
          size="sm"
          signDisplay="never"
          style={{ fontSize: tokens.typography.scale.xs, fontWeight: '600' }}
        />
      </View>
    </View>
  );
}
