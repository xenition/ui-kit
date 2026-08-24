import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import type { PodcastEpisode } from './types';

export type PodcastRowVariant = 'standard' | 'compact';

export interface PodcastRowProps {
  /** The episode to render. */
  episode: PodcastEpisode;
  /** Whether this episode is currently playing (controlled). */
  playing?: boolean;
  /** Called with the next playing state when the play/pause control is tapped. */
  onPlayToggle?: (next: boolean) => void;
  /** Called when the row itself (not the play button) is tapped — open details. */
  onPress?: (episode: PodcastEpisode) => void;
  /**
   * - `standard` — artwork + title + show + duration (default).
   * - `compact`  — smaller artwork, single title line.
   */
  variant?: PodcastRowVariant;
  style?: StyleProp<ViewStyle>;
}

/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. The play button is controlled via `playing` +
 * `onPlayToggle(next)`; tapping the rest of the row fires `onPress(episode)`.
 * Two variants (`standard` / `compact`). All colors come from `SemanticColors`;
 * no literal hex.
 */
export function PodcastRow({
  episode,
  playing = false,
  onPlayToggle,
  onPress,
  variant = 'standard',
  style,
}: PodcastRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const compact = variant === 'compact';
  const art = compact ? 44 : 64;

  const meta = [episode.show, episode.duration].filter(Boolean).join('  ·  ');

  const inner = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {episode.artworkUrl ? (
        <Image
          source={{ uri: episode.artworkUrl }}
          accessibilityIgnoresInvertColors
          style={{ width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border }}
          resizeMode="cover"
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
      )}

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={compact ? 1 : 2}
          style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}
        >
          {episode.title}
        </Text>
        {!compact && meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            {meta}
          </Text>
        ) : null}
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={playing ? `Pause ${episode.title}` : `Play ${episode.title}`}
        accessibilityState={{ selected: playing }}
        disabled={!onPlayToggle}
        onPress={onPlayToggle ? () => onPlayToggle(!playing) : undefined}
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
        <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
      </Pressable>
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
