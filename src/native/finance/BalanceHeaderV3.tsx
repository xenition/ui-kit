import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { useEnter } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import { formatMoney } from '../commerce/money';
import type { BalanceHeaderProps } from './BalanceHeader';

/** Same public contract as {@link BalanceHeader} — a drop-in alternate design. */
export type BalanceHeaderV3Props = BalanceHeaderProps;

/**
 * BalanceHeader, redesigned (v3): a **left-aligned compact** row. The caption
 * sits small above, then the figure and an inline soft change chip share one
 * baseline-aligned row — no sparkline, no oversized type. Built to sit tight in
 * a card header or toolbar. Distinct at a glance from v1's stacked hero and v2's
 * centered hero. Same props, integer-cents money, token-pure.
 */
export function BalanceHeaderV3({
  label = 'Total balance',
  balanceCents,
  currency = 'USD',
  changeCents,
  changePct,
  formatMoney: format = formatMoney,
  loading = false,
  style,
}: BalanceHeaderV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
  const up = (changeCents ?? 0) >= 0;
  const changeColor = up ? colors.successText : colors.dangerText;
  const arrow = up ? '▲' : '▼';

  return (
    <Animated.View accessibilityRole="summary" style={[{ gap: 2 }, enter, style]}>
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{label}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm, flexWrap: 'wrap' }}>
        {loading ? (
          <View
            accessibilityLabel="Loading balance"
            style={{
              height: tokens.typography.scale['2xl'],
              width: 120,
              borderRadius: tokens.radius.sm,
              backgroundColor: colors.border,
            }}
          />
        ) : (
          <Text
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale['2xl'],
              fontWeight: '700',
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
              paddingVertical: 1,
              paddingHorizontal: tokens.spacing.xs,
              borderRadius: tokens.radius.sm,
              backgroundColor: withAlpha(changeColor, 0.12),
            }}
          >
            <Text style={{ color: changeColor, fontSize: tokens.typography.scale.xs }}>{arrow}</Text>
            <Text style={{ color: changeColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
              {typeof changePct === 'number'
                ? `${changePct > 0 ? '+' : ''}${changePct}%`
                : format(Math.abs(Math.trunc(changeCents as number)), currency)}
            </Text>
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
}
