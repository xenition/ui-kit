import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import type { PodcastEpisode } from './types';

export type PodcastRowVariant = 'standard' | 'compact';

export interface PodcastRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The episode to render. */
  episode: PodcastEpisode;
  /** Whether this episode is currently playing (controlled). */
  playing?: boolean;
  /** Called with the next playing state when the play/pause control is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Called when the row itself (not the play button) is clicked — web mirror of native `onPress`. */
  onClick?: (episode: PodcastEpisode) => void;
  /**
   * - `standard` — artwork + title + show + duration (default).
   * - `compact`  — smaller artwork, single title line.
   */
  variant?: PodcastRowVariant;
}

/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. Web (React DOM) mirror of the native `PodcastRow`. The
 * play button is controlled via `playing` + `onPlayToggle(next)`; clicking the
 * rest of the row fires `onClick(episode)`. Two variants (`standard` /
 * `compact`). All colors come from `--xen-*` token classes.
 */
export const PodcastRow = React.forwardRef<HTMLDivElement, PodcastRowProps>(function PodcastRow(
  { episode, playing = false, onPlayToggle, onClick, variant = 'standard', className, ...rest },
  ref
) {
  const compact = variant === 'compact';
  const artSize = compact ? 'h-11 w-11' : 'h-16 w-16';
  const meta = [episode.show, episode.duration].filter(Boolean).join('  ·  ');
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
        'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90',
        className
      )}
      {...rest}
    >
      {episode.artworkUrl ? (
        <img
          src={episode.artworkUrl}
          alt=""
          loading="lazy"
          className={cn('shrink-0 rounded-[var(--xen-radius-md)] bg-neutral-100 object-cover', artSize)}
        />
      ) : (
        <div
          className={cn(
            'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent',
            artSize
          )}
        >
          <span aria-hidden className="text-lg leading-none text-on-accent">🎧</span>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className={cn('font-bold text-on-surface', compact ? 'line-clamp-1' : 'line-clamp-2')}>
          {episode.title}
        </p>
        {!compact && meta ? <p className="line-clamp-1 text-xs text-muted">{meta}</p> : null}
      </div>

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
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        <Icon glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
      </button>
    </div>
  );
});
