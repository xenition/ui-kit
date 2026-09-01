import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { clampPercent, SKELETON_CLASS, TONE_BG, TONE_INK, type ToneV4 } from './internal/fleet-v4';
import type { FuelChargeGaugeProps } from './FuelChargeGauge';

/** The three bands a level falls in. Genuinely a status, so the tones stay. */
export type FuelBand = 'low' | 'fair' | 'good';

export interface FuelChargeGaugeV4Props extends FuelChargeGaugeProps {
  /** Override the band words — three English words lived inside the component. */
  bandLabels?: Partial<Record<FuelBand, string>>;
  /** Appended when `charging`. Default `'Charging'`. */
  chargingLabel?: string;
}

const BAND_META: Record<FuelBand, { label: string; tone: ToneV4 }> = {
  low: { label: 'Low', tone: 'danger' },
  fair: { label: 'Fair', tone: 'warn' },
  good: { label: 'Good', tone: 'success' },
};

function bandFor(pct: number, low: number): FuelBand {
  if (pct <= low) return 'low';
  if (pct <= low * 2.5) return 'fair';
  return 'good';
}

/**
 * **V4 fuel / charge gauge** — the web twin of the native
 * `FuelChargeGaugeV4`, same props as {@link FuelChargeGauge} plus
 * `bandLabels` and `chargingLabel`.
 *
 * ## Four changes
 *
 * 1. **The percentage takes contrast-corrected ink** — the base painted the
 *    largest number in the component with a **fill** slot.
 * 2. **The glyph is an element, not part of the string**, so it can be tinted
 *    and is not read aloud as the emoji's name.
 * 3. **The meter is a real `role="progressbar"`** with its value, rather than
 *    a decorative div.
 * 4. **The band word is a prop**, and the whole gauge has one spoken name.
 */
export const FuelChargeGaugeV4 = React.forwardRef<HTMLDivElement, FuelChargeGaugeV4Props>(
  function FuelChargeGaugeV4(
    {
      percent,
      kind = 'fuel',
      label,
      rangeLabel,
      lowThreshold = 15,
      charging = false,
      variant = 'bar',
      bandLabels,
      chargingLabel = 'Charging',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const compact = variant === 'compact';

    if (loading) {
      return (
        <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
          <div className={cn('h-3 w-2/5', SKELETON_CLASS)} />
          <div className={cn(compact ? 'h-1.5' : 'h-2', 'w-full', SKELETON_CLASS)} />
        </div>
      );
    }

    const pct = clampPercent(percent) ?? 0;
    const low = Number.isFinite(lowThreshold) ? lowThreshold : 15;
    const meta = BAND_META[bandFor(pct, low)];
    const word = bandLabels?.[bandFor(pct, low)] ?? meta.label;
    const heading = label ?? (kind === 'ev' ? 'Battery' : 'Fuel');
    const glyph = kind === 'ev' ? (charging ? '⚡' : '🔋') : '⛽';

    const spoken = [heading, charging ? chargingLabel : null, `${pct} percent`, word, rangeLabel]
      .filter(Boolean)
      .join(', ');

    return (
      <div
        ref={ref}
        data-xen-fuel-gauge={kind}
        aria-label={spoken}
        className={cn('flex flex-col gap-xs', className)}
        {...rest}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-xs text-sm font-semibold text-on-surface">
            <IconV4 glyph={glyph} size="sm" />
            {heading}
            {charging ? <span className="text-xs text-primary-text">{chargingLabel}</span> : null}
          </span>
          <span className="flex items-baseline gap-xs">
            <span
              className={cn(
                'text-base font-bold [font-variant-numeric:tabular-nums]',
                TONE_INK[meta.tone]
              )}
            >
              {pct}%
            </span>
            <span className="text-xs text-muted-text">{word}</span>
          </span>
        </div>

        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={pct}
          className={cn('w-full overflow-hidden rounded-full bg-muted', compact ? 'h-1.5' : 'h-2')}
        >
          <div
            className={cn('h-full rounded-full', TONE_BG[meta.tone])}
            style={{ width: `${pct}%` }}
          />
        </div>

        {rangeLabel && !compact ? (
          <p className="text-xs text-muted-text [font-variant-numeric:tabular-nums]">
            {rangeLabel}
          </p>
        ) : null}
      </div>
    );
  }
);
