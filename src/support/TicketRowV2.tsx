import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { TicketPriority } from './TicketPriority';
import { activateOnKey } from './internal';
import type { TicketRowProps, TicketStatus } from './TicketRow';

/** Same public contract as {@link TicketRow} — a drop-in alternate design. */
export type TicketRowV2Props = TicketRowProps;

const STATUS: Record<TicketStatus, { label: string; tone: BadgeTone }> = {
  open: { label: 'Open', tone: 'primary' },
  pending: { label: 'Pending', tone: 'warn' },
  solved: { label: 'Solved', tone: 'success' },
  closed: { label: 'Closed', tone: 'neutral' },
};

/**
 * TicketRow, redesigned (v2): an **elevated ticket card**. The requester avatar +
 * subject head the card, a status badge and priority chip sit on a meta row, and
 * the requester·updated line trails with an unread badge. Distinct from v1's row.
 * Same props, token-only.
 */
export const TicketRowV2 = React.forwardRef<HTMLDivElement, TicketRowV2Props>(function TicketRowV2(
  { ticket, onClick, loading = false, selected = false, className, ...rest },
  ref
) {
  if (loading) {
    return <div ref={ref} data-xen-ticket-row="" aria-label="Loading ticket" className={cn('h-20 animate-pulse rounded-lg bg-neutral-100', className)} {...rest} />;
  }

  const st = STATUS[ticket.status] ?? STATUS.open;
  const interactive = typeof onClick === 'function';
  const meta = [ticket.requester, ticket.updatedLabel].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-ticket-row=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-selected={selected || undefined}
      aria-label={`${ticket.subject}, ${st.label}`}
      onClick={interactive ? () => onClick?.(ticket.id) : undefined}
      onKeyDown={interactive ? activateOnKey(() => onClick?.(ticket.id)) : undefined}
      className={cn('flex flex-col gap-2 rounded-lg bg-surface p-3 shadow-sm', selected && 'ring-2 ring-primary', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex items-start gap-3">
        <Avatar src={ticket.requesterAvatar} name={ticket.requester} size="sm" />
        <p className="min-w-0 flex-1 text-sm font-semibold text-on-surface">{ticket.subject}</p>
        {ticket.unread && ticket.unread > 0 ? <Badge tone="primary">{ticket.unread}</Badge> : null}
      </div>
      <div className="flex items-center gap-2">
        <Badge tone={st.tone}>{st.label}</Badge>
        {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" /> : null}
        {meta ? <span className="ml-auto truncate text-xs text-muted">{meta}</span> : null}
      </div>
    </div>
  );
});
