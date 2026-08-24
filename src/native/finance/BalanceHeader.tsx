import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Sparkline } from '../charts';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';
import { formatMoney, type MoneyFormatter } from '../commerce/money';

export interface BalanceHeaderProps {
  /** Caption above the figure (default `Total balance`). */
  label?: string;
  /** Headline balance in integer **cents**. */
  balanceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Period-over-period change in **cents**; tints + arrow (income/expense tone). */
  changeCents?: number;
  /** Optional percentage change shown beside the change amount. */
  changePct?: number;
  /** Optional trend series for a compact sparkline under the figure. */
  trend?: number[];
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Show a loading placeholder instead of the figure. */
  loading?: boolean;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` — the
   * historical borderless hero block, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * The hero balance block for an account/wallet screen: a muted label, a large
 * token-scaled figure, an optional up/down change (colored `success` /
 * `danger`), and an optional {@link Sparkline}. The balance is integer cents
 * (formatted to two decimals, no drift); the change tone derives from its sign.
 * All colors trace to tokens.
 */
export function BalanceHeader({
  label = 'Total balance',
  balanceCents,
  currency = 'USD',
  changeCents,
  changePct,
  trend,
  formatMoney: format = formatMoney,
  loading = false,
  appearance = 'classic',
  style,
}: BalanceHeaderProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();

  const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
  const up = (changeCents ?? 0) >= 0;
  // FILL-AS-TEXT: the change reads as TEXT (arrow + amount), so it uses the
  // AA-guaranteed *Text slots. The Sparkline below stays a FILL (unchanged).
  const changeColor = up ? colors.successText : colors.dangerText;
  const arrow = up ? '▲' : '▼';

  // Appearance surface FIRST; the enter transition + gap layout stay AFTER.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  return (
    <Animated.View
      accessibilityRole="summary"
      style={[surface, { gap: tokens.spacing.xs }, enter, style]}
    >
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      {loading ? (
        <View
          accessibilityLabel="Loading balance"
          style={{
            height: tokens.typography.scale['3xl'],
            width: 160,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.border,
          }}
        />
      ) : (
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale['3xl'],
            fontWeight: '700',
            fontVariant: ['tabular-nums'],
          }}
        >
          {format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency)}
        </Text>
      )}
      {hasChange && !loading ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: changeColor, fontSize: tokens.typography.scale.xs }}>{arrow}</Text>
          <Text style={{ color: changeColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {format(Math.abs(Math.trunc(changeCents as number)), currency)}
            {typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''}
          </Text>
        </View>
      ) : null}
      {trend != null && trend.length > 0 && !loading ? (
        <Sparkline data={trend} color={up ? 'success' : 'danger'} style={{ marginTop: tokens.spacing.xs }} />
      ) : null}
    </Animated.View>
  );
}
