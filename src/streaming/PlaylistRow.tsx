import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatTime, type MediaTrack, type PlaybackState } from './types';

export type PlaylistRowVariant = 'standard' | 'numbered' | 'compact';

export interface PlaylistRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
  /** Row click — select/play this track (maps native `onPress`). */
  onClick?: (track: MediaTrack, index?: number) => void;
  /** Optional play/pause control; when set, shows a trailing toggle. */
  onPlayToggle?: (next: boolean) => void;
  /** Trailing overflow / menu intent. */
  onMore?: () => void;
}

/**
 * A single track row for playlists / albums / queues (web) — artwork (or a
 * track number), title + artist, a duration label, and an active-state
 * indicator. `onClick(track, index)` selects the row (rendered as a
 * `role="button"` with Enter/Space support); an optional `onPlayToggle` renders
 * a trailing play/pause `<button>` (stops propagation) whose accessible label
 * reflects `state`. When `active`, the title is tinted `primary`. Token-only —
 * no literal hex.
 */
export const PlaylistRow = React.forwardRef<HTMLDivElement, PlaylistRowProps>(function PlaylistRow(
  { track, index, active = false, state = 'paused', variant = 'standard', onClick, onPlayToggle, onMore, className, ...rest },
  ref
) {
  const numbered = variant === 'numbered';
  const compact = variant === 'compact';
  const isPlaying = active && state === 'playing';
  const size = compact ? 40 : 48;
  const interactive = !!onClick;

  const lead = numbered ? (
    <span className="flex w-7 items-center justify-center">
      {active ? (
        <Icon glyph={isPlaying ? '▶' : '❙❙'} size="sm" color="primary" />
      ) : (
        <span className="text-sm font-semibold text-muted">{index != null ? index + 1 : '—'}</span>
      )}
    </span>
  ) : track.artworkUrl ? (
    <img
      src={track.artworkUrl}
      alt=""
      aria-hidden="true"
      className="shrink-0 rounded-[var(--xen-radius-sm)] bg-border object-cover"
      style={{ width: size, height: size }}
    />
  ) : (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent"
      style={{ width: size, height: size }}
    >
      <Icon glyph="♪" size="base" color="onPrimary" />
    </span>
  );

  return (
    <div
      ref={ref}
      data-xen-playlist-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? track.title : undefined}
      aria-current={interactive && active ? 'true' : undefined}
      onClick={interactive ? () => onClick!(track, index) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(track, index);
              }
            }
          : undefined
      }
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)]',
        compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]',
        active ? 'bg-border' : 'bg-transparent',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {lead}

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            'truncate text-base',
            active ? 'font-bold text-primary' : 'font-semibold text-on-surface'
          )}
        >
          {track.title}
        </span>
        {track.artist && !compact ? (
          <span className="truncate text-xs text-muted">{track.artist}</span>
        ) : null}
      </div>

      {track.duration != null ? (
        <span className="text-xs text-muted">{formatTime(track.duration)}</span>
      ) : null}

      {onPlayToggle ? (
        <button
          type="button"
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          aria-pressed={isPlaying}
          onClick={(e) => {
            e.stopPropagation();
            onPlayToggle(!isPlaying);
          }}
          className="inline-flex text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
        </button>
      ) : null}

      {onMore ? (
        <button
          type="button"
          aria-label="More options"
          onClick={(e) => {
            e.stopPropagation();
            onMore();
          }}
          className="inline-flex text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="⋯" size="lg" color="muted" />
        </button>
      ) : null}
    </div>
  );
});
