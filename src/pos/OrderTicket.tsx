import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { TICKET_STATUS_META, type TicketStatus } from './internal';

export interface OrderTicketItem {
  /** Item name. */
  name: string;
  /** Quantity (default 1). */
  quantity?: number;
  /** Modifier / option chips. */
  modifiers?: string[];
  /** Kitchen note. */
  note?: string;
  /** Line already completed — struck + muted. */
  done?: boolean;
}

export type OrderTicketVariant = 'default' | 'compact';

export interface OrderTicketProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Ticket / order reference shown in the header. */
  orderNumber: string;
  /** Destination (table, "Takeaway", delivery zone). */
  destination?: string;
  /** Server / channel label. */
  server?: string;
  /** Kitchen lifecycle status — glyph + word pill (never color alone). */
  status?: TicketStatus;
  /** Pre-formatted elapsed / placed time (e.g. "4m ago"). */
  elapsed?: string;
  /** Line items. When empty a labelled {@link EmptyState} renders. */
  items: OrderTicketItem[];
  /** Advance-status handler; renders a bump button when provided. */
  onBump?: () => void;
  /** Copy for the bump button (default derived from status). */
  bumpLabel?: string;
  /** `default` shows modifiers/notes; `compact` lists names only. */
  variant?: OrderTicketVariant;
  /** Empty-state copy when the ticket has no items. */
  emptyLabel?: string;
  /** Parity alias for `data-testid`. */
  testID?: string;
}

const NEXT_LABEL: Record<TicketStatus, string> = {
  new: 'Start',
  preparing: 'Ready',
  ready: 'Serve',
  served: 'Done',
  void: 'Void',
};

/**
 * A kitchen / fulfilment order ticket — the DOM parity of the native
 * `OrderTicket`: header (order ref, destination, server, elapsed time) with a
 * **glyph + word** status pill, the item list with modifiers and notes
 * (completed lines struck + muted, state by text not color), and an optional
 * bump button that advances the ticket. An empty ticket renders an
 * {@link EmptyState}. When `onClick` is set the whole ticket is a keyboard-
 * operable `role="button"`. Composed from `Card` + `Button` + `StatusPill`;
 * token-only colors.
 */
export const OrderTicket = React.forwardRef<HTMLDivElement, OrderTicketProps>(function OrderTicket(
  {
    orderNumber,
    destination,
    server,
    status,
    elapsed,
    items,
    onBump,
    bumpLabel,
    variant = 'default',
    emptyLabel = 'No items on this ticket',
    testID,
    onClick,
    onKeyDown,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const interactive = typeof onClick === 'function';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (interactive && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      (onClick as (ev: React.SyntheticEvent) => void)(e);
    }
  };

  return (
    <Card
      ref={ref}
      data-xen-order-ticket=""
      data-testid={testID}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `Ticket ${orderNumber}${status ? `, ${TICKET_STATUS_META[status].label}` : ''}`
          : undefined
      }
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        compact ? 'p-[var(--xen-space-sm)]' : 'p-[var(--xen-space-md)]',
        interactive
          ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          : '',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-base font-bold text-on-surface">
            #{orderNumber}
            {destination ? <span className="font-normal text-muted">{`  ${destination}`}</span> : null}
          </span>
          {server || elapsed ? (
            <span className="text-xs text-muted">{[server, elapsed].filter(Boolean).join(' · ')}</span>
          ) : null}
        </div>
        {status ? <StatusPill meta={TICKET_STATUS_META[status]} variant="soft" size="sm" /> : null}
      </div>

      {items.length === 0 ? (
        <EmptyState title={emptyLabel} />
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          {items.map((item, i) => {
            const qty = item.quantity ?? 1;
            return (
              <div key={i} className={cn('flex flex-col gap-0.5', item.done ? 'opacity-60' : '')}>
                <span
                  className={cn(
                    'text-sm font-semibold',
                    item.done ? 'text-muted line-through' : 'text-on-surface'
                  )}
                >
                  {qty > 1 ? `${qty}× ` : ''}
                  {item.name}
                </span>
                {!compact && item.modifiers && item.modifiers.length > 0 ? (
                  <span className="text-xs text-muted">{item.modifiers.join(' · ')}</span>
                ) : null}
                {!compact && item.note ? (
                  <span className="text-xs font-semibold text-warn">⚠ {item.note}</span>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {onBump ? (
        <Button
          size="sm"
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            onBump();
          }}
          className="self-start"
        >
          {bumpLabel ?? (status ? NEXT_LABEL[status] : 'Bump')}
        </Button>
      ) : null}
    </Card>
  );
});
