/**
 * Menus, quantities and order stages — **pure, and shared by both twins**, the
 * way `events/schedule-v4.ts` is. The native twin imports it as
 * `../../food/order-v4`.
 *
 * Nothing here is exported from the package.
 */

/**
 * A dietary or allergen marker is **identity, not status**.
 *
 * `NutritionBadge` typed `vegetarian`/`vegan` as `success`, `spicy` as
 * `danger`, `popular` as `warn`. Vegan is not a success and spicy is not a
 * failure; a menu row of these reads as a row of alerts, and a genuine status
 * badge beside them becomes indistinguishable.
 *
 * `spicy` keeps a warm tone because heat is the one case where the colour is
 * conventional and carries meaning to a sighted user — but it is `accent`, not
 * `danger`, so it cannot be confused with a failure.
 */
export const DIET_TONE: Record<string, 'neutral' | 'accent' | 'primary'> = {
  vegetarian: 'neutral',
  vegan: 'neutral',
  glutenFree: 'neutral',
  'gluten-free': 'neutral',
  halal: 'neutral',
  kosher: 'neutral',
  nutFree: 'neutral',
  'nut-free': 'neutral',
  dairyFree: 'neutral',
  'dairy-free': 'neutral',
  spicy: 'accent',
  popular: 'primary',
  new: 'primary',
  calories: 'neutral',
};

/**
 * Step a quantity, bounded.
 *
 * A stepper that can go below its minimum or past a stock cap puts an
 * impossible order in the cart, and the caller finds out at checkout.
 */
export function stepQuantity(current: number, delta: number, min = 0, max?: number): number {
  const safe = Number.isFinite(current) ? Math.round(current) : min;
  const next = safe + Math.round(delta);
  const floored = Math.max(min, next);
  return typeof max === 'number' && Number.isFinite(max) ? Math.min(max, floored) : floored;
}

/**
 * The stages an order moves through, in order.
 *
 * These are the **base module's own union**, spelled exactly as
 * `OrderStatusTracker` has always spelled them. An earlier draft of this file
 * invented `'on-the-way'`, which meant `stageIndex()` returned `undefined` for
 * every ordinary order and the tracker rendered its unknown state always. The
 * shared module follows the component, not the other way round.
 */
export const ORDER_STAGES = ['placed', 'preparing', 'out-for-delivery', 'delivered'] as const;
export type OrderStage = (typeof ORDER_STAGES)[number];

/**
 * Where an order is, or `undefined` when the status is not one we know.
 *
 * `OrderStatusTracker` used `Math.max(0, ORDER.indexOf(status))`, which maps a
 * `-1` miss onto stage 1 — so an unrecognised status rendered a plausible and
 * entirely wrong "Order placed, in progress". A caller with a typo, or a
 * backend that adds a stage, got a confident lie rather than a fallback.
 */
export function stageIndex(status: string): number | undefined {
  const found = (ORDER_STAGES as readonly string[]).indexOf(status);
  return found === -1 ? undefined : found;
}

/**
 * A delivery window, in the order a human reads it.
 *
 * `DeliveryEstimate` tested `maxMinutes > minMinutes` and silently dropped the
 * max otherwise, so `min={35} max={20}` rendered "35 min" with no warning —
 * a transposed pair reads as a confident single figure.
 */
export function deliveryWindow(
  minMinutes: number,
  maxMinutes: number | undefined,
  unit = 'min'
): string {
  const lo = Number.isFinite(minMinutes) ? Math.round(minMinutes) : 0;
  if (typeof maxMinutes !== 'number' || !Number.isFinite(maxMinutes)) return `${lo} ${unit}`;
  const hi = Math.round(maxMinutes);
  if (hi === lo) return `${lo} ${unit}`;
  // A transposed pair is still a window; read it the way round that makes sense.
  const [from, to] = hi > lo ? [lo, hi] : [hi, lo];
  return `${from}–${to} ${unit}`;
}
