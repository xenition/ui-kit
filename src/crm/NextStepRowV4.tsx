import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { metaLine, spokenLine, toneInkClass } from './internal/crm-v4';
import type { NextStepPriority, NextStepRowProps } from './NextStepRow';

export interface NextStepRowV4Props extends NextStepRowProps {
  /** Override the three priority words — they were hard-coded English. */
  priorityLabels?: Partial<Record<NextStepPriority, string>>;
  /** The word a past-due step carries. Default `'Overdue'`. */
  overdueLabel?: string;
  /** The checkbox's name while the step is open. Default `'Mark complete'`. */
  completeLabel?: string;
  /** The checkbox's name once the step is done. Default `'Completed'`. */
  completedLabel?: string;
}

/**
 * Priority glyph + default word. The same three the base carried; only the
 * words are now overridable.
 */
const PRIORITY_META_V4: Record<NextStepPriority, { glyph: string; label: string }> = {
  low: { glyph: '↓', label: 'Low' },
  normal: { glyph: '•', label: 'Normal' },
  high: { glyph: '↑', label: 'High' },
};

/**
 * **V4 next-step row** — the web twin of the native `NextStepRowV4`, same props
 * as {@link NextStepRow} plus `priorityLabels`, `overdueLabel`, `completeLabel`
 * and `completedLabel`.
 *
 * ## Six changes
 *
 * 1. **The whole meta row is announced.** `aria-label={title}` replaced the
 *    subtree, so "⚠ Overdue · Mar 4" — the single reason a next-step row exists
 *    — was silent. This is the sharpest case of the defect in the module.
 * 2. **The checkbox clears 44.** It was a 22px square, and it is the row's
 *    *primary* action.
 * 3. **No dead checkbox.** With no `onToggle` the base still rendered a normal,
 *    apparently-tappable checkbox that silently did nothing. Without a handler
 *    the row draws a static mark instead, and the state goes into the name.
 * 4. **A checked box fills `primary`, not `success`.** Ticking a task is a
 *    *selection*; `success` has to keep meaning that something went well.
 * 5. **The `<button>` holds phrasing content only.** It had a `<p>` and a
 *    `<div>` inside it, which is invalid and which browsers repair
 *    unpredictably.
 * 6. **A press is the M3 state layer**, mixed against the pair the control
 *    actually wears — `on-primary` over `primary` for a checked box — rather
 *    than an opacity that would read as unavailable.
 */
export const NextStepRowV4 = React.forwardRef<HTMLDivElement, NextStepRowV4Props>(
  function NextStepRowV4(
    {
      title,
      dueDate,
      overdue = false,
      done = false,
      assignee,
      priority,
      priorityLabels,
      overdueLabel = 'Overdue',
      completeLabel = 'Mark complete',
      completedLabel = 'Completed',
      onToggle,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!title) return null;

    const prio = priority ? PRIORITY_META_V4[priority] : undefined;
    const prioLabel = priority ? (priorityLabels?.[priority] ?? prio!.label) : undefined;
    const stateWord = done ? completedLabel : completeLabel;

    const label = spokenLine([
      title,
      prioLabel,
      assignee,
      overdue && !done ? overdueLabel : undefined,
      dueDate,
      done ? completedLabel : undefined,
    ]);

    const mark = done ? (
      <span aria-hidden="true" className="text-xs font-black">
        ✓
      </span>
    ) : null;

    const boxClass = cn(
      'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-sm)] border-2',
      MIN_TAP_SQUARE_CLASS,
      // A checked box is a selection, not a status.
      done ? 'border-primary bg-primary text-on-primary' : 'border-border bg-transparent'
    );

    const meta = (
      <span className="flex flex-wrap items-center gap-xs">
        {prio ? (
          <span className="text-xs font-semibold text-muted-text">
            {`${prio.glyph} ${prioLabel}`}
          </span>
        ) : null}
        {assignee ? <span className="text-xs text-muted-text">{assignee}</span> : null}
        {overdue && !done ? (
          <span className={cn('text-xs font-bold', toneInkClass('danger'))}>
            {`⚠ ${metaLine([overdueLabel, dueDate])}`}
          </span>
        ) : dueDate ? (
          <span className="text-xs text-muted-text">{dueDate}</span>
        ) : null}
      </span>
    );

    const titleSpan = (
      <span
        className={cn(
          'text-sm font-semibold',
          done ? 'text-muted-text line-through' : 'text-on-surface'
        )}
      >
        {title}
      </span>
    );

    return (
      <div ref={ref} className={cn('flex w-full items-center gap-sm py-sm', className)} {...rest}>
        {onToggle ? (
          <button
            type="button"
            role="checkbox"
            aria-checked={done}
            aria-label={`${stateWord}: ${title}`}
            onClick={() => onToggle(!done)}
            data-xen-v4-state=""
            style={
              // The box's own pair: a checked box is filled `primary`, so its
              // layer is `on-primary` over `primary`, not over the page.
              stateGroundVars(
                done ? 'var(--xen-primary)' : 'var(--xen-surface)',
                done ? 'var(--xen-on-primary)' : 'var(--xen-on-surface)'
              ) as React.CSSProperties
            }
            className={cn(
              boxClass,
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            {mark}
          </button>
        ) : (
          /*
            No handler, so no control: a box that looks tappable and does
            nothing is worse than a mark that never claimed to be one. The state
            still reaches the reader, through the row's own name.
          */
          <span aria-hidden="true" className={boxClass}>
            {mark}
          </span>
        )}

        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-state=""
            style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
            className={cn(
              'flex min-w-0 flex-1 flex-col gap-xs rounded-[var(--xen-radius-md)] px-xs text-left',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              MIN_TAP_CLASS
            )}
          >
            {titleSpan}
            {meta}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col gap-xs px-xs">
            {!onToggle ? <span className="sr-only">{stateWord}</span> : null}
            {titleSpan}
            {meta}
          </div>
        )}
      </div>
    );
  }
);
