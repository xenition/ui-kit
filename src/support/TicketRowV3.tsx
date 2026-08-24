import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import { TicketPriority } from './TicketPriority';
import { activateOnKey } from './internal';
import type { TicketRowProps, TicketStatus } from './TicketRow';

/** Same public contract as {@link TicketRow} — a drop-in alternate design. */
export type TicketRowV3Props = TicketRowProps;

const STATUS_DOT: Record<TicketStatus, string> = { open: 'bg-primary', pending: 'bg-warn', solved: 'bg-success', closed: 'bg-neutral-400' };
const STATUS_LABEL: Record<TicketStatus, string> = { open: 'Open', pending: 'Pending', solved: 'Solved', closed: 'Closed' };

/**
 * TicketRow, redesigned (v3): a **dense queue line**. A status dot leads, the
 * subject over a requester·updated subtitle, a compact priority glyph and an
 * unread badge trail — hairline-bordered for a tight queue. The opposite of v2's
 * card. Status is dot + word, never color alone. Same props, token-only.
 */
export const TicketRowV3 = React.forwardRef<HTMLDivElement, TicketRowV3Props>(function TicketRowV3(
  { ticket, onClick, loading = false, selected = false, className, ...rest },
  ref
) {
  if (loading) {
    return <div ref={ref} data-xen-ticket-row="" aria-label="Loading ticket" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)} {...rest}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
  }

  const interactive = typeof onClick === 'function';
  const sub = [STATUS_LABEL[ticket.status], ticket.requester, ticket.updatedLabel].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-ticket-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-selected={selected || undefined}
      aria-label={`${ticket.subject}, ${STATUS_LABEL[ticket.status]}`}
      onClick={interactive ? () => onClick?.(ticket.id) : undefined}
      onKeyDown={interactive ? activateOnKey(() => onClick?.(ticket.id)) : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', selected && 'bg-primary/5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <span className={cn('inline-block h-2.5 w-2.5 shrink-0 rounded-full', STATUS_DOT[ticket.status])} aria-hidden />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-on-surface">{ticket.subject}</p>
        {sub ? <p className="truncate text-xs text-muted">{sub}</p> : null}
      </div>
      {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" hideLabel /> : null}
      {ticket.unread && ticket.unread > 0 ? <Badge tone="primary">{ticket.unread}</Badge> : null}
    </div>
  );
});
