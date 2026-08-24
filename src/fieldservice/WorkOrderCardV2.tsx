import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Skeleton, type BadgeTone } from '../primitives';
import { DISC_TINT, type FieldSlot } from './internal/format';
import type { WorkOrderCardProps, WorkOrderStatus, WorkOrderPriority } from './WorkOrderCard';

/**
 * Alternate design (v2) of {@link WorkOrderCard} — a drop-in with the **same
 * props**. Where the base is a flat left-aligned summary, V2 is an *elevated
 * status-rail card*: a full-height colored **status rail** down the leading
 * edge, a tinted trade-glyph disc, a **large title**, a **priority pill** hero'd
 * at the trailing edge, a status badge, and site / assignee / schedule meta.
 * Status is a text + glyph badge AND the labelled rail — never color alone.
 * Renders a `Skeleton` while `loading`. No literal colors.
 */
export type WorkOrderCardV2Props = WorkOrderCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  slot: FieldSlot;
}

const STATUS: Record<WorkOrderStatus, Desc> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};

const PRIORITY: Record<WorkOrderPriority, Desc> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral', slot: 'muted' },
  medium: { label: 'Medium', glyph: '=', tone: 'primary', slot: 'primary' },
  high: { label: 'High', glyph: '↑', tone: 'warn', slot: 'warn' },
  emergency: { label: 'Emergency', glyph: '!', tone: 'danger', slot: 'danger' },
};

/** Solid token rail color per status slot. */
const RAIL_BG: Record<FieldSlot, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  accent: 'bg-accent',
  muted: 'bg-neutral-400',
};

export const WorkOrderCardV2 = React.forwardRef<HTMLDivElement, WorkOrderCardV2Props>(
  function WorkOrderCardV2(
    { workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onClick, className, style },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;

    if (loading) {
      return (
        <Card ref={ref} padding="none" className={cn('flex overflow-hidden', className)} style={style}>
          <div className="w-1.5 shrink-0 bg-neutral-300" />
          <div
            aria-label="Loading work order"
            className="flex flex-1 items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]"
          >
            <Skeleton variant="rect" width={48} height={48} />
            <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
              <Skeleton variant="text" width="70%" height={16} />
              <Skeleton variant="text" width="40%" height={10} />
            </div>
          </div>
        </Card>
      );
    }

    const interactive = onClick != null;
    const hasMeta = assignee != null || site != null || scheduledFor != null;

    return (
      <Card
        ref={ref}
        style={style}
        variant="elevated"
        padding="none"
        className={cn(
          'flex overflow-hidden',
          interactive &&
            'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
          className
        )}
        {...(interactive
          ? {
              role: 'button',
              tabIndex: 0,
              'aria-label': `Work order ${workOrderNumber}, ${title}, ${sd.label}`,
              onClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              },
            }
          : {})}
      >
        <div className={cn('w-1.5 shrink-0', RAIL_BG[sd.slot])} aria-hidden="true" />
        <div className="flex-1 p-[var(--xen-space-lg)]">
          <div className="flex items-start gap-[var(--xen-space-md)]">
            <span
              className={cn(
                'flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
                DISC_TINT[sd.slot]
              )}
            >
              <Icon glyph={glyph} size="xl" aria-label="Work order" />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <span className="line-clamp-2 text-2xl font-extrabold text-on-surface">{title}</span>
              <span className="truncate text-sm font-semibold uppercase tracking-wide text-muted">
                {workOrderNumber}
              </span>
            </div>
            {pd ? <Badge tone={pd.tone} variant="soft" size="sm">{`${pd.glyph} ${pd.label}`}</Badge> : null}
          </div>

          <div className="mt-[var(--xen-space-md)] flex">
            <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
          </div>

          {hasMeta ? (
            <div className="mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]">
              {site != null ? <span className="text-xs text-muted">📍 {site}</span> : null}
              {assignee != null ? <span className="text-xs text-muted">👷 {assignee}</span> : null}
              {scheduledFor != null ? <span className="text-xs text-muted">🕑 {scheduledFor}</span> : null}
            </div>
          ) : null}
        </div>
      </Card>
    );
  }
);
