import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
/**
 * Alternate design (V2) for {@link SessionCard}. Same props — a drop-in swap.
 *
 * A **timeline card**: a fixed left gutter renders the session time above a
 * node dot and a vertical connector, so a stack of these reads as an agenda
 * rail. The elevated body on the right keeps the track badge, title, room, an
 * abstract, a speaker cluster and the seat-capacity meter. `highlight` fills
 * the node and rail with the primary token. Token-pure.
 */
export type SessionCardV2Props = SessionCardProps;
export declare function SessionCardV2({ title, time, room, track, abstract, speakers, capacity, seatsTaken, bookmarked, onBookmark, onPress, variant, style, }: SessionCardV2Props): React.ReactElement;
//# sourceMappingURL=SessionCardV2.d.ts.map