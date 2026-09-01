/**
 * The `beauty` module's own V4 vocabulary.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the part
 * that is genuinely this module's: the price-comparison rule and the two
 * geometry constants its image components share.
 *
 * Nothing here is exported from the package.
 */

import {
  clampPercent,
  metaLine,
  onPair,
  ratingParts,
  skeletonFill,
  toneFill,
  toneInk,
  type ToneV4,
} from '../../primitives/internal/tone-v4';

export { clampPercent, metaLine, onPair, ratingParts, skeletonFill, toneFill, toneInk };
export type { ToneV4 };

/**
 * The struck "was" price, or `null`.
 *
 * `PriceListRow` and `ProductRecommendation` both carry a compare-at and
 * neither drew it. The rule is the one `PlanSelectorV4` settled: a compare-at
 * that is **not higher** than the price it is compared against is a fabricated
 * discount, and the component declines to draw one. Unlike the plan card these
 * are integer cents, so the comparison is a real one rather than a string
 * equality.
 */
export function compareAtCents(
  price: number | undefined,
  compareAt: number | undefined
): number | null {
  if (typeof price !== 'number' || typeof compareAt !== 'number') return null;
  if (!Number.isFinite(price) || !Number.isFinite(compareAt)) return null;
  return compareAt > price ? compareAt : null;
}

/**
 * The before/after divider's grab width.
 *
 * Wide enough to hit with a thumb, drawn narrow. The visible rule stays a
 * hairline; the *target* is this.
 */
export const HANDLE_STEP = 1.5;

/** How far a drag must travel before it counts as one rather than a tap. */
export const DRAG_SLOP = 4;
