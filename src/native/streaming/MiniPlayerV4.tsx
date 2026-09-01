import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, Spinner, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { MiniPlayerProps } from './MiniPlayer';

/** Drop-in for {@link MiniPlayerProps} — same props, the V4 "spotlight" design. */
export type MiniPlayerV4Props = MiniPlayerProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * MiniPlayer — **V4** "spotlight" design. The compact docked bar in the
 * artwork-forward line: a small rounded artwork thumb, title/artist, and a big
 * round **primary** play button (filled, `onPrimary` glyph) — the one accent. A
 * thin `primary` progress line rides the top edge over a soft-`primary` track.
 * The surface stays clean (no big gradient — reserved for the artwork-hero
 * moments). Same props/behavior as {@link MiniPlayerProps}; token-only colors
 * via `useXenitionTheme()`. `variant="floating"` rounds/insets the bar.
 */
export function MiniPlayerV4({
  track,
  state = 'paused',
  progress = 0,
  variant = 'bar',
  onPlayToggle,
  onNext,
  onPress,
  style,
}: MiniPlayerV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const floating = variant === 'floating';
  const frac = clamp01(progress);

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: floating ? tokens.radius.lg : tokens.radius.lg,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          overflow: 'hidden',
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
        style,
      ]}
    >
      {/* Thin top progress line — soft-primary track + primary fill. */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: withAlpha(colors.primary, 0.18),
        }}
      >
        <View
          style={{
            height: 3,
            width: `${frac * 100}%`,
            backgroundColor: colors.primary,
          }}
        />
      </View>

      {track.artworkUrl ? (
        <Image
          source={{ uri: track.artworkUrl }}
          accessibilityIgnoresInvertColors
          resizeMode="cover"
          style={{ width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
        />
      ) : (
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon glyph="♪" size="base" color="onAccent" />
        </View>
      )}

      <View style={{ flex: 1, gap: 1 }}>
        <Text
          numberOfLines={1}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}
        >
          {track.title}
        </Text>
        {track.artist ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {track.artist}
          </Text>
        ) : null}
      </View>

      {isBuffering ? (
        <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner size="sm" />
        </View>
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
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="sm" color="onPrimary" />
        </Pressable>
      )}

      {onNext ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Next" onPress={onNext} hitSlop={8}>
          <Icon glyph="⏭" size="lg" color="onSurface" />
        </Pressable>
      ) : null}
    </View>
  );

  if (!onPress) return body;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Now playing: ${track.title}. Expand`}
      onPress={() => onPress(track)}
      style={({ pressed }) => ({ opacity: pressed ? 0.95 : 1 })}
    >
      {body}
    </Pressable>
  );
}
