import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatBpm, formatDuration, type SetlistSong } from './types';

export type SetlistRowVariant = 'full' | 'compact';

export interface SetlistRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'onPlay'> {
  /** The song for this row; omit to render an empty / unfilled slot. */
  song?: SetlistSong;
  /** 1-based position shown at the left. */
  index?: number;
  /** Whether this song is currently playing (lit + non-color affordance). */
  playing?: boolean;
  /**
   * - `full` — title, artist, and a key/BPM/duration meta row (default).
   * - `compact` — single line.
   */
  variant?: SetlistRowVariant;
  /** Label for an empty slot (no song). */
  emptyLabel?: string;
  /** Fires with the song when the row is tapped. */
  onClick?: (song: SetlistSong) => void;
  /** When set, shows a play button that fires with the song. */
  onPlay?: (song: SetlistSong) => void;
}

/**
 * A setlist row — one song in a performance / practice list, a UI shell only,
 * and the DOM parity of `native/music`'s `SetlistRow`. With a `song` it shows
 * position, title, artist and a key/BPM/duration meta line; with no `song` it
 * renders a dimmed empty slot (so a fixed-length setlist can show gaps).
 * `playing` lights the row via a marker + weight, not color alone. Tapping the
 * body fires `onClick`; an optional play button (a sibling, never a nested
 * button) fires `onPlay`. Meta is guarded against missing fields. Token-only.
 */
export const SetlistRow = React.forwardRef<HTMLDivElement, SetlistRowProps>(function SetlistRow(
  { song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest },
  ref
) {
  const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';

  if (song == null) {
    return (
      <div
        ref={ref}
        role="text"
        aria-label={`Position ${pos}, ${emptyLabel}`}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-dashed border-border p-[var(--xen-space-sm)] opacity-55',
          className
        )}
        {...rest}
      >
        <span className="w-5 text-sm font-bold text-muted">{pos}</span>
        <span className="text-sm italic text-muted">{emptyLabel}</span>
      </div>
    );
  }

  const meta: string[] = [];
  if (song.key) meta.push(song.key);
  if (song.bpm != null) meta.push(`${formatBpm(song.bpm)} BPM`);
  if (song.durationSec != null) meta.push(formatDuration(song.durationSec));

  const body = (
    <>
      <span className="flex w-5 items-center justify-center">
        {playing ? (
          <Icon glyph="♪" size="sm" color="primary" aria-label="Now playing" />
        ) : (
          <span className="text-sm font-bold text-muted">{pos}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className={cn('truncate text-base text-on-surface', playing ? 'font-bold' : 'font-semibold')}>
          {song.title}
        </span>
        {variant === 'full' && (song.artist || meta.length > 0) ? (
          <span className="truncate text-xs text-muted">
            {[song.artist, ...meta].filter(Boolean).join('  ·  ')}
          </span>
        ) : null}
      </span>
    </>
  );

  const rowClass = cn(
    'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border p-[var(--xen-space-sm)] transition-colors',
    playing ? 'border-primary bg-primary/10' : 'border-border bg-surface'
  );

  return (
    <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-xs)]', className)} {...rest}>
      {onClick ? (
        <button
          type="button"
          aria-pressed={playing}
          aria-label={`Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`}
          onClick={() => onClick(song)}
          className={cn(rowClass, 'flex-1 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1')}
        >
          {body}
        </button>
      ) : (
        <div
          role="listitem"
          aria-label={`Position ${pos}, ${song.title}${playing ? ', playing' : ''}`}
          className={cn(rowClass, 'flex-1')}
        >
          {body}
        </div>
      )}
      {onPlay ? (
        <button
          type="button"
          aria-pressed={playing}
          aria-label={playing ? `Pause ${song.title}` : `Play ${song.title}`}
          onClick={() => onPlay(song)}
          className={cn(
            'flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-primary/20 transition-colors',
            'hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1'
          )}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color="primary" />
        </button>
      ) : null}
    </div>
  );
});
