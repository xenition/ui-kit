import * as React from 'react';
/** Emphasis of a {@link SessionCard}. */
export type SessionCardVariant = 'default' | 'highlight';
export interface SessionSpeaker {
    name: string;
    avatarUrl?: string;
}
export interface SessionCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Session title. */
    title: string;
    /** Pre-formatted time range, e.g. `14:00 – 14:45`. */
    time?: string;
    /** Room / stage. */
    room?: string;
    /** Track label, rendered as a badge. */
    track?: string;
    /** Short abstract. */
    abstract?: string;
    /** Speakers, shown as an avatar cluster + names. */
    speakers?: SessionSpeaker[];
    /** Capacity, for a `seatsTaken / capacity` meter. */
    capacity?: number;
    /** Seats already taken. */
    seatsTaken?: number;
    /** Whether the session is bookmarked. */
    bookmarked?: boolean;
    /** Fires with the desired next bookmark state. */
    onBookmark?: (next: boolean) => void;
    /** `highlight` adds a primary rail for keynotes/featured sessions. */
    variant?: SessionCardVariant;
}
/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph (★/☆) plus `aria-pressed`, and its clicks don't
 * trigger the card's `onClick`. Colors come from the `--xen-*` tokens; no
 * literal colors.
 */
export declare const SessionCard: React.ForwardRefExoticComponent<SessionCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionCard.d.ts.map