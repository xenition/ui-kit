import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_INK } from '../primitives/internal/tone-v4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { goalParts } from './goal-v4';
import type { WaterTrackerProps } from './WaterTracker';
import {
  appearanceClass,
  appearanceStateVars,
  FOCUS_RING_CLASS,
  HEALTH_CARD_CLASS,
  spokenLine,
  TRACK_CLASS,
  type Appearance,
} from './internal/tone-v4';

export interface WaterTrackerV4Props extends WaterTrackerProps {
  /** Copy when no usable goal was given. Default `'No hydration goal set'`. */
  noGoalLabel?: string;
  /** Render the volume total. Default `'2500 ml'`. */
  formatAmount?: (ml: number) => string;
  /** Name one glass. Default `'Glass 3, filled'`. */
  glassLabel?: (index: number, filled: boolean) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/** The card's own copy. The spec's table settles this component's copy surface. */
const TITLE = 'Water';
const MET_LABEL = 'Goal reached';

/**
 * **V4 water tracker** — same props as {@link WaterTracker} plus `noGoalLabel`,
 * `formatAmount`, `glassLabel` and `appearance`.
 *
 * ## Six changes
 *
 * 1. **Ten glasses against a goal of eight no longer displays "8 / 8".** The
 *    base clamped the *measurement*, so someone who logged 10 glasses and
 *    2,500 ml was shown 8 and 2,000 and told "goal reached" — the overshoot,
 *    which is the one interesting fact on the card, was destroyed rather than
 *    merely not drawn. The readout, the millilitres and the glasses now all
 *    carry it; only the meter's fill is clamped.
 * 2. **Filled and empty are different objects.** `{isFilled ? '🥛' : '🥛'}` was
 *    a dead ternary and the two states were separated by `opacity: 0.3` alone —
 *    which is also, near enough, how a disabled control looks, and is invisible
 *    to anyone who cannot see fine contrast. A full glass is now a filled disc
 *    with a drop in it and an empty one is an open ring.
 * 3. **A glass is a 44px target.** They were about 20px, and they are the most
 *    tapped control on a hydration screen.
 * 4. **The card exposes its progress.** It drew a `filled / goal` readout and
 *    no meter at all.
 * 5. **Press is a state layer**, not `hover:opacity-70` — see change 2 for why
 *    dimming a control cannot mean two things at once.
 * 6. **The no-goal branch keeps `className` and `appearance`**, where the base
 *    returned a bare line of text and dropped both.
 */
export const WaterTrackerV4 = React.forwardRef<HTMLDivElement, WaterTrackerV4Props>(
  function WaterTrackerV4(
    {
      count,
      goal,
      mlPerGlass,
      onChange,
      noGoalLabel = 'No hydration goal set',
      formatAmount,
      glassLabel,
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const shell = cn(
      'flex flex-col gap-md',
      HEALTH_CARD_CLASS,
      appearanceClass(appearance),
      className
    );

    const logged = Math.max(Math.floor(count), 0);
    const parts = goalParts(logged, Math.floor(goal));

    if (!parts.hasGoal) {
      return (
        <div ref={ref} className={shell} {...rest}>
          <span className="text-sm text-muted-text">{noGoalLabel}</span>
        </div>
      );
    }

    const target = parts.target ?? 0;
    const amount = formatAmount ?? ((ml: number) => `${ml} ml`);
    const nameGlass =
      glassLabel ??
      ((index: number, filled: boolean) =>
        `Glass ${index + 1}, ${filled ? 'filled' : 'empty'}`);

    // Draw every glass that was logged, not only the ones the goal asked for:
    // the extra glasses ARE the overshoot, so hiding them hides it.
    const slots = Math.max(target, logged);

    const handlePress = (index: number): void => {
      if (!onChange) return;
      const position = index + 1;
      onChange(position === logged ? position - 1 : position);
    };

    return (
      <div ref={ref} className={shell} {...rest}>
        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-on-card">
            <span aria-hidden>💧 </span>
            {TITLE}
          </span>
          <span
            className={cn(
              'text-sm font-semibold',
              parts.met ? TONE_INK.success : 'text-muted-text'
            )}
          >
            {[
              `${logged} / ${target}`,
              mlPerGlass != null ? amount(logged * mlPerGlass) : undefined,
            ]
              .filter(Boolean)
              .join('  ·  ')}
          </span>
        </div>

        {/*
          A sibling of the glasses, not a wrapper around them: a meter inside an
          interactive element is presentational and its value never lands.
        */}
        <div
          role="progressbar"
          aria-label={TITLE}
          aria-valuenow={Math.min(logged, target)}
          aria-valuemin={0}
          aria-valuemax={target}
          aria-valuetext={spokenLine([
            `${logged} of ${target}`,
            mlPerGlass != null ? amount(logged * mlPerGlass) : undefined,
            parts.met ? MET_LABEL : undefined,
            parts.over > 0 ? `+${parts.over}` : undefined,
          ])}
          className={cn('h-2 overflow-hidden rounded-full', TRACK_CLASS)}
        >
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${parts.percent ?? 0}%` }}
          />
        </div>

        <div className="flex flex-wrap gap-sm">
          {Array.from({ length: slots }, (_, index) => {
            const filled = index < logged;
            const label = nameGlass(index, filled);
            // Shape and fill, not alpha: a ring and a disc are still two
            // different things to someone who cannot see a 30% opacity step.
            const glass = (
              <span
                aria-hidden
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm leading-none',
                  filled
                    ? 'border-primary bg-primary text-on-primary'
                    : 'border-border bg-transparent'
                )}
              >
                {filled ? '💧' : ''}
              </span>
            );

            if (!onChange) {
              return (
                <span key={index} role="img" aria-label={label} className="inline-flex">
                  {glass}
                </span>
              );
            }
            return (
              <button
                key={index}
                type="button"
                aria-label={label}
                aria-pressed={filled}
                onClick={() => handlePress(index)}
                data-xen-v4-state=""
                style={appearanceStateVars(appearance)}
                className={cn(
                  'flex min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] items-center justify-center',
                  'rounded-full bg-transparent',
                  MIN_TAP_CLASS,
                  FOCUS_RING_CLASS
                )}
              >
                {glass}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
);
