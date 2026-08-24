import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives';
import { clamp01 } from './types';
import type { MiniPlayerProps } from './MiniPlayer';

/** Same public contract as {@link MiniPlayer} — a drop-in alternate design. */
export type MiniPlayerV2Props = MiniPlayerProps;

/**
 * MiniPlayer, redesigned (v2): a **floating rounded card**. An inset shadowed bar
 * with rounded corners, a thin progress line across the top, artwork + title/
 * artist, and circular play/next controls — hovers above content. Distinct from
 * v1's docked bar. Same props, token-only.
 */
export const MiniPlayerV2 = React.forwardRef<HTMLDivElement, MiniPlayerV2Props>(function MiniPlayerV2(
  { track, state = 'paused', progress = 0, variant, onPlayToggle, onNext, onClick, className, ...rest },
  ref
) {
  void variant;
  const playing = state === 'playing';
  const buffering = state === 'buffering';
  const pct = clamp01(progress) * 100;
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-mini-player="" className={cn('relative overflow-hidden rounded-xl bg-surface shadow-lg', className)} {...rest}>
      <div className="absolute inset-x-0 top-0 h-0.5 bg-neutral-100">
        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-3 p-2.5">
        <button
          type="button"
          aria-label={interactive ? `Expand ${track.title}` : track.title}
          onClick={interactive ? () => onClick?.(track) : undefined}
          disabled={!interactive}
          className="flex min-w-0 flex-1 items-center gap-3 text-left"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-lg">
            {track.artworkUrl ? <img src={track.artworkUrl} alt="" className="h-full w-full object-cover" /> : '🎵'}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold text-on-surface">{track.title}</span>
            {track.artist ? <span className="block truncate text-xs text-muted">{track.artist}</span> : null}
          </span>
        </button>
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={() => onPlayToggle?.(!playing)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary"
        >
          {buffering ? <Spinner size="sm" /> : playing ? '❚❚' : '▶'}
        </button>
        {onNext ? (
          <button type="button" aria-label="Next" onClick={onNext} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-on-surface hover:bg-neutral-100">⏭</button>
        ) : null}
      </div>
    </div>
  );
});
