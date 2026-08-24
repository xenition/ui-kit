import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';

export type MetricTileTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger';

export interface MetricTileProps {
  label: string;
  value: React.ReactNode;
  /** Optional leading icon/glyph slot. */
  icon?: React.ReactNode;
  /** Accent tone for the value; defaults to neutral (`onSurface`). */
  tone?: MetricTileTone;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * The tone colours a metric's VALUE, which is text on the tile's `surface` — so
 * every entry is a `*Text` slot, not the fill of the same name.
 *
 * `primary`, `success`, `warn` and `danger` are background colours: the compiler
 * guarantees `onDanger` against `danger` and nothing at all about `danger`
 * against `surface`. The audit measured this tile's value at 2.32:1 in light.
 * The `*Text` forms are the same hues pushed until they clear AA, and unchanged
 * wherever the fill already did.
 */
const TONE_COLOR: Record<MetricTileTone, keyof SemanticColors> = {
  neutral: 'onSurface',
  primary: 'primaryText',
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
};

/**
 * A compact metric tile — a smaller, denser cousin of {@link StatCard} for grids
 * of secondary numbers. Optional accent `tone` colors the value. Pressable when
 * `onPress` is set. Token-only.
 */
export function MetricTile({
  label,
  value,
  icon,
  tone = 'neutral',
  onPress,
  style,
}: MetricTileProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const inner = (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.md,
          padding: tokens.spacing.md,
          gap: tokens.spacing.xs,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
        {icon ? <View>{icon}</View> : null}
        <Text
          numberOfLines={1}
          style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}
        >
          {label}
        </Text>
      </View>
      <Text
        style={{
          color: colors[TONE_COLOR[tone]],
          fontSize: tokens.typography.scale.xl,
          fontWeight: '700',
        }}
      >
        {value}
      </Text>
    </View>
  );

  if (!onPress) {
    return <View accessibilityLabel={`${label}: ${String(value)}`}>{inner}</View>;
  }
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}: ${String(value)}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
