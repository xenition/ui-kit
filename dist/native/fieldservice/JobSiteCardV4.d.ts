import * as React from 'react';
import type { JobSiteCardProps } from './JobSiteCard';
export interface JobSiteCardV4Props extends JobSiteCardProps {
    /** The navigate action's label. Default `'Directions'`. */
    directionsLabel?: string;
}
/**
 * **V4 job site card** — same props as {@link JobSiteCard} plus
 * `directionsLabel`.
 *
 * ## Four changes
 *
 * 1. **Directions is reachable.** The base nested the button inside the card's
 *    own activation. On the web twin the card's `onKeyDown` swallowed the
 *    Enter that a `<button>` needs to fire its click, so pressing Enter on
 *    "Directions" opened the site instead of routing to it; here the outer
 *    `Pressable` was `accessible` with the site's name as its label, which
 *    flattens the card to one leaf and makes the button **unreachable** to
 *    VoiceOver entirely. Every path that is not a sighted tap was broken. The
 *    card's activation now wraps only the identity region and the action is
 *    its **sibling** — the shape §1.2 asks for, after this bug turned up in
 *    four components.
 * 2. **The card announces its meta.** `"name, address, status"` replaced the
 *    subtree, dropping the crew count, the open orders and — on a card whose
 *    point is getting a technician to a site — the distance.
 * 3. **A press is a state layer** and the identity region clears 44;
 *    `opacity: 0.85` is deleted rather than translated.
 * 4. **The disc is decorative** and the badge is the module's one shape, so a
 *    reader stops once and the same screen looks the same on both platforms.
 *
 * **Renders nothing without a `name`.**
 */
export declare function JobSiteCardV4({ name, address, status, crewCount, openOrders, distance, glyph, directionsLabel, onNavigate, onPress, style, }: JobSiteCardV4Props): React.ReactElement | null;
//# sourceMappingURL=JobSiteCardV4.d.ts.map