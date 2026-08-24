import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
/** Drop-in replacement for {@link SessionCard} — identical props. */
export type SessionCardV2Props = SessionCardProps;
/**
 * SessionCard — **timeline card** alternate design (web / React DOM).
 *
 * A fixed left gutter renders the session time above a node dot and a vertical
 * connector, so a stack of these reads as an agenda rail. The elevated body on
 * the right keeps the track badge, title, room, abstract, speaker cluster and
 * the seat-capacity meter. `highlight` fills the node and tints the body with
 * the primary token. Same props as {@link SessionCard} — a drop-in swap.
 * Token-pure.
 */
export declare const SessionCardV2: React.ForwardRefExoticComponent<SessionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionCardV2.d.ts.map