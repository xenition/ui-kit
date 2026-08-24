import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { SceneCardProps } from './SceneCard';

/** Alternate design (V3) — identical prop contract to {@link SceneCardProps}. */
export type SceneCardV3Props = SceneCardProps;

/**
 * SceneCard — alternate design **V3**: a compact pill/chip row. A small leading
 * glyph, the scene name, and a device count sit inline in a rounded-full
 * chip; the active state fills the chip with a primary tint, swaps to a filled
 * glyph, and appends a "✓ Active" text marker (not color-alone). Drop-in
 * replacement for `SceneCard` — same props — for horizontally scrolling scene
 * strips. `deviceCount` renders only when positive.
 */
export function SceneCardV3({
  name,
  icon = '✨',
  deviceCount,
  active = false,
  onActivate,
  style,
}: SceneCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${name} scene${active ? ', active' : ''}`}
      onPress={onActivate}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, alignSelf: 'flex-start' })}
    >
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.sm,
            borderRadius: tokens.radius.full,
            backgroundColor: active ? withAlpha(colors.primary, 0.12) : colors.surface,
            borderWidth: 1,
            borderColor: active ? colors.primary : colors.border,
          },
          style,
        ]}
      >
        <Icon glyph={icon} color={active ? 'primary' : 'onSurface'} size="base" />
        <Text
          numberOfLines={1}
          style={{
            color: active ? colors.primaryText : colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {name}
        </Text>
        {count > 0 ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {`· ${count}`}
          </Text>
        ) : null}
        {active ? (
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓ Active
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
