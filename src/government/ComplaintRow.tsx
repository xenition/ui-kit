import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { TONE_TINT } from './internal/tint';
import { pressableProps } from './internal/pressable';

/** Lifecycle of a citizen complaint / 311 service request. */
export type ComplaintStatus = 'open' | 'assigned' | 'in-progress' | 'resolved' | 'closed';

const STATUS: Record<ComplaintStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  open: { label: 'Open', glyph: '🆕', tone: 'primary' },
  // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
  assigned: { label: 'Assigned', glyph: '👤', tone: 'primary' },
  'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
  resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
  closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};

/** Triage priority of the request. */
export type ComplaintPriority = 'low' | 'normal' | 'high' | 'urgent';

const PRIORITY: Record<ComplaintPriority, { label: string; glyph: string; tone: BadgeTone }> = {
  low: { label: 'Low', glyph: '↓', tone: 'neutral' },
  normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
  high: { label: 'High', glyph: '↑', tone: 'warn' },
  urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};

export interface ComplaintRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick' | 'title'> {
  /** Ticket / request reference (e.g. "311-88214"). */
  ticketNumber: string;
  /** Short description of the complaint (e.g. "Pothole on 5th Ave"). */
  title: string;
  /** Lifecycle status — conveyed by text + glyph + color. */
  status: ComplaintStatus;
  /** Category (e.g. "Roads", "Sanitation"). */
  category?: string;
  /** Triage priority — rendered as a text+glyph badge when `high`/`urgent`. */
  priority?: ComplaintPriority;
  /** Localized filed / updated date. */
  date?: string;
  /** Fires on row click (open request detail); button only when supplied. */
  onClick?: () => void;
}

/**
 * One line in a citizen-complaint / 311 service-request list: a tinted status
 * glyph disc, a title/ticket stack, and status + optional priority pills — each
 * conveyed by **glyph + label + a color that traces to a semantic token slot**
 * (resolved → success, urgent → danger), never color alone. Becomes a
 * keyboard-operable button only when `onClick` is supplied. Web parity of the
 * native `ComplaintRow`.
 */
export const ComplaintRow = React.forwardRef<HTMLDivElement, ComplaintRowProps>(function ComplaintRow(
  { ticketNumber, title, status, category, priority, date, onClick, className, ...rest },
  ref
) {
  const sd = STATUS[status] ?? STATUS.open;
  const pr = priority ? PRIORITY[priority] ?? PRIORITY.normal : undefined;
  const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
  const interactive = pressableProps(onClick);

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Request ${ticketNumber}, ${title}, ${sd.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-sm)] transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        className={cn(
          'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
          TONE_TINT[sd.tone]
        )}
      >
        <Icon glyph={sd.glyph} aria-label={sd.label} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-semibold text-on-surface">{title}</p>
        <div className="mt-0.5 flex flex-wrap items-center gap-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">{ticketNumber}</span>
          {category != null ? <span className="text-xs text-muted">· {category}</span> : null}
          <Badge tone={sd.tone}>
            <span aria-hidden="true">{sd.glyph}</span> {sd.label}
          </Badge>
          {showPriority ? (
            <Badge tone={pr.tone}>
              <span aria-hidden="true">{pr.glyph}</span> {pr.label}
            </Badge>
          ) : null}
        </div>
      </div>
      {date != null ? <span className="shrink-0 text-xs text-muted">{date}</span> : null}
    </div>
  );
});
