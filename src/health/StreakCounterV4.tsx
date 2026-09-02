import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_INK } from '../primitives/internal/tone-v4';
import { pluralizeUnit } from './goal-v4';
import type { StreakCounterProps } from './StreakCounter';
import { frameClass, spokenLine, type Appearance } from './internal/tone-v4';

export interface StreakCounterV4Props extends StreakCounterProps {
  /** The unit's plural. Default `` `${unit}s` `` — which is wrong outside English. */
  unitPlural?: string;
  /** Copy when the streak is nought. Default `'Start your streak'`. */
  emptyLabel?: string;
  /** Copy on the record sub-caption. Default `'Best'`. */
  bestLabel?: string;
  /** Render the count. Default `'12'`. */
  formatCount?: (count: number) => string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/**
 * **V4 streak counter** — same props as {@link StreakCounter} plus
 * `unitPlural`, `emptyLabel`, `bestLabel`, `formatCount` and `appearance`.
 *
 * ## Four changes
 *
 * 1. **`unit="día"` rendered "díass".** The base appended `'s'` unconditionally,
 *    so every non-English unit was wrong and every irregular English one too
 *    ("2 weeklys"). `pluralizeUnit` keeps the `'s'` default for callers who
 *    never said otherwise and lets everyone else pass `unitPlural`.
 * 2. **Four English strings are now props.** "Start your streak" and "Best:"
 *    were baked in, which meant a localised app could not use the component at
 *    all without forking it.
 * 3. **The number is inked with the corrected slot.** `TEXT_CLASS` maps
 *    `warn` — the default tone — to `text-warn`, which is `var(--xen-warn)`: a
 *    **fill**, with no contrast promise as text. The streak count is the
 *    largest thing on the component and was the least readable.
 * 4. **The record line is part of the name.** "Best: 40" sat outside the
 *    `group`'s label, so the one number that gives the current streak its
 *    meaning was sighted-only.
 */
export const StreakCounterV4 = React.forwardRef<HTMLDivElement, StreakCounterV4Props>(
  function StreakCounterV4(
    {
      count,
      unit = 'day',
      label = 'streak',
      tone = 'warn',
      best,
      unitPlural,
      emptyLabel = 'Start your streak',
      bestLabel = 'Best',
      formatCount,
      appearance = 'classic',
      className,
      ...rest
    },
    ref
  ) {
    const safe = Math.max(Math.floor(count), 0);
    const show = formatCount ?? ((value: number) => String(value));
    const unitWord = pluralizeUnit(safe, unit, unitPlural);
    const record = best != null && best > 0 ? Math.max(Math.floor(best), 0) : undefined;
    const recordLine = record != null ? `${bestLabel}: ${show(record)}` : undefined;

    return (
      <div
        ref={ref}
        role="group"
        aria-label={spokenLine([
          safe === 0 ? emptyLabel : `${show(safe)} ${unitWord} ${label}`,
          recordLine,
        ])}
        className={cn('flex flex-col items-center gap-xs', frameClass(appearance), className)}
        {...rest}
      >
        <span aria-hidden className="text-2xl leading-none">
          {safe === 0 ? '🌱' : '🔥'}
        </span>
        {safe === 0 ? (
          <span className="text-sm text-muted-text">{emptyLabel}</span>
        ) : (
          <>
            <span className="flex items-baseline gap-xs">
              <span className={cn('text-3xl font-bold leading-none', TONE_INK[tone])}>
                {show(safe)}
              </span>
              <span className="text-base text-muted-text">{unitWord}</span>
            </span>
            <span className="text-sm text-on-card">{label}</span>
          </>
        )}
        {recordLine ? <span className="text-xs text-muted-text">{recordLine}</span> : null}
      </div>
    );
  }
);
