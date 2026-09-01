import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge } from '../primitives/Badge';
import { TicketPriority } from './TicketPriority';
import { activateOnKey } from './internal';
import type { TicketRowProps, TicketStatus } from './TicketRow';

/** Drop-in for {@link TicketRowProps} — same props, the V4 "console" design. */
export type TicketRowV4Props = TicketRowProps;

interface StatusSpec {
  glyph: string;
  label: string;
  /** Left accent-bar token bg. */
  bar: string;
  /** Soft-tint pill classes (bg + text) — status is never color-only. */
  pill: string;
}

// open → primary, pending → warn, solved → success, closed → muted. Each has a
// distinct glyph so status is never color-only.
const STATUS: Record<TicketStatus, StatusSpec> = {
  open: { glyph: '◉', label: 'Open', bar: 'bg-primary', pill: 'bg-primary/10 text-primary' },
  pending: { glyph: '◐', label: 'Pending', bar: 'bg-warn', pill: 'bg-warn/10 text-warn' },
  solved: { glyph: '✓', label: 'Solved', bar: 'bg-success', pill: 'bg-success/10 text-success' },
  closed: { glyph: '✕', label: 'Closed', bar: 'bg-muted', pill: 'bg-muted/10 text-muted' },
};

/**
 * TicketRow — **V4** "console" design (web parity of the native V4). The
 * calm-workspace take on a queue row: an elevated rounded card with a left
 * status-accent bar (the signature at-a-glance cue) and a soft-tint status pill
 * carrying glyph + label. Requester avatar, subject, optional priority chip,
 * updated hint, and an unread badge. Status is encoded by glyph **and** color
 * (never color alone). Same props/behavior as {@link TicketRowProps}; all colors
 * from `--xen-*` token classes (no literal hex). Supports a `loading` skeleton
 * and a `selected` state.
 */
export const TicketRowV4 = React.forwardRef<HTMLDivElement, TicketRowV4Props>(function TicketRowV4(
  { ticket, onClick, loading = false, selected = false, className, ...rest },
  ref
) {
  if (loading) {
    return (
      <div
        ref={ref}
        aria-label="Loading ticket"
        aria-busy="true"
        className={cn('flex animate-pulse overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface shadow-sm', className)}
        {...rest}
      >
        <span className="w-1 shrink-0 bg-on-surface/10" />
        <span className="flex flex-1 items-center gap-3 p-3">
          <span className="h-10 w-10 shrink-0 rounded-full bg-on-surface/10" />
          <span className="flex flex-1 flex-col gap-1">
            <span className="h-3 w-[70%] rounded bg-on-surface/10" />
            <span className="h-2.5 w-[40%] rounded bg-on-surface/10" />
          </span>
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
        'flex overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-left shadow-sm',
        interactive && 'cursor-pointer hover:bg-on-surface/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        selected && 'bg-primary/10',
        className
      )}
      {...rest}
    >
      {/* Left status-accent bar — the V4 at-a-glance cue. */}
      <span className={cn('w-1 shrink-0', spec.bar)} aria-hidden="true" />

      <span className="flex flex-1 items-center gap-3 p-3">
        <Avatar size="md" name={ticket.requester} src={ticket.requesterAvatar} />
        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="truncate text-base font-bold text-on-surface">{ticket.subject}</span>
          <span className="flex flex-wrap items-center gap-2">
            <span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold', spec.pill)}>
              <span aria-hidden="true">{spec.glyph}</span>
              {spec.label}
            </span>
            {ticket.priority ? <TicketPriority level={ticket.priority} size="sm" /> : null}
            {ticket.updatedLabel ? <span className="text-xs text-muted">{ticket.updatedLabel}</span> : null}
          </span>
        </span>
        {unread ? (
          <Badge tone="primary" aria-hidden="true">
            {unread > 99 ? '99+' : unread}
          </Badge>
        ) : null}
      </span>
    </div>
  );
});
