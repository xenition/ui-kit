import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { clamp01 } from './types';
import type { EpisodeRowProps } from './EpisodeRow';

/** Drop-in for {@link EpisodeRowProps} — same props, the V4 "spotlight" design. */
export type EpisodeRowV4Props = EpisodeRowProps;

/**
 * EpisodeRow — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward episode row/card: a rounded artwork thumb, title + show · date
 * · duration meta, a resume bar (soft-`primary` track + `primary` fill), and a
 * big round **primary** play affordance (the one accent, filled with an
 * `onPrimary` glyph). The surface stays clean — the gradient is reserved for the
 * artwork-hero moments. Same props/behavior as {@link EpisodeRowProps}; all
 * colors from `--xen-*` token classes (no literal hex). Two variants
 * (`standard` / `compact`).
 */
export const EpisodeRowV4 = React.forwardRef<HTMLDivElement, EpisodeRowV4Props>(function EpisodeRowV4(
  { episode, playing = false, state = 'paused', variant = 'standard', onPlayToggle, onClick, onDownload, className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const art = 56;
  const buffering = playing && state === 'buffering';
  const isPlaying = playing && state === 'playing';
  const interactive = !!onClick;

  const meta = [episode.show, episode.date, episode.duration].filter(Boolean).join('  ·  ');
  const progress = episode.progress != null ? clamp01(episode.progress) : undefined;

  return (
    <div
      ref={ref}
      data-xen-episode-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? episode.title : undefined}
      onClick={interactive ? () => onClick!(episode) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(episode);
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] shadow-lg',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {!compact ? (
          episode.artworkUrl ? (
            <img
              src={episode.artworkUrl}
              alt=""
              aria-hidden="true"
              className="shrink-0 rounded-[var(--xen-radius-md)] bg-border object-cover"
              style={{ width: art, height: art }}
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent"
              style={{ width: art, height: art }}
            >
              <Icon glyph="🎧" size="lg" color="onPrimary" />
            </span>
          )
        ) : null}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className={cn('text-base font-bold text-on-surface', compact ? 'truncate' : '')}>
            {episode.title}
          </span>
          {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
        </div>

        {onDownload ? (
          <button
            type="button"
            aria-label={`Download ${episode.title}`}
            onClick={(e) => {
              e.stopPropagation();
              onDownload();
            }}
            className="inline-flex text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⤓" size="lg" color="muted" />
          </button>
        ) : null}

        <button
          type="button"
          aria-label={isPlaying ? `Pause ${episode.title}` : `Play ${episode.title}`}
          aria-pressed={isPlaying}
          aria-busy={buffering || undefined}
          disabled={!onPlayToggle}
          onClick={(e) => {
            e.stopPropagation();
            onPlayToggle?.(!isPlaying);
          }}
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph={buffering ? '◌' : isPlaying ? '❙❙' : '▶'} size="sm" color="onPrimary" />
        </button>
      </div>

      {progress != null && progress > 0 ? (
        <div
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-1 w-full overflow-hidden rounded-full bg-primary-100"
        >
          <div className="h-1 rounded-full bg-primary" style={{ width: `${progress * 100}%` }} />
        </div>
      ) : null}
    </div>
  );
});
