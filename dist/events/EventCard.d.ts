import * as React from 'react';
/** Visual density / emphasis of an {@link EventCard}. */
export type EventCardVariant = 'default' | 'compact' | 'featured';
export interface EventCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Event name. */
    title: string;
    /** Pre-formatted date label, e.g. `Sat, Aug 24`. */
    date?: string;
    /** Pre-formatted time label, e.g. `7:00 PM`. */
    time?: string;
    /** Venue / location line. */
    location?: string;
    /** Cover image URL. When absent a token-filled placeholder is drawn. */
    imageUrl?: string;
    /** Alt text for the cover (defaults to the title). */
    imageAlt?: string;
    /** Short category label rendered as a badge (e.g. `Music`). */
    category?: string;
    /** Attendee count shown with a people glyph. */
    attendeeCount?: number;
    /** Density / emphasis. `featured` enlarges the cover and title. */
    variant?: EventCardVariant;
    /** Show a skeleton placeholder instead of content. */
    loading?: boolean;
}
/**
 * Summary tile for a single event — the entry point of the events module.
 * Renders a cover (image or token placeholder), an optional category badge, the
 * title, and a date / time / location meta row. `variant` switches between a
 * full card, a `compact` list row (no cover), and a larger `featured`
 * treatment. Passing `onClick` makes the whole card an accessible button (role
 * + keyboard). All colors come from the `--xen-*` tokens — no literal colors.
 */
export declare const EventCard: React.ForwardRefExoticComponent<EventCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EventCard.d.ts.map