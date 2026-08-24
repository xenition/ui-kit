import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01 } from './types';

export type WaveformScrubberVariant = 'bars' | 'mirror';

export interface WaveformScrubberProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSeek' | 'onClick'> {
  /**
   * Per-bar amplitudes in `[0, 1]`. Values are clamped; an empty array renders
   * a flat rail (no bars) so an unanalyzed track still shows something seekable.
   */
  peaks?: number[];
  /** Played fraction in `[0, 1]` — how much of the bar row is colored. */
  progress?: number;
  /**
   * - `bars`   — bottom-anchored amplitude bars (default).
   * - `mirror` — bars mirrored around the vertical center.
   */
  variant?: WaveformScrubberVariant;
  /** Row height in px (default 40). */
  height?: number;
  /** Fires with the new fraction `[0, 1]` when the row is clicked / keyed to seek. */
  onSeek?: (fraction: number) => void;
  disabled?: boolean;
  /** Announced label (default `'Seek'`). */
  'aria-label'?: string;
}

const STEP = 0.05;

/**
 * A token-bar waveform scrubber (web) — renders `peaks` as amplitude bars,
 * tints the played portion `primary` and the rest `border`, and seeks by click
 * (the click's x maps to a `[0, 1]` fraction) or by keyboard (←/→/↑/↓ nudge in
 * 5% steps). Exposed as an ARIA `slider` with `aria-valuenow` (a percentage).
 * Pure UI — no audio analysis or playback; feed it precomputed `peaks`.
 * Token-only — no literal hex.
 */
export const WaveformScrubber = React.forwardRef<HTMLDivElement, WaveformScrubberProps>(
  function WaveformScrubber(
    {
      peaks = [],
      progress = 0,
      variant = 'bars',
      height = 40,
      onSeek,
      disabled = false,
      className,
      style,
      'aria-label': ariaLabel = 'Seek',
      ...rest
    },
    ref
  ) {
    const frac = clamp01(progress);
    const seekable = !disabled && !!onSeek;

    const handleClick = (e: React.MouseEvent<HTMLDivElement>): void => {
      if (!seekable) return;
      const rect = e.currentTarget.getBoundingClientRect();
      if (rect.width <= 0) return;
      onSeek!(clamp01((e.clientX - rect.left) / rect.width));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (!seekable) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        onSeek!(clamp01(frac + STEP));
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        onSeek!(clamp01(frac - STEP));
      }
    };

    const count = peaks.length;
    // How many bars fall inside the played region (guarded against empty peaks).
    const playedBars = count > 0 ? Math.round(frac * count) : 0;

    return (
      <div
        ref={ref}
        data-xen-waveform-scrubber=""
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(frac * 100)}
        aria-disabled={disabled || undefined}
        tabIndex={seekable ? 0 : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full',
          seekable && 'cursor-pointer',
          disabled && 'opacity-50',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          className
        )}
        style={{ height, ...style }}
        {...rest}
      >
        {count === 0 ? (
          // Empty / unanalyzed: a single flat rail with a played fill.
          <div className="flex h-full items-center">
            <div className="relative h-1 w-full rounded-full bg-border">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${frac * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'flex h-full gap-0.5',
              variant === 'mirror' ? 'items-center' : 'items-end'
            )}
          >
            {peaks.map((raw, i) => {
              const amp = clamp01(raw);
              const barHeight = Math.max(2, amp * height);
              const played = i < playedBars;
              return (
                <div
                  key={i}
                  className={cn('flex-1 rounded-sm', played ? 'bg-primary' : 'bg-border')}
                  style={{ height: barHeight }}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
