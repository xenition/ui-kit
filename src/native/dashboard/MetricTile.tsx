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

const TONE_COLOR: Record<MetricTileTone, keyof SemanticColors> = {
  neutral: 'onSurface',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
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
