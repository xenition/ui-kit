import * as React from 'react';
import { Image, Pressable, Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { Progress } from '../primitives';
import type { VideoLessonRowProps } from './VideoLessonRow';

/** V4 layout choices for the "campus" design. */
export type VideoLessonRowLayout = 'full' | 'compact';

/** Drop-in for {@link VideoLessonRowProps} — same props, the V4 "campus" design. */
export interface VideoLessonRowV4Props extends VideoLessonRowProps {
  /** V4 layout: `full` (default) or `compact` (denser single line). */
  variant?: VideoLessonRowLayout;
}

/**
 * VideoLessonRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active (the playing state is a word + pill,
 * never color alone). Tappable when `onPlay` is set. Honors the V4 `variant` —
 * `full` (default) and `compact`. Token-only colors via `useXenitionTheme()`.
 */
export function VideoLessonRowV4({
  title,
  durationLabel,
  thumbnail,
  watchProgress,
  playing = false,
  watched = false,
  meta,
  onPlay,
  variant = 'full',
  style,
}: VideoLessonRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
  const compact = variant === 'compact';
  const shell: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    gap: tokens.spacing.md,
    padding: tokens.spacing.sm,
    borderRadius: tokens.radius.lg,
    backgroundColor: colors.card,
    borderColor: playing ? colors.primary : colors.border,
    borderWidth: playing ? 2 : 1,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const thumbW = compact ? 56 : 72;
  const thumbH = compact ? 40 : 48;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`}
      accessibilityState={{ selected: playing }}
      disabled={!onPlay}
      onPress={onPlay}
      style={({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style]}
    >
      <View style={{ width: thumbW, height: thumbH, borderRadius: tokens.radius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: withAlpha(colors.primary, 0.1) }}>
        {thumbnail ? <Image source={{ uri: thumbnail }} style={{ width: '100%', height: '100%' }} resizeMode="cover" /> : null}
        <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
          <Text allowFontScaling={false} style={{ color: watched ? colors.success : colors.primary, fontSize: tokens.typography.scale.lg }}>{watched ? '✓' : '▶'}</Text>
        </View>
      </View>

      <View style={{ flex: 1, gap: 4 }}>
        <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>{title}</Text>
        {!compact && (meta || durationLabel) ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }}>{[meta, durationLabel].filter(Boolean).join(' · ')}</Text>
        ) : null}
        {!compact && watchProgress != null ? <Progress value={watchProgress} tone="primary" size="sm" /> : null}
      </View>

      {playing ? (
        <View style={{ borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: withAlpha(colors.primary, 0.1) }}>
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>▶ Now playing</Text>
        </View>
      ) : null}
    </Pressable>
  );
}
