import * as React from 'react';
import { type TicketRowProps } from './TicketRow';
/** Drop-in alternate design for {@link TicketRow}. Identical public contract. */
export type TicketRowV3Props = TicketRowProps;
/**
 * TicketRow — **V3 (dense line)**. A single-line queue row: a status dot,
 * a truncated subject, a priority glyph, an updated-time hint and an unread
 * count — no avatar, minimal padding, built for long scannable lists. Same
 * `TicketRowProps` as {@link TicketRow}. Status/priority carried by glyph +
 * text; token colors only.
 */
export declare function TicketRowV3({ ticket, onPress, loading, selected, style, }: TicketRowV3Props): React.ReactElement;
//# sourceMappingURL=TicketRowV3.d.ts.map