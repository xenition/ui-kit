import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { formatBpm, formatDuration } from './types';
import type { SetlistRowProps } from './SetlistRow';

/** Drop-in for {@link SetlistRowProps} — same props, the V4 "session" design. */
export type SetlistRowV4Props = SetlistRowProps;

/**
 * SetlistRow — **V4** "session" design (web parity of the native V4). The
 * tactile DAW take on a setlist row: a rounded control surface where the playing
 * row lights with a soft-primary fill, a primary ring, and a leading `♪` marker
 * (never color alone), the title reads bold, and the key/BPM/duration meta sits
 * in a tabular-nums line. Honors both `variant`s (`full` / `compact`) and the
 * empty-slot state, identical props/behavior to {@link SetlistRowProps}. The
 * optional play button is a satisfying round control. All colors from `--xen-*`
 * token classes (no literals).
 */
export const SetlistRowV4 = React.forwardRef<HTMLDivElement, SetlistRowV4Props>(function SetlistRowV4(
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
          <span className="text-sm font-bold tabular-nums text-muted">{pos}</span>
        )}
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className={cn('truncate text-base text-on-surface', playing ? 'font-bold' : 'font-semibold')}>
          {song.title}
        </span>
        {variant === 'full' && (song.artist || meta.length > 0) ? (
          <span className="truncate text-xs tabular-nums text-muted">
            {[song.artist, ...meta].filter(Boolean).join('  ·  ')}
          </span>
        ) : null}
      </span>
    </>
  );

  const rowClass = cn(
    'relative flex items-center gap-[var(--xen-space-sm)] overflow-hidden rounded-[var(--xen-radius-md)] border p-[var(--xen-space-sm)] transition-colors',
    playing ? 'border-primary bg-primary/10 shadow-sm' : 'border-border bg-surface'
  );

  // A tactile left accent bar marks the playing row.
  const accentBar = playing ? <span aria-hidden="true" className="absolute inset-y-1 left-0 w-1 rounded-full bg-primary" /> : null;

  return (
    <div ref={ref} className={cn('flex items-center gap-[var(--xen-space-xs)]', className)} {...rest}>
      {onClick ? (
        <button
          type="button"
          aria-pressed={playing}
          aria-label={`Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`}
          onClick={() => onClick(song)}
          className={cn(rowClass, 'flex-1 pl-[var(--xen-space-md)] transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1')}
        >
          {accentBar}
          {body}
        </button>
      ) : (
        <div role="listitem" aria-label={`Position ${pos}, ${song.title}${playing ? ', playing' : ''}`} className={cn(rowClass, 'flex-1 pl-[var(--xen-space-md)]')}>
          {accentBar}
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
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
            playing ? 'bg-primary text-on-primary' : 'bg-primary/15 hover:bg-primary/25'
          )}
        >
          <Icon glyph={playing ? '⏸' : '▶'} size="sm" color={playing ? 'onPrimary' : 'primary'} />
        </button>
      ) : null}
    </div>
  );
});
