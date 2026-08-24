import * as React from 'react';
import { type TicketStatus } from './internal';
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
export declare const OrderTicket: React.ForwardRefExoticComponent<OrderTicketProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrderTicket.d.ts.map