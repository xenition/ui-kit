import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, Slider, Spinner, useXenitionTheme } from '../primitives';
import { GradientSurface } from './internal/GradientSurface';
import { spotlightGlow, spotlightInk } from './internal/spotlight';
import { formatTime } from './types';
import type { AudioPlayerProps } from './AudioPlayer';

/** Drop-in for {@link AudioPlayerProps} — same props, the V4 "spotlight" design. */
export type AudioPlayerV4Props = AudioPlayerProps;

/**
 * AudioPlayer — **V4** "spotlight" design. A compact audio transport card:
 * small artwork, title/artist, a clean soft-primary scrubber with time labels,
 * and big round **primary** transport controls (play/pause framed by prev/next
 * in `expanded`). The artwork sits on a subtle brand-gradient glow — the V4
 * signature — kept light so the card stays a clean surface. Same props/behavior
 * as {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); drive a
 * real player from `onPlayToggle(next)`, `onSeek(seconds)`, `onPrev`, `onNext`.
 * Token-only colors via `useXenitionTheme()` — no literal hex.
 */
export function AudioPlayerV4({
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
}: AudioPlayerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
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
            shadowColor: colors.onSurface,
            shadowOpacity: 0.18,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
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
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {/* Artwork on a subtle gradient glow — the V4 spotlight signature. */}
        <GradientSurface
          colors={spotlightGlow(r)}
          style={{
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            padding: track.artworkUrl ? tokens.spacing.xs : 0,
          }}
        >
          {track.artworkUrl ? (
            <Image
              source={{ uri: track.artworkUrl }}
              accessibilityIgnoresInvertColors
              resizeMode="cover"
              style={{ width: '100%', height: '100%', borderRadius: tokens.radius.sm }}
            />
          ) : (
            <Text style={{ color: spotlightInk(r), fontSize: tokens.typography.scale.xl }}>♪</Text>
          )}
        </GradientSurface>

        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={1}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '800' }}
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
