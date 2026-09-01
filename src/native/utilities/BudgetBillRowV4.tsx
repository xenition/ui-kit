import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../primitives';
import { Icon, Progress, type ProgressTone } from '../primitives';
import { formatMoney } from './internal/format';
import { GradientSurface } from './internal/GradientSurface';
import { brandDisc, brandInk } from './internal/brand';
import type { BudgetBillRowProps } from './BudgetBillRow';

/** Drop-in for {@link BudgetBillRowProps} — same props, a different design. */
export type BudgetBillRowV4Props = BudgetBillRowProps;

/**
 * BudgetBillRow — **V4** design. An elevated row: the budget-billing glyph in
 * the signature brand-gradient disc, the flat monthly charge, a settle-up balance
 * shown as a signed credit/shortfall (credit → success, shortfall → danger, by
 * sign + label + color, never color alone), and an optional plan-vs-actual
 * progress bar (denominator guarded against zero). All amounts are integer cents
 * via `formatMoney`. Same props as {@link BudgetBillRowProps}; token-only colors.
 */
export function BudgetBillRowV4({
  label = 'Budget billing',
  monthlyCents,
  balanceCents,
  actualToDateCents,
  plannedToDateCents,
  reviewDate,
  currency = 'USD',
  formatMoney: format = formatMoney,
  style,
}: BudgetBillRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const monthly = Math.max(0, Math.trunc(monthlyCents || 0));

  const balance = balanceCents != null && Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : null;
  const isCredit = balance != null && balance >= 0;

  const planned = plannedToDateCents != null ? Math.max(0, Math.trunc(plannedToDateCents)) : 0;
  const actual = actualToDateCents != null ? Math.max(0, Math.trunc(actualToDateCents)) : 0;
  const showBar = planned > 0;
  const overPlan = actual > planned;
  const barTone: ProgressTone = overPlan ? 'warn' : 'primary';

  const card = {
    backgroundColor: colors.card,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.1,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  } as const;

  return (
    <View style={[card, style]}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <GradientSurface
          colors={brandDisc(r)}
          style={{ width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
          <Icon glyph="📅" size="xl" accessibilityLabel="Budget billing" style={{ color: brandInk(r) }} />
        </GradientSurface>
        <View style={{ flex: 1, gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {label}
          </Text>
          {reviewDate != null ? (
            <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>{reviewDate}</Text>
          ) : null}
        </View>
        <View style={{ alignItems: 'flex-end', gap: 2 }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
            {format(monthly, currency)}
          </Text>
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>per month</Text>
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
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.sm }}>
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
          <Text style={{ color: colors.mutedText, fontSize: tokens.typography.scale.xs }}>
            {format(actual, currency)} actual vs {format(planned, currency)} planned
          </Text>
        </View>
      ) : null}
    </View>
  );
}
