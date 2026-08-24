import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, Progress, useXenitionTheme } from '../primitives';
import type { PlaybackState, StreamEpisode } from './types';

export type EpisodeRowVariant = 'standard' | 'compact';

export interface EpisodeRowProps {
  /** The episode to render. */
  episode: StreamEpisode;
  /** Whether this episode is currently playing (controlled). */
  playing?: boolean;
  /** Transport state (drives the play control when this row is active). */
  state?: PlaybackState;
  /**
   * - `standard` — artwork + title + show/date/duration + resume bar (default).
   * - `compact`  — no artwork, single title line.
   */
  variant?: EpisodeRowVariant;
  /** Called with the next playing state when the play/pause control is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Called when the row body is tapped — open episode details. */
  onPress?: (episode: StreamEpisode) => void;
  /** Download intent; shows a trailing download control when set. */
  onDownload?: () => void;
  style?: StyleProp<ViewStyle>;
}

const clamp01 = (n: number): number => (n < 0 ? 0 : n > 1 ? 1 : n);

/**
 * A podcast / video episode row — artwork, title, show · date · duration meta,
 * an optional resume {@link Progress} bar (from `episode.progress`), and a
 * play/pause control whose accessible label reflects the `playing` state.
 * `onPress(episode)` opens details. Two variants (`standard` / `compact`).
 * Token-only — no literal hex.
 */
export function EpisodeRow({
  episode,
  playing = false,
  state = 'paused',
  variant = 'standard',
  onPlayToggle,
  onPress,
  onDownload,
  style,
}: EpisodeRowProps): React.ReactElement {
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
          padding: tokens.spacing.sm,
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
            width: 40,
            height: 40,
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
        <Progress value={progress * 100} max={100} size="sm" />
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
