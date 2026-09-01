import * as React from 'react';
import type { VenueCardProps } from './VenueCard';
export interface VenueCardV4Props extends VenueCardProps {
    /** The directions control's label. Default `'Directions'`. */
    directionsLabel?: string;
}
/**
 * **V4 venue card** — same props as {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Directions is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the venue name as its label, so VoiceOver flattened
 *    the card into one leaf and the Directions control did not exist for it —
 *    on a component whose entire point is getting someone to a place. The
 *    card's activation now wraps only the media and text, and Directions is
 *    its **sibling**. (The web twin loses the same control a different way:
 *    the card's `onKeyDown` cancels Enter's default action on the nested
 *    button, so pressing Enter on "Directions" opens the venue instead.)
 * 2. **Directions clears 44 and presses as a state layer**, where it was a
 *    bare text run that dimmed to `opacity: 0.6` — inside M3's disabled band.
 * 3. **The card announces what it shows** — address, rating, capacity and
 *    distance — where `accessibilityLabel={name}` replaced all of it.
 * 4. **The media placeholder survives dark mode.** It was
 *    `tokens.ramps.neutral[100]`, and the native ramps carry their light
 *    orientation in both schemes, so an unloaded venue photo was a near-white
 *    slab on a dark page.
 * 5. **`rating` is clamped** before it reaches `Rating`, which otherwise fills
 *    `Math.round(value)` glyphs and will happily draw seven out of five.
 *
 * **Renders nothing without a `name`.**
 */
export declare function VenueCardV4({ name, address, distance, capacity, rating, imageUrl, imageAlt, directionsLabel, variant, onPress, onDirections, style, }: VenueCardV4Props): React.ReactElement | null;
//# sourceMappingURL=VenueCardV4.d.ts.map