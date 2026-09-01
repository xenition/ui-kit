/**
 * The `beauty` module's own V4 vocabulary (web) — the twin of
 * `native/beauty/internal/salon-v4.ts`.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the
 * price-comparison rule, which is this module's own.
 *
 * Nothing here is exported from the package.
 */
import { clampPercent, metaLine, ratingParts, SKELETON_CLASS, TONE_BG, TONE_INK, TONE_ON, TONE_VAR, toneGround, type ToneV4 } from '../../primitives/internal/tone-v4';
export { clampPercent, metaLine, ratingParts, SKELETON_CLASS, TONE_BG, TONE_INK, TONE_ON, TONE_VAR, toneGround, };
export type { ToneV4 };
/**
 * The struck "was" price in cents, or `null`.
 *
 * `PriceListRow` and `ProductRecommendation` both carry a compare-at and
 * neither drew it. The rule is the one `PlanSelectorV4` settled: a compare-at
 * that is **not higher** than the price is a fabricated discount, and the
 * component declines to draw one.
 */
export declare function compareAtCents(price: number | undefined, compareAt: number | undefined): number | null;
//# sourceMappingURL=salon-v4.d.ts.map