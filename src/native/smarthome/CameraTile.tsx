import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon, Badge } from '../primitives';

export interface CameraTileProps {
  /** Camera name (e.g. "Front Door"). */
  name: string;
  /** Whether the camera is reachable / streaming. */
  online?: boolean;
  /** Whether the camera is actively recording. */
  recording?: boolean;
  /** Last-seen / timestamp caption (e.g. "Live", "2m ago"). */
  timestamp?: string;
  /** Preview aspect height in px. Default 140. */
  previewHeight?: number;
  /** Fires when the tile is pressed to open the stream. */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A camera feed tile — a token-surface preview area (the kit ships no image
 * decoder, so an offline/placeholder frame is drawn with a `muted` glyph) topped
 * by status {@link Badge}s: a "LIVE" (success) / "OFFLINE" (danger) chip and a
 * "REC" chip when recording. Status is always text, never color alone. The name
 * and timestamp sit in a footer bar. Pressing opens the stream via `onPress`.
 * No literal colors.
 */
export function CameraTile({
  name,
  online = false,
  recording = false,
  timestamp,
  previewHeight = 140,
  onPress,
  style,
}: CameraTileProps): React.ReactElement {
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
          backgroundColor: colors.surface,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      {/* Preview / placeholder frame */}
      <View
        style={{
          height: previewHeight,
          backgroundColor: colors.border,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon glyph={online ? '📹' : '🚫'} color="muted" size="3xl" />
        {/* Status chips */}
        <View style={{ position: 'absolute', top: tokens.spacing.xs, left: tokens.spacing.xs, flexDirection: 'row', gap: tokens.spacing.xs }}>
          <Badge tone={online ? 'success' : 'danger'} variant="solid" size="sm" dot>
            {online ? 'LIVE' : 'OFFLINE'}
          </Badge>
          {recording && online ? (
            <Badge tone="danger" variant="solid" size="sm">
              REC
            </Badge>
          ) : null}
        </View>
      </View>

      {/* Footer */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {name}
        </Text>
        {timestamp != null ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{timestamp}</Text>
        ) : null}
      </View>
    </Pressable>
  );
}
