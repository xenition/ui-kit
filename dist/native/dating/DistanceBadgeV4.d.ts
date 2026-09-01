import * as React from 'react';
import type { DistanceBadgeProps } from './DistanceBadge';
export type { DistanceBadgeProps as DistanceBadgeV4Props };
/**
 * **V4 distance badge** — the same props as {@link DistanceBadge}, nothing
 * added.
 *
 * ## Three changes
 *
 * 1. **A distance that is not a distance no longer renders `NaN km away`.**
 *    The base tested `distance == null` and then did arithmetic on whatever
 *    else arrived, so a `NaN` from an unresolved location fix — or a negative
 *    value from a bad payload — was formatted and shown. Anything that is not
 *    a finite, non-negative number now falls back to `nearbyLabel`, which is
 *    also the honest answer: we do not know how far away this person is.
 * 2. **The pin is never a second reader stop.** The glyph is decorative
 *    punctuation on a phrase that already says "away"; the badge is one
 *    accessible node whose name is the phrase alone. (This is the shape the
 *    web twin had to be restructured into — it announced the emoji.)
 * 3. **It draws on the V4 badge**, so `soft` is an opaque tint with the
 *    contrast-corrected `*Text` ink rather than a translucent wash that is a
 *    different colour on a card, on a photo scrim and on the page — and
 *    `variant` reaches it, which on web it did not.
 */
export declare function DistanceBadgeV4({ distance, unit, nearbyThreshold, nearbyLabel, variant, tone, glyph, }: DistanceBadgeProps): React.ReactElement;
//# sourceMappingURL=DistanceBadgeV4.d.ts.map