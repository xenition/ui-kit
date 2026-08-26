import * as React from 'react';
import type { ListItemData, ListProps } from './List';
export type { ListProps as ListV4Props, ListItemData };
/**
 * **V4 list** — same props as {@link List}, a different design line.
 *
 * The base list puts a hairline between every pair of rows and gives the title
 * and the description the same font size, so the only thing separating a name
 * from its subtitle is colour. That is two problems with one cause: structure
 * is being drawn instead of typeset.
 *
 * Three changes:
 *
 * 1. **Typography carries the hierarchy.** The title steps up to `base` at
 *    weight 600; the description drops to `xs` and stays muted. §10 asks for
 *    size, weight and contrast before containers and dividers, and a title
 *    that is bigger than its description does not need a line under the row to
 *    say where the row ends.
 * 2. **No divider between rows.** The gap between one row's description and
 *    the next row's title is the whole vertical padding of both — many times
 *    the two-pixel gap inside a row — so the grouping is already unambiguous.
 *    §9: spacing IS the structure. What is left is the one border around the
 *    list, because a list is a single object and earns a container (§11);
 *    the rows inside it are not `n` more objects.
 * 3. **A pressable row is a real target and tints, not lifts.** Every row
 *    takes `2xl` of height — the tap target the rest of the V4 line uses — and
 *    a press mixes `onSurface` into `surface`. The base's web twin used
 *    `hover:bg-neutral-50`, which is the light-oriented ramp: in dark mode
 *    that is a near-white slab. Mixing the two scheme-resolved slots follows
 *    the scheme for free.
 *
 * Nothing here gains a shadow. A list row that lifts is a card, and a stack of
 * cards inside a bordered list is exactly the "cards inside cards inside
 * cards" §8 bans.
 */
export declare function ListV4({ items, style }: ListProps): React.ReactElement;
//# sourceMappingURL=ListV4.d.ts.map