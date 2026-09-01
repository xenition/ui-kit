import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Button } from '../primitives/Button';
import { EmptyState } from '../commerce/EmptyState';
import { StatusPill } from './StatusPill';
import { TICKET_STATUS_META, type TicketStatus } from './internal';
import type { OrderTicketProps } from './OrderTicket';

/** Drop-in for {@link OrderTicketProps} — same props, the V4 "register" design. */
export type OrderTicketV4Props = OrderTicketProps;

const NEXT_LABEL: Record<TicketStatus, string> = {
  new: 'Start',
  preparing: 'Ready',
  ready: 'Serve',
  served: 'Done',
  void: 'Void',
};

/**
 * OrderTicket — **V4** "register" design (web parity of the native V4). A crisp
 * kitchen/order ticket for fast scanning: a **bold order number**, a
 * **glyph + word** status pill (state by icon + label, never color alone), the
 * item list with modifiers and notes (completed lines struck + muted), and the
 * elapsed time. When `onClick` is set the whole card is a keyboard-operable
 * `role="button"`; an optional bump button advances the ticket. Same
 * props/behavior as {@link OrderTicketProps}; composed from `Card` + `Button` +
 * `StatusPill`, all colors from `--xen-*` token classes (no literals).
 */
export const OrderTicketV4 = React.forwardRef<HTMLDivElement, OrderTicketV4Props>(function OrderTicketV4(
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
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)]',
        compact ? 'p-[var(--xen-space-sm)]' : 'p-[var(--xen-space-md)]',
        interactive
          ? 'cursor-pointer transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 active:scale-[0.99]'
          : '',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-lg font-extrabold tabular-nums text-on-surface">
            #{orderNumber}
            {destination ? <span className="text-sm font-normal text-muted">{`  ${destination}`}</span> : null}
          </span>
          {server || elapsed ? (
            <span className="text-xs font-medium text-muted">{[server, elapsed].filter(Boolean).join(' · ')}</span>
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
