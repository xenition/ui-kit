import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Slider } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';
import { WaveformScrubber } from './WaveformScrubber';
import { CastButton } from './CastButton';
import { clamp01, formatTime, type MediaTrack, type PlaybackState } from './types';

export type NowPlayingVariant = 'full' | 'compact';

export interface NowPlayingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek'> {
  /** The track on screen. */
  track: MediaTrack;
  /** Transport state — drives the play control + a11y label. Default `'paused'`. */
  state?: PlaybackState;
  /** Playback position in seconds. */
  position?: number;
  /** Total duration in seconds (falls back to `track.duration`). */
  duration?: number;
  /**
   * Optional waveform peaks in `[0, 1]`. When provided the scrubber is a
   * {@link WaveformScrubber}; otherwise a linear `Slider` is used.
   */
  peaks?: number[];
  /**
   * - `full`    — large hero artwork + full transport (default).
   * - `compact` — smaller artwork, tighter spacing.
   */
  variant?: NowPlayingVariant;
  /** Called with the next playing state when the main control is clicked. */
  onPlayToggle?: (next: boolean) => void;
  /** Called with a new position (seconds) when the scrubber changes. */
  onSeek?: (seconds: number) => void;
  /** Previous-track intent. */
  onPrev?: () => void;
  /** Next-track intent. */
  onNext?: () => void;
  /** Cast intent (shows a `CastButton` when set). */
  onCast?: () => void;
  /** Whether a cast target is connected. */
  casting?: boolean;
}

/**
 * The full **now-playing** surface (web) — hero artwork (via `MediaFigure`),
 * title/artist, a scrubber (linear `Slider`, or a {@link WaveformScrubber} when
 * `peaks` are given) with time labels, and transport controls (prev / play-pause
 * / next) plus an optional cast button. UI shell only: seek/toggle/skip intents
 * come back through callbacks; wire a real engine behind them. The main
 * control's accessible label reflects `state`. Token-only — no literal hex.
 */
export const NowPlaying = React.forwardRef<HTMLDivElement, NowPlayingProps>(function NowPlaying(
  {
    track,
    state = 'paused',
    position = 0,
    duration,
    peaks,
    variant = 'full',
    onPlayToggle,
    onSeek,
    onPrev,
    onNext,
    onCast,
    casting,
    className,
    ...rest
  },
  ref
) {
  const isPlaying = state === 'playing';
  const total = duration ?? track.duration;
  const seekMax = total && total > 0 ? total : 1;
  const frac = seekMax > 0 ? clamp01(position / seekMax) : 0;
  const compact = variant === 'compact';

  const artItem: MediaItem = {
    url: track.artworkUrl ?? '',
    alt: track.album ? `${track.title} — ${track.album}` : track.title,
    width: 1,
    height: 1,
  };

  return (
    <div
      ref={ref}
      data-xen-now-playing=""
      className={cn('flex flex-col', compact ? 'gap-[var(--xen-space-md)]' : 'gap-[var(--xen-space-xl)]', className)}
      {...rest}
    >
      {/* Hero artwork. */}
      {track.artworkUrl ? (
        <div className={cn('self-center', compact ? 'w-3/5' : 'w-5/6')}>
          <MediaFigure item={artItem} reserveAspect />
        </div>
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            'flex aspect-square items-center justify-center self-center rounded-[var(--xen-radius-lg)] bg-accent',
            compact ? 'w-3/5' : 'w-5/6'
          )}
        >
          <Icon glyph="♪" size="3xl" color="onPrimary" />
        </span>
      )}

      {/* Title + artist. */}
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        <span className="text-xl font-bold text-on-surface">{track.title}</span>
        {track.artist ? <span className="text-base text-muted">{track.artist}</span> : null}
      </div>

      {/* Scrubber + time labels. */}
      <div className="flex flex-col gap-[var(--xen-space-xs)]">
        {peaks ? (
          <WaveformScrubber
            peaks={peaks}
            progress={frac}
            onSeek={onSeek ? (f) => onSeek(f * seekMax) : undefined}
          />
        ) : (
          <Slider
            value={Math.min(position, seekMax)}
            min={0}
            max={seekMax}
            disabled={!onSeek}
            onChange={(v) => onSeek?.(v)}
          />
        )}
        <div className="flex justify-between">
          <span className="text-xs text-muted">{formatTime(position)}</span>
          <span className="text-xs text-muted">{formatTime(total)}</span>
        </div>
      </div>

      {/* Transport. */}
      <div className="flex items-center justify-center gap-[var(--xen-space-xl)]">
        <button
          type="button"
          aria-label="Previous"
          disabled={!onPrev}
          onClick={onPrev}
          className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon glyph="⏮" size="2xl" color="onSurface" />
        </button>

        <button
          type="button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          aria-pressed={isPlaying}
          disabled={!onPlayToggle}
          onClick={onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined}
          className={cn(
            'flex items-center justify-center rounded-full bg-primary text-on-primary',
            'transition-opacity hover:opacity-90',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
          style={{ height: 72, width: 72 }}
        >
          <Icon glyph={isPlaying ? '❙❙' : '▶'} size="2xl" color="onPrimary" />
        </button>

        <button
          type="button"
          aria-label="Next"
          disabled={!onNext}
          onClick={onNext}
          className="inline-flex text-on-surface transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 disabled:pointer-events-none disabled:opacity-40"
        >
          <Icon glyph="⏭" size="2xl" color="onSurface" />
        </button>
      </div>

      {onCast ? (
        <div className="flex justify-center">
          <CastButton variant="labeled" connected={casting} onClick={onCast} />
        </div>
      ) : null}
    </div>
  );
});
