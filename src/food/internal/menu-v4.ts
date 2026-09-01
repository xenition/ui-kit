/**
 * The `food` module's own V4 vocabulary (web) — the twin of
 * `native/food/internal/menu-v4.ts`.
 *
 * Nothing here is exported from the package.
 */

import { SKELETON_CLASS, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { deliveryWindow, DIET_TONE, ORDER_STAGES, stageIndex, stepQuantity } from '../order-v4';

export {
  deliveryWindow,
  DIET_TONE,
  ORDER_STAGES,
  SKELETON_CLASS,
  stageIndex,
  stepQuantity,
  TONE_INK,
  TONE_ON,
};
export type { ToneV4 };

/** One badge shape for the whole module. */
export const BADGE_V4 = { variant: 'soft', size: 'sm' } as const;

/** Prices, deltas and bucket counts all stack in a column. */
export const TABULAR_CLASS = 'tabular-nums';

/** The ground behind a skeleton or an unloaded photo — never a ramp step. */
export const PLACEHOLDER_CLASS = SKELETON_CLASS;

/**
 * Build the one accessible name a menu row or card should carry.
 *
 * This is the module's most consequential helper. Six components put a short
 * label on a `role="button"` / `checkbox` / `radio` root, and all three roles
 * are **children-presentational** — so the price, the rating, the items
 * summary, the modifier's price delta and, in `DishCard`, the **allergen and
 * dietary badges** were removed from the accessibility tree entirely. A
 * screen-reader user browsing a menu heard one thing per dish: its name.
 *
 * Everything a sighted user can see about a dish goes in here.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}
