import * as React from 'react';
import type { TicketRowProps } from './TicketRow';
/** Same public contract as {@link TicketRow} — a drop-in alternate design. */
export type TicketRowV3Props = TicketRowProps;
/**
 * TicketRow, redesigned (v3): a **dense queue line**. A status dot leads, the
 * subject over a requester·updated subtitle, a compact priority glyph and an
 * unread badge trail — hairline-bordered for a tight queue. The opposite of v2's
 * card. Status is dot + word, never color alone. Same props, token-only.
 */
export declare const TicketRowV3: React.ForwardRefExoticComponent<TicketRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TicketRowV3.d.ts.map