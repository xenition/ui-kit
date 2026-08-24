import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatDuration, type SetlistSong } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Same public contract as {@link SetlistRow} — a drop-in alternate design. */
export type SetlistRowV3Props = SetlistRowProps;

/**
 * SetlistRow, redesigned (v3): a **dense playlist line**. The index leads as a
 * tabular number, the title·artist share one line, the duration pins right, and a
 * quiet play glyph trails — hairline-bordered for a long set. A ♪ marks the
 * playing row (never color alone). The opposite of v2's card. Same props,
 * token-only.
 */
export const SetlistRowV3 = React.forwardRef<HTMLDivElement, SetlistRowV3Props>(function SetlistRowV3(
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
        className={cn('flex items-center gap-3 border-b border-border py-2 opacity-60', className)}
        {...rest}
      >
        {typeof index === 'number' ? <span className="w-5 text-right text-xs tabular-nums text-muted">{index}</span> : null}
        <span className="text-xs text-muted">{emptyLabel}</span>
      </div>
    );
  }

  const interactive = typeof onClick === 'function';
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.(song);
    }
  };
  const dur = formatDuration(song.durationSec);

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
        'flex items-center gap-3 border-b border-border py-2',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
        className
      )}
      {...rest}
    >
      <span className={cn('w-5 text-right text-xs tabular-nums', playing ? 'text-primary' : 'text-muted')}>
        {playing ? '♪' : index}
      </span>
      <p className={cn('min-w-0 flex-1 truncate text-sm', playing ? 'font-semibold text-primary' : 'text-on-surface')}>
        {song.title}
        {song.artist ? <span className="text-muted"> · {song.artist}</span> : null}
      </p>
      {dur && dur !== '—' ? <span className="text-xs tabular-nums text-muted">{dur}</span> : null}
      {onPlay ? (
        <button
          type="button"
          aria-label={`Play ${song.title}`}
          onClick={(e) => {
            e.stopPropagation();
            onPlay(song);
          }}
          className="text-sm text-muted hover:text-primary"
        >
          ▶
        </button>
      ) : null}
    </div>
  );
});
