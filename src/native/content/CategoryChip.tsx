import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../primitives';

export type CategoryChipVariant = 'solid' | 'soft' | 'outline';

export interface CategoryChipProps {
  /** Category / section label. */
  label: string;
  /**
   * Visual weight:
   * - `solid`  — filled accent chip (default), for a hero/eyebrow.
   * - `soft`   — subtle surface chip with accent text.
   * - `outline`— bordered, transparent fill.
   */
  variant?: CategoryChipVariant;
  /** Makes the chip pressable (e.g. to open a section). */
  onPress?: () => void;
  /** Marks the chip as the active filter (adds an accent ring in `soft`/`outline`). */
  active?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A small category / section label for news & blog UIs — the "Technology",
 * "Opinion", "Sport" tag you see above a headline. Three token-bound variants
 * (`solid`/`soft`/`outline`); optional `onPress` turns it into a section
 * filter. Colors come only from `SemanticColors`; no literal hex.
 */
export function CategoryChip({
  label,
  variant = 'solid',
  onPress,
  active = false,
  style,
}: CategoryChipProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const bg: Record<CategoryChipVariant, keyof SemanticColors | 'transparent'> = {
    solid: 'accent',
    soft: 'surface',
    outline: 'transparent',
  };
  const fg: Record<CategoryChipVariant, keyof SemanticColors> = {
    solid: 'onAccent',
    soft: 'accent',
    outline: 'accent',
  };
  const bgKey = bg[variant];

  const inner = (
    <View
      style={[
        {
          alignSelf: 'flex-start',
          borderRadius: tokens.radius.sm,
          paddingVertical: 3,
          paddingHorizontal: tokens.spacing.sm,
          backgroundColor: bgKey === 'transparent' ? 'transparent' : colors[bgKey],
          borderWidth: variant === 'outline' || active ? 1 : 0,
          borderColor: active ? colors.accent : colors.border,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: colors[fg[variant]],
          fontSize: tokens.typography.scale.xs,
          fontWeight: '700',
          letterSpacing: 0.6,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </Text>
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Category ${label}`}
      accessibilityState={{ selected: active }}
      onPress={onPress}
      hitSlop={6}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
