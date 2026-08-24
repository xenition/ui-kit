import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Spinner } from '../primitives';
import { clamp01, type MediaTrack, type PlaybackState } from './types';

export type MiniPlayerVariant = 'bar' | 'floating';

export interface MiniPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The track shown in the docked mini bar. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Played fraction in `[0, 1]` for the thin top progress line. */
  progress?: number;
  /**
   * - `bar`      — full-width docked bar with a square edge (default).
   * - `floating` — inset rounded card that hovers above content.
   */
  variant?: MiniPlayerVariant;
  /** Called with the next playing state when the play/pause control is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Next-track intent (shows a next control when set). */
  onNext?: () => void;
  /** Body click — expand to the full `NowPlaying` (maps native `onPress`). */
  onClick?: (track: MediaTrack) => void;
}

/**
 * A docked **mini player** bar (web) — the collapsed now-playing surface that
 * sits above a bottom nav. UI shell only: `onPlayToggle(next)` / `onNext` report
 * intent and `onClick(track)` expands to the full player. When `onClick` is set
 * the body is a `role="button"` with Enter/Space keyboard support, while the
 * play/next controls are real `<button>`s that stop propagation. A thin
 * `primary` progress line rides the top edge; the play control's accessible
 * label reflects `state`. Token-only — no literal hex.
 */
export const MiniPlayer = React.forwardRef<HTMLDivElement, MiniPlayerProps>(function MiniPlayer(
  { track, state = 'paused', progress = 0, variant = 'bar', onPlayToggle, onNext, onClick, className, ...rest },
  ref
) {
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const floating = variant === 'floating';
  const frac = clamp01(progress);
  const interactive = !!onClick;

  return (
    <div
      ref={ref}
      data-xen-mini-player=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `Now playing: ${track.title}. Expand` : undefined}
      onClick={interactive ? () => onClick!(track) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(track);
              }
            }
          : undefined
      }
      className={cn(
        'relative flex items-center gap-[var(--xen-space-sm)] border border-border bg-surface',
        'px-[var(--xen-space-sm)] py-[var(--xen-space-xs)]',
        floating ? 'rounded-[var(--xen-radius-lg)]' : 'rounded-[var(--xen-radius-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {/* Top progress line. */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-border">
        <div className="h-0.5 bg-primary" style={{ width: `${frac * 100}%` }} />
      </div>

      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          aria-hidden="true"
          className="h-10 w-10 shrink-0 rounded-[var(--xen-radius-sm)] bg-border object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] bg-accent"
        >
          <Icon glyph="♪" size="base" color="onPrimary" />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-semibold text-on-surface">{track.title}</span>
        {track.artist ? (
          <span className="truncate text-xs text-muted">{track.artist}</span>
        ) : null}
      </div>

      {isBuffering ? (
        <span className="inline-flex h-9 w-9 items-center justify-center">
          <Spinner size="sm" />
        </span>
      ) : (
        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          disabled={!onPlayToggle}
          onClick={(e) => {
            e.stopPropagation();
            onPlayToggle?.(!isPlaying);
          }}
          className="inline-flex h-9 w-9 items-center justify-center text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-50"
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="lg" color="primary" />
        </button>
      )}

      {onNext ? (
        <button
          type="button"
          aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <Icon glyph="⏭" size="lg" color="onSurface" />
        </button>
      ) : null}
    </div>
  );
});
