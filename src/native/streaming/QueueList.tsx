import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { EmptyState, Icon, useXenitionTheme } from '../primitives';
import { PlaylistRow, type PlaylistRowVariant } from './PlaylistRow';
import type { MediaTrack, PlaybackState } from './types';

export interface QueueListProps {
  /** Ordered upcoming tracks. An empty array renders the empty state. */
  tracks: MediaTrack[];
  /** Id of the currently-playing track (highlighted as active). */
  nowPlayingId?: string;
  /** Transport state of the now-playing track. */
  state?: PlaybackState;
  /** Optional header label above the list (default `'Up Next'`). */
  title?: string;
  /** Row variant passed through to each {@link PlaylistRow}. */
  rowVariant?: PlaylistRowVariant;
  /** Called when a queue row is tapped — jump to that track. */
  onSelect?: (track: MediaTrack, index: number) => void;
  /** Per-row overflow / remove intent. */
  onRemove?: (track: MediaTrack, index: number) => void;
  /** Copy for the empty state title. */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

/**
 * The playback **queue** — an ordered list of upcoming tracks built from
 * {@link PlaylistRow}s. The row matching `nowPlayingId` is marked active;
 * `onSelect(track, index)` jumps to a track and `onRemove` handles the row
 * overflow. When `tracks` is empty it renders an `EmptyState` instead of a bare
 * list. Indexing is guarded — the active match is by id, never by position.
 * Token-only — no literal hex.
 */
export function QueueList({
  tracks,
  nowPlayingId,
  state = 'paused',
  title = 'Up Next',
  rowVariant = 'standard',
  onSelect,
  onRemove,
  emptyLabel = 'Your queue is empty',
  style,
}: QueueListProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (tracks.length === 0) {
    return (
      <View style={[{ gap: tokens.spacing.sm }, style]}>
        <EmptyState
          icon={<Icon glyph="🎵" size="2xl" color="muted" accessibilityLabel="Queue" />}
          title={emptyLabel}
          description="Add songs to build up your queue."
        />
      </View>
    );
  }

  return (
    <View style={[{ gap: tokens.spacing.xs }, style]}>
      {title ? (
        <Text
          style={{
            color: colors.muted,
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            paddingHorizontal: tokens.spacing.sm,
            marginBottom: tokens.spacing.xs,
          }}
        >
          {title}
        </Text>
      ) : null}
      {tracks.map((track, index) => (
        <PlaylistRow
          key={track.id}
          track={track}
          index={index}
          variant={rowVariant}
          active={nowPlayingId != null && track.id === nowPlayingId}
          state={state}
          onPress={onSelect ? (t, i) => onSelect(t, i ?? index) : undefined}
          onMore={onRemove ? () => onRemove(track, index) : undefined}
        />
      ))}
    </View>
  );
}
