import * as React from 'react';
import { type ViewStyle } from 'react-native';
/** The kind of match event carried by an {@link EventFeedItem}. */
export type EventFeedKind = 'goal' | 'own-goal' | 'yellow' | 'red' | 'sub' | 'var' | 'penalty';
/** One entry in the {@link EventFeed} — a single match moment. */
export interface EventFeedItem {
    /** Match minute label as text (e.g. `"45+2'"`, `"78'"`). */
    minute: string;
    /** The kind of event — selects the glyph and semantic tint. */
    kind: EventFeedKind;
    /** Human-readable description (e.g. `"Haaland (assist: De Bruyne)"`). */
    text: string;
    /**
     * Which team the event belongs to. When set the row aligns to that side
     * (home→left, away→right); when omitted the row is left-aligned.
     */
    side?: 'home' | 'away';
}
export interface EventFeedProps {
    /**
     * The match events, in the order they should appear (typically newest-first
     * or chronological — the caller controls it). Each renders as a row with a
     * minute chip, a kind glyph and its text.
     */
    events: readonly EventFeedItem[];
    /** Optional card heading (e.g. `"Key events"`). Omit for the list alone. */
    title?: string;
    /** Text shown when {@link events} is empty. Default `"No events yet"`. */
    emptyLabel?: string;
    /** Optional style override merged onto the card container. */
    style?: ViewStyle;
}
/**
 * EventFeed — **V4** "broadcast" design. A vertical feed of match moments on an
 * elevated card: each row pairs a bold minute chip with a round glyph node
 * (goal ⚽ / card 🟨·🟥 / sub 🔁 / VAR 📺) tinted from its semantic token and the
 * event text. Goals are emphasized (heavier text); rows with a `side` align
 * home→left / away→right. Kind is always legible from glyph + shape, not color
 * alone. Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
export declare function EventFeed({ events, title, emptyLabel, style, }: EventFeedProps): React.ReactElement;
//# sourceMappingURL=EventFeed.d.ts.map