import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { StatusPillV4 } from './StatusPillV4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  MIN_TAP_SQUARE_CLASS,
  spokenLine,
  toneInkClass,
} from './internal/tone-v4';
import { TASK_STATUS_META } from './internal';
import type { OnboardingTaskProps } from './OnboardingTask';

export interface OnboardingTaskV4Props extends OnboardingTaskProps {
  /**
   * Why the task is blocked.
   *
   * `blocked` is the adverse member of this union and the row had no field for
   * it, so a task waiting on IT for a laptop said "⛔ Blocked" and nothing a
   * new starter could act on.
   */
  blockedReason?: string;
  /** Copy on the past-due flag. Default `'Overdue'`. */
  overdueLabel?: string;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 onboarding task** — the web twin of the native `OnboardingTaskV4`, same
 * props as {@link OnboardingTask} plus `blockedReason`, `overdueLabel` and
 * `testID`.
 *
 * ## Five changes
 *
 * 1. **The checkbox is a 44 target.** It was a bare 16px `<input>` with a
 *    `pt-0.5` wrapper — a quarter of the area a thumb needs, on the one
 *    control the whole component exists for. It now sits in a 44 square that
 *    is itself the label, so the miss lands on the tick rather than on
 *    nothing. On native the same `Checkbox` was nested *inside* the row's
 *    `Pressable`, which flattened the row to one leaf and made the tick
 *    unreachable to VoiceOver; this twin already kept it out, and both now
 *    match.
 * 2. **A blocked task can say why.** See `blockedReason`.
 * 3. **The title carries the whole task's name.** The title button announced
 *    only the title, so the status, the due date and the word "Overdue" — the
 *    three things that decide whether the reader acts today — were separate
 *    stops or, in browse mode, easy to miss entirely.
 * 4. **"Overdue" is a prop and is inked with an ink slot.** It was a hard-coded
 *    English string drawn in `text-danger`, the **fill** token; `danger-text`
 *    is the slot with the contrast promise.
 * 5. **The assignee avatar is the same size on both twins** (`xs`, matching
 *    the `xs` caption beside it); web drew `sm` and native drew `xs`.
 */
export const OnboardingTaskV4 = React.forwardRef<HTMLDivElement, OnboardingTaskV4Props>(
  function OnboardingTaskV4(
    {
      title,
      category,
      status = 'todo',
      dueDate,
      overdue = false,
      assignee,
      assigneeAvatarUrl,
      variant = 'default',
      onToggle,
      onClick,
      blockedReason,
      overdueLabel = 'Overdue',
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A checklist item with no title is a tick beside nothing.
    if (!title) return null;

    const compact = variant === 'compact';
    const done = status === 'done';
    const statusMeta = TASK_STATUS_META[status];
    const meta = metaLine([category, dueDate ? `Due ${dueDate}` : null]);
    const isOverdue = overdue && !done;
    const reason = status === 'blocked' ? blockedReason : undefined;

    const titleClasses = cn(
      'text-left text-sm font-semibold',
      done ? 'text-muted-text line-through' : 'text-on-card'
    );

    const spoken = spokenLine([
      title,
      statusMeta.label,
      meta,
      isOverdue ? overdueLabel : undefined,
      reason,
      assignee,
    ]);

    return (
      <div
        ref={ref}
        data-testid={testID}
        className={cn(
          'flex items-start gap-sm rounded-[var(--xen-radius-md)] border border-border bg-card px-md py-sm',
          className
        )}
      >
        {/*
          The label IS the target: a 44 square with the tick centred in it, so
          the whole square toggles rather than the 16px box alone.
        */}
        <label
          className={cn(
            'flex shrink-0 cursor-pointer items-center justify-center rounded-[var(--xen-radius-md)]',
            MIN_TAP_SQUARE_CLASS
          )}
        >
          <CheckboxV4
            checked={done}
            onChange={(e) => onToggle?.(e.target.checked)}
            aria-label={`${done ? 'Mark incomplete' : 'Mark complete'}: ${title}`}
          />
        </label>

        <div className="flex min-w-0 flex-1 flex-col gap-xs">
          {onClick ? (
            <button
              type="button"
              aria-label={spoken}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                titleClasses,
                'flex w-full items-center truncate rounded-[var(--xen-radius-md)]',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {title}
            </button>
          ) : (
            <p className={cn(titleClasses, 'line-clamp-2')}>{title}</p>
          )}

          {!compact && meta ? (
            <p className="truncate text-xs text-muted-text">{meta}</p>
          ) : null}

          {reason ? (
            <p className="text-xs font-semibold text-danger-text">{reason}</p>
          ) : null}

          {/* Beside the title's activation, never inside it. */}
          <div className="flex flex-wrap items-center gap-xs">
            <StatusPillV4 meta={statusMeta} size="sm" aria-hidden={onClick ? true : undefined} />
            {isOverdue ? (
              <span
                className={cn('text-xs font-semibold', toneInkClass('danger'))}
                aria-hidden={onClick ? true : undefined}
              >
                <span aria-hidden="true">⚠ </span>
                {overdueLabel}
              </span>
            ) : null}
            {!compact && assignee ? (
              <span className="flex items-center gap-xs" aria-hidden={onClick ? true : undefined}>
                <AvatarV4 size="xs" name={assignee} src={assigneeAvatarUrl} alt="" />
                <span className="text-xs text-muted-text">{assignee}</span>
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
