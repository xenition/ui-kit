import * as React from 'react';
import type { SessionCardProps } from './SessionCard';
export interface SessionCardV4Props extends SessionCardProps {
    /** The bookmark action's name while the session is not bookmarked. */
    bookmarkLabel?: string;
    /** The bookmark action's name while it is. */
    unbookmarkLabel?: string;
    /** The seat meter's caption. Default `'12 / 100 seats taken'`. */
    formatSeats?: (taken: number, capacity: number) => string;
}
/**
 * **V4 session card** — the web twin of the native `SessionCardV4`, same props
 * as {@link SessionCard} plus `bookmarkLabel`, `unbookmarkLabel` and
 * `formatSeats`.
 *
 * ## Six changes
 *
 * 1. **Enter on the bookmark bookmarks the session.** This is the module's
 *    headline defect, and it is a live keyboard bug. The card guarded the
 *    *click* path with `e.stopPropagation()` and left the *key* path open, so
 *    the card's own `onKeyDown` caught the keydown bubbling out of the star and
 *    ran `e.preventDefault(); currentTarget.click()`. Enter's default action on
 *    a `<button>` is the click it had just cancelled, and Space's click fires
 *    on keyup, which is cancelled too — so a keyboard user pressed Enter on the
 *    star and **navigated to the session** without bookmarking it. The fix is
 *    structural, not another guard: the card's activation is a real `<button>`
 *    around the title, the star is that button's **sibling**, and the
 *    synthesised `currentTarget.click()` is gone entirely.
 * 2. **The seat meter is a real `progressbar`, and it stops printing negative
 *    seats.** It was a bare `div` with a width, invisible to a screen reader,
 *    and the base clamped the *bar* while printing the raw number — so
 *    `seatsTaken: -5` drew an empty meter beside the words "−5 / 100 seats
 *    taken". `seatParts()` clamps both. The meter is also a sibling of the
 *    activation: inside `role="button"` its value would be presentational.
 * 3. **One accessible name carrying the session.** `aria-label={title}`
 *    replaced the subtree, so the time, the room, the track, the speakers and
 *    the seat count were all unreachable.
 * 4. **The bookmarked star is the same tone on both twins.** It was `primary`
 *    here and `accent` on native, and this twin could not simply match —
 *    `IconColor` has no `accent`. Both draw the glyph as text in the
 *    contrast-corrected `primary` ink rather than through `Icon`'s fill slot.
 * 5. **A track is identity, so its badge does not change tone with the card.**
 *    The badge went `primary` on a highlighted card and `neutral` otherwise —
 *    the same track wearing two colours depending on the card around it.
 * 6. **Press is a state layer, and both controls clear 44.** `hover:opacity-95`
 *    on the card and `hover:opacity-70` on the star dim their own content,
 *    which is M3's *disabled* signal, and the star was a bare `p-xs` glyph.
 */
export declare const SessionCardV4: React.ForwardRefExoticComponent<SessionCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SessionCardV4.d.ts.map