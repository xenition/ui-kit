import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { EpisodeRowProps } from './EpisodeRow';

/** Drop-in for {@link EpisodeRowProps} — same props, the V4 "spotlight" design. */
export type EpisodeRowV4Props = EpisodeRowProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * EpisodeRow — **V4** "spotlight" design. The artwork-forward episode row/card:
 * a rounded artwork thumb, title + show · date · duration meta, a resume bar
 * (soft-`primary` track + `primary` fill), and a big round **primary** play
 * affordance (the one accent, filled with an `onPrimary` glyph). The surface
 * stays clean — the gradient is reserved for the artwork-hero moments. Same
 * props/behavior as {@link EpisodeRowProps}; token-only colors via
 * `useXenitionTheme()`. Two variants (`standard` / `compact`).
 */
export function EpisodeRowV4({
  episode,
  playing = false,
  state = 'paused',
  variant = 'standard',
  onPlayToggle,
  onPress,
  onDownload,
  style,
}: EpisodeRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const art = 56;
  const buffering = playing && state === 'buffering';
  const isPlaying = playing && state === 'playing';

  const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
  const progress = episode.progress != null ? clamp01(episode.progress) : undefined;

  const inner = (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {!compact ? (
          episode.artworkUrl ? (
            <Image
              source={{ uri: episode.artworkUrl }}
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
              <Icon glyph="🎧" size="lg" color="onAccent" />
            </View>
          )
        ) : null}

        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={compact ? 1 : 2}
            style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
          >
            {episode.title}
          </Text>
          {meta ? (
            <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {meta}
            </Text>
          ) : null}
        </View>

        {onDownload ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Download ${episode.title}`}
            onPress={onDownload}
            hitSlop={8}
            style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
          >
            <Icon glyph="⤓" size="lg" color="muted" />
          </Pressable>
        ) : null}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
          accessibilityState={{ selected: isPlaying, busy: buffering }}
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
          <Icon glyph={buffering ? '◌' : isPlaying ? '❙❙' : '▶'} size="sm" color="onPrimary" />
        </Pressable>
      </View>

      {progress != null && progress > 0 ? (
        <View
          accessibilityRole="progressbar"
          accessibilityValue={{ min: 0, max: 100, now: Math.round(progress * 100) }}
          style={{
            height: 4,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(colors.primary, 0.18),
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              height: 4,
              width: `${progress * 100}%`,
              borderRadius: tokens.radius.full,
              backgroundColor: colors.primary,
            }}
          />
        </View>
      ) : null}
    </View>
  );

  if (!onPress) return inner;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={episode.title}
      onPress={() => onPress(episode)}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
