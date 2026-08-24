import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import type { SceneCardProps } from './SceneCard';

/** Alternate design (V2) — identical prop contract to {@link SceneCardProps}. */
export type SceneCardV2Props = SceneCardProps;

/**
 * SceneCard — alternate design **V2**: a full-bleed tinted scene card with a big
 * background glyph. The whole surface is washed in a primary tint (via
 * `withAlpha`, never a literal), an oversized watermark glyph sits behind the
 * text, and the name + description + device count stack over it; the active
 * state raises the card, strengthens the tint/border, and shows an "Active"
 * {@link Badge} so running state is labeled, not color-only. Drop-in replacement
 * for `SceneCard` — same props. `deviceCount` is rendered defensively.
 */
export function SceneCardV2({
  name,
  icon = '✨',
  description,
  deviceCount,
  active = false,
  onActivate,
  style,
}: SceneCardV2Props): React.ReactElement {
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
      <View
        style={[
          {
            minHeight: 120,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            overflow: 'hidden',
            justifyContent: 'flex-end',
            backgroundColor: withAlpha(colors.primary, active ? 0.16 : 0.08),
            borderWidth: 1,
            borderColor: active ? colors.primary : withAlpha(colors.primary, 0.2),
          },
          active ? shadow('md', tokens) : null,
          style,
        ]}
      >
        {/* Oversized background watermark glyph. */}
        <View
          style={{ position: 'absolute', top: -12, right: -8, opacity: active ? 0.28 : 0.16 }}
          pointerEvents="none"
        >
          <Icon glyph={icon} color="primary" size={104} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginBottom: 4 }}>
          <Text
            numberOfLines={1}
            style={{
              flexShrink: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.xl,
              fontFamily: tokens.typography.fontHeading,
              fontWeight: '700',
            }}
          >
            {name}
          </Text>
          {active ? (
            <Badge tone="primary" variant="soft" size="sm">
              Active
            </Badge>
          ) : null}
        </View>

        {description != null ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}

        {count > 0 ? (
          <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 6 }}>
            {`${count} ${count === 1 ? 'device' : 'devices'}`}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
