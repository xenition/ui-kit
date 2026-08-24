import * as React from 'react';
import type { TicketRowProps } from './TicketRow';
/** Same public contract as {@link TicketRow} — a drop-in alternate design. */
export type TicketRowV2Props = TicketRowProps;
/**
 * TicketRow, redesigned (v2): an **elevated ticket card**. The requester avatar +
 * subject head the card, a status badge and priority chip sit on a meta row, and
 * the requester·updated line trails with an unread badge. Distinct from v1's row.
 * Same props, token-only.
 */
export declare const TicketRowV2: React.ForwardRefExoticComponent<TicketRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketRowV2.d.ts.map