import * as React from 'react';
import { cn } from '../primitives/cn';
import { clamp01 } from './types';
import type { WaveformScrubberProps } from './WaveformScrubber';

/** Drop-in for {@link WaveformScrubberProps} — same props, the V4 "spotlight" design. */
export type WaveformScrubberV4Props = WaveformScrubberProps;

const STEP = 0.05;

/**
 * WaveformScrubber — **V4** "spotlight" design (web parity of the native V4). A
 * refined, more tactile waveform: played bars render in **primary**, unplayed
 * bars in soft-muted (`bg-muted`), and a clear primary playhead marks the
 * current position. Seeks by click (x maps to a `[0, 1]` fraction) or keyboard
 * (←/→/↑/↓ nudge in 5% steps), exposed as an ARIA `slider` with `aria-valuenow`
 * (a percentage). Same `peaks`/`onSeek` contract and behavior as
 * {@link WaveformScrubberProps}; every color resolves from `--xen-*` token
 * classes — no literal hex.
 */
export const WaveformScrubberV4 = React.forwardRef<HTMLDivElement, WaveformScrubberV4Props>(
  function WaveformScrubberV4(
    {
      peaks = [],
      progress = 0,
      variant = 'bars',
      height = 48,
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
          'relative w-full',
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
            <div className="relative h-1.5 w-full rounded-full bg-muted">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-primary"
                style={{ width: `${frac * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'flex h-full gap-1',
              variant === 'mirror' ? 'items-center' : 'items-end'
            )}
          >
            {peaks.map((raw, i) => {
              const amp = clamp01(raw);
              const barHeight = Math.max(3, amp * height);
              const played = i < playedBars;
              return (
                <div
                  key={i}
                  className={cn('flex-1 rounded-full', played ? 'bg-primary' : 'bg-muted')}
                  style={{ height: barHeight }}
                />
              );
            })}
          </div>
        )}

        {/* Clear playhead at the current position. */}
        {seekable || frac > 0 ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-primary"
            style={{ left: `${frac * 100}%` }}
          />
        ) : null}
      </div>
    );
  }
);
