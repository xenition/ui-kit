import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, TONE_INK } from '../primitives/internal/tone-v4';
import { rangeVerdict, type HealthRange, type RangeVerdict } from './goal-v4';
import {
  appearanceClass,
  HEALTH_TILE_CLASS,
  spokenLine,
  TRACK_CLASS,
  VERDICT_LABEL,
  VERDICT_TONE,
  type Appearance,
} from './internal/tone-v4';

export interface HealthRangeBarV4Props extends React.HTMLAttributes<HTMLDivElement> {
  /** What is being measured, e.g. `'Fasting glucose'`. */
  label: string;
  /** The reading. */
  value: number;
  /** The normal band. Either bound may be omitted for a one-sided range. */
  range?: HealthRange;
  /** Unit suffix, e.g. `'mg/dL'`. */
  unit?: string;
  /** Scale start. Derived from the band when omitted. */
  min?: number;
  /** Scale end. Derived from the band when omitted. */
  max?: number;
  /** Override the three verdict words. */
  rangeLabels?: Partial<Record<RangeVerdict, string>>;
  /** Render a figure. Default `'95 mg/dL'`. */
  formatValue?: (value: number, unit?: string) => string;
  /** Copy when no usable band was given. Default `'No range set'`. */
  emptyLabel?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/** How far past the band the scale runs, as a fraction of the band's width. */
const SCALE_MARGIN = 0.5;

/**
 * The scale the bar is drawn on.
 *
 * Derived from the band rather than from the reading, so the same metric draws
 * the same picture from one day to the next — a scale that rescaled itself
 * around today's number would make every reading look equally central. It is
 * then widened, if it has to be, to keep an out-of-range reading on the bar
 * instead of pinned silently to an end.
 */
function scaleFor(
  value: number,
  range: HealthRange,
  min?: number,
  max?: number
): { start: number; end: number } {
  const { low, high } = range;
  let start: number;
  let end: number;
  if (low !== undefined && high !== undefined) {
    const span = Math.max(high - low, Number.EPSILON);
    start = low - span * SCALE_MARGIN;
    end = high + span * SCALE_MARGIN;
  } else if (high !== undefined) {
    start = Math.min(0, high);
    end = high * (1 + SCALE_MARGIN);
  } else {
    const bound = low ?? 0;
    start = Math.min(0, bound);
    end = bound * (1 + SCALE_MARGIN);
  }
  start = min ?? Math.min(start, value);
  end = max ?? Math.max(end, value);
  return end > start ? { start, end } : { start, end: start + 1 };
}

/**
 * **V4 health range bar** — a reading plotted against its normal band: the band
 * drawn as a region, the reading as a marker, the verdict as a word.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **The module could not say "out of range".** `VitalStat` fixed its tone by
 *    `variant`, so a fasting glucose of 260 mg/dL rendered identically to 95
 *    and a dangerous 190 bpm drew in the same permanent red as a resting 58.
 *    `VitalStatV4` and `BodyMetricCardV4` can now take a `range` — and this is
 *    the component that *shows* one, rather than reducing it to a tinted
 *    numeral.
 * 2. **A number is not a position.** "95 mg/dL" tells a reader nothing unless
 *    they already know the band. Drawing the band is the whole point.
 * 3. **The verdict is a word as well as a colour**, so nothing here depends on
 *    telling amber from red — and the bar is a real `progressbar` rather than a
 *    picture of one, so the position is available to a reader who cannot see it
 *    at all.
 */
export const HealthRangeBarV4 = React.forwardRef<HTMLDivElement, HealthRangeBarV4Props>(
  function HealthRangeBarV4(
    {
      label,
      value,
      range,
      unit,
      min,
      max,
      rangeLabels,
      formatValue,
      emptyLabel = 'No range set',
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    // A frame around nothing is worse than nothing: with no name to say or no
    // reading to place, there is no bar to draw. A missing *band* is different
    // — that is the `emptyLabel` state below, because the reading is still real
    // and still worth showing. The native twin guards identically.
    if (!label || !Number.isFinite(value)) return null;

    const show =
      formatValue ?? ((amount: number, suffix?: string) => `${amount}${suffix ? ` ${suffix}` : ''}`);
    const verdict = rangeVerdict(value, range);
    const shell = cn(
      'flex flex-col gap-sm',
      HEALTH_TILE_CLASS,
      appearanceClass(appearance),
      className
    );

    if (!verdict || !range) {
      // "We do not know" stays distinct from "in range" and borrows no colour.
      return (
        <div
          ref={ref}
          role="group"
          aria-label={spokenLine([label, show(value, unit), emptyLabel])}
          className={shell}
          {...rest}
        >
          <span className="text-xs text-muted-text">{label}</span>
          <span className="text-2xl font-bold text-on-card">{show(value, unit)}</span>
          <span className="text-xs text-muted-text">{emptyLabel}</span>
        </div>
      );
    }

    const word = rangeLabels?.[verdict] ?? VERDICT_LABEL[verdict];
    const tone = VERDICT_TONE[verdict];
    const { start, end } = scaleFor(value, range, min, max);
    const span = end - start;
    const at = (point: number): number => Math.min(Math.max((point - start) / span, 0), 1) * 100;

    const bandStart = at(range.low ?? start);
    const bandEnd = at(range.high ?? end);
    // Numerals and mathematical signs rather than words, so the band's caption
    // needs no translation and no prop of its own.
    const bandText =
      range.low !== undefined && range.high !== undefined
        ? `${show(range.low, undefined)} – ${show(range.high, unit)}`
        : range.high !== undefined
          ? `≤ ${show(range.high, unit)}`
          : range.low !== undefined
            ? `≥ ${show(range.low, unit)}`
            : undefined;

    return (
      <div ref={ref} className={shell} {...rest}>
        <div className="flex items-baseline justify-between gap-sm">
          <span className="min-w-0 truncate text-xs text-muted-text">{label}</span>
          <span className={cn('text-xs font-semibold', TONE_INK[tone])}>{word}</span>
        </div>

        <span className="text-2xl font-bold text-on-card">{show(value, unit)}</span>

        <div
          role="progressbar"
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={start}
          aria-valuemax={end}
          aria-valuetext={spokenLine([show(value, unit), word])}
          className={cn('relative h-2 w-full overflow-hidden rounded-full', TRACK_CLASS)}
        >
          {/* The normal band: the reading's position only means something against it. */}
          <span
            aria-hidden
            className="absolute inset-y-0 bg-[color-mix(in_srgb,var(--xen-success)_28%,var(--xen-card))]"
            style={{ left: `${bandStart}%`, width: `${Math.max(bandEnd - bandStart, 0)}%` }}
          />
          <span
            aria-hidden
            className={cn('absolute inset-y-0 w-1 -translate-x-1/2 rounded-full', TONE_BG[tone])}
            style={{ left: `${at(value)}%` }}
          />
        </div>

        {bandText ? (
          <span className="text-xs text-muted-text">{bandText}</span>
        ) : null}
      </div>
    );
  }
);
