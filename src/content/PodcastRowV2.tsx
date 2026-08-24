import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { PodcastRowProps } from './PodcastRow';

/** Drop-in replacement for {@link PodcastRow} — identical props. */
export type PodcastRowV2Props = PodcastRowProps;

/**
 * PodcastRow — **artwork-forward player card** alternate design (web / React DOM).
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the base list row with a tiny trailing
 * button. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via `shadow-md`, the play scrim via `bg-neutral-900/40`,
 * the duration pill via `bg-primary/10` + `text-primary`. No literal colors.
 */
export const PodcastRowV2 = React.forwardRef<HTMLDivElement, PodcastRowV2Props>(
  function PodcastRowV2(
    { episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest },
    ref
  ) {
    const compact = variant === 'compact';
    const artClass = compact ? 'h-16 w-16' : 'h-[84px] w-[84px]';
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
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-md)] shadow-md',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...rest}
      >
        <div
          className={cn(
            'relative shrink-0 overflow-hidden rounded-[var(--xen-radius-md)]',
            artClass
          )}
        >
          {episode.artworkUrl ? (
            <img
              src={episode.artworkUrl}
              alt=""
              loading="lazy"
              className="h-full w-full bg-neutral-100 object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-accent">
              <span aria-hidden className="text-2xl leading-none text-on-accent">🎧</span>
            </div>
          )}
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
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity hover:opacity-90 disabled:opacity-60 motion-reduce:transition-none',
              playing ? 'bg-neutral-900/30' : 'bg-neutral-900/45'
            )}
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-sm">
              <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
            </span>
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
          <p className="line-clamp-2 text-base font-extrabold leading-snug text-on-surface">
            {episode.title}
          </p>
          {episode.show ? <p className="line-clamp-1 text-sm text-muted">{episode.show}</p> : null}
          {episode.duration ? (
            <span className="inline-flex self-start rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-bold text-primary">
              {episode.duration}
            </span>
          ) : null}
        </div>
      </div>
    );
  }
);
