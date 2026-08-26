import * as React from 'react';
import type { ListItemData, ListProps } from './List';
export type { ListProps as ListV4Props, ListItemData };
/**
 * **V4 list** — the web twin of the native `ListV4`, same props as
 * {@link List}, a different design line.
 *
 * The base list puts `divide-y` between every pair of rows, gives the title
 * and the description the same `text-sm`, and hovers with `bg-neutral-50`.
 * That is three problems with one cause: structure is being drawn instead of
 * typeset, and the ink it is drawn with came from the wrong ramp.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `text-base`
 *    semibold; the description drops to `text-xs` and stays muted. §10 asks
 *    for size, weight and contrast before containers and dividers, and a title
 *    bigger than its description does not need a line under the row to say
 *    where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the full vertical padding of both — many times
 *    the gap inside a row — so the grouping is already unambiguous. §9:
 *    spacing IS the structure. What is left is the one border around the list,
 *    because a list is a single object and earns a container (§11).
 * 3. **Hover follows the scheme, and tints rather than lifts.**
 *    `bg-neutral-50` is the light-oriented ramp — under `[data-theme="dark"]`
 *    the emitted var mirrors to the far end and the hover becomes a near-white
 *    slab across a dark row. V4 mixes `--xen-on-surface` into `--xen-surface`,
 *    which darkens a light row and lightens a dark one with no dark rule to
 *    keep in step. The same rule arms `:focus-visible`, so a keyboard sees
 *    what a pointer sees.
 *
 * Every row keeps the `2xl` minimum height the rest of the V4 line uses, so a
 * pressable row is a real target. Nothing gains a shadow: a list row that
 * lifts is a card, and a stack of cards inside a bordered list is exactly the
 * "cards inside cards inside cards" §8 bans.
 */
export declare function ListV4({ items, className }: ListProps): React.ReactElement;
//# sourceMappingURL=ListV4.d.ts.map