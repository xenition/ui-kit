import * as React from 'react';
import type { EventCardProps } from './EventCard';
/** Drop-in replacement for {@link EventCard} — identical props. */
export type EventCardV3Props = EventCardProps;
/**
 * EventCard — **horizontal media-left row** alternate design (web / React DOM).
 *
 * A dense list row: a square cover thumbnail on the left carries a floating
 * token date block, and a text column on the right holds the category badge,
 * title, and time / location / attendee meta. Far denser and more list-friendly
 * than the base vertical card, and distinct from its cover-less `compact` row
 * (this keeps the media). Same props as {@link EventCard} — a drop-in swap.
 * Token-pure.
 */
export declare const EventCardV3: React.ForwardRefExoticComponent<EventCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventCardV3.d.ts.map