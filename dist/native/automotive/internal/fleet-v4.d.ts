/**
 * The `automotive` module's own V4 vocabulary: the status enums resolved to a
 * tone, and the two geometry constants its map-ish components share.
 *
 * The tone-to-ink table itself lives in `primitives/internal/tone-v4` — three
 * verticals needed it, so it was promoted out of `agriculture`. What stays
 * here is the part that is genuinely domain knowledge: which word a vehicle
 * state is, and which tone it earns.
 *
 * Nothing here is exported from the package.
 */
import { clampPercent, metaLine, onPair, ratingParts, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
export { clampPercent, metaLine, onPair, ratingParts, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * The route marker's diameter, as a multiple of the spacing scale.
 *
 * `TripRoute` pinned `width: 24, height: 24, marginLeft: -12` — three literals
 * that have to stay in sync, and did not scale with the seed. One expression
 * now, and the offset is derived from it rather than remembered.
 */
export declare const MARKER_STEP = 1.5;
/**
 * How many dots draw the connector between two route points. Geometric: it is
 * a dashed line's dash count, not a spacing.
 */
export declare const ROUTE_DOTS = 7;
//# sourceMappingURL=fleet-v4.d.ts.map