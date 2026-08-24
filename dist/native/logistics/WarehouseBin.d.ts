import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type BinState = 'empty' | 'partial' | 'full' | 'reserved' | 'blocked';
export interface WarehouseBinProps {
    /** Bin / location code (headline, e.g. `A-12-03`). */
    code: string;
    /** Zone / aisle sub-label. */
    zone?: string;
    /** Fill percentage 0–100 (clamped, NaN-safe) — drives the token fill bar. */
    fill?: number;
    /** Item / SKU count stored in the bin. */
    itemCount?: number;
    /** Occupancy state — glyph + word, never color alone. */
    state?: BinState;
    /** Selection highlight. */
    selected?: boolean;
    /** Makes the tile tappable (open the bin). */
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill
 * bar sized to `fill`, an item count, and an occupancy chip carried by a
 * glyph + word. Exposes a `progressbar` role with `accessibilityValue` for the
 * fill so fullness is announced, not color-inferred. Tappable when `onPress` is
 * set. All colors are theme tokens.
 */
export declare function WarehouseBin({ code, zone, fill, itemCount, state, selected, onPress, testID, style, }: WarehouseBinProps): React.ReactElement;
//# sourceMappingURL=WarehouseBin.d.ts.map