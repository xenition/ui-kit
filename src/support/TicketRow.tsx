import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { TicketPriority, type Priority } from './TicketPriority';
import { activateOnKey } from './internal';

/** Lifecycle status of a support ticket. */
export type TicketStatus = 'open' | 'pending' | 'solved' | 'closed';

export interface Ticket {
  /** Stable id (used as the key and returned to `onClick`). */
  id: string;
  /** Ticket subject line. */
  subject: string;
  /** Lifecycle status. */
  status: TicketStatus;
  /** Optional priority chip. */
  priority?: Priority;
  /** Requester display name (drives the avatar fallback). */
  requester?: string;
  /** Optional requester avatar URL. */
  requesterAvatar?: string;
  /** Human-readable "updated" hint (e.g. `"2h ago"`). */
  updatedLabel?: string;
  /** Unread reply count (renders a token badge when > 0). */
  unread?: number;
}

export interface TicketRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The ticket to render. */
  ticket: Ticket;
  /** Fires with the ticket id when the row is activated (click / Enter / Space). */
  onClick?: (id: string) => void;
  /** Render a non-interactive skeleton placeholder. */
  loading?: boolean;
  /** Mark the row as currently selected (bg tint + `aria-selected`). */
  selected?: boolean;
}

interface StatusSpec {
  glyph: string;
  label: string;
  /** Token text class — status is never color-only (glyph + label carry it). */
  cls: string;
}

// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is not color-only.
const STATUS: Record<TicketStatus, StatusSpec> = {
  open: { glyph: '◉', label: 'Open', cls: 'text-primary' },
  pending: { glyph: '◐', label: 'Pending', cls: 'text-warn' },
  solved: { glyph: '✓', label: 'Solved', cls: 'text-success' },
  closed: { glyph: '✕', label: 'Closed', cls: 'text-muted' },
};

/**
 * A single ticket row for a helpdesk queue/inbox — requester avatar, subject,
 * a glyph+label status marker, an optional priority chip, an updated-time hint,
 * and an unread badge. Activating fires `onClick(id)` (click, Enter, or Space).
 * Status is encoded by glyph **and** text (not color alone). Supports a
 * `loading` skeleton and a `selected` state. Colors come only from the
 * `--xen-*` token classes — no literal hex.
 */
export const TicketRow = React.forwardRef<HTMLDivElement, TicketRowProps>(function TicketRow(
  { ticket, onClick, loading = false, selected = false, className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div
        ref={ref}
        aria-label="Loading ticket"
        aria-busy="true"
        className={cn('flex animate-pulse items-center gap-3 border-b border-border p-3', className)}
        {...rest}
      >
        <span className="h-10 w-10 shrink-0 rounded-full bg-neutral-100" />
        <span className="flex flex-1 flex-col gap-1">
          <span className="h-3 w-[70%] rounded bg-neutral-100" />
          <span className="h-2.5 w-[40%] rounded bg-neutral-100" />
        </span>
      </div>
    );
  }

  const spec = STATUS[ticket.status] ?? STATUS.open;
  const unread = typeof ticket.unread === 'number' && ticket.unread > 0 ? ticket.unread : 0;
  const interactive = typeof onClick === 'function';
  const activate = interactive ? () => onClick!(ticket.id) : undefined;
  const a11y = `Ticket: ${ticket.subject}, ${spec.label}${
    ticket.requester ? `, from ${ticket.requester}` : ''
  }${unread ? `, ${unread} unread` : ''}`;

  return (
    <div
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? a11y : undefined}
      aria-selected={selected}
      onClick={activate}
      onKeyDown={activate ? activateOnKey(activate) : undefined}
      className={cn(
        'flex items-center gap-3 border-b border-border p-3 text-left',
        interactive && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        selected && 'bg-primary-50',
        className
      )}
      {...rest}
    >
      <Avatar size="md" name={ticket.requester} src={ticket.requesterAvatar} />
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-semibold text-on-surface">{ticket.subject}</span>
        <span className="flex flex-wrap items-center gap-2">
          <span className={cn('inline-flex items-center gap-1 text-xs font-semibold', spec.cls)}>
            <span aria-hidden="true">{spec.glyph}</span>
            {spec.label}
          </span>
          {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" /> : null}
          {ticket.updatedLabel ? (
            <span className="text-xs text-muted">{ticket.updatedLabel}</span>
          ) : null}
        </span>
      </span>
      {unread ? (
        <Badge tone="primary" aria-hidden="true">
          {unread > 99 ? '99+' : unread}
        </Badge>
      ) : null}
    </div>
  );
});
