import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Card, Icon, Progress, type ProgressTone } from '../primitives';
import { formatMoney, type MoneyFormatter } from './internal/format';

export interface BudgetBillRowProps {
  /** Row heading (default "Budget billing"). */
  label?: string;
  /** The level (averaged) monthly charge in integer **cents**. */
  monthlyCents: number;
  /**
   * Running settle-up balance in integer **cents**. Positive = a credit the
   * account carries; negative = a shortfall owed at reconciliation.
   */
  balanceCents?: number;
  /** Actual charges to date in integer **cents** (for the plan-vs-actual bar). */
  actualToDateCents?: number;
  /** Planned charges to date in integer **cents** (bar denominator). */
  plannedToDateCents?: number;
  /** Localized next-review date (e.g. "Reviews in Nov"). */
  reviewDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  style?: StyleProp<ViewStyle>;
}

/**
 * A levelized ("budget billing") summary row: the flat monthly charge, a
 * settle-up balance shown as a **signed credit/shortfall** (credit → success,
 * shortfall → danger, conveyed by sign + label + color, never color alone), and
 * an optional plan-vs-actual progress bar. The bar denominator is guarded
 * against zero. All amounts are integer cents via `formatMoney`, so nothing
 * drifts. Every color traces to a token.
 */
export function BudgetBillRow({
  label = 'Budget billing',
  monthlyCents,
  balanceCents,
  actualToDateCents,
  plannedToDateCents,
  reviewDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: BudgetBillRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const monthly = Math.max(0, Math.trunc(monthlyCents || 0));

  const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
  const isCredit = balance != null && balance >= 0;

  const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
  const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
  const showBar = planned > 0;
  const overPlan = actual > planned;
  const barTone: ProgressTone = overPlan ? 'warn' : 'primary';

  return (
    <Card style={style}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <Icon glyph="📅" size="lg" accessibilityLabel="Budget billing" />
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {label}
          </Text>
          {reviewDate != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{reviewDate}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {format(monthly, currency)}
          </Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>per month</Text>
        </View>
      </View>

      {balance != null ? (
        <View
          style={{
            marginTop: tokens.spacing.md,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {isCredit ? 'Account credit' : 'Settle-up balance'}
          </Text>
          <Text
            style={{
              color: isCredit ? colors.success : colors.danger,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '700',
            }}
          >
            {isCredit ? '' : '−'}
            {format(Math.abs(balance), currency)}
          </Text>
        </View>
      ) : null}

      {showBar ? (
        <View style={{ marginTop: tokens.spacing.md, gap: tokens.spacing.xs }}>
          <Progress value={Math.min(actual, planned * 1.5)} max={planned} tone={barTone} size="sm" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {format(actual, currency)} actual vs {format(planned, currency)} planned
          </Text>
        </View>
      ) : null}
    </Card>
  );
}
