import * as React from 'react';
import type { DistanceBadgeProps } from './DistanceBadge';
/** Same props as {@link DistanceBadge}; V4 adds none — it makes two of them work. */
export type DistanceBadgeV4Props = DistanceBadgeProps;
/**
 * **V4 distance badge** — the web twin of the native `DistanceBadgeV4`, same
 * props as {@link DistanceBadge}.
 *
 * ## Three changes
 *
 * 1. **`variant` is honoured.** It was destructured into `_variant` and thrown
 *    away, on the stated grounds that "the web `Badge` renders a single soft
 *    tone" — which is not true: the web `Badge` has a full solid/soft/outline
 *    map and always has. The consequence was that the same badge, given the
 *    same props, rendered **solid on web and soft on native**, and the default
 *    (`'soft'`) was the one the caller never got.
 * 2. **The pin is not a reader stop.** The glyph was concatenated into the
 *    badge's text, so "📍" reached the accessibility tree — read out loud as
 *    "round pushpin" by some readers and silently swallowed by others. It is
 *    decorative and is now marked as such; the distance is the name.
 * 3. **It is a `BadgeV4`**, so the badge owns its ground: `soft` composites its
 *    tint into `surface` opaquely instead of borrowing whatever it is sitting
 *    on — and this badge sits on a profile photo about as often as it sits on
 *    a card.
 */
export declare const DistanceBadgeV4: React.ForwardRefExoticComponent<DistanceBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=DistanceBadgeV4.d.ts.map