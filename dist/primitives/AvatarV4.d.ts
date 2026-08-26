import * as React from 'react';
import type { AvatarProps, AvatarShape, AvatarSize, AvatarStatus } from './Avatar';
export type { AvatarProps as AvatarV4Props, AvatarShape, AvatarSize, AvatarStatus };
/**
 * **V4 avatar** — the web twin of the native `AvatarV4`, same props as
 * {@link Avatar}, a different design line.
 *
 * The avatar is the single most-repeated component in a product — a roster, a
 * comment thread, an assignee column, a header — so every flaw in it is a flaw
 * the user meets a hundred times a day. Four things change:
 *
 * 1. **A derived monogram ground.** The base avatar paints every initials
 *    fallback `bg-primary-50 text-primary`, which makes a list of twelve
 *    people twelve identical brand-tinted discs — the accent does no work and
 *    the faces are indistinguishable. V4 derives the ground from the **name**
 *    (`monogramStep`, an FNV hash into the neutral ramp), so the same person is
 *    the same colour on every screen and their neighbour is not. Neutral, not
 *    a rainbow: §35.5 and §35.8 both say a list of twenty accents is noise.
 *    The exact hex is re-derived per scheme from the compiled theme and the
 *    monogram re-measured against it, so the pair is guaranteed rather than
 *    inherited from `primary-50`, whose contrast nobody checked in dark.
 * 2. **A fallback for "no name either".** `?` is what the base renders with
 *    nothing to go on, and a question mark reads as an error, not as an
 *    unknown person. V4 draws a silhouette from two token-coloured spans, so
 *    it tints with the theme instead of borrowing a platform emoji's palette.
 * 3. **A ring that is a halo, not a crop.** The base ring is `ring-2` sitting
 *    ON the portrait's edge. V4 insets the portrait and leaves a `surface` gap
 *    between it and the ring, which is how a ring is drawn when it means
 *    something. Its colour is contrast-checked at 3:1 — a ring is a UI
 *    boundary, judged at 3:1, not text.
 * 4. **A status dot that is not only a colour.** Four presence states told
 *    apart by hue alone fail §46 outright — and `busy` vs `offline` is exactly
 *    the pair a red-green viewer cannot separate. V4 names the state for a
 *    screen reader and contrast-checks the dot at 3:1 against `surface` rather
 *    than trusting the raw semantic slot, which is only ever guaranteed
 *    against its own on-pair. Its position follows the silhouette as well: on
 *    a circle the dot's centre sits on the 45° point of the arc, which is
 *    where the bounding box's corner happens to be at `md` and is not at `xl`.
 *
 * No gradient anywhere. §35.11 keeps those for the hero and the one primary
 * action, and a gradient behind someone's face is decoration on a data point.
 */
export declare const AvatarV4: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=AvatarV4.d.ts.map