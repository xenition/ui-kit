import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Sparkline } from '../charts';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import type { BalanceHeaderProps } from './BalanceHeader';

/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV2Props = BalanceHeaderProps;

/**
 * BalanceHeader, redesigned (v2): a **big centered hero** over a full-width
 * sparkline band. Everything is center-aligned — the caption, the oversized
 * figure, and a pill-shaped change chip (tinted with the up/down text slot) —
 * then a {@link Sparkline} spans the full width beneath as a trend "floor".
 * Distinct at a glance from v1's left-aligned stack. Same props, integer cents.
 */
export function BalanceHeaderV2({
  label = 'Total balance',
  balanceCents,
  currency = 'USD',
  changeCents,
  changePct,
  trend,
  formatMoney: format = formatMoney,
  loading = false,
  style,
}: BalanceHeaderV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
  const up = (changeCents ?? 0) >= 0;
  const changeColor = up ? colors.successText : colors.dangerText;
  const arrow = up ? '▲' : '▼';
  const hasTrend = Array.isArray(trend) && trend.length > 0;

  return (
    <Animated.View
      accessibilityRole="summary"
      style={[{ alignItems: 'center', gap: tokens.spacing.sm }, enter, style]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      {loading ? (
        <View
          accessibilityLabel="Loading balance"
          style={{
            height: tokens.typography.scale['3xl'] + 8,
            width: 200,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.border,
          }}
        />
      ) : (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'] + 8,
            fontWeight: '700',
            textAlign: 'center',
            fontVariant: ['tabular-nums'],
          }}
        >
          {format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
        </Text>
      )}
      {hasChange && !loading ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: 2,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(changeColor, 0.12),
          }}
        >
          <Text style={{ color: changeColor, fontSize: tokens.typography.scale.xs }}>{arrow}</Text>
          <Text style={{ color: changeColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {format(Math.abs(Math.trunc(changeCents as number)), currency)}
            {typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''}
          </Text>
        </View>
      ) : null}
      {hasTrend && !loading ? (
        <Sparkline
          data={trend as number[]}
          height={48}
          color={up ? 'success' : 'danger'}
          style={{ alignSelf: 'stretch', marginTop: tokens.spacing.xs }}
        />
      ) : null}
    </Animated.View>
  );
}
