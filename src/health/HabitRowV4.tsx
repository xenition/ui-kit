import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { TONE_INK } from '../primitives/internal/tone-v4';
import { pluralizeUnit } from './goal-v4';
import type { HabitRowProps } from './HabitRow';
import { FOCUS_RING_CLASS, frameClass, spokenLine, type Appearance } from './internal/tone-v4';

export interface HabitRowV4Props extends HabitRowProps {
  /** Copy for the completed state. Default `'done'`. */
  doneLabel?: string;
  /** Copy for the incomplete state. Default `'not done'`. */
  notDoneLabel?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/**
 * **V4 habit row** — same props as {@link HabitRow} plus `doneLabel`,
 * `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The check control was 26px** — and `HabitRowV3`'s was 18. This is the
 *    one thing a habit screen exists to let you tap, once a day, quickly. The
 *    whole row is the checkbox now and it clears 44 through the shared row
 *    height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships, and the hand-written one fired Space
 *    on `keydown` where the platform fires it on `keyup`.
 * 3. **It joins the shared row family** — one height, one 44 leading slot, one
 *    gutter, one state layer — so a habit row and a settings row are one
 *    family rather than two near-misses. `hover:bg-neutral-100` goes with it: a
 *    light-oriented ramp step paints a near-white slab across a dark page.
 * 4. **The streak flame's ink is the corrected slot.** `text-warn` is
 *    `var(--xen-warn)`, a fill token with no contrast promise as text, and the
 *    streak count is the second most important number on the row.
 * 5. **Focus is `ring-ring`, and the state words are props.**
 *    `ring-primary-300` is a ramp step and the ramp mirrors in dark mode, so
 *    the focus ring inverted; "done" and "not done" were untranslatable.
 */
export const HabitRowV4 = React.forwardRef<HTMLDivElement, HabitRowV4Props>(function HabitRowV4(
  {
    name,
    done,
    streak = 0,
    meta,
    onToggle,
    doneLabel = 'done',
    notDoneLabel = 'not done',
    appearance = 'classic',
    className,
    ...rest
  },
  ref
) {
  React.useEffect(() => {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
  }, []);

  const safeStreak = Math.max(Math.floor(streak), 0);
  const label = spokenLine([
    name,
    meta,
    done ? doneLabel : notDoneLabel,
    safeStreak > 0 ? `${safeStreak} ${pluralizeUnit(safeStreak, 'day')} streak` : undefined,
  ]);

  const body = (
    <>
      <span className={ROW_V4_LEADING_CLASS}>
        <span
          aria-hidden
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-full border-2 text-sm font-bold',
            done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'
          )}
        >
          {done ? '✓' : ''}
        </span>
      </span>
      <span className={ROW_V4_TEXT_CLASS}>
        <span
          className={cn(
            'truncate text-base font-semibold',
            done ? 'text-muted-text line-through' : 'text-on-card'
          )}
        >
          {name}
        </span>
        {meta ? <span className="truncate text-sm text-muted-text">{meta}</span> : null}
      </span>
      {safeStreak > 0 ? (
        <span className={ROW_V4_TRAILING_CLASS}>
          <span aria-hidden className="text-sm leading-none">
            🔥
          </span>
          <span className={cn('text-sm font-bold', TONE_INK.warn)}>{safeStreak}</span>
        </span>
      ) : null}
    </>
  );

  const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(meta != null), rowGroundClass(false));

  if (!onToggle) {
    return (
      <div ref={ref} className={cn(frameClass(appearance), className)} {...rest}>
        <div className={rowClass}>
          {body}
          <span className="sr-only">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn(frameClass(appearance), className)} {...rest}>
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={label}
        onClick={() => onToggle(!done)}
        data-xen-v4-row=""
        data-xen-v4-state=""
        style={rowStateVars()}
        className={cn(rowClass, FOCUS_RING_CLASS)}
      >
        {body}
      </button>
    </div>
  );
});
