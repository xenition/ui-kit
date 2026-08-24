import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { PodcastRowProps } from './PodcastRow';

/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV3Props = PodcastRowProps;

/**
 * PodcastRow — **minimal playlist line** alternate design (web / React DOM).
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the base
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `bg-border`, the active play glyph is `text-primary`
 * (muted when idle). No literal colors.
 */
export const PodcastRowV3 = React.forwardRef<HTMLDivElement, PodcastRowV3Props>(
  function PodcastRowV3(
    { episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest },
    ref
  ) {
    const compact = variant === 'compact';
    const artClass = compact ? 'h-9 w-9' : 'h-11 w-11';
    const interactive = !!onClick;

    return (
      <div
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? episode.title : undefined}
        onClick={interactive ? () => onClick?.(episode) : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.(episode);
                }
              }
            : undefined
        }
        className={cn(
          'py-[var(--xen-space-xs)]',
          interactive &&
            'cursor-pointer transition-opacity hover:opacity-80 motion-reduce:transition-none',
          className
        )}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          {episode.artworkUrl ? (
            <img
              src={episode.artworkUrl}
              alt=""
              loading="lazy"
              className={cn('shrink-0 rounded-[var(--xen-radius-sm)] bg-neutral-100 object-cover', artClass)}
            />
          ) : (
            <div
              className={cn(
                'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent',
                artClass
              )}
            >
              <span aria-hidden className="text-sm leading-none text-on-accent">🎧</span>
            </div>
          )}

          <div className="min-w-0 flex-1">
            <p className="truncate text-base font-bold text-on-surface">{episode.title}</p>
            {episode.show ? <p className="truncate text-xs text-muted">{episode.show}</p> : null}
          </div>

          {episode.duration ? (
            <span className="shrink-0 text-xs font-semibold text-muted">{episode.duration}</span>
          ) : null}

          <button
            type="button"
            aria-label={playing ? `Pause ${episode.title}` : `Play ${episode.title}`}
            aria-pressed={playing}
            disabled={!onPlayToggle}
            onClick={
              onPlayToggle
                ? (e) => {
                    e.stopPropagation();
                    onPlayToggle(!playing);
                  }
                : undefined
            }
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-opacity hover:opacity-70 disabled:opacity-50 motion-reduce:transition-none"
          >
            <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color={playing ? 'primary' : 'muted'} />
          </button>
        </div>

        {/* Trailing hairline — the only separator in this dense list style. */}
        <div aria-hidden className="mt-[var(--xen-space-xs)] h-px w-full bg-border" />
      </div>
    );
  }
);
