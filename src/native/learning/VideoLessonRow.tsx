import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Progress } from '../primitives';

export interface VideoLessonRowProps {
  /** Lesson title. */
  title: string;
  /** Duration label, e.g. "12:30". */
  durationLabel?: string;
  /** Remote thumbnail URI. */
  thumbnail?: string;
  /** Watch progress 0–100; renders a thin progress bar when set. */
  watchProgress?: number;
  /** Whether this lesson is the one currently playing. */
  playing?: boolean;
  /** Whether the lesson is fully watched. */
  watched?: boolean;
  /** Optional section / index label, e.g. "3.2". */
  meta?: string;
  /** Fires when the row (play affordance) is pressed. */
  onPlay?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Announced with its play state. Token-only colors.
 */
export function VideoLessonRow({
  title,
  durationLabel,
  thumbnail,
  watchProgress,
  playing = false,
  watched = false,
  meta,
  onPlay,
  style,
}: VideoLessonRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`}
      accessibilityState={{ selected: playing }}
      disabled={!onPlay}
      onPress={onPlay}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          padding: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: playing ? colors.accent : colors.surface,
          opacity: pressed ? 0.9 : 1,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 72,
          height: 48,
          borderRadius: tokens.radius.sm,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.border,
        }}
      >
        {thumbnail ? (
          <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        ) : null}
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <Text allowFontScaling={false} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg }}>
            {watched ? '✓' : '▶'}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {title}
        </Text>
        {(meta || durationLabel) ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {[meta, durationLabel].filter(Boolean).join(' · ')}
          </Text>
        ) : null}
        {watchProgress != null ? <Progress value={watchProgress} tone="primary" size="sm" /> : null}
      </View>
    </Pressable>
  );
}
