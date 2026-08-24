import * as React from 'react';
import { type GameItem } from './types';
export type InventoryItemVariant = 'tile' | 'row';
export interface InventoryItemProps {
    /** The item to render. */
    item: GameItem;
    /**
     * - `tile` — square art slot with a rarity ring (default, for a grid).
     * - `row`  — art left, name + rarity right (for a list).
     */
    variant?: InventoryItemVariant;
    /** Called when the item is clicked — inspect / open. */
    onClick?: (item: GameItem) => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onClick(item)` inspects it (a real `<button>`).
 * Composes `Badge`, `Icon`. Token-only.
 */
export declare function InventoryItem({ item, variant, onClick, className, }: InventoryItemProps): React.ReactElement;
//# sourceMappingURL=InventoryItem.d.ts.map