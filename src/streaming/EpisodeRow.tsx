import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Progress } from '../primitives';
import { clamp01, type PlaybackState, type StreamEpisode } from './types';

export type EpisodeRowVariant = 'standard' | 'compact';

export interface EpisodeRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The episode to render. */
  episode: StreamEpisode;
  /** Whether this episode is currently playing (controlled). */
  playing?: boolean;
  /** Transport state (drives the play control when this row is active). */
  state?: PlaybackState;
  /**
   * - `standard` — artwork + title + show/date/duration + resume bar (default).
   * - `compact`  — no artwork, single title line.
   */
  variant?: EpisodeRowVariant;
  /** Called with the next playing state when the play/pause control is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Row click — open episode details (maps native `onPress`). */
  onClick?: (episode: StreamEpisode) => void;
  /** Download intent; shows a trailing download control when set. */
  onDownload?: () => void;
}

/**
 * A podcast / video episode row (web) — artwork, title, show · date · duration
 * meta, an optional resume `Progress` bar (from `episode.progress`), and a
 * play/pause `<button>` whose accessible label reflects the `playing` state.
 * `onClick(episode)` opens details (rendered as a `role="button"` with
 * Enter/Space support). Two variants (`standard` / `compact`). Token-only —
 * no literal hex.
 */
export const EpisodeRow = React.forwardRef<HTMLDivElement, EpisodeRowProps>(function EpisodeRow(
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
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-sm)]',
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
            'flex h-10 w-10 items-center justify-center rounded-full bg-primary text-on-primary',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph={buffering ? '◌' : isPlaying ? '❙❙' : '▶'} size="sm" color="onPrimary" />
        </button>
      </div>

      {progress != null && progress > 0 ? (
        <Progress value={progress * 100} max={100} size="sm" />
      ) : null}
    </div>
  );
});
