import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    /** Called when the item is tapped — inspect / open. */
    onPress?: (item: GameItem) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * An inventory / loadout item — art (or a glyph), a rarity-tinted frame + label
 * (rarity is shown as text, not color alone), an equipped marker, and a stack
 * `×N` quantity badge. The rarity accent resolves to a semantic token via
 * {@link rarityColorKey}. `onPress(item)` inspects it. Composes `Badge`,
 * `Icon`. Token-only.
 */
export declare function InventoryItem({ item, variant, onPress, style, }: InventoryItemProps): React.ReactElement;
//# sourceMappingURL=InventoryItem.d.ts.map