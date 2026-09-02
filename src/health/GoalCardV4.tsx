import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG, TONE_INK } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { goalParts } from './goal-v4';
import type { GoalCardProps } from './GoalCard';
import {
  appearanceClass,
  appearanceStateVars,
  FOCUS_RING_CLASS,
  HEALTH_CARD_CLASS,
  spokenLine,
  TRACK_CLASS,
  type Appearance,
} from './internal/tone-v4';

export interface GoalCardV4Props extends GoalCardProps {
  /** Copy when no usable target was given. Default `'No target set'`. */
  noGoalLabel?: string;
  /** Copy on the reached-goal note. Default `'Goal met'`. */
  metLabel?: string;
  /** Render the measurement and the target. Default `'12400 steps'`. */
  formatValue?: (value: number, unit?: string) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/**
 * **V4 goal card** — same props as {@link GoalCard} plus `noGoalLabel`,
 * `metLabel`, `formatValue` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **A walk of 12,400 steps against a 10,000 target no longer reports three
 *    different numbers.** The base showed `12400`, announced "12400 of 10000,
 *    100%" and set `aria-valuenow={10000}` — the measurement, the percentage
 *    and the meter each disagreed with the other two. `goalParts` keeps the
 *    measurement and the drawn fraction apart, so the bar fills to 100%, the
 *    meter reports a consistent 100% of its own range, and the overshoot is
 *    said out loud in `aria-valuetext` and printed on the card.
 * 2. **The meter is reachable.** The whole card was a `role="button"`, and a
 *    `progressbar` inside a button is presentational — its value is dropped
 *    outright. The card is now a plain container, the activation wraps only the
 *    title-and-value region and carries the card's spoken name, and the bar
 *    sits beside it with its own role and its own value.
 * 3. **The activation is a real `<button>`.** A `div` with `role="button"`,
 *    `tabIndex={0}` and a hand-written Enter/Space handler is three
 *    approximations of what a button already does, and it was 40px tall on a
 *    thumb-driven screen.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled*.
 * 5. **A goal of nought is "no target", not 0%.** `target={0}` drew an empty
 *    track under a real measurement.
 * 6. **The ink is the corrected slot and the track is not a hairline.** The
 *    "Goal met" note and the value drew in `text-success`, the *fill* token,
 *    measured as low as 1.32:1; the track was `bg-border`, the hairline colour
 *    doing a surface's job.
 */
export const GoalCardV4 = React.forwardRef<HTMLDivElement, GoalCardV4Props>(function GoalCardV4(
  {
    title,
    value,
    target,
    unit,
    color = 'primary',
    icon,
    onPress,
    noGoalLabel = 'No target set',
    metLabel = 'Goal met',
    formatValue,
    appearance = 'classic',
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  }, []);

  const parts = goalParts(value, target);
  const show =
    formatValue ?? ((amount: number, suffix?: string) => `${amount}${suffix ? ` ${suffix}` : ''}`);
  const barTone = parts.met ? 'success' : color;

  // The overshoot is the interesting fact about an exceeded goal, so it is a
  // sentence rather than a number the card silently threw away.
  const overText = parts.over > 0 ? `+${show(parts.over, unit)}` : undefined;

  const name = spokenLine([
    title,
    parts.hasGoal
      ? `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`
      : show(parts.value, unit),
    parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
    parts.met ? metLabel : undefined,
    overText,
  ]);

  const head = (
    <>
      <span className="flex items-center gap-sm">
        {icon ? (
          <span aria-hidden className="leading-none">
            {icon}
          </span>
        ) : null}
        <span className="min-w-0 flex-1 truncate text-base font-semibold text-on-card">{title}</span>
        {parts.met ? (
          <span className={cn('text-xs font-bold', TONE_INK.success)}>{`✓ ${metLabel}`}</span>
        ) : null}
      </span>
      <span className="flex items-baseline gap-xs">
        <span
          className={cn('text-2xl font-bold', parts.met ? TONE_INK.success : 'text-on-card')}
        >
          {show(parts.value, undefined)}
        </span>
        {parts.hasGoal ? (
          <span className="text-sm text-muted-text">{`/ ${show(parts.target ?? 0, unit)}`}</span>
        ) : unit ? (
          <span className="text-sm text-muted-text">{unit}</span>
        ) : null}
        {overText ? (
          <span className={cn('text-xs font-semibold', TONE_INK.success)}>{overText}</span>
        ) : null}
      </span>
    </>
  );

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col gap-sm',
        HEALTH_CARD_CLASS,
        appearanceClass(appearance),
        className
      )}
      {...rest}
    >
      {onPress ? (
        <button
          type="button"
          aria-label={name}
          onClick={onPress}
          data-xen-v4-state=""
          style={appearanceStateVars(appearance)}
          className={cn(
            'flex flex-col gap-xs rounded-[var(--xen-radius-md)] bg-transparent text-left',
            MIN_TAP_CLASS,
            FOCUS_RING_CLASS
          )}
        >
          {head}
        </button>
      ) : (
        <span className="flex flex-col gap-xs">{head}</span>
      )}

      {/*
        A sibling of the activation, never a descendant: inside `role="button"`
        this meter's value is presentational and never reaches the reader.
      */}
      {parts.hasGoal ? (
        <div
          role="progressbar"
          aria-valuenow={Math.round((parts.ratio ?? 0) * (parts.target ?? 0))}
          aria-valuemin={0}
          aria-valuemax={parts.target}
          aria-valuetext={spokenLine([
            `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`,
            `${parts.percent}%`,
            overText,
          ])}
          aria-label={title}
          className={cn('h-2 overflow-hidden rounded-full', TRACK_CLASS)}
        >
          <div
            className={cn('h-full rounded-full', TONE_BG[barTone])}
            style={{ width: `${parts.percent ?? 0}%` }}
          />
        </div>
      ) : (
        <span className="text-xs text-muted-text">{noGoalLabel}</span>
      )}
    </div>
  );
});
