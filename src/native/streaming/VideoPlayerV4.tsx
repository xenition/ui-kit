import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, Slider, Spinner, useXenitionTheme } from '../primitives';
import { LiveBadge } from './LiveBadge';
import { CastButton } from './CastButton';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow } from './internal/spotlight';
import { withAlpha } from '../primitives/internal/color';
import { formatTime } from './types';
import type { VideoPlayerProps } from './VideoPlayer';

/** Drop-in for {@link VideoPlayerProps} — same props, the V4 "spotlight" design. */
export type VideoPlayerV4Props = VideoPlayerProps;

/**
 * VideoPlayer — **V4** "spotlight" design. The video surface shell: a
 * brand-gradient poster/backdrop sits behind the (placeholder) video frame —
 * the V4 signature — with a big centered round **primary** play control and a
 * bottom control bar (scrubber + time labels + cast/fullscreen glyphs) on a
 * subtle scrim. A `posterUrl` overlays the gradient when given. Controls-only,
 * no playback engine: drive a real player from `onPlayToggle(next)`,
 * `onSeek(seconds)`, `onFullscreen`, `onCast`. Same props/behavior as
 * {@link VideoPlayerProps} (buffering swaps play for a `Spinner`); token-only
 * colors via `useXenitionTheme()` — no literal hex.
 */
export function VideoPlayerV4({
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
}: VideoPlayerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const seekMax = duration && duration > 0 ? duration : 1;
  const showSeek = variant !== 'minimal' && !live && duration != null;
  const ink = r.primary[50];

  return (
    <View
      style={[
        {
          width: '100%',
          aspectRatio,
          borderRadius: tokens.radius.lg,
          overflow: 'hidden',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      {/* Gradient poster/backdrop — the V4 spotlight signature. */}
      <GradientSurface
        colors={spotlightGlow(r)}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />

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
          {/* Scrim for control legibility over the poster / gradient. */}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: withAlpha(r.neutral[900], 0.3),
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
                  color: ink,
                  fontSize: tokens.typography.scale.sm,
                  fontWeight: '600',
                }}
              >
                {title}
              </Text>
            ) : null}
          </View>

          {/* Center play / pause / buffering — big round primary. */}
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
                  width: 72,
                  height: 72,
                  borderRadius: tokens.radius.full,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  shadowColor: r.neutral[900],
                  shadowOpacity: 0.3,
                  shadowRadius: 10,
                  shadowOffset: { width: 0, height: 4 },
                  elevation: 4,
                  opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                })}
              >
                <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
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
                <Text style={{ color: ink, fontSize: tokens.typography.scale.xs }}>
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
                  <Text style={{ color: ink, fontSize: tokens.typography.scale.xs }}>
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
                    <Icon glyph="⤢" size="base" color="onSurface" style={{ color: ink }} />
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
