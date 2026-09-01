import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Spinner } from '../primitives/Spinner';
import { EmptyState } from '../commerce/EmptyState';
import { clamp } from './types';
import type { WaveformEditorProps } from './WaveformEditor';

/** Drop-in for {@link WaveformEditorProps} — same props, the V4 "session" design. */
export type WaveformEditorV4Props = WaveformEditorProps;

/**
 * WaveformEditor — **V4** "session" design (web parity of the native V4), and the
 * ONE reserved gradient moment of the music V4 line: the signal hero. In `full`
 * the waveform sits on the brand-gradient ground (`from-primary-500 to-primary-700`)
 * with the bars drawn in near-white ink — `bg-primary-50` for played/active,
 * `bg-primary-50/40` for unplayed — the playhead and any labels in
 * `text-primary-50`/`text-primary-100`, and time chips as frosted tiles
 * (`bg-primary-50/15 border border-primary-50/30`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient): `rounded-md border
 * border-border bg-surface` with bars in `bg-primary`/`bg-primary/30`. Honors
 * every prop of {@link WaveformEditorProps}: the played/unplayed split, playhead
 * position, optional selection region, and the `onSeek` intent — bars stay real
 * seek `<button>`s (≥44px tall in `full`) when interactive. State is never on
 * color alone: the playhead is a real marker. Token-only colors (no literals).
 */
export const WaveformEditorV4 = React.forwardRef<HTMLDivElement, WaveformEditorV4Props>(
  function WaveformEditorV4(
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
    const isFull = variant === 'full';
    const heightClass = isFull ? 'h-[72px]' : 'h-8';

    if (loading) {
      return (
        <div
          ref={ref}
          role="img"
          aria-label="Loading waveform"
          className={cn(
            'flex items-center justify-center rounded-[var(--xen-radius-md)]',
            isFull
              ? 'bg-gradient-to-br from-primary-500 to-primary-700'
              : 'border border-border bg-surface',
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

    /** Deterministic pseudo-random height so the placeholder looks wave-like. */
    const placeholderHeight = (i: number): number => {
      const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
      return 0.25 + (v - Math.floor(v)) * 0.7;
    };

    // Gradient signal hero (`full`) draws near-white ink; `mini` is a clean strip.
    const containerClass = isFull
      ? 'relative flex items-center gap-px overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-500 to-primary-700 px-[var(--xen-space-xs)]'
      : 'relative flex items-center gap-px overflow-hidden rounded-md border border-border bg-surface px-[var(--xen-space-xs)]';

    return (
      <div
        ref={ref}
        role="img"
        aria-label={
          playRatio == null ? 'Waveform' : `Waveform, ${Math.round(playRatio * 100)} percent played`
        }
        className={cn(containerClass, heightClass, className)}
        {...rest}
      >
        {Array.from({ length: count }).map((_, i) => {
          const raw = hasPeaks ? peaks![i] : placeholderHeight(i);
          const mag = clamp(raw ?? 0, 0, 1);
          const ratio = count > 1 ? i / (count - 1) : 0;
          const played = playRatio != null && ratio <= playRatio;
          const selected = inSelection(ratio);

          // On the gradient ground the bars are near-white "ink"; on the plain
          // surface they use the primary token directly.
          const barColor = isFull
            ? played || selected
              ? 'bg-primary-50'
              : 'bg-primary-50/40'
            : played || selected
              ? 'bg-primary'
              : 'bg-primary/30';

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
        {/* The playhead is a real marker — state never on color alone. */}
        {playRatio != null && isFull ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 top-0 w-0.5 bg-primary-50"
            style={{ left: `${playRatio * 100}%` }}
          />
        ) : null}
        {/* Frosted time-position tile on the gradient ground. */}
        {playRatio != null && isFull ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 right-1 rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold tabular-nums text-primary-100"
          >
            {Math.round(playRatio * 100)}%
          </span>
        ) : null}
        {!hasPeaks && isFull ? (
          <span className="pointer-events-none absolute self-center text-xs font-semibold text-primary-50">
            {emptyLabel}
          </span>
        ) : null}
      </div>
    );
  }
);
