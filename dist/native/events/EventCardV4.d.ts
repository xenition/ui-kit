import * as React from 'react';
import type { EventCardProps } from './EventCard';
export interface EventCardV4Props extends EventCardProps {
    /** Announced while the skeleton is up. Default `'Loading event'`. */
    loadingLabel?: string;
}
/**
 * **V4 event card** — same props as {@link EventCard} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={title}` on the
 *    pressable root replaces the whole subtree, so the date, the time, the
 *    venue, the category and the attendee count were all unreachable — the
 *    card said "Summer Fest, button" and stopped.
 * 2. **`imageAlt` reaches the placeholder path.** It was applied only to a
 *    real `<Image>`, so a card with no cover threw the caller's alt text away
 *    and drew an unnamed emoji.
 * 3. **The compact loading state keeps its row layout.** The skeleton ignored
 *    `variant`, so a `compact` card loaded as a column and then snapped
 *    sideways into a row when the data arrived.
 * 4. **The skeleton survives dark mode.** It was `tokens.ramps.neutral[100]`
 *    and `[200]`, and the native ramps keep their light orientation in both
 *    schemes — the theme's own comment says so — so every loading card was a
 *    pair of near-white slabs on a dark page.
 * 5. **A press is a state layer**, not `opacity: 0.9` — a dimmed card is how
 *    M3 spells *unavailable*.
 *
 * **Renders nothing without a `title`.**
 */
export declare function EventCardV4({ title, date, time, location, imageUrl, imageAlt, category, attendeeCount, variant, onPress, loading, loadingLabel, style, }: EventCardV4Props): React.ReactElement | null;
//# sourceMappingURL=EventCardV4.d.ts.map