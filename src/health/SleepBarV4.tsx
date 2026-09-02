import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_BG, TONE_INK, type ToneV4 } from '../primitives/internal/tone-v4';
import { goalParts } from './goal-v4';
import type { SleepBarProps, SleepQuality } from './SleepBar';
import {
  appearanceClass,
  HEALTH_CARD_CLASS,
  spokenLine,
  TRACK_CLASS,
  type Appearance,
} from './internal/tone-v4';

export interface SleepBarV4Props extends SleepBarProps {
  /** Copy when no usable goal was given. Default `'No goal set'`. */
  noGoalLabel?: string;
  /** Override the four quality words. */
  qualityLabels?: Partial<Record<SleepQuality, string>>;
  /** Render an hours figure. Default `'7.5h'`. */
  formatHours?: (hours: number) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/**
 * Quality is a **verdict**, so it is the one thing in this card entitled to a
 * status colour — unlike a discipline or a macro, which the V4 pass moved off
 * `success`/`warn`/`danger` precisely so a verdict could keep them.
 */
const QUALITY_TONE: Record<SleepQuality, ToneV4> = {
  poor: 'danger',
  fair: 'warn',
  good: 'primary',
  excellent: 'success',
};

/** The meter's name. Not a prop: the spec's table settles this component's copy surface. */
const METER_NAME = 'Sleep';

const QUALITY_LABEL: Record<SleepQuality, string> = {
  poor: 'Poor',
  fair: 'Fair',
  good: 'Good',
  excellent: 'Excellent',
};

/**
 * **V4 sleep bar** — same props as {@link SleepBar} plus `noGoalLabel`,
 * `qualityLabels`, `formatHours` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **`goal={0}` drew an empty bar for a night that was fully slept.** Nought
 *    was read as *nought per cent* rather than as *no goal*, so 7.5 hours with
 *    no target set rendered as a completely unfilled track — the picture of a
 *    terrible night. There is now a "no goal" branch that prints the hours and
 *    draws no track at all.
 * 2. **The bar is a meter.** It was a pair of nested `div`s with a width and
 *    nothing else; the one proportion the card exists to show was invisible to
 *    a screen reader.
 * 3. **A bare `<div>` was carrying the card's `aria-label`.** Role `generic`
 *    cannot be named and browsers drop the attribute, so the sentence that was
 *    supposed to summarise the night reached nobody. The card is a named
 *    `group` and the meter carries its own value.
 * 4. **The quality word is inked with the corrected slot.** `text-success` is
 *    `var(--xen-success)`, a *fill*, and measures as low as 1.32:1 as text.
 * 5. **The track is not `bg-border`** — a hairline colour is not a surface.
 */
export const SleepBarV4 = React.forwardRef<HTMLDivElement, SleepBarV4Props>(function SleepBarV4(
  {
    hours,
    goal = 8,
    quality,
    bedtime,
    wakeTime,
    noGoalLabel = 'No goal set',
    qualityLabels,
    formatHours,
    appearance = 'classic',
    className,
    ...rest
  },
  ref
) {
  const parts = goalParts(hours, goal);
  const showHours = formatHours ?? ((value: number) => `${value}h`);
  const tone: ToneV4 = quality ? QUALITY_TONE[quality] : 'primary';
  const qualityWord = quality ? (qualityLabels?.[quality] ?? QUALITY_LABEL[quality]) : undefined;

  const summary = spokenLine([
    METER_NAME,
    parts.hasGoal
      ? `${showHours(parts.value)} of ${showHours(parts.target ?? 0)}`
      : showHours(parts.value),
    parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
    qualityWord,
    bedtime,
    wakeTime,
  ]);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={summary}
      className={cn(
        'flex flex-col gap-sm',
        HEALTH_CARD_CLASS,
        appearanceClass(appearance),
        className
      )}
      {...rest}
    >
      <div className="flex items-end justify-between">
        <span className="flex items-baseline gap-xs">
          <span aria-hidden className="text-base leading-none">
            😴
          </span>
          <span className="text-2xl font-bold text-on-card">{showHours(parts.value)}</span>
          {parts.hasGoal ? (
            <span className="text-sm text-muted-text">{`/ ${showHours(parts.target ?? 0)}`}</span>
          ) : null}
        </span>
        {qualityWord ? (
          <span className={cn('text-xs font-bold', TONE_INK[tone])}>{qualityWord}</span>
        ) : null}
      </div>

      {parts.hasGoal ? (
        <div
          role="progressbar"
          aria-label={METER_NAME}
          aria-valuenow={parts.percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuetext={spokenLine([
            `${showHours(parts.value)} of ${showHours(parts.target ?? 0)}`,
            `${parts.percent}%`,
            parts.over > 0 ? `+${showHours(parts.over)}` : undefined,
          ])}
          className={cn('h-2 overflow-hidden rounded-full', TRACK_CLASS)}
        >
          <div
            className={cn('h-full rounded-full', TONE_BG[tone])}
            style={{ width: `${parts.percent ?? 0}%` }}
          />
        </div>
      ) : (
        // Not a 0% track: a night with no target is unmeasured, not unslept.
        <span className="text-xs text-muted-text">{noGoalLabel}</span>
      )}

      {bedtime || wakeTime ? (
        <div className="flex justify-between">
          <span className="text-xs text-muted-text">{bedtime ? `🌙 ${bedtime}` : ''}</span>
          <span className="text-xs text-muted-text">{wakeTime ? `☀️ ${wakeTime}` : ''}</span>
        </div>
      ) : null}
    </div>
  );
});
