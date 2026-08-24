import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Slider, Spinner, useXenitionTheme } from '../primitives';
import { formatTime, type MediaTrack, type PlaybackState } from './types';

export type AudioPlayerVariant = 'card' | 'compact' | 'expanded';

export interface AudioPlayerProps {
  /** The track being played. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds (falls back to `track.duration`). */
  duration?: number;
  /**
   * - `card`     — artwork + meta + transport + seek bar (default).
   * - `compact`  — single row, no seek bar.
   * - `expanded` — larger artwork, adds prev/next transport.
   */
  variant?: AudioPlayerVariant;
  /** Called with the next playing state when play/pause is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the seek bar changes. */
  onSeek?: (seconds: number) => void;
  /** Previous-track intent (shown in `expanded`). */
  onPrev?: () => void;
  /** Next-track intent (shown in `expanded`). */
  onNext?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A themed **audio player UI shell** — a card/row surface for a single track
 * with **no playback dependency**. Drive a real player (e.g. `expo-av`'s
 * `Audio.Sound`) from the emitted intents: `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onPrev`, `onNext`. Renders artwork, title/artist, a
 * `Slider` seek bar with time labels, and transport controls whose play/pause
 * label reflects `state`. Token-only — no literal hex.
 */
export function AudioPlayer({
  track,
  state = 'paused',
  position = 0,
  duration,
  variant = 'card',
  onPlayToggle,
  onSeek,
  onPrev,
  onNext,
  style,
}: AudioPlayerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const compact = variant === 'compact';
  const expanded = variant === 'expanded';
  const art = expanded ? 88 : compact ? 44 : 64;

  const meta = [track.artist, track.album].filter(Boolean).join(' · ');

  const playControl = (
    <View style={{ alignItems: 'center', justifyContent: 'center', width: 44, height: 44 }}>
      {isBuffering ? (
        <Spinner size="sm" />
      ) : (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
          accessibilityState={{ selected: isPlaying }}
          disabled={!onPlayToggle}
          onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
          })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
        </Pressable>
      )}
    </View>
  );

  return (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {track.artworkUrl ? (
          <Image
            source={{ uri: track.artworkUrl }}
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            style={{ width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
          />
        ) : (
          <View
            style={{
              width: art,
              height: art,
              borderRadius: tokens.radius.md,
              backgroundColor: colors.accent,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon glyph="♪" size="xl" color="onAccent" />
          </View>
        )}

        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {track.title}
          </Text>
          {meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {meta}
            </Text>
          ) : null}
        </View>

        {expanded && onPrev ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Previous" onPress={onPrev} hitSlop={8}>
            <Icon glyph="⏮" size="lg" color="onSurface" />
          </Pressable>
        ) : null}
        {playControl}
        {expanded && onNext ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={onNext} hitSlop={8}>
            <Icon glyph="⏭" size="lg" color="onSurface" />
          </Pressable>
        ) : null}
      </View>

      {!compact ? (
        <View style={{ gap: tokens.spacing.xs }}>
          <Slider value={Math.min(position, seekMax)} min={0} max={seekMax} onValueChange={onSeek} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {formatTime(position)}
            </Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {formatTime(total)}
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}
