import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Badge } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { CameraTileProps } from './CameraTile';

/** Drop-in for {@link CameraTileProps} — same props, the V4 "ambient" design. */
export type CameraTileV4Props = CameraTileProps;

/**
 * CameraTile — **V4** "ambient" design. The immersive take on a feed tile: a
 * **dark, rounded video frame** (drawn on the `onSurface` token so it reads as a
 * screen in both light and dark, with an `onSurface`-alpha scrim behind the
 * overlays — no literal colors) fills the tile, a **live pulse dot** rides beside
 * the "LIVE"/"OFFLINE" chip when streaming, and a `REC` chip appears while
 * recording. The camera name + timestamp sit in a scrim overlay along the bottom
 * of the frame rather than a separate bar, so the framing stays clean and
 * immersive. Status is always text, never color alone. Pressing opens the stream
 * via `onPress`. Same props/behavior as {@link CameraTileProps}; token-only
 * colors via `useXenitionTheme()` + `withAlpha`.
 */
export function CameraTileV4({
  name,
  online = false,
  recording = false,
  timestamp,
  previewHeight = 140,
  onPress,
  style,
}: CameraTileV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${name} camera, ${online ? 'online' : 'offline'}`}
      onPress={onPress}
      style={({ pressed }) => [
        {
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.onSurface,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {/* Dark, immersive video / snapshot frame */}
      <View
        style={{
          height: previewHeight,
          backgroundColor: colors.onSurface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon glyph={online ? '📹' : '🚫'} color="onPrimary" size="3xl" />

        {/* Status chips — a live pulse dot rides beside the LIVE chip. */}
        <View
          style={{
            position: 'absolute',
            top: tokens.spacing.xs,
            left: tokens.spacing.xs,
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
          }}
        >
          {online ? (
            <View style={{ width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.success }} />
          ) : null}
          <Badge tone={online ? 'success' : 'danger'} variant="solid" size="sm" dot>
            {online ? 'LIVE' : 'OFFLINE'}
          </Badge>
          {recording && online ? (
            <Badge tone="danger" variant="solid" size="sm">
              REC
            </Badge>
          ) : null}
        </View>

        {/* Bottom scrim overlay — name + timestamp over the frame, clean framing. */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
            backgroundColor: withAlpha(colors.onSurface, 0.6),
            paddingHorizontal: tokens.spacing.sm,
            paddingVertical: tokens.spacing.xs,
          }}
        >
          <Text
            numberOfLines={1}
            style={{ flex: 1, color: colors.surface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {name}
          </Text>
          {timestamp != null ? (
            <Text style={{ color: colors.surface, opacity: 0.8, fontSize: tokens.typography.scale.xs }}>
              {timestamp}
            </Text>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
