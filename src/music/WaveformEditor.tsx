import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { EmptyState } from '../commerce/EmptyState';
import { clamp } from './types';

export type WaveformEditorVariant = 'full' | 'mini';

export interface WaveformEditorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Normalized peak magnitudes in `[0, 1]`, one per bar. This is a UI shell —
   * peaks are pre-computed by the app; no audio is decoded here.
   */
  peaks?: number[];
  /** Playhead position as a ratio in `[0, 1]`. */
  progress?: number;
  /** Optional selected region `[startRatio, endRatio]` (both in `[0, 1]`). */
  selection?: [number, number];
  /**
   * - `full` — taller bars with a scrubber row (default).
   * - `mini` — short inline strip (e.g. a clip thumbnail).
   */
  variant?: WaveformEditorVariant;
  /** Show a loading spinner in place of the bars. */
  loading?: boolean;
  /** Message shown when there are no peaks and not loading. */
  emptyLabel?: string;
  /** Number of bars drawn when `peaks` is omitted (placeholder). Default 48. */
  placeholderBars?: number;
  /** Fires with a `[0,1]` ratio when a bar is tapped (seek intent). */
  onSeek?: (ratio: number) => void;
}

/** Deterministic pseudo-random height so the placeholder looks wave-like. */
function placeholderHeight(i: number): number {
  const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
  return 0.25 + (v - Math.floor(v)) * 0.7;
}

/**
 * A waveform editor — a **token-bar placeholder**, not a real renderer, and the
 * DOM parity of `native/music`'s `WaveformEditor`. It draws `peaks` (or a
 * deterministic placeholder when omitted) as a row of token-colored bars,
 * overlays a playhead at `progress`, and tints an optional `selection` region.
 * Tapping a bar fires `onSeek` with the `[0,1]` position. Shows a `Spinner`
 * while `loading` and an `EmptyState` when there is nothing to show. No audio is
 * decoded; token-only styling.
 */
export const WaveformEditor = React.forwardRef<HTMLDivElement, WaveformEditorProps>(
  function WaveformEditor(
    {
      peaks,
      progress,
      selection,
      variant = 'full',
      loading = false,
      emptyLabel = 'No audio loaded',
      placeholderBars = 48,
      onSeek,
      className,
      ...rest
    },
    ref
  ) {
    const heightClass = variant === 'mini' ? 'h-8' : 'h-[72px]';

    if (loading) {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="Loading waveform"
          className={cn(
            'flex items-center justify-center rounded-[var(--xen-radius-md)] bg-surface',
            heightClass,
            className
          )}
          {...rest}
        >
          <Spinner />
        </div>
      );
    }

    const hasPeaks = Array.isArray(peaks) && peaks.length > 0;
    if (!hasPeaks && placeholderBars <= 0) {
      return (
        <EmptyState
          ref={ref}
          icon={<Icon glyph="〰️" size="2xl" color="muted" aria-label="Waveform" />}
          title={emptyLabel}
          className={className}
          {...rest}
        />
      );
    }

    const count = hasPeaks ? peaks!.length : Math.max(1, Math.trunc(placeholderBars));
    const playRatio = progress == null ? null : clamp(progress, 0, 1);
    const [selStart, selEnd] = selection ?? [null, null];

    const inSelection = (ratio: number): boolean => {
      if (selStart == null || selEnd == null) return false;
      const lo = clamp(Math.min(selStart, selEnd), 0, 1);
      const hi = clamp(Math.max(selStart, selEnd), 0, 1);
      return ratio >= lo && ratio <= hi;
    };

    return (
      <div
        ref={ref}
        role="img"
        aria-label={
          playRatio == null ? 'Waveform' : `Waveform, ${Math.round(playRatio * 100)} percent played`
        }
        className={cn(
          'relative flex items-center gap-px overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 px-[var(--xen-space-xs)]',
          heightClass,
          className
        )}
        {...rest}
      >
        {Array.from({ length: count }).map((_, i) => {
          const raw = hasPeaks ? peaks![i] : placeholderHeight(i);
          const mag = clamp(raw ?? 0, 0, 1);
          const ratio = count > 1 ? i / (count - 1) : 0;
          const played = playRatio != null && ratio <= playRatio;
          const selected = inSelection(ratio);
          const barColor = played ? 'bg-primary' : selected ? 'bg-accent' : 'bg-neutral-400';
          const bar = (
            <span
              className={cn('w-full rounded-full', barColor)}
              style={{ height: `${Math.max(6, mag * 100)}%` }}
            />
          );

          // A real seek `<button>` only when interactive; otherwise a plain
          // decorative bar (so an embedded strip never nests buttons).
          return onSeek ? (
            <button
              key={i}
              type="button"
              aria-label={`Seek to ${Math.round(ratio * 100)} percent`}
              onClick={() => onSeek(ratio)}
              className="flex h-full flex-1 items-center"
            >
              {bar}
            </button>
          ) : (
            <span key={i} aria-hidden="true" className="flex h-full flex-1 items-center">
              {bar}
            </span>
          );
        })}
        {playRatio != null && variant === 'full' ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-primary"
            style={{ left: `${playRatio * 100}%` }}
          />
        ) : null}
        {!hasPeaks && variant === 'full' ? (
          <span className="pointer-events-none absolute self-center text-xs font-semibold text-muted">
            {emptyLabel}
          </span>
        ) : null}
      </div>
    );
  }
);
