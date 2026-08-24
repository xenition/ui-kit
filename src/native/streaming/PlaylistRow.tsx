import * as React from 'react';
import { Image, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { Icon, useXenitionTheme } from '../primitives';
import { formatTime, type MediaTrack, type PlaybackState } from './types';

export type PlaylistRowVariant = 'standard' | 'numbered' | 'compact';

export interface PlaylistRowProps {
  /** The track this row represents. */
  track: MediaTrack;
  /** 0-based position; shown as `index + 1` in the `numbered` variant. */
  index?: number;
  /** Whether this is the active/selected track (tinted + shown as "current"). */
  active?: boolean;
  /** Transport state of the active track (only meaningful when `active`). */
  state?: PlaybackState;
  /**
   * - `standard` — artwork + title/artist + duration (default).
   * - `numbered` — leading track number instead of artwork.
   * - `compact`  — tighter single-line row.
   */
  variant?: PlaylistRowVariant;
  /** Called when the row is tapped — select/play this track. */
  onPress?: (track: MediaTrack, index?: number) => void;
  /** Optional play/pause control; when set, shows a trailing toggle. */
  onPlayToggle?: (next: boolean) => void;
  /** Trailing overflow / menu intent. */
  onMore?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single track row for playlists / albums / queues — artwork (or a track
 * number), title + artist, a duration label, and an active-state indicator.
 * `onPress(track, index)` selects the row; an optional `onPlayToggle` renders a
 * trailing play/pause whose accessible label reflects `state`. When `active`,
 * the title is tinted `primary`. Token-only — no literal hex.
 */
export function PlaylistRow({
  track,
  index,
  active = false,
  state = 'paused',
  variant = 'standard',
  onPress,
  onPlayToggle,
  onMore,
  style,
}: PlaylistRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const numbered = variant === 'numbered';
  const compact = variant === 'compact';
  const isPlaying = active && state === 'playing';
  const size = compact ? 40 : 48;
  const titleColor = active ? colors.primary : colors.onSurface;

  const lead = numbered ? (
    <View style={{ width: 28, alignItems: 'center', justifyContent: 'center' }}>
      {active ? (
        <Icon glyph={isPlaying ? '▶' : '❙❙'} size="sm" color="primary" />
      ) : (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {index != null ? index + 1 : '—'}
        </Text>
      )}
    </View>
  ) : track.artworkUrl ? (
    <Image
      source={{ uri: track.artworkUrl }}
      accessibilityIgnoresInvertColors
      resizeMode="cover"
      style={{ width: size, height: size, borderRadius: tokens.radius.sm, backgroundColor: colors.border }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: tokens.radius.sm,
        backgroundColor: colors.accent,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon glyph="♪" size="base" color="onAccent" />
    </View>
  );

  const body = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: active ? colors.border : 'transparent',
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
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
        </Pressable>
      ) : null}

      {onMore ? (
        <Pressable accessibilityRole="button" accessibilityLabel="More options" onPress={onMore} hitSlop={8}>
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
