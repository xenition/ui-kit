import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { metaLine } from '../primitives/internal/tone-v4';
import type { ExerciseRowProps } from './ExerciseRow';
import { FOCUS_RING_CLASS, frameClass, spokenLine, type Appearance } from './internal/tone-v4';

export interface ExerciseRowV4Props extends ExerciseRowProps {
  /** Copy for a sets-only prescription. Default `'sets'`. */
  setsLabel?: string;
  /** Copy for a reps-only prescription. Default `'reps'`. */
  repsLabel?: string;
  /** Copy for the completed state. Default `'done'`. */
  doneLabel?: string;
  /** Copy for the incomplete state. Default `'not done'`. */
  notDoneLabel?: string;
  /** Surface preset, matching the native twin. Default `'classic'`. */
  appearance?: Appearance;
}

/**
 * **V4 exercise row** — same props as {@link ExerciseRow} plus `setsLabel`,
 * `repsLabel`, `doneLabel`, `notDoneLabel` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The tick was a 24px target** in the middle of a set-logging screen,
 *    which is a control a sweaty thumb hits between reps. The whole row is now
 *    the checkbox and it clears 44 through the shared row height.
 * 2. **It is a real `<button>`.** A `div` with `role="checkbox"`, `tabIndex`
 *    and a hand-written Enter/Space handler is three approximations of a
 *    control the platform already ships — and the hand-written handler fired on
 *    `keydown` for Space, where the platform fires on `keyup`.
 * 3. **It joins the shared row family** — one height, one gutter, one state
 *    layer — so an exercise row, a settings row and a notification row stop
 *    being three components that merely resemble each other. It also replaces
 *    `hover:bg-neutral-100`, a light-oriented ramp step that paints a near-white
 *    slab across a dark page.
 * 4. **Focus is the kit's ring.** `ring-primary-300` is a ramp step, and the
 *    ramp mirrors in dark mode, so the focus ring inverted.
 * 5. **The four English words are props**, where a localised app had to fork
 *    the component to say "hecho".
 */
export const ExerciseRowV4 = React.forwardRef<HTMLDivElement, ExerciseRowV4Props>(
  function ExerciseRowV4(
    {
      name,
      sets,
      reps,
      weight,
      done = false,
      meta,
      onToggle,
      setsLabel = 'sets',
      repsLabel = 'reps',
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

    const prescription =
      sets != null && reps != null
        ? `${sets} × ${reps}`
        : sets != null
          ? `${sets} ${setsLabel}`
          : reps != null
            ? `${reps} ${repsLabel}`
            : undefined;
    const details = [prescription, weight != null ? String(weight) : undefined, meta];
    const caption = metaLine(details);
    const label = spokenLine([name, ...details, done ? doneLabel : notDoneLabel]);

    const body = (
      <>
        <span className={ROW_V4_TEXT_CLASS}>
          <span
            className={cn(
              'truncate text-base font-semibold',
              done ? 'text-muted-text' : 'text-on-card'
            )}
          >
            {name}
          </span>
          {caption ? <span className="truncate text-sm text-muted-text">{caption}</span> : null}
        </span>
        <span className={ROW_V4_TRAILING_CLASS}>
          <span
            aria-hidden
            className={cn(
              'flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2',
              done ? 'border-success bg-success text-on-success' : 'border-border bg-transparent'
            )}
          >
            {done ? '✓' : ''}
          </span>
        </span>
      </>
    );

    const rowClass = cn(
      ROW_V4_BASE_CLASS,
      rowHeightClass(caption !== ''),
      rowGroundClass(false)
    );

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
  }
);
