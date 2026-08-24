import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress } from '../primitives';
import { clamp01 } from './types';
import type { EpisodeRowProps } from './EpisodeRow';

/** Same public contract as {@link EpisodeRow} — a drop-in alternate design. */
export type EpisodeRowV2Props = EpisodeRowProps;

/**
 * EpisodeRow, redesigned (v2): an **artwork-forward episode card**. Large artwork
 * with a circular play control overlaid on a scrim, the title/show/date/duration
 * beside it, a resume bar, and an optional download — elevated. Distinct from
 * v1's list row. Same props, token-only.
 */
export const EpisodeRowV2 = React.forwardRef<HTMLDivElement, EpisodeRowV2Props>(function EpisodeRowV2(
  { episode, playing = false, state, variant, onPlayToggle, onClick, onDownload, className, ...rest },
  ref
) {
  void variant;
  void state;
  const interactive = typeof onClick === 'function';
  const meta = [episode.show, episode.date, episode.duration].filter((s): s is string => !!s).join(' · ');
  const progress = typeof episode.progress === 'number' ? clamp01(episode.progress) : null;

  return (
    <div
      ref={ref}
      data-xen-episode-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={episode.title}
      onClick={interactive ? () => onClick?.(episode) : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(episode); } } : undefined}
      className={cn('flex gap-3 rounded-lg bg-surface p-3 shadow-sm', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-neutral-100">
        {episode.artworkUrl ? <img src={episode.artworkUrl} alt="" className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-2xl">🎧</div>}
        {onPlayToggle ? (
          <button
            type="button"
            aria-label={playing ? 'Pause' : 'Play'}
            onClick={(e) => { e.stopPropagation(); onPlayToggle(!playing); }}
            className="absolute inset-0 flex items-center justify-center bg-neutral-900/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/90 text-sm text-on-surface">{playing ? '❚❚' : '▶'}</span>
          </button>
        ) : null}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="line-clamp-2 text-sm font-semibold text-on-surface">{episode.title}</p>
        {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
        {progress !== null ? <Progress value={progress * 100} tone="primary" size="sm" /> : null}
      </div>
      {onDownload ? (
        <button type="button" aria-label="Download" onClick={(e) => { e.stopPropagation(); onDownload(); }} className="self-center text-lg text-muted hover:text-primary">⤓</button>
      ) : null}
    </div>
  );
});
