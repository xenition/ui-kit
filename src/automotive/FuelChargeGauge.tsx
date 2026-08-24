import * as React from 'react';
import { cn } from '../primitives/cn';
import { Progress, type ProgressTone } from '../primitives';

/** Energy source powering the gauge. */
export type FuelKind = 'fuel' | 'ev';
/** Presentation for a {@link FuelChargeGauge}. */
export type FuelChargeVariant = 'bar' | 'compact';

export interface FuelChargeGaugeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Charge / tank level as a percentage 0–100. */
  percent: number;
  /** Energy source. `fuel` (tank) or `ev` (battery). */
  kind?: FuelKind;
  /** Heading above the gauge. Defaults to the source name. */
  label?: string;
  /** Estimated range remaining, pre-formatted (e.g. `'142 mi'`). */
  rangeLabel?: string;
  /** Percentage at/under which the level reads as low (default 15). */
  lowThreshold?: number;
  /** Whether the EV is actively charging (adds a text-labelled state). */
  charging?: boolean;
  /** Presentation variant. */
  variant?: FuelChargeVariant;
  /** Loading skeleton (indeterminate). */
  loading?: boolean;
}

/** Level bands → progress tone + word + text class. A low level maps to `danger`. */
function bandFor(pct: number, low: number): { tone: ProgressTone; word: string; textClass: string } {
  if (pct <= low) return { tone: 'danger', word: 'Low', textClass: 'text-danger' };
  if (pct <= low * 2.5) return { tone: 'warn', word: 'Fair', textClass: 'text-warn' };
  return { tone: 'success', word: 'Good', textClass: 'text-success' };
}

/**
 * A fuel-tank or EV-battery level gauge — draws a token-tinted meter (the
 * {@link Progress} primitive) filled to `percent`, with an estimated-range
 * readout. A low level (at/under `lowThreshold`) resolves to the `danger` tone
 * per contract, but the band is always spelled out ("Low"/"Fair"/"Good") and the
 * a11y label states the number plus a glyph, so meaning never rests on color.
 * Colors come from `--xen-*` token classes — no literal colors. Input is clamped
 * to 0–100. Web parity of the native `FuelChargeGauge`.
 */
export const FuelChargeGauge = React.forwardRef<HTMLDivElement, FuelChargeGaugeProps>(
  function FuelChargeGauge(
    {
      percent,
      kind = 'fuel',
      label,
      rangeLabel,
      lowThreshold = 15,
      charging = false,
      variant = 'bar',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(percent) ? percent : 0)));
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const band = bandFor(clamped, low);
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';
    const compact = variant === 'compact';

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-fuel-gauge=""
          aria-busy="true"
          aria-label={`Loading ${heading.toLowerCase()} level`}
          className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
          {...rest}
        >
          <div className="h-3 w-2/5 animate-pulse rounded bg-neutral-200" />
          <div className={cn('animate-pulse rounded-full bg-neutral-100', compact ? 'h-2.5' : 'h-3.5')} />
        </div>
      );
    }

    const a11y = `${heading}${charging ? ' charging' : ''}: ${clamped} percent, ${band.word}${
      rangeLabel ? `, ${rangeLabel} range` : ''
    }`;

    return (
      <div
        ref={ref}
        data-xen-fuel-gauge=""
        aria-label={a11y}
        className={cn('flex flex-col gap-[var(--xen-space-xs)]', className)}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-on-surface">
            <span aria-hidden="true">{glyph}</span> {heading}
            {charging ? ' · Charging' : ''}
          </span>
          <span className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span className={cn('text-base font-extrabold', band.textClass)}>{clamped}%</span>
            <span className="text-xs text-muted">{band.word}</span>
          </span>
        </div>

        <Progress value={clamped} max={100} tone={band.tone} size={compact ? 'sm' : 'md'} aria-hidden="true" />

        {rangeLabel ? <span className="text-xs text-muted">Est. range {rangeLabel}</span> : null}
      </div>
    );
  }
);
