import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
export interface OrderTicketProps {
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
    /** Tap handler for the whole ticket. */
    onPress?: () => void;
    /** `default` shows modifiers/notes; `compact` lists names only. */
    variant?: OrderTicketVariant;
    /** Empty-state copy when the ticket has no items. */
    emptyLabel?: string;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A kitchen / fulfilment order ticket: header (order ref, destination, server,
 * elapsed time) with a **glyph + word** status pill, the item list with
 * modifiers and notes (completed lines struck + muted, state by text not color),
 * and an optional bump button that advances the ticket. An empty ticket renders
 * an {@link EmptyState}. Composed from `Card` + `Button` + `StatusPill`;
 * token-only colors.
 */
export declare function OrderTicket({ orderNumber, destination, server, status, elapsed, items, onBump, bumpLabel, onPress, variant, emptyLabel, testID, style, }: OrderTicketProps): React.ReactElement;
//# sourceMappingURL=OrderTicket.d.ts.map