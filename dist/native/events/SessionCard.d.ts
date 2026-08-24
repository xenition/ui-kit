import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Emphasis of a {@link SessionCard}. */
export type SessionCardVariant = 'default' | 'highlight';
export interface SessionSpeaker {
    name: string;
    avatarUrl?: string;
}
export interface SessionCardProps {
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
    /** Press handler for the card. */
    onPress?: () => void;
    /** `highlight` adds a primary rail for keynotes/featured sessions. */
    variant?: SessionCardVariant;
    style?: StyleProp<ViewStyle>;
}
/**
 * A rich conference session card: track badge, title, time / room meta, an
 * abstract, a speaker cluster, an optional seat-capacity meter, and a bookmark
 * toggle. `highlight` adds a primary left rail for keynotes. The bookmark state
 * uses a filled/outline glyph plus `accessibilityState`. Colors come from the
 * compiled theme tokens; no literal colors.
 */
export declare function SessionCard({ title, time, room, track, abstract, speakers, capacity, seatsTaken, bookmarked, onBookmark, onPress, variant, style, }: SessionCardProps): React.ReactElement;
//# sourceMappingURL=SessionCard.d.ts.map