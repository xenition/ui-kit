import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Slider, Spinner, useXenitionTheme } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { formatTime, type PlaybackState } from './types';

export type VideoPlayerVariant = 'inline' | 'theater' | 'minimal';

export interface VideoPlayerProps {
  /** Poster / thumbnail image shown behind the controls. */
  posterUrl?: string;
  /** Title overlaid on the scrim (top-left). */
  title?: string;
  /** Transport state — drives the center control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds; when omitted the seek bar is hidden. */
  duration?: number;
  /** Live stream — shows a `LiveBadge` and hides the seek bar. */
  live?: boolean;
  /** Concurrent viewers, passed to the `LiveBadge` when `live`. */
  viewers?: number;
  /** Frame aspect ratio (default 16 / 9). */
  aspectRatio?: number;
  /**
   * - `inline`  — full control bar under the frame (default).
   * - `theater` — same controls, taller frame (16 / 9 → caller can widen).
   * - `minimal` — center play/pause only, no bottom bar.
   */
  variant?: VideoPlayerVariant;
  /** Hide the controls overlay entirely (e.g. tap-to-reveal handled by app). */
  showControls?: boolean;
  /** Called with the next playing state when the center control is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the seek bar changes. */
  onSeek?: (seconds: number) => void;
  /** Called when the fullscreen control is tapped. */
  onFullscreen?: () => void;
  /** Called when the cast control is tapped (shows a `CastButton` when set). */
  onCast?: () => void;
  /** Whether a cast target is connected (reflected by the `CastButton`). */
  casting?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A themed **video player UI shell** — controls overlay only, with **no
 * playback dependency**. Wrap a real player (e.g. `expo-av`'s `<Video>`) behind
 * this and drive it from the emitted intents: `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. It renders a poster frame, a
 * dark scrim, a center play/pause (or buffering spinner) control, and a bottom
 * bar with time labels + a `Slider` seek bar. The center control's accessible
 * label reflects `state` ("Play" / "Pause"). Every color resolves from
 * `SemanticColors` / neutral ramp tokens — no literal hex.
 */
export function VideoPlayer({
  posterUrl,
  title,
  state = 'paused',
  position = 0,
  duration,
  live = false,
  viewers,
  aspectRatio = 16 / 9,
  variant = 'inline',
  showControls = true,
  onPlayToggle,
  onSeek,
  onFullscreen,
  onCast,
  casting,
  style,
}: VideoPlayerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const seekMax = duration && duration > 0 ? duration : 1;
  const showSeek = variant !== 'minimal' && !live && duration != null;

  return (
    <View
      style={[
        {
          width: '100%',
          aspectRatio,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          backgroundColor: tokens.ramps.neutral[900],
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {posterUrl ? (
        <Image
          source={{ uri: posterUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        />
      ) : null}

      {showControls ? (
        <>
          {/* Scrim for control legibility over the poster. */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: tokens.ramps.neutral[900],
              opacity: 0.35,
            }}
          />

          {/* Top-left title + live badge. */}
          <View
            style={{
              position: 'absolute',
              top: tokens.spacing.sm,
              left: tokens.spacing.sm,
              right: tokens.spacing.sm,
              flexDirection: 'row',
              alignItems: 'center',
              gap: tokens.spacing.sm,
            }}
          >
            {live ? <LiveBadge viewers={viewers} /> : null}
            {title ? (
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  color: tokens.ramps.neutral[50],
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {title}
              </Text>
            ) : null}
          </View>

          {/* Center play / pause / buffering. */}
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {isBuffering ? (
              <Spinner />
            ) : (
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={isPlaying ? 'Pause' : 'Play'}
                accessibilityState={{ selected: isPlaying }}
                disabled={!onPlayToggle}
                onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
                hitSlop={12}
                style={({ pressed }) => ({
                  width: 64,
                  height: 64,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                })}
              >
                <Icon glyph={isPlaying ? '❙❙' : '▶'} size="xl" color="onPrimary" />
              </Pressable>
            )}
          </View>

          {/* Bottom control bar. */}
          {variant !== 'minimal' ? (
            <View
              style={{
                position: 'absolute',
                left: tokens.spacing.sm,
                right: tokens.spacing.sm,
                bottom: tokens.spacing.sm,
                gap: tokens.spacing.xs,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
                <Text style={{ color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }}>
                  {live ? 'LIVE' : formatTime(position)}
                </Text>
                <View style={{ flex: 1 }}>
                  {showSeek ? (
                    <Slider
                      value={Math.min(position, seekMax)}
                      min={0}
                      max={seekMax}
                      onValueChange={onSeek}
                    />
                  ) : (
                    <View
                      style={{
                        height: 4,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.border,
                      }}
                    />
                  )}
                </View>
                {!live ? (
                  <Text style={{ color: tokens.ramps.neutral[50], fontSize: tokens.typography.scale.xs }}>
                    {formatTime(duration)}
                  </Text>
                ) : null}
                {onCast ? (
                  <CastButton connected={casting} onPress={onCast} size="sm" />
                ) : null}
                {onFullscreen ? (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel="Fullscreen"
                    onPress={onFullscreen}
                    hitSlop={8}
                  >
                    <Icon glyph="⤢" size="base" color="onSurface" style={{ color: tokens.ramps.neutral[50] }} />
                  </Pressable>
                ) : null}
              </View>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}
