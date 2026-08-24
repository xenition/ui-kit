import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';

/** Price movement direction — colors the change and is stated with a glyph/sign. */
export type PriceDirection = 'up' | 'down' | 'flat';

export interface MarketPriceRowProps {
  /** Commodity name (e.g. "Wheat"). */
  commodity: string;
  /** Current price (pre-formatted or numeric, e.g. `284.50`). */
  price: number | string;
  /** Currency / unit suffix (e.g. "€/t", "$/bu"). */
  unit?: string;
  /** Percentage change over the period (e.g. `1.8` or `-0.6`). Guarded. */
  changePct?: number;
  /** Explicit direction; otherwise derived from the sign of `changePct`. */
  direction?: PriceDirection;
  /** Leading glyph/emoji. Default `'🌾'`. */
  icon?: string;
  /** Market / period hint (e.g. "Chicago · today"). */
  market?: string;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
  /** Fires when the row is tapped. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const DIR_META: Record<PriceDirection, { glyph: string; color: keyof SemanticColors; sign: string }> = {
  up: { glyph: '▲', color: 'success', sign: '+' },
  down: { glyph: '▼', color: 'danger', sign: '' },
  flat: { glyph: '▪', color: 'muted', sign: '' },
};

function deriveDirection(changePct?: number): PriceDirection {
  if (typeof changePct !== 'number' || changePct === 0) return 'flat';
  return changePct > 0 ? 'up' : 'down';
}

/**
 * A market-price row — commodity glyph + name, the current price with unit, and
 * a change readout. The change carries a direction glyph (`▲`/`▼`/`▪`) and an
 * explicit sign alongside its color, so the movement reads without color alone.
 * `changePct` is guarded and the direction defaults to the sign of the change.
 * Tappable via `onPress` (accessible button). Token-bound — no literal colors.
 */
export function MarketPriceRow({
  commodity,
  price,
  unit,
  changePct,
  direction,
  icon = '🌾',
  market,
  last = false,
  onPress,
  style,
}: MarketPriceRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const dir = direction ?? deriveDirection(changePct);
  const meta = DIR_META[dir];
  const hasChange = typeof changePct === 'number';
  const changeText = hasChange
    ? `${meta.glyph} ${meta.sign}${Math.abs(changePct).toFixed(1)}%`
    : null;

  const Body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          borderBottomWidth: last ? 0 : 1,
          borderBottomColor: colors.border,
        },
        style,
      ]}
    >
      <Icon glyph={icon} size="lg" color="onSurface" />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {commodity}
        </Text>
        {market != null ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {market}
          </Text>
        ) : null}
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700', fontFamily: tokens.typography.fontHeading }}>
          {String(price)}
          {unit != null ? <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }}> {unit}</Text> : null}
        </Text>
        {changeText != null ? (
          <Text style={{ color: colors[meta.color], fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {changeText}
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onPress) return Body;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${commodity}, ${String(price)}${unit ? ` ${unit}` : ''}${changeText ? `, ${dir} ${Math.abs(changePct as number).toFixed(1)} percent` : ''}`}
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
    >
      {Body}
    </Pressable>
  );
}
