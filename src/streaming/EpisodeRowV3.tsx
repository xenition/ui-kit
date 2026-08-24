import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01 } from './types';
import type { EpisodeRowProps } from './EpisodeRow';

/** Same public contract as {@link EpisodeRow} — a drop-in alternate design. */
export type EpisodeRowV3Props = EpisodeRowProps;

/**
 * EpisodeRow, redesigned (v3): a **dense playlist line**. A compact play glyph,
 * the title over a show·date·duration line, a thin resume underline, and an
 * optional download — hairline-bordered for a long feed. The opposite of v2's
 * card. Same props, token-only.
 */
export const EpisodeRowV3 = React.forwardRef<HTMLDivElement, EpisodeRowV3Props>(function EpisodeRowV3(
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
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      {onPlayToggle ? (
        <button
          type="button"
          aria-label={playing ? 'Pause' : 'Play'}
          onClick={(e) => { e.stopPropagation(); onPlayToggle(!playing); }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm text-primary"
        >
          {playing ? '❚❚' : '▶'}
        </button>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-on-surface">{episode.title}</p>
        {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
        {progress !== null ? (
          <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
            <div className="h-full rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
          </div>
        ) : null}
      </div>
      {onDownload ? (
        <button type="button" aria-label="Download" onClick={(e) => { e.stopPropagation(); onDownload(); }} className="text-base text-muted hover:text-primary">⤓</button>
      ) : null}
    </div>
  );
});
