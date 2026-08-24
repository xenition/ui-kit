import * as React from 'react';
import { type TicketRowProps } from './TicketRow';
/** Drop-in alternate design for {@link TicketRow}. Identical public contract. */
export type TicketRowV2Props = TicketRowProps;
/**
 * TicketRow — **V2 (card)**. A raised card with a priority-tinted left rail, a
 * requester header, a status pill, an SLA chip and an unread badge. Same
 * `TicketRowProps` as {@link TicketRow}; swap the import to restyle. Status /
 * priority / SLA are carried by glyph + text, never color alone; all colors
 * trace to tokens.
 */
export declare function TicketRowV2({ ticket, onPress, loading, selected, style, }: TicketRowV2Props): React.ReactElement;
//# sourceMappingURL=TicketRowV2.d.ts.map