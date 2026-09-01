import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  BADGE_V4,
  discGround,
  PLACEHOLDER_CLASS,
  spokenLine,
  type ToneV4,
} from './internal/job-v4';
import type { WorkOrderCardProps, WorkOrderPriority, WorkOrderStatus } from './WorkOrderCard';

export interface WorkOrderCardV4Props extends WorkOrderCardProps {
  /** Override the priority words — four English words lived inside. */
  priorityLabels?: Partial<Record<WorkOrderPriority, string>>;
  /** Override the status words — five English phrases lived inside. */
  statusLabels?: Partial<Record<WorkOrderStatus, string>>;
  /** The busy region's accessible name. Default `'Loading work order'`. */
  loadingLabel?: string;
}

const STATUS_V4: Record<WorkOrderStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

/**
 * Priority → word and glyph, all on one neutral chip.
 *
 * A priority is **identity**, not status: it says what kind of job this is, not
 * how the job is going. The base spent `warn` on "High" and `danger` on
 * "Emergency", which put a work order that is running perfectly well under the
 * same red the module uses for a failed safety checkpoint — and on a card that
 * already carries a status pill, two coloured pills side by side stop meaning
 * two different things. The rank is carried by the arrow and the word.
 */
const PRIORITY_V4: Record<WorkOrderPriority, { label: string; glyph: string }> = {
  low: { label: 'Low', glyph: '↓' },
  medium: { label: 'Medium', glyph: '=' },
  high: { label: 'High', glyph: '↑' },
  emergency: { label: 'Emergency', glyph: '!' },
};

/**
 * **V4 work-order card** — the web twin of the native `WorkOrderCardV4`, same
 * props as {@link WorkOrderCard} plus `priorityLabels`, `statusLabels` and
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card's name carries the job, not just its number.** `` `Work order
 *    ${n}, ${title}, ${status}` `` replaced the whole subtree, so a technician
 *    heard "Open" and never "Emergency" — and never the site, the assignee or
 *    the schedule either.
 * 2. **An interactive card is a real `<button>`.** It was a `div` with
 *    `role="button"`, a `tabIndex` and a hand-written Enter/Space handler:
 *    three approximations of what a button already does, and the shape that
 *    breaks the moment a control is nested inside it.
 * 3. **Priority stops wearing a status colour** — see {@link PRIORITY_V4}.
 * 4. **The leading disc is decorative.** It announced "Work order" before the
 *    card said which one.
 * 5. **The skeleton is an opaque mix and the busy region is named**, and the
 *    press feedback is a state layer rather than a shadow that grows.
 */
export const WorkOrderCardV4 = React.forwardRef<HTMLDivElement, WorkOrderCardV4Props>(
  function WorkOrderCardV4(
    {
      workOrderNumber,
      title,
      status,
      priority,
      assignee,
      site,
      scheduledFor,
      glyph = '🔧',
      loading = false,
      onClick,
      priorityLabels,
      statusLabels,
      loadingLabel = 'Loading work order',
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (loading) {
      return (
        <CardV4 ref={ref} className={className} style={style}>
          <div role="status" aria-label={loadingLabel} className="flex items-center gap-md">
            <div
              className={cn(
                'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0',
                PLACEHOLDER_CLASS
              )}
            />
            <div className="flex flex-1 flex-col gap-xs">
              <div className={cn('h-[var(--xen-text-sm)] w-[70%]', PLACEHOLDER_CLASS)} />
              <div className={cn('h-[var(--xen-text-xs)] w-[40%]', PLACEHOLDER_CLASS)} />
            </div>
          </div>
        </CardV4>
      );
    }

    const sd = STATUS_V4[status] ?? STATUS_V4.open;
    const statusWord = statusLabels?.[status] ?? sd.label;
    const pd = priority ? PRIORITY_V4[priority] : undefined;
    const priorityWord = priority ? (priorityLabels?.[priority] ?? pd?.label) : undefined;
    const hasMeta = assignee != null || site != null || scheduledFor != null;

    const body = (
      <>
        <div className="flex items-center gap-md">
          <span
            aria-hidden
            className="flex h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]"
            style={{ background: discGround('primary') }}
          >
            <IconV4 glyph={glyph} size="xl" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="line-clamp-2 font-heading text-lg font-bold text-on-card">
              {title}
            </span>
            <span className="truncate text-sm text-muted-text">{workOrderNumber}</span>
          </div>
          <div className="flex shrink-0 flex-col items-end gap-xs">
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${statusWord}`}
            </BadgeV4>
            {pd ? (
              <BadgeV4 tone="neutral" {...BADGE_V4}>
                {`${pd.glyph} ${priorityWord}`}
              </BadgeV4>
            ) : null}
          </div>
        </div>

        {hasMeta ? (
          <div className="mt-md flex flex-col gap-xs border-t border-border pt-md">
            {site != null ? <span className="text-xs text-muted-text">📍 {site}</span> : null}
            {assignee != null ? (
              <span className="text-xs text-muted-text">👷 {assignee}</span>
            ) : null}
            {scheduledFor != null ? (
              <span className="text-xs text-muted-text">🕑 {scheduledFor}</span>
            ) : null}
          </div>
        ) : null}
      </>
    );

    if (onClick == null) {
      return (
        <CardV4 ref={ref} className={className} style={style}>
          {body}
        </CardV4>
      );
    }

    return (
      <CardV4 ref={ref} padding="none" className={className} style={style}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([
            workOrderNumber,
            title,
            statusWord,
            priorityWord,
            site,
            assignee,
            scheduledFor,
          ])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className="flex w-full flex-col rounded-[var(--xen-radius-lg)] p-lg text-left"
        >
          {body}
        </button>
      </CardV4>
    );
  }
);
