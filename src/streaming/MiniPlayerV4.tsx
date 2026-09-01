import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Spinner } from '../primitives';
import { clamp01 } from './types';
import type { MiniPlayerProps } from './MiniPlayer';

/** Drop-in for {@link MiniPlayerProps} — same props, the V4 "spotlight" design. */
export type MiniPlayerV4Props = MiniPlayerProps;

/**
 * MiniPlayer — **V4** "spotlight" design (web parity of the native V4). The
 * compact docked bar in the artwork-forward line: a small rounded artwork thumb,
 * title/artist, and a big round **primary** play button (filled, `onPrimary`
 * glyph) — the one accent. A thin `primary` progress line rides the top edge
 * over a soft-`primary` track. The surface stays clean (no big gradient — that
 * is reserved for the artwork-hero moments). Same props/behavior as
 * {@link MiniPlayerProps}; all colors from `--xen-*` token classes (no literal
 * hex). `variant="floating"` rounds/insets the bar.
 */
export const MiniPlayerV4 = React.forwardRef<HTMLDivElement, MiniPlayerV4Props>(function MiniPlayerV4(
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
        'relative flex items-center gap-[var(--xen-space-sm)] overflow-hidden border border-border bg-surface shadow-lg',
        'px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        floating ? 'rounded-[var(--xen-radius-lg)]' : 'rounded-[var(--xen-radius-lg)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {/* Thin top progress line — soft-primary track + primary fill. */}
      <div className="absolute inset-x-0 top-0 h-1 bg-primary-100">
        <div className="h-1 bg-primary" style={{ width: `${frac * 100}%` }} />
      </div>

      {track.artworkUrl ? (
        <img
          src={track.artworkUrl}
          alt=""
          aria-hidden="true"
          className="h-11 w-11 shrink-0 rounded-[var(--xen-radius-md)] bg-border object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent"
        >
          <Icon glyph="♪" size="base" color="onPrimary" />
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-sm font-bold text-on-surface">{track.title}</span>
        {track.artist ? (
          <span className="truncate text-xs text-muted">{track.artist}</span>
        ) : null}
      </div>

      {isBuffering ? (
        <span className="inline-flex h-11 w-11 items-center justify-center">
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
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="sm" color="onPrimary" />
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
