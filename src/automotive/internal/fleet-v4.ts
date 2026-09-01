/**
 * The `automotive` module's own V4 vocabulary (web) — the twin of
 * `native/automotive/internal/fleet-v4.ts`.
 *
 * The tone tables live in `primitives/internal/tone-v4`, promoted out of
 * `agriculture` once three verticals needed them. What stays here is the part
 * that is genuinely domain knowledge.
 *
 * Nothing here is exported from the package.
 */

import {
  clampPercent,
  metaLine,
  ratingParts,
  SKELETON_CLASS,
  TONE_BG,
  TONE_INK,
  TONE_ON,
  TONE_VAR,
  toneGround,
  type ToneV4,
} from '../../primitives/internal/tone-v4';

export {
  clampPercent,
  metaLine,
  ratingParts,
  SKELETON_CLASS,
  TONE_BG,
  TONE_INK,
  TONE_ON,
  TONE_VAR,
  toneGround,
};
export type { ToneV4 };

/**
 * How many dots draw the connector between two route points. Geometric: it is
 * a dashed line's dash count, not a spacing.
 */
export const ROUTE_DOTS = 7;
