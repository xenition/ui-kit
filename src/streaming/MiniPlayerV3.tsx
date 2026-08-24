import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives';
import { clamp01 } from './types';
import type { MiniPlayerProps } from './MiniPlayer';

/** Same public contract as {@link MiniPlayer} — a drop-in alternate design. */
export type MiniPlayerV3Props = MiniPlayerProps;

/**
 * MiniPlayer, redesigned (v3): a **slim docked strip**. A very thin edge-to-edge
 * bar with a hairline progress line, a small artwork chip, a single title·artist
 * line, and a bare play glyph — minimal chrome for a persistent footer. The
 * opposite of v2's floating card. Same props, token-only.
 */
export const MiniPlayerV3 = React.forwardRef<HTMLDivElement, MiniPlayerV3Props>(function MiniPlayerV3(
  { track, state = 'paused', progress = 0, variant, onPlayToggle, onNext, onClick, className, ...rest },
  ref
) {
  void variant;
  void onNext;
  const playing = state === 'playing';
  const buffering = state === 'buffering';
  const pct = clamp01(progress) * 100;
  const interactive = typeof onClick === 'function';

  return (
    <div ref={ref} data-xen-mini-player="" className={cn('relative border-t border-border bg-surface', className)} {...rest}>
      <div className="absolute inset-x-0 top-0 h-px bg-neutral-100">
        <div className="h-full bg-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5">
        <button
          type="button"
          aria-label={interactive ? `Expand ${track.title}` : track.title}
          onClick={interactive ? () => onClick?.(track) : undefined}
          disabled={!interactive}
          className="flex min-w-0 flex-1 items-center gap-2 text-left"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded bg-neutral-100 text-sm">
            {track.artworkUrl ? <img src={track.artworkUrl} alt="" className="h-full w-full object-cover" /> : '🎵'}
          </span>
          <span className="min-w-0 truncate text-xs text-on-surface">
            <span className="font-semibold">{track.title}</span>
            {track.artist ? <span className="text-muted"> · {track.artist}</span> : null}
          </span>
        </button>
        <button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={() => onPlayToggle?.(!playing)} className="shrink-0 text-base text-on-surface">
          {buffering ? <Spinner size="sm" /> : playing ? '❚❚' : '▶'}
        </button>
      </div>
    </div>
  );
});
