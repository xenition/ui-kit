import * as React from 'react';
import type { BadgeProps, BadgeSize, BadgeTone, BadgeVariant } from './Badge';
export type { BadgeProps as BadgeV4Props, BadgeSize, BadgeTone, BadgeVariant };
/**
 * **V4 badge** — same props as {@link Badge}, a different design line.
 *
 * The base badge is correct on one ground and only one: the page. `soft` tints
 * with 14% alpha, `outline` has no fill at all, and both label themselves with
 * a colour whose contrast was measured against `surface`. Drop either onto a
 * filled card, a glass panel, or artwork and the ground underneath changes the
 * fill, the label, or both — and the guarantee that made it readable was never
 * about that ground.
 *
 * So V4 badges **own their ground**:
 *
 * - `solid` fills with the tone and labels with its guaranteed on-pair.
 * - `soft` composites the same 14% tint into `surface` **opaquely**, so it is
 *   a real colour rather than a translucent one that borrows whatever is
 *   behind it.
 * - `outline` keeps its ring and paints `surface` behind it, so the label has
 *   the ground its contrast was measured against.
 *
 * Every label is then run through `ensureContrast` against the fill the badge
 * actually painted, so the promise is about this badge rather than about the
 * page it was designed on.
 *
 * Shape follows the seed rather than defaulting to a capsule: a count or a
 * status dot is round by nature and keeps `radius.full`, but a text tag takes
 * `radius.sm` — so a `sharp` brand gets square tags instead of the pills
 * `design.md` §8 lists among the tells of generic AI UI.
 */
export declare function BadgeV4({ tone, variant, size, dot, count, max, style, children, }: BadgeProps): React.ReactElement;
//# sourceMappingURL=BadgeV4.d.ts.map