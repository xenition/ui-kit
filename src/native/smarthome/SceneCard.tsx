import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Badge } from '../primitives';

export interface SceneCardProps {
  /** Scene name (e.g. "Movie Night", "Good Morning"). */
  name: string;
  /** Leading glyph/emoji (e.g. "🎬", "🌅"). */
  icon?: string;
  /** Short description of what the scene does. */
  description?: string;
  /** Number of devices the scene controls. */
  deviceCount?: number;
  /** Whether this scene is currently active. */
  active?: boolean;
  /** Fires when the card is pressed to run the scene. */
  onActivate?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A tappable scene / preset card — glyph, name, description and a device count.
 * When `active`, the card switches to the `elevated` surface, tints the glyph
 * with `primary`, and shows an "Active" {@link Badge} so the running state is
 * labeled, not color-only. Pressing anywhere fires `onActivate`. `deviceCount`
 * is rendered defensively (only when a positive number). Token-bound throughout.
 */
export function SceneCard({
  name,
  icon = '✨',
  description,
  deviceCount,
  active = false,
  onActivate,
  style,
}: SceneCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${name} scene${active ? ', active' : ''}`}
      onPress={onActivate}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      <Card
        variant={active ? 'elevated' : 'interactive'}
        style={[active ? { borderColor: colors.primary, borderWidth: 1 } : null, style]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: active ? colors.primary : colors.border,
            }}
          >
            <Icon glyph={icon} color={active ? 'primary' : 'onSurface'} size="xl" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                {name}
              </Text>
              {active ? (
                <Badge tone="primary" variant="soft" size="sm">
                  Active
                </Badge>
              ) : null}
            </View>
            {description != null ? (
              <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>
                {description}
              </Text>
            ) : null}
            {count > 0 ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }}>
                {`${count} ${count === 1 ? 'device' : 'devices'}`}
              </Text>
            ) : null}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}
