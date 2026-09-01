import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, clampPercent } from '../primitives/internal/tone-v4';
import { SKELETON_CLASS, TONE_INK, type ToneV4 } from './internal/profile-v4';
import type { CompatibilityMeterProps, CompatibilityMeterSize } from './CompatibilityMeter';

export interface CompatibilityMeterV4Props extends CompatibilityMeterProps {
  /** Render the score. Default `'85%'`. */
  formatValue?: (value: number) => string;
}

interface Band {
  word: string;
  tone: ToneV4;
}

/**
 * Score bands. The band is always spelled out, so the reading never rests on
 * colour — and the bottom band is `neutral`, not `muted`: `muted` is a ramp
 * step with no contrast promise, and the base spent it as a **4px ring** and a
 * **status dot**, which is the one thing a decorative slot must never be.
 */
function bandFor(score: number): Band {
  if (score >= 80) return { word: 'Great match', tone: 'success' };
  if (score >= 55) return { word: 'Good match', tone: 'primary' };
  if (score >= 30) return { word: 'Some overlap', tone: 'accent' };
  return { word: 'Low overlap', tone: 'neutral' };
}

/** The ring's stroke colour. `neutral` takes the hairline, never `border-muted`. */
const BAND_RING: Record<ToneV4, string> = {
  neutral: 'border-border',
  muted: 'border-border',
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warn: 'border-warn',
  danger: 'border-danger',
};

/**
 * Ring diameters, composed from the spacing scale: **48 / 64 / 96**
 * (`2xl`, `2xl + md`, `2xl * 2`). The stroke is `xs` — 4 — at every size.
 *
 * Both numbers are here rather than at the call site because "the same ring on
 * both twins" is the requirement, and a ring that is 64 on one platform and 56
 * on the other is the same defect as a button that is 64 and 68.
 */
const RING_SIZE: Record<CompatibilityMeterSize, string> = {
  sm: 'h-2xl w-2xl text-base',
  md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] text-lg',
  lg: 'h-[calc(var(--xen-space-2xl)_*_2)] w-[calc(var(--xen-space-2xl)_*_2)] text-2xl',
};

const RING_STROKE = 'border-[length:var(--xen-space-xs)]';

/** The track: the same quantity, unfilled — not a grey channel. */
const TRACK_CLASS = 'bg-[color-mix(in_srgb,var(--xen-on-surface)_10%,var(--xen-surface))]';

/**
 * **V4 compatibility meter** — the web twin of the native
 * `CompatibilityMeterV4`, same props as {@link CompatibilityMeter} plus
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **`compact` is a meter.** It drew a percentage and a band word inside a
 *    pill and exposed **no role at all** on web, so a screen reader got a
 *    sentence fragment and no value; native downgraded the same variant to
 *    plain prose. All three variants now report `role="progressbar"` with the
 *    number on it, which is what the component exists to say.
 * 2. **The ring is one ring.** Same three diameters and the same 4 stroke on
 *    both twins, composed from the spacing scale — see {@link RING_SIZE}.
 * 3. **The band's colour reaches the bar's own value text**, as it already did
 *    on web and did not on native, and it is the contrast-corrected `*Text`
 *    slot rather than the fill: `text-success` is a *fill* token, and a fill
 *    has no contrast promise as ink.
 * 4. **The bar's fill is the band's own tone.** The base ran the ring, the dot
 *    and the value text through one table and the bar through a second, which
 *    mapped the `accent` band onto `warn` — so a middling match was drawn in
 *    the colour that means something has gone wrong, and the bar disagreed with
 *    the number printed above it. The bar is drawn here rather than delegated
 *    to `Progress` for exactly that reason: `ProgressTone` has no `accent` and
 *    no `neutral`, and inventing a mapping is how the two disagreed.
 *
 * The skeleton is the opaque shared mix, not `bg-neutral-200` — a ramp step
 * that is a near-white slab on a dark page.
 */
export const CompatibilityMeterV4 = React.forwardRef<HTMLDivElement, CompatibilityMeterV4Props>(
  function CompatibilityMeterV4(
    {
      score,
      label = 'Compatibility',
      showValue = true,
      variant = 'bar',
      size = 'md',
      loading = false,
      formatValue,
      className,
      ...rest
    },
    ref
  ) {
    const clamped = Math.round(clampPercent(score) ?? 0);
    const band = bandFor(clamped);
    const valueText = (formatValue ?? ((value: number) => `${value}%`))(clamped);

    if (loading) {
      return (
        <div
          ref={ref}
          role="progressbar"
          aria-busy="true"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          className={cn('flex flex-col gap-xs', className)}
          {...rest}
        >
          <div className={cn('h-sm w-1/2', SKELETON_CLASS)} />
          <div className={cn('h-sm rounded-full', SKELETON_CLASS)} />
        </div>
      );
    }

    const meter = {
      role: 'progressbar' as const,
      'aria-label': label,
      'aria-valuenow': clamped,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuetext': `${valueText}, ${band.word}`,
    };

    if (variant === 'ring') {
      return (
        <div
          ref={ref}
          {...meter}
          className={cn('flex flex-col items-center gap-xs', className)}
          {...rest}
        >
          <div
            aria-hidden="true"
            className={cn(
              'flex items-center justify-center rounded-full bg-surface font-bold',
              RING_STROKE,
              BAND_RING[band.tone],
              TONE_INK[band.tone],
              RING_SIZE[size]
            )}
          >
            {showValue ? <span>{valueText}</span> : null}
          </div>
          <span aria-hidden="true" className="text-xs text-muted-text">
            {band.word}
          </span>
        </div>
      );
    }

    if (variant === 'compact') {
      return (
        <div
          ref={ref}
          {...meter}
          className={cn(
            'inline-flex items-center gap-xs self-start rounded-full px-sm py-xs',
            TRACK_CLASS,
            className
          )}
          {...rest}
        >
          <span aria-hidden="true" className={cn('text-sm font-semibold', TONE_INK[band.tone])}>
            {valueText}
          </span>
          <span aria-hidden="true" className="text-sm text-muted-text">
            {band.word}
          </span>
        </div>
      );
    }

    return (
      <div ref={ref} {...meter} className={cn('flex flex-col gap-xs', className)} {...rest}>
        <div aria-hidden="true" className="flex items-center justify-between gap-sm">
          <span className="text-sm font-semibold text-on-surface">{label}</span>
          {showValue ? (
            <span className={cn('text-sm font-semibold', TONE_INK[band.tone])}>
              {valueText} · {band.word}
            </span>
          ) : null}
        </div>
        <div
          aria-hidden="true"
          className={cn(
            'w-full overflow-hidden rounded-full',
            size === 'sm' ? 'h-xs' : 'h-sm',
            TRACK_CLASS
          )}
        >
          <div
            className={cn('h-full rounded-full', TONE_BG[band.tone])}
            style={{ width: `${clamped}%` }}
          />
        </div>
      </div>
    );
  }
);
