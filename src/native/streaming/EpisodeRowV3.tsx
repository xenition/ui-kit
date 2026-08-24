import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import type { EpisodeRowProps } from './EpisodeRow';

/** Drop-in for {@link EpisodeRowProps} — a genuinely different design, same props. */
export type EpisodeRowV3Props = EpisodeRowProps;

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * **EpisodeRow — design V3 (dense playlist line).** A single flat, borderless
 * line: a small leading play/pause glyph that turns into an equalizer marker
 * while the row is playing, the title and inline meta in the middle, and the
 * duration trailing right — with a hairline resume underline for `progress`.
 * Built for long, scannable playlist-style lists. Same `EpisodeRowProps`;
 * token-pure; a11y-complete.
 */
export function EpisodeRowV3({
  episode,
  playing = false,
  state = 'paused',
  variant = 'standard',
  onPlayToggle,
  onPress,
  onDownload,
  style,
}: EpisodeRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const buffering = playing && state === 'buffering';
  const isPlaying = playing && state === 'playing';

  const meta = [episode.show, episode.date].filter(Boolean).join('  ·  ');
  const progress = episode.progress != null ? clamp01(episode.progress) : undefined;

  // Leading marker: buffering → dotted, playing → equalizer, else → play/paused glyph.
  const markerGlyph = buffering ? '◌' : isPlaying ? '≣' : '▶';

  const marker = (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
      accessibilityState={{ selected: isPlaying, busy: buffering }}
      disabled={!onPlayToggle}
      onPress={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
      hitSlop={10}
      style={({ pressed }) => ({
        width: 28,
        height: 28,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
      })}
    >
      <Icon glyph={markerGlyph} size="sm" color={isPlaying ? 'primary' : 'muted'} />
    </Pressable>
  );

  const inner = (
    <View
      style={[
        {
          gap: 4,
          backgroundColor: 'transparent',
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: tokens.spacing.sm,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        {marker}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={1}
            style={{
              color: isPlaying ? colors.primaryText : colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: isPlaying ? '700' : '600',
            }}
          >
            {episode.title}
          </Text>
          {!compact && meta ? (
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
            <Icon glyph="⤓" size="base" color="muted" />
          </Pressable>
        ) : null}

        {episode.duration ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {episode.duration}
          </Text>
        ) : null}
      </View>

      {/* Hairline resume underline. */}
      {progress != null && progress > 0 ? (
        <View
          style={{
            height: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: colors.border,
            marginLeft: 28 + tokens.spacing.sm,
          }}
        >
          <View
            style={{
              height: 2,
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
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
    >
      {inner}
    </Pressable>
  );
}
