import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
export interface SessionCardV4Props extends SessionCardProps {
    /** Name of the bookmark control while the session is not bookmarked. Default `'Bookmark session'`. */
    bookmarkLabel?: string;
    /** Name of the bookmark control once it is. Default `'Remove bookmark'`. */
    unbookmarkLabel?: string;
    /** The seat meter's caption. Default `'12 / 100 seats taken'`. */
    formatSeats?: (taken: number, capacity: number) => string;
}
/**
 * **V4 session card** — same props as {@link SessionCard} plus
 * `bookmarkLabel`, `unbookmarkLabel` and `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **The bookmark is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the title as its name, so VoiceOver flattened the
 *    entire card — bookmark star included — into one leaf. There was no
 *    gesture that bookmarked a session. The card's activation now wraps only
 *    the media and text, and the star is its **sibling** inside the card, on
 *    both twins. (The web twin fails the same way through a different door:
 *    its card-level `onKeyDown` cancels Enter's default action on the nested
 *    button and navigates instead.)
 * 2. **A negative seat count stops being printed.** The base clamped the
 *    *bar* and then printed the raw number, so `seatsTaken: -5` drew an empty
 *    meter beside the words "−5 / 100 seats taken". `seatParts()` clamps both.
 * 3. **The meter is a real `progressbar` with a value**, and it sits outside
 *    the card's activation so a reader can reach it at all.
 * 4. **The card announces its content** — track, title, time, room, speakers
 *    and seats — where `accessibilityLabel={title}` replaced all of it.
 * 5. **A track is identity, so its badge holds one tone.** The base switched
 *    the badge to `primary` on a highlighted card, which made the same track
 *    two colours depending on the card it appeared in.
 * 6. **The bookmarked star is `primary` on both twins, drawn as ink** — it was
 *    `accent` here and `primary` on web, and web's `IconColor` has no `accent`
 *    member to match with. The meter's track, the last neutral-ramp index in
 *    the file, is the shared opaque placeholder.
 *
 * **Renders nothing without a `title`.**
 */
export declare function SessionCardV4({ title, time, room, track, abstract, speakers, capacity, seatsTaken, bookmarked, bookmarkLabel, unbookmarkLabel, formatSeats, onBookmark, onPress, variant, style, }: SessionCardV4Props): React.ReactElement | null;
//# sourceMappingURL=SessionCardV4.d.ts.map