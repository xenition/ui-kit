import * as React from 'react';
import type { OrderTicketProps } from './OrderTicket';
/** Drop-in for {@link OrderTicketProps} — same props, the V4 "register" design. */
export type OrderTicketV4Props = OrderTicketProps;
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
export declare const OrderTicketV4: React.ForwardRefExoticComponent<OrderTicketProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrderTicketV4.d.ts.map