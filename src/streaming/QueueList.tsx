import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { EmptyState } from '../commerce';
import { PlaylistRow, type PlaylistRowVariant } from './PlaylistRow';
import type { MediaTrack, PlaybackState } from './types';

export interface QueueListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'title'> {
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
  /** Called when a queue row is clicked — jump to that track. */
  onSelect?: (track: MediaTrack, index: number) => void;
  /** Per-row overflow / remove intent. */
  onRemove?: (track: MediaTrack, index: number) => void;
  /** Copy for the empty state title. */
  emptyLabel?: string;
}

/**
 * The playback **queue** (web) — an ordered list of upcoming tracks built from
 * {@link PlaylistRow}s. The row matching `nowPlayingId` is marked active;
 * `onSelect(track, index)` jumps to a track and `onRemove` handles the row
 * overflow. When `tracks` is empty it renders an `EmptyState` (from `commerce`)
 * instead of a bare list. Indexing is guarded — the active match is by id, never
 * by position. Token-only — no literal hex.
 */
export const QueueList = React.forwardRef<HTMLDivElement, QueueListProps>(function QueueList(
  {
    tracks,
    nowPlayingId,
    state = 'paused',
    title = 'Up Next',
    rowVariant = 'standard',
    onSelect,
    onRemove,
    emptyLabel = 'Your queue is empty',
    className,
    ...rest
  },
  ref
) {
  if (tracks.length === 0) {
    return (
      <div ref={ref} data-xen-queue-list="" className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
        <EmptyState
          icon={<Icon glyph="🎵" size="2xl" color="muted" aria-label="Queue" />}
          title={emptyLabel}
          description="Add songs to build up your queue."
        />
      </div>
    );
  }

  return (
    <div ref={ref} data-xen-queue-list="" className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)} {...rest}>
      {title ? (
        <p className="mb-[var(--xen-space-xs)] px-[var(--xen-space-sm)] text-xs font-bold uppercase tracking-wide text-muted">
          {title}
        </p>
      ) : null}
      {tracks.map((track, index) => (
        <PlaylistRow
          key={track.id}
          track={track}
          index={index}
          variant={rowVariant}
          active={nowPlayingId != null && track.id === nowPlayingId}
          state={state}
          onClick={onSelect ? (t, i) => onSelect(t, i ?? index) : undefined}
          onMore={onRemove ? () => onRemove(track, index) : undefined}
        />
      ))}
    </div>
  );
});
