import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import { stateGroundVars } from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowGroundClass,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { RoutineRowProps, RoutineSlot } from './RoutineRow';
import {
  DISABLED_CLASS,
  FOCUS_RING_CLASS,
  spokenLine,
  surfaceStateVars,
} from './internal/tone-v4';

export interface RoutineRowV4Props extends RoutineRowProps {
  /**
   * Open the step — its detail, its photo, its history.
   *
   * Deliberately **separate from** `onToggle`. See change 1.
   */
  onClick?: () => void;
  /** The word a finished step carries. Default `'done'`. */
  doneLabel?: string;
  /** The word an unfinished step carries. Default `'not done'`. */
  notDoneLabel?: string;
}

/** The fallback glyph for each time-of-day slot. */
const SLOT_GLYPH_V4: Record<RoutineSlot, string> = {
  morning: '🌅',
  afternoon: '☀️',
  evening: '🌆',
  bedtime: '🌙',
  anytime: '⏰',
};

/**
 * **V4 routine row** — same props as {@link RoutineRow} plus `onClick`,
 * `doneLabel` and `notDoneLabel`.
 *
 * ## Six changes
 *
 * 1. **A routine step can be opened.** The base made the *entire row* one
 *    `<button role="checkbox">`, so ticking the box and opening the step were
 *    the same gesture and the second one could not exist — there was nowhere
 *    to put a photo of the finished bed, a note, or a history. The toggle is
 *    now a real checkbox at the trailing end and the activation is its
 *    sibling, each with its own name, exactly as `NextStepRowV4` splits the
 *    same pair.
 * 2. **`{...rest}` is spread first.** It was spread after `onClick` — and on
 *    this component it was also cast twice through `unknown` to get a
 *    `div`'s attributes onto a `<button>`, which silently smuggled a
 *    `div`-typed handler onto a button element.
 * 3. **The non-interactive row's name reached nobody.** With no `onToggle` the
 *    base put `aria-label` on a bare `div`, which browsers ignore, so a
 *    read-only routine announced nothing at all. The state word is now real
 *    text in the accessibility tree.
 * 4. **No dead checkbox.** With no `onToggle` the base still drew an
 *    apparently-tappable circle that did nothing; without a handler the row
 *    draws a static mark instead.
 * 5. **A ticked step fills `primary`, not `success`.** Ticking a step is a
 *    *selection*; `success` has to keep meaning that something went well, and
 *    in a module that draws children it must not become the colour of
 *    compliance.
 * 6. **Targets, press and disabled.** The checkbox was a 24px circle in a
 *    module built for children and is now 44; press is the M3 state layer
 *    rather than `hover:bg-neutral-50`, a light-scheme ramp step that paints a
 *    near-white slab on a dark page; disabled is M3's 0.38 band rather than
 *    `opacity-50`, a round number.
 */
export const RoutineRowV4 = React.forwardRef<HTMLDivElement, RoutineRowV4Props>(
  function RoutineRowV4(
    {
      label,
      slot = 'anytime',
      icon,
      time,
      done = false,
      disabled = false,
      doneLabel = 'done',
      notDoneLabel = 'not done',
      onToggle,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    if (!label) return null;

    const glyph = icon ?? SLOT_GLYPH_V4[slot];
    const stateWord = done ? doneLabel : notDoneLabel;
    const name = spokenLine([label, time, stateWord]);

    const boxClass = cn(
      'flex shrink-0 items-center justify-center rounded-full border-2',
      MIN_TAP_SQUARE_CLASS,
      done ? 'border-primary bg-primary text-on-primary' : 'border-border bg-transparent'
    );

    const mark = done ? (
      <span aria-hidden="true" className="text-sm font-bold">
        ✓
      </span>
    ) : null;

    const text = (
      <>
        <span
          className={cn(
            'truncate text-base font-semibold',
            done ? 'text-muted-text line-through' : 'text-on-card'
          )}
        >
          {label}
        </span>
        {time ? <span className="truncate text-xs text-muted-text">{time}</span> : null}
      </>
    );

    return (
      <div
        // Spread first: a caller's prop must not be able to replace the row's
        // own handlers by arriving later in the attribute list.
        {...rest}
        ref={ref}
        data-xen-routine-row=""
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(time != null),
          rowGroundClass(false),
          disabled && DISABLED_CLASS,
          className
        )}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            disabled={disabled}
            onClick={() => onClick()}
            data-xen-v4-state=""
            style={surfaceStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)]',
              'bg-transparent text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            <span className={ROW_V4_LEADING_CLASS} aria-hidden="true">
              <span className="text-lg leading-none">{glyph}</span>
            </span>
            <span className={ROW_V4_TEXT_CLASS}>{text}</span>
          </button>
        ) : (
          <>
            <span className={ROW_V4_LEADING_CLASS} aria-hidden="true">
              <span className="text-lg leading-none">{glyph}</span>
            </span>
            <span className={ROW_V4_TEXT_CLASS}>
              {/*
                Without a toggle nothing else in the row says whether the step
                is finished, and an `aria-label` on the container `div` — what
                the base did — is dropped by every browser.
              */}
              {!onToggle ? <span className="sr-only">{stateWord}</span> : null}
              {text}
            </span>
          </>
        )}

        {/*
          The toggle is a SIBLING of the activation. Inside it, a checkbox is
          neither reachable nor announceable, which is the inverse of the same
          defect the chore card had.
        */}
        <span className={ROW_V4_TRAILING_CLASS}>
          {onToggle ? (
            <button
              type="button"
              role="checkbox"
              aria-checked={done}
              aria-label={label}
              disabled={disabled}
              onClick={() => onToggle(!done)}
              data-xen-v4-state=""
              style={
                // The box's own pair: a ticked box is filled `primary`, so its
                // layer is `on-primary` over `primary`, not over the page.
                stateGroundVars(
                  done ? 'var(--xen-primary)' : 'var(--xen-surface)',
                  done ? 'var(--xen-on-primary)' : 'var(--xen-on-surface)'
                ) as React.CSSProperties
              }
              className={cn(boxClass, FOCUS_RING_CLASS)}
            >
              {mark}
            </button>
          ) : (
            <span aria-hidden="true" className={boxClass}>
              {mark}
            </span>
          )}
        </span>
      </div>
    );
  }
);
