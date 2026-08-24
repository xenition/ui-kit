import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';

export interface ExchangeRateRowProps {
  /** Base (from) currency code, e.g. `"USD"`. */
  baseCurrency: string;
  /** Quote (to) currency code, e.g. `"EUR"`. */
  quoteCurrency: string;
  /** Units of quote per one unit of base (e.g. `0.92`). */
  rate: number;
  /** Percentage change vs the prior period; tints + arrow (up = success). */
  changePct?: number;
  /** Number of decimals shown for the rate (default `4`). */
  precision?: number;
  /** Fires on row press. */
  onPress?: () => void;
  /**
   * Surface treatment (visual-diversity preset). Defaults to `classic` — the
   * historical borderless row, so this is opt-in only.
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `success`, down = `danger`). The rate is a
 * display-only number formatted to `precision` decimals via `toFixed`, so the
 * shown value never drifts. Colors trace to tokens; becomes a button when
 * `onPress` is given.
 */
export function ExchangeRateRow({
  baseCurrency,
  quoteCurrency,
  rate,
  changePct,
  precision = 4,
  onPress,
  appearance = 'classic',
  style,
}: ExchangeRateRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  const safeRate = Number.isFinite(rate) ? rate : 0;
  const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
  const up = (changePct ?? 0) >= 0;
  // FILL-AS-TEXT: the change chip is TEXT, so it reads the AA-guaranteed *Text slots.
  const changeColor = up ? colors.successText : colors.dangerText;

  // Appearance surface FIRST; layout (radius/padding) stays AFTER. Classic → unchanged.
  const surface = appearance === 'classic' ? undefined : appearanceStyle(appearance, colors, tokens);

  const body = (
    <View
      style={[
        surface,
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
        style,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }}>
        {baseCurrency} <Text style={{ color: colors.muted }}>→</Text> {quoteCurrency}
      </Text>
      <Text
        style={{
          color: colors.onSurface,
          fontSize: tokens.typography.scale.base,
          fontWeight: '700',
          fontVariant: ['tabular-nums'],
        }}
      >
        {safeRate.toFixed(Math.max(0, Math.trunc(precision)))}
      </Text>
      {hasChange ? (
        <Text style={{ color: changeColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
          {up ? '▲' : '▼'} {up ? '+' : ''}
          {(changePct as number).toFixed(2)}%
        </Text>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Animated.View style={{ transform: [{ scale: press.scale }] }}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${baseCurrency} to ${quoteCurrency}, ${safeRate.toFixed(Math.max(0, Math.trunc(precision)))}`}
        onPress={onPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {body}
      </Pressable>
    </Animated.View>
  );
}
