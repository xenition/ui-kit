import * as React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Icon, Progress, Spinner, useXenitionTheme } from '../primitives';
import { shadow } from '../primitives/internal/elevation';
import type { EpisodeRowProps } from './EpisodeRow';

/** Drop-in for {@link EpisodeRowProps} — a genuinely different design, same props. */
export type EpisodeRowV2Props = EpisodeRowProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * **EpisodeRow — design V2 (resume tile).** A tall, elevated tile: large
 * artwork, an oversized circular play/pause control (a Spinner while
 * buffering), and a prominent resume bar with a "% played" caption underneath.
 * Optimised for a "continue listening" shelf. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
export function EpisodeRowV2({
  episode,
  playing = false,
  state = 'paused',
  variant = 'standard',
  onPlayToggle,
  onPress,
  onDownload,
  style,
}: EpisodeRowV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const art = compact ? 56 : 72;
  const buffering = playing && state === 'buffering';
  const isPlaying = playing && state === 'playing';

  const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
  const progress = episode.progress != null ? clamp01(episode.progress) : undefined;
  const pct = progress != null ? Math.round(progress * 100) : undefined;

  const artwork = !compact ? (
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
        <Icon glyph="🎧" size="xl" color="onAccent" />
      </View>
    )
  ) : null;

  const playControl = buffering ? (
    <View style={{ width: 52, height: 52, alignItems: 'center', justifyContent: 'center' }}>
      <Spinner size="md" />
    </View>
  ) : (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
      accessibilityState={{ selected: isPlaying, busy: buffering }}
      disabled={!onPlayToggle}
      onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
      hitSlop={8}
      style={({ pressed }) => ({
        width: 52,
        height: 52,
        borderRadius: tokens.radius.full,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
        ...shadow('sm', tokens),
      })}
    >
      <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
    </Pressable>
  );

  const inner = (
    <View
      style={[
        {
          gap: tokens.spacing.sm,
          backgroundColor: colors.surface,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.md,
          ...shadow('md', tokens),
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        {artwork}
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            numberOfLines={2}
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
        {playControl}
      </View>

      {progress != null && progress > 0 ? (
        <View style={{ gap: 4 }}>
          <Progress value={progress * 100} max={100} size="md" />
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{pct}% played</Text>
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
