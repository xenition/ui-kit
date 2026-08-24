import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider, Spinner } from '../primitives';
import { formatTime, type MediaTrack, type PlaybackState } from './types';

export type AudioPlayerVariant = 'card' | 'compact' | 'expanded';

export interface AudioPlayerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek'> {
  /** The track being played. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds (falls back to `track.duration`). */
  duration?: number;
  /**
   * - `card`     — artwork + meta + transport + seek bar (default).
   * - `compact`  — single row, no seek bar.
   * - `expanded` — larger artwork, adds prev/next transport.
   */
  variant?: AudioPlayerVariant;
  /** Called with the next playing state when play/pause is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the seek bar changes. */
  onSeek?: (seconds: number) => void;
  /** Previous-track intent (shown in `expanded`). */
  onPrev?: () => void;
  /** Next-track intent (shown in `expanded`). */
  onNext?: () => void;
}

const ART_SIZE: Record<AudioPlayerVariant, number> = { card: 64, compact: 44, expanded: 88 };

/**
 * A themed **audio player UI shell** (web) — a card/row surface for a single
 * track with **no playback dependency**. Drive a real `<audio>` element from
 * the emitted intents: `onPlayToggle(next)`, `onSeek(seconds)`, `onPrev`,
 * `onNext`. Renders artwork, title/artist, a `Slider` seek bar with time
 * labels, and transport controls whose play/pause label reflects `state`
 * (buffering swaps the play button for a `Spinner`). Token-only — no literal hex.
 */
export const AudioPlayer = React.forwardRef<HTMLDivElement, AudioPlayerProps>(function AudioPlayer(
  {
    track,
    state = 'paused',
    position = 0,
    duration,
    variant = 'card',
    onPlayToggle,
    onSeek,
    onPrev,
    onNext,
    className,
    ...rest
  },
  ref
) {
  const isPlaying = state === 'playing';
  const isBuffering = state === 'buffering';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const compact = variant === 'compact';
  const expanded = variant === 'expanded';
  const art = ART_SIZE[variant];

  const meta = [track.artist, track.album].filter(Boolean).join(' · ');

  const playControl = (
    <span className="inline-flex h-11 w-11 items-center justify-center">
      {isBuffering ? (
        <Spinner size="sm" />
      ) : (
        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          disabled={!onPlayToggle}
          onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-full bg-primary text-on-primary',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="base" color="onPrimary" />
        </button>
      )}
    </span>
  );

  return (
    <div
      ref={ref}
      data-xen-audio-player=""
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        {track.artworkUrl ? (
          <img
            src={track.artworkUrl}
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
            <Icon glyph="♪" size="xl" color="onPrimary" />
          </span>
        )}

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{track.title}</span>
          {meta ? <span className="truncate text-sm text-muted">{meta}</span> : null}
        </div>

        {expanded && onPrev ? (
          <button
            type="button"
            aria-label="Previous"
            onClick={onPrev}
            className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⏮" size="lg" color="onSurface" />
          </button>
        ) : null}
        {playControl}
        {expanded && onNext ? (
          <button
            type="button"
            aria-label="Next"
            onClick={onNext}
            className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            <Icon glyph="⏭" size="lg" color="onSurface" />
          </button>
        ) : null}
      </div>

      {!compact ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <Slider
            value={Math.min(position, seekMax)}
            min={0}
            max={seekMax}
            disabled={!onSeek}
            onChange={(v) => onSeek?.(v)}
          />
          <div className="flex justify-between">
            <span className="text-xs text-muted">{formatTime(position)}</span>
            <span className="text-xs text-muted">{formatTime(total)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
});
