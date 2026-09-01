import * as React from 'react';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CheckboxV4 } from '../primitives/CheckboxV4';
import { IconV4 } from '../primitives/IconV4';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowEdgeClass,
} from '../dashboard/internal/row-v4';
import { metaLine, type FarmTone } from './internal/farm-v4';
import type { FarmTaskRowProps, TaskPriority } from './FarmTaskRow';

export interface FarmTaskRowV4Props extends FarmTaskRowProps {
  /** Override the priority names — four English words lived inside the component. */
  priorityLabels?: Partial<Record<TaskPriority, string>>;
  /** Announced after the title when the task is late. Default `'overdue'`. */
  overdueLabel?: string;
}

/** Priority → tone and default label. Genuinely a status, so the tones stay. */
const PRIORITY_META: Record<TaskPriority, { label: string; tone: FarmTone }> = {
  low: { label: 'Low', tone: 'neutral' },
  normal: { label: 'Normal', tone: 'primary' },
  high: { label: 'High', tone: 'warn' },
  urgent: { label: 'Urgent', tone: 'danger' },
};

/**
 * **V4 farm task row** — the web twin of the native `FarmTaskRowV4`, same
 * props as {@link FarmTaskRow} plus `priorityLabels` and `overdueLabel`.
 *
 * ## Four changes
 *
 * 1. **It is a row from the shared row line.** Height, padding, gap, hover
 *    fill and separator inset come from `dashboard/internal/row-v4`, which is
 *    the file that decides them for every row in the kit.
 * 2. **The checkbox is `CheckboxV4`**, so its hit area, focus ring and checked
 *    transition match every other checkbox in the product.
 * 3. **`overdue` reaches assistive tech.** The base painted the due date red
 *    and stopped — colour alone, which is exactly what §6 forbids. The badge
 *    now carries the word.
 * 4. **A done task's title is struck through *and* dimmed**, so "done"
 *    survives a greyscale screenshot.
 *
 * **Renders nothing without a `title`** (§4.5).
 */
export const FarmTaskRowV4 = React.forwardRef<HTMLDivElement, FarmTaskRowV4Props>(
  function FarmTaskRowV4(
    {
      title,
      done = false,
      due,
      priority = 'normal',
      field,
      assignee,
      icon,
      overdue = false,
      priorityLabels,
      overdueLabel = 'overdue',
      onToggle,
      onClick,
      last = false,
      className,
      ...rest
    },
    ref
  ) {
    if (!title) return null;

    const meta = PRIORITY_META[priority];
    const label = priorityLabels?.[priority] ?? meta.label;
    const caption = metaLine([due, field, assignee]);

    return (
      <div
        ref={ref}
        data-xen-farm-task-row=""
        data-xen-v4-chrome={onClick ? 'on-surface' : undefined}
        role={onClick ? 'button' : undefined}
        onClick={onClick}
        className={cn(
          ROW_V4_BASE_CLASS,
          rowHeightClass(Boolean(caption)),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        {onToggle ? (
          <CheckboxV4
            checked={done}
            // The web `Checkbox` is an `<input type="checkbox">`, so it speaks
            // `onChange`; the native one speaks `onCheckedChange`. `onToggle`
            // is the module's own prop and takes the next value either way.
            onChange={(e) => onToggle(e.currentTarget.checked)}
            aria-label={title}
          />
        ) : icon ? (
          <IconV4 glyph={icon} size="lg" />
        ) : null}

        <div className={ROW_V4_TEXT_CLASS}>
          <span
            className={cn(
              'truncate text-base font-semibold text-on-card',
              // Struck AND dimmed: a strike survives greyscale, an opacity
              // change on its own does not read as "done" to everyone.
              done && 'line-through opacity-[0.38]'
            )}
          >
            {title}
          </span>
          {caption ? (
            <span
              className={cn(
                'truncate text-xs',
                overdue && !done ? 'text-danger-text' : 'text-muted-text'
              )}
            >
              {caption}
            </span>
          ) : null}
        </div>

        <div className={ROW_V4_TRAILING_CLASS}>
          {/* The badge carries the word, so `overdue` is never colour alone. */}
          {overdue && !done ? (
            <BadgeV4 tone="danger" variant="soft" size="sm">
              {overdueLabel}
            </BadgeV4>
          ) : (
            <BadgeV4 tone={meta.tone} variant="soft" size="sm">
              {label}
            </BadgeV4>
          )}
        </div>
      </div>
    );
  }
);
