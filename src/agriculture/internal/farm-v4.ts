/**
 * The `agriculture` module's tone vocabulary (web) — now a **thin delegation**
 * to `primitives/internal/tone-v4`.
 *
 * This file wrote the tone-to-ink table first, for the module's ten status
 * enums. `automotive` then needed five more of the same and `beauty` five more
 * again, which is where a module-local helper stops being local.
 *
 * The names stay exactly as they were, so nothing in this module moved.
 *
 * Nothing here is exported from the package.
 */

import {
  clampPercent,
  metaLine,
  toneGround,
  GROUND_TINT,
  SKELETON_CLASS,
  TONE_INK,
  TONE_VAR,
  type ToneV4,
} from '../../primitives/internal/tone-v4';

/** The tones this module's states resolve to. */
export type FarmTone = ToneV4;

export {
  clampPercent,
  metaLine,
  toneGround,
  GROUND_TINT,
  SKELETON_CLASS,
  TONE_INK,
  TONE_VAR as TONE_FILL,
};
