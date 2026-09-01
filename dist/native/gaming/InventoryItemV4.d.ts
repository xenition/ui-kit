import * as React from 'react';
import { type ItemRarity } from './types';
import type { InventoryItemProps } from './InventoryItem';
export interface InventoryItemV4Props extends InventoryItemProps {
    /** Rarity wording. Each key defaults to the base's own copy. */
    rarityLabels?: Partial<Record<ItemRarity, string>>;
}
/**
 * **V4 inventory item** — same props as {@link InventoryItem} plus
 * `rarityLabels`.
 *
 * ## Four changes
 *
 * 1. **The inspect button stops claiming a state it cannot change.** It
 *    announced `accessibilityState={{ selected: item.equipped }}` — and on web
 *    the same control says `aria-pressed={item.equipped}` — so a reader was
 *    told it was a toggle and that the toggle was on. Pressing it inspects the
 *    item; nothing it does can turn that state off. The twins even told
 *    different lies about which kind of toggle it was. It is an action now,
 *    with a name and no state.
 * 2. **A rarity tier is identity, not status.** The frame ran
 *    `muted → success → primary → accent → warn`, so an uncommon sword was
 *    painted in the tone that means "this succeeded" and a legendary one in
 *    the tone that means "be careful". The tier survives as the written label
 *    and as the **weight of the frame**, which is a shape, works in greyscale,
 *    and does not spend three status slots on loot.
 * 3. **The tile clears 44 and presses as a state layer**, rather than sitting
 *    at whatever height its art happened to be and dimming to 0.85 — inside
 *    M3's disabled band.
 * 4. **The art ground is the module's opaque placeholder**, not a translucent
 *    tint of a rarity colour, which was a different colour on every surface it
 *    sat on. The item's name, tier, quantity and equipped state are one spoken
 *    line.
 */
export declare function InventoryItemV4({ item, variant, rarityLabels, onPress, style, }: InventoryItemV4Props): React.ReactElement;
//# sourceMappingURL=InventoryItemV4.d.ts.map