import * as React from 'react';
import type { InventoryItemProps } from './InventoryItem';
import { type ItemRarity } from './types';
export interface InventoryItemV4Props extends InventoryItemProps {
    /** Override the five rarity words. */
    rarityLabels?: Partial<Record<ItemRarity, string>>;
}
/**
 * **V4 inventory item** — same props as {@link InventoryItem} plus
 * `rarityLabels`.
 *
 * ## Four changes
 *
 * 1. **Inspect stops claiming to be a toggle.** The button announced
 *    `aria-pressed={item.equipped}`, so a reader was told it was a two-state
 *    control whose state it could change — and pressing it opens an inspect
 *    view and can never change `equipped` at all. A user who pressed it
 *    listening for the state to flip waited for something that was never going
 *    to happen. (The twins told different lies about it: native reported
 *    `selected`.) It is a plain action now, named for what it does.
 * 2. **A rarity tier is identity, so it stops wearing the status palette.**
 *    `rarityColorKey` ran the five tiers across `muted`/`success`/`primary`/
 *    `accent`/`warn`, which put a **green** frame on an uncommon sword and an
 *    **amber** one on a legendary — the two colours the kit uses for "fine"
 *    and "look at this", spent on a category. That helper is still exported
 *    from the module index, so it stays; this component simply stops calling
 *    it. The tier is a neutral chip carrying its own word (overridable through
 *    `rarityLabels`) over a frame whose *weight* climbs with the tier — see
 *    {@link RARITY_FRAME}. Only `Equipped` keeps a status colour, because an
 *    equipped item is in an affirmative state rather than a category.
 * 3. **The item's name lands.** Both the interactive and the static form built
 *    a good combined name; the static one hung it on a bare `<div>`, where
 *    ARIA forbids naming a generic element, so the browser discarded it —
 *    while the native twin sets `accessible` and does announce it. Two twins,
 *    two different amounts of information. The static form is a `group`.
 * 4. **The art slot is a token ground and the press is a state layer.**
 *    `bg-neutral-100` inverts under `[data-theme="dark"]` while the item art
 *    over it does not; `hover:opacity-85` dims the item's own content, which
 *    is M3's disabled signal. The tap target clears 44 and the focus ring is
 *    the kit's one `ring` colour rather than a ramp step.
 */
export declare const InventoryItemV4: React.ForwardRefExoticComponent<InventoryItemV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=InventoryItemV4.d.ts.map