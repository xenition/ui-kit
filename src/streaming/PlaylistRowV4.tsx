import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { formatTime } from './types';
import type { PlaylistRowProps } from './PlaylistRow';

/** Drop-in for {@link PlaylistRowProps} — same props, the V4 "spotlight" design. */
export type PlaylistRowV4Props = PlaylistRowProps;

/**
 * PlaylistRow — **V4** "spotlight" design (web parity of the native V4). A calm,
 * clean-surface playlist entry: a rounded cover thumb, title + artist, a trailing
 * duration, and — when `onPlayToggle` is set — a big round **primary** play/pause
 * affordance (the one accent, ≥44px). Selecting the row via `onClick` renders it
 * as a `role="button"` with Enter/Space support and a soft-`primary` hover/press
 * tint; when `active` the title tints `primary` and the row shows a leading
 * now-playing glyph, announced via `aria-current`. The `numbered` variant swaps
 * the artwork for a track number. Same props/behavior as {@link PlaylistRowProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export const PlaylistRowV4 = React.forwardRef<HTMLDivElement, PlaylistRowV4Props>(function PlaylistRowV4(
  { track, index, active = false, state = 'paused', variant = 'standard', onClick, onPlayToggle, onMore, className, ...rest },
  ref
) {
  const numbered = variant === 'numbered';
  const compact = variant === 'compact';
  const isPlaying = active && state === 'playing';
  const size = compact ? 44 : 48;
  const interactive = !!onClick;

  const lead = numbered ? (
    <span className="flex w-11 items-center justify-center">
      {active ? (
        <Icon glyph={isPlaying ? '❙❙' : '▶'} size="sm" color="primary" />
      ) : (
        <span className="text-sm font-semibold text-muted">{index != null ? index + 1 : '—'}</span>
      )}
    </span>
  ) : (
    <span className="relative shrink-0" style={{ width: size, height: size }}>
      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          aria-hidden="true"
          className="rounded-[var(--xen-radius-md)] bg-border object-cover"
          style={{ width: size, height: size }}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex items-center justify-center rounded-[var(--xen-radius-md)] bg-accent"
          style={{ width: size, height: size }}
        >
          <Icon glyph="♪" size="base" color="onPrimary" />
        </span>
      )}
      {active ? (
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50/80"
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="primary" />
        </span>
      ) : null}
    </span>
  );

  return (
    <div
      ref={ref}
      data-xen-playlist-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? track.title : undefined}
      aria-current={interactive && active ? 'true' : undefined}
      onClick={interactive ? () => onClick!(track, index) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(track, index);
              }
            }
          : undefined
      }
      className={cn(
        'flex min-h-[44px] items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)]',
        compact ? 'py-[var(--xen-space-xs)]' : 'py-[var(--xen-space-sm)]',
        active ? 'bg-primary-50' : 'bg-transparent',
        interactive &&
          'cursor-pointer transition-colors hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {lead}

      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={cn(
            'truncate text-base',
            active ? 'font-bold text-primary' : 'font-semibold text-on-surface'
          )}
        >
          {track.title}
          {active ? <span className="sr-only"> (now playing)</span> : null}
        </span>
        {track.artist && !compact ? (
          <span className="truncate text-xs text-muted">{track.artist}</span>
        ) : null}
      </div>

      {track.duration != null ? (
        <span className="text-xs text-muted">{formatTime(track.duration)}</span>
      ) : null}

      {onPlayToggle ? (
        <button
          type="button"
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
          aria-pressed={isPlaying}
          onClick={(e) => {
            e.stopPropagation();
            onPlayToggle(!isPlaying);
          }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
        </button>
      ) : null}

      {onMore ? (
        <button
          type="button"
          aria-label="More options"
          onClick={(e) => {
            e.stopPropagation();
            onMore();
          }}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] text-muted transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="⋯" size="lg" color="muted" />
        </button>
      ) : null}
    </div>
  );
});
