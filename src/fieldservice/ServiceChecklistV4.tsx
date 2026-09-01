import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { ProgressV4 } from '../primitives/ProgressV4';
import { SkeletonV4 } from '../primitives/SkeletonV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, isComplete, spokenLine, TABULAR_CLASS } from './internal/job-v4';
import type { ServiceChecklistProps } from './ServiceChecklist';

export interface ServiceChecklistV4Props extends ServiceChecklistProps {
  /** The sentence under the empty title. Default `'Items will appear here once added.'`. */
  emptyDescription?: string;
  /** The word marking a mandatory task. Default `'Required'`. */
  requiredLabel?: string;
  /** The progress bar's accessible name. Default `'Checklist progress'`. */
  progressLabel?: string;
}

/**
 * **V4 service checklist** — the web twin of the native `ServiceChecklistV4`,
 * same props as {@link ServiceChecklist} plus `emptyDescription`,
 * `requiredLabel` and `progressLabel`.
 *
 * ## Five changes
 *
 * 1. **Complete means complete.** The bar compared a *rounded* percentage
 *    against 100, and `clampPct` rounds — so 199 of 200 turned the bar
 *    "complete" green with an item still outstanding. `isComplete()` counts.
 * 2. **Requiredness is a word.** It was a red asterisk, which is invisible to
 *    a screen reader and to anyone who cannot separate it from the label's own
 *    punctuation. The word joins the checkbox's accessible name too.
 * 3. **The progress bar has a name.** It announced a bare percentage with
 *    nothing saying what was progressing.
 * 4. **The whole row toggles and clears 44.** The target was a 24px box on a
 *    surface used one-handed, outdoors, in gloves; the `<label>` now carries
 *    the row.
 * 5. **A checklist with no `onToggle` is not a wall of live checkboxes.** They
 *    were fully controlled, so they could be clicked forever and never change.
 */
export const ServiceChecklistV4 = React.forwardRef<HTMLDivElement, ServiceChecklistV4Props>(
  function ServiceChecklistV4(
    {
      title,
      tasks,
      onToggle,
      loading = false,
      disabled = false,
      emptyLabel = 'No checklist items',
      emptyDescription = 'Items will appear here once added.',
      requiredLabel = 'Required',
      progressLabel = 'Checklist progress',
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const list = Array.isArray(tasks) ? tasks : [];
    const total = list.length;
    const completed = list.filter((task) => task.done).length;
    const done = isComplete(completed, total);
    // A control nobody can move is disabled, not enabled-and-inert.
    const locked = disabled || onToggle == null;

    if (loading) {
      return (
        <CardV4 ref={ref} className={className} style={style}>
          <div role="status" aria-label="Loading checklist" className="flex flex-col gap-md">
            <SkeletonV4 variant="text" width="50%" />
            <SkeletonV4 variant="text" lines={3} />
          </div>
        </CardV4>
      );
    }

    if (total === 0) {
      return (
        <EmptyStateV4
          ref={ref}
          title={emptyLabel}
          description={emptyDescription}
          className={className}
          style={style}
        />
      );
    }

    return (
      <CardV4 ref={ref} className={className} style={style}>
        <div className="flex items-center justify-between gap-md">
          {title != null ? (
            <span className="font-heading text-base font-bold text-on-card">{title}</span>
          ) : (
            <span />
          )}
          <span className={cn('text-xs font-semibold text-muted-text', TABULAR_CLASS)}>
            {completed}/{total}
          </span>
        </div>

        <div className="mt-sm">
          <ProgressV4
            value={completed}
            max={total}
            tone={done ? 'success' : 'primary'}
            size="sm"
            aria-label={progressLabel}
          />
        </div>

        <div className="mt-md flex flex-col gap-xs">
          {list.map((task) => (
            <label
              key={task.id}
              data-xen-v4-state=""
              style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
              className={cn(
                'flex cursor-pointer items-center gap-md rounded-[var(--xen-radius-md)] px-xs py-xs',
                MIN_TAP_CLASS,
                locked && 'cursor-default'
              )}
            >
              <CheckboxV4
                checked={task.done}
                disabled={locked}
                onChange={(e) => onToggle?.(task.id, e.target.checked)}
                aria-label={spokenLine([task.label, task.required ? requiredLabel : null])}
              />
              <span
                className={cn(
                  'flex min-w-0 flex-1 items-center gap-sm text-sm',
                  task.done ? 'text-muted-text line-through' : 'text-on-card'
                )}
              >
                <span className="min-w-0 flex-1">{task.label}</span>
                {task.required ? (
                  // A word, not a coloured asterisk — and `neutral`, because
                  // "this one is mandatory" is a fact about the task, not a
                  // state the technician has put it into.
                  <BadgeV4 tone="neutral" {...BADGE_V4}>
                    {requiredLabel}
                  </BadgeV4>
                ) : null}
              </span>
            </label>
          ))}
        </div>
      </CardV4>
    );
  }
);
