import * as React from 'react';
import type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './Badge';
export type { BadgeProps as BadgeV4Props, BadgeSize, BadgeTone, BadgeVariant };
/**
 * **V4 badge** — the web twin of the native `BadgeV4`, same props as
 * {@link Badge}, a different design line.
 *
 * The base badge is correct on one ground and only one: the page. `soft` tints
 * with a ramp step, `outline` has no fill at all, and both label themselves
 * with a colour whose contrast was measured against `surface`. Drop either
 * onto a filled card, a glass panel, or artwork and the ground underneath
 * changes the fill, the label, or both — and the guarantee that made it
 * readable was never about that ground.
 *
 * So V4 badges **own their ground**:
 *
 * - `solid` fills with the tone and labels with its guaranteed on-pair. (The
 *   base web badge painted `bg-primary-50 text-primary` here — a soft tint
 *   wearing the solid name, and a different badge from its native twin. V4
 *   makes solid actually solid, and the two twins finally agree.)
 * - `soft` composites the tint into `surface` **opaquely** with `color-mix`,
 *   so it is a real colour rather than a translucent one borrowing whatever is
 *   behind it.
 * - `outline` keeps its ring and paints `surface` behind it, so the label has
 *   the ground its contrast was measured against.
 *
 * Shape follows the seed rather than defaulting to a capsule: a count or a
 * status dot is round by nature and keeps `radius.full`, but a text tag takes
 * `radius.sm` — so a `sharp` brand gets square tags instead of the pills
 * `design.md` §8 lists among the tells of generic AI UI.
 */
export declare const BadgeV4: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=BadgeV4.d.ts.map