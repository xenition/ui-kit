import * as React from 'react';
import type { EventCardProps } from './EventCard';
/**
 * Alternate design (V3) for {@link EventCard}. Same props — a drop-in swap.
 *
 * A **horizontal media-left row**: a square cover thumbnail on the left carries
 * a floating token date block (the date string), and a text column on the right
 * holds the category badge, title, and location / attendee meta. Far denser and
 * more list-friendly than the original vertical card, and distinct from its
 * cover-less `compact` row (this keeps the media). Token-pure.
 */
export type EventCardV3Props = EventCardProps;
export declare function EventCardV3({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant, onPress, loading, style, }: EventCardV3Props): React.ReactElement;
//# sourceMappingURL=EventCardV3.d.ts.map