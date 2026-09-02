import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { TONE_BG, TONE_INK } from '../primitives/internal/tone-v4';
import { meterParts } from './family-v4';
import type { ScreenTimeBarProps } from './ScreenTimeBar';
import {
  KIDS_CARD_CLASS,
  KIDS_CARD_GROUND_CLASS,
  meterAria,
  spokenLine,
  TRACK_CLASS,
} from './internal/tone-v4';

export interface ScreenTimeBarV4Props extends ScreenTimeBarProps {
  /** The note under a reading with no limit behind it. Default `emptyLabel`. */
  noLimitLabel?: string;
  /** Leads the overage. Default `'over by'`. */
  overLabel?: string;
  /** Follows the remainder. Default `'left'`. */
  remainingLabel?: string;
  /** Render a duration. Default splits hours and minutes, in any unit. */
  formatDuration?: (minutes: number) => string;
}

/** The share of the limit at which the reading starts calling itself close. */
const NEAR_RATIO = 0.8;

/**
 * The default duration formatter.
 *
 * The base wrote `if (unit !== 'min') return ${mins} ${unit}` — so the hour and
 * minute split was gated on the literal English string `'min'`, and a caller
 * who passed `unit="Min."`, `unit="minutos"` or anything else got a bare
 * `245 minutos` where an English caller got `4h 5m`. The split is a property of
 * *time*, not of the word for it, so it always happens; the caller's unit is
 * the word used below an hour, where it is the only word there is.
 */
function splitDuration(minutes: number, unit: string): string {
  const sign = minutes < 0 ? '−' : '';
  const total = Math.round(Math.abs(minutes));
  if (total < 60) return `${sign}${total} ${unit}`;
  const hours = Math.floor(total / 60);
  const rest = total % 60;
  return rest === 0 ? `${sign}${hours}h` : `${sign}${hours}h ${rest}m`;
}

/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Six changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base rendered the
 *    shared empty state — the parent was told "No screen-time limit set" and
 *    never told the child had been on the device for four hours. That is the
 *    one screen where the number matters most. The reading is now always drawn;
 *    "no limit set" becomes a note beside it rather than a replacement for it.
 * 2. **A broken reading is reported, not laundered.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though the sync were sound, and `used={NaN}`
 *    reached the screen as "NaNh NaNm" with a CSS width of the string `NaN%`.
 *    `meterParts` keeps `valid` separate from nought: an unusable measurement
 *    draws an empty state instead of a confident zero, and a negative one
 *    still reports what it was handed.
 * 3. **The meter's range is valid.** `used={180} limit={120}` announced
 *    `aria-valuenow="180"` against `aria-valuemax="120"`, which a reader says
 *    out loud as "180 of 120". The clamp belongs to the bar's width; the real
 *    number goes into `aria-valuetext`, in words.
 * 4. **The unit is no longer hard-coded.** See {@link splitDuration} — the
 *    hour/minute split was gated on the literal `'min'`, so every translated
 *    unit lost its formatting entirely.
 * 5. **Over the limit is `warn`, never `danger`.** A child past their screen
 *    time is a measurement outside its band, not a system failure — the same
 *    reading `health` settled on for a vital outside range. The two states are
 *    told apart by their words, which is what a colour-blind parent reads
 *    anyway.
 * 6. **Loading draws the shape it is about to be**, and the card sits on
 *    `card`/`on-card` so it still reads as raised in dark mode.
 */
export const ScreenTimeBarV4 = React.forwardRef<HTMLDivElement, ScreenTimeBarV4Props>(
  function ScreenTimeBarV4(
    {
      used,
      limit,
      unit = 'min',
      label = 'Screen time',
      loading = false,
      emptyLabel = 'No screen-time limit set',
      noLimitLabel,
      overLabel = 'over by',
      remainingLabel = 'left',
      formatDuration,
      className,
      ...rest
    },
    ref
  ) {
    const show = formatDuration ?? ((minutes: number) => splitDuration(minutes, unit));
    const parts = meterParts(used, limit);

    if (loading) {
      return (
        <div
          {...rest}
          ref={ref}
          data-xen-screen-time-bar=""
          role="status"
          aria-live="polite"
          aria-label={label}
          className={cn(
            'flex flex-col gap-sm',
            KIDS_CARD_CLASS,
            KIDS_CARD_GROUND_CLASS,
            className
          )}
        >
          <SkeletonV4 className="h-3 w-2/5" />
          <SkeletonV4 className="h-2 w-full rounded-full" />
        </div>
      );
    }

    // `valid: false` means the caller handed us NaN. A confident "0 min" would
    // be a claim about a child's day that nothing supports.
    if (!parts.valid) {
      return (
        <EmptyStateV4
          {...rest}
          ref={ref}
          data-xen-screen-time-bar=""
          className={className}
          icon={<span className="text-3xl">⏱️</span>}
          title={label}
          description={emptyLabel}
        />
      );
    }

    const ratio = parts.ratio ?? 0;
    const near = parts.hasLimit && ratio >= NEAR_RATIO;
    const tone = near ? 'warn' : 'primary';

    const note = !parts.hasLimit
      ? (noLimitLabel ?? emptyLabel)
      : parts.over > 0
        ? `${overLabel} ${show(parts.over)}`
        : `${show(parts.remaining)} ${remainingLabel}`;

    const readout = parts.hasLimit ? `${show(parts.value)} / ${show(parts.limit ?? 0)}` : show(parts.value);

    return (
      <div
        {...rest}
        ref={ref}
        data-xen-screen-time-bar=""
        className={cn('flex flex-col gap-sm', KIDS_CARD_CLASS, KIDS_CARD_GROUND_CLASS, className)}
      >
        <div className="flex items-baseline justify-between gap-sm">
          <span className="text-base font-semibold text-on-card">{label}</span>
          <span
            className={cn('text-sm font-bold', near ? TONE_INK.warn : 'text-on-card')}
          >
            {readout}
          </span>
        </div>

        {/*
          A sibling of nothing, deliberately: this card has no activation, so
          the meter keeps its own role and its own value rather than being
          flattened into a button's label.
        */}
        {parts.hasLimit ? (
          <div
            {...meterAria(
              parts,
              spokenLine([`${show(parts.value)} of ${show(parts.limit ?? 0)}`, `${parts.percent}%`, note])
            )}
            aria-label={label}
            className={cn('h-2 w-full overflow-hidden rounded-full', TRACK_CLASS)}
          >
            <div
              className={cn('h-full rounded-full', TONE_BG[tone])}
              style={{ width: `${parts.percent ?? 0}%` }}
            />
          </div>
        ) : null}

        <p className={cn('text-xs', parts.over > 0 ? cn('font-semibold', TONE_INK.warn) : 'text-muted-text')}>
          {parts.over > 0 ? `⚠️ ${note}` : note}
        </p>
      </div>
    );
  }
);
