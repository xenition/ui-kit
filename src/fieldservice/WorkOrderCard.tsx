import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Skeleton, type BadgeTone } from '../primitives';
import { DISC_TINT } from './internal/format';

/** Work-order lifecycle — conveyed by text + glyph + color (never color-alone). */
export type WorkOrderStatus = 'open' | 'in-progress' | 'on-hold' | 'done' | 'cancelled';

/** Job urgency — drives the priority pill. */
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'emergency';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const WORK_ORDER_STATUS: Record<WorkOrderStatus, StatusDescriptor> = {
  open: { label: 'Open', glyph: '○', tone: 'neutral' },
  'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
  'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
  done: { label: 'Done', glyph: '✓', tone: 'success' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

const PRIORITY: Record<WorkOrderPriority, StatusDescriptor> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  medium: { label: 'Medium', glyph: '=', tone: 'primary' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  emergency: { label: 'Emergency', glyph: '!', tone: 'danger' },
};

export interface WorkOrderCardProps {
  /** Work-order reference (e.g. "WO-10482"). */
  workOrderNumber: string;
  /** Short task title (e.g. "Replace HVAC compressor"). */
  title: string;
  /** Lifecycle status — text + glyph + color. */
  status: WorkOrderStatus;
  /** Urgency; when set, renders a priority pill. */
  priority?: WorkOrderPriority;
  /** Assigned technician / crew name shown as a meta line. */
  assignee?: string;
  /** Job-site / customer name shown as a meta line. */
  site?: string;
  /** Localized scheduled date/time string (already formatted by the caller). */
  scheduledFor?: string;
  /** Trade / category glyph shown in the leading disc (emoji or symbol). */
  glyph?: string;
  /** Show a skeleton placeholder instead of data. */
  loading?: boolean;
  /** Fires on card click; the card is only a button when supplied. */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A summary card for a single field-service work order. A tinted leading trade
 * glyph disc, a title/number stack, a status pill (text + glyph + a color that
 * traces to a semantic token — never color alone), an optional priority pill,
 * and assignee / site / schedule meta. Becomes a `role="button"` surface
 * (click / Enter / Space) only when `onClick` is supplied. Renders a `Skeleton`
 * while `loading`. Every color traces to a `--xen-*` token — no literals.
 */
export const WorkOrderCard = React.forwardRef<HTMLDivElement, WorkOrderCardProps>(
  function WorkOrderCard(
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
      className,
      style,
    },
    ref
  ) {
    const sd = WORK_ORDER_STATUS[status] ?? WORK_ORDER_STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;

    if (loading) {
      return (
        <Card ref={ref} className={className} style={style}>
          <div aria-label="Loading work order" className="flex items-center gap-[var(--xen-space-md)]">
            <Skeleton variant="rect" width={44} height={44} />
            <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
              <Skeleton variant="text" width="70%" height={14} />
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
        className={cn(interactive && 'cursor-pointer transition-shadow hover:shadow-md', className)}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span
            className={cn(
              'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)]',
              DISC_TINT.primary
            )}
          >
            <Icon glyph={glyph} size="xl" aria-label="Work order" />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="line-clamp-2 text-lg font-bold text-on-surface">{title}</span>
            <span className="truncate text-sm text-muted">{workOrderNumber}</span>
          </div>
          <div className="flex flex-col items-end gap-[var(--xen-space-xs)]">
            <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge>
            {pd ? <Badge tone={pd.tone}>{`${pd.glyph} ${pd.label}`}</Badge> : null}
          </div>
        </div>

        {hasMeta ? (
          <div className="mt-[var(--xen-space-md)] flex flex-col gap-0.5 border-t border-border pt-[var(--xen-space-md)]">
            {site != null ? <span className="text-xs text-muted">📍 {site}</span> : null}
            {assignee != null ? <span className="text-xs text-muted">👷 {assignee}</span> : null}
            {scheduledFor != null ? <span className="text-xs text-muted">🕑 {scheduledFor}</span> : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
