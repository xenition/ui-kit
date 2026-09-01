import * as React from 'react';
import type { OrderTicketProps } from './OrderTicket';
/** Drop-in for {@link OrderTicketProps} — same props, the V4 "register" design. */
export type OrderTicketV4Props = OrderTicketProps;
/**
 * OrderTicket — **V4** "register" design. A crisp kitchen/order ticket for fast
 * scanning: a **bold order number**, a **glyph + word** status pill (state by
 * icon + label, never color alone), the item list with modifiers and notes
 * (completed lines struck + muted), and the elapsed time. An optional bump button
 * advances the ticket; when `onPress` is set the whole card is a button. An empty
 * ticket renders an {@link EmptyState}. Same props/behavior as
 * {@link OrderTicketProps}; composed from `Card` + `Button` + `StatusPill`,
 * token-only colors via `useXenitionTheme()`.
 */
export declare function OrderTicketV4({ orderNumber, destination, server, status, elapsed, items, onBump, bumpLabel, onPress, variant, emptyLabel, testID, style, }: OrderTicketV4Props): React.ReactElement;
//# sourceMappingURL=OrderTicketV4.d.ts.map