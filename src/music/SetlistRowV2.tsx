import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatBpm, formatDuration, type SetlistSong } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV2Props = SetlistRowProps;

/**
 * SetlistRow, redesigned (v2): an **elevated track card**. A numbered medallion
 * leads (primary-filled when playing), the title/artist head the body over a
 * key·BPM·duration meta line, and a circular play button hangs on the right.
 * Distinct from v1's flat row. Same props, token-only.
 */
export const SetlistRowV2 = React.forwardRef<HTMLDivElement, SetlistRowV2Props>(function SetlistRowV2(
  { song, index, playing = false, variant, emptyLabel = 'Empty slot', onClick, onPlay, className, ...rest },
  ref
) {
  void variant;

  if (!song) {
    return (
      <div
        ref={ref}
        data-xen-setlist-row=""
        aria-label={emptyLabel}
        className={cn('flex items-center gap-3 rounded-lg border border-dashed border-border p-3 opacity-60', className)}
        {...rest}
      >
        {typeof index === 'number' ? <span className="text-sm font-bold text-muted">{index}</span> : null}
        <span className="text-sm text-muted">{emptyLabel}</span>
      </div>
    );
  }

  const meta = [song.key, formatBpm(song.bpm), formatDuration(song.durationSec)].filter((s) => s && s !== '—');
  const interactive = typeof onClick === 'function';
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(song);
    }
  };

  return (
    <div
      ref={ref}
      data-xen-setlist-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={`${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', now playing' : ''}`}
      onClick={interactive ? () => onClick?.(song) : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      className={cn(
        'flex items-center gap-3 rounded-lg bg-surface p-3 shadow-sm transition-transform',
        playing && 'ring-2 ring-primary',
        interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...rest}
    >
      {typeof index === 'number' ? (
        <span
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold',
            playing ? 'bg-primary text-on-primary' : 'bg-neutral-100 text-on-surface'
          )}
        >
          {playing ? '♪' : index}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{song.title}</p>
        {song.artist ? <p className="truncate text-xs text-muted">{song.artist}</p> : null}
        {meta.length > 0 ? <p className="truncate text-xs text-muted">{meta.join(' · ')}</p> : null}
      </div>
      {onPlay ? (
        <button
          type="button"
          aria-label={`Play ${song.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
        >
          ▶
        </button>
      ) : null}
    </div>
  );
});
