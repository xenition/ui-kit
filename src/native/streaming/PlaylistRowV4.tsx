import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { formatTime } from './types';
import type { PlaylistRowProps } from './PlaylistRow';

/** Drop-in for {@link PlaylistRowProps} — same props, the V4 "spotlight" design. */
export type PlaylistRowV4Props = PlaylistRowProps;

/**
 * PlaylistRow — **V4** "spotlight" design. A calm, clean-surface playlist entry:
 * a rounded cover thumb, title + artist, a trailing duration, and — when
 * `onPlayToggle` is set — a big round **primary** play/pause affordance (the one
 * accent, ≥44px). `onPress(track, index)` selects the row with a soft-`primary`
 * press tint; when `active` the title tints `primary` and the artwork shows a
 * leading now-playing glyph, announced via `accessibilityState.selected`. The
 * `numbered` variant swaps the artwork for a track number. Same props/behavior as
 * {@link PlaylistRowProps}; token-only colors via `useXenitionTheme()`.
 */
export function PlaylistRowV4({
  track,
  index,
  active = false,
  state = 'paused',
  variant = 'standard',
  onPress,
  onPlayToggle,
  onMore,
  style,
}: PlaylistRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const numbered = variant === 'numbered';
  const compact = variant === 'compact';
  const isPlaying = active && state === 'playing';
  const size = compact ? 44 : 48;
  const titleColor = active ? colors.primary : colors.onSurface;

  const lead = numbered ? (
    <View style={{ width: 44, alignItems: 'center', justifyContent: 'center' }}>
      {active ? (
        <Icon glyph={isPlaying ? '❙❙' : '▶'} size="sm" color="primary" />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {index != null ? index + 1 : '—'}
        </Text>
      )}
    </View>
  ) : (
    <View style={{ width: size, height: size }}>
      {track.artworkUrl ? (
        <Image
          source={{ uri: track.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: size, height: size, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="♪" size="base" color="onAccent" />
        </View>
      )}
      {active ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(colors.primary, 0.14),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
        </View>
      ) : null}
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          minHeight: 44,
          paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: active ? withAlpha(colors.primary, 0.1) : 'transparent',
        },
        style,
      ]}
    >
      {lead}

      <View style={{ flex: 1, gap: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: titleColor, fontSize: tokens.typography.scale.base, fontWeight: active ? '700' : '600' }}
        >
          {track.title}
        </Text>
        {track.artist && !compact ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {track.artist}
          </Text>
        ) : null}
      </View>

      {track.duration != null ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
          {formatTime(track.duration)}
        </Text>
      ) : null}

      {onPlayToggle ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          accessibilityState={{ selected: isPlaying }}
          onPress={() => onPlayToggle(!isPlaying)}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.85 : 1,
          })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
        </Pressable>
      ) : null}

      {onMore ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="More options"
          onPress={onMore}
          hitSlop={8}
          style={({ pressed }) => ({
            width: 44,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}
        >
          <Icon glyph="⋯" size="lg" color="muted" />
        </Pressable>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={track.title}
      accessibilityState={{ selected: active }}
      onPress={() => onPress(track, index)}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {body}
    </Pressable>
  );
}
