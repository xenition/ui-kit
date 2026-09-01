import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Card, Icon, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { SceneCardProps } from './SceneCard';

/** Drop-in for {@link SceneCardProps} — same props, the V4 "ambient" design. */
export type SceneCardV4Props = SceneCardProps;

/**
 * SceneCard — **V4** "ambient" design. A calm scene tile: a glyph sits in a tinted
 * disc, with the scene name, an optional description, and a device count. When
 * `active`, the whole card glows — a soft primary-tinted wash
 * (`withAlpha(primary, 0.08)`), a primary border, and a glowing glyph disc — plus
 * an "Active" {@link Badge} so the running state is labeled, not color-only.
 * Pressing anywhere fires `onActivate`. `deviceCount` renders defensively (only
 * when a positive number). Same props/behavior as {@link SceneCardProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
export function SceneCardV4({
  name,
  icon = '✨',
  description,
  deviceCount,
  active = false,
  onActivate,
  style,
}: SceneCardV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const count = typeof deviceCount === 'number' && deviceCount > 0 ? deviceCount : 0;

  const shell = {
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    padding: tokens.spacing.lg,
    backgroundColor: active ? withAlpha(colors.primary, 0.08) : colors.card,
    borderColor: active ? withAlpha(colors.primary, 0.5) : colors.border,
    ...(active
      ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 12, shadowOffset: { width: 0, height: 4 }, elevation: 3 }
      : {}),
  } as const;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      accessibilityLabel={`${name} scene${active ? ', active' : ''}`}
      onPress={onActivate}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      <Card variant="flat" style={[shell, style]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {/* Glowing glyph disc — the ambient signature. */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: tokens.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: active ? withAlpha(colors.primary, 0.15) : withAlpha(colors.onSurface, 0.05),
              borderWidth: 1,
              borderColor: active ? withAlpha(colors.primary, 0.4) : colors.border,
            }}
          >
            <Icon glyph={icon} color={active ? 'primary' : 'onSurface'} size="xl" />
          </View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
              <Text numberOfLines={1} style={{ flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
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
