import * as React from 'react';
import type { SpeakerCardProps } from './SpeakerCard';
export interface SpeakerCardV4Props extends SpeakerCardProps {
}
/**
 * **V4 speaker card** — same props as {@link SpeakerCard}.
 *
 * ## Four changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel={name}` on the
 *    pressable root replaces the subtree, so the role, the company, the
 *    rating, the bio and every tag were unreachable — a conference app's
 *    speaker directory read as a list of bare names.
 * 2. **`rating` is clamped before it reaches `Rating`.** The primitive fills
 *    `Math.round(value)` glyphs out of `max`, so a `7` from an unvalidated
 *    feed drew seven stars in a five-star row and a negative one drew none
 *    while still announcing itself.
 * 3. **A press is a state layer.** `opacity: 0.9` fades the card's own
 *    content, which is the signal M3 spends on *disabled*.
 * 4. **The card is a raised surface**, so its text takes the `onCard` pair
 *    rather than being inked for the page underneath it.
 *
 * **Renders nothing without a `name`.**
 */
export declare function SpeakerCardV4({ name, role, company, avatarUrl, bio, rating, tags, variant, onPress, style, }: SpeakerCardV4Props): React.ReactElement | null;
//# sourceMappingURL=SpeakerCardV4.d.ts.map