import * as React from 'react';
export type BinState = 'empty' | 'partial' | 'full' | 'reserved' | 'blocked';
export interface WarehouseBinProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
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
    /** Makes the tile clickable (open the bin). */
    onClick?: () => void;
}
/**
 * A warehouse bin / storage-location tile: the bin code + zone, a token fill bar
 * sized to `fill`, an item count, and an occupancy chip carried by a glyph +
 * word. Exposes a `progressbar` role with `aria-valuenow` for the fill so
 * fullness is announced, not color-inferred. Clickable when `onClick` is set.
 * All colors are theme tokens. Web parity of the native `WarehouseBin`.
 */
export declare const WarehouseBin: React.ForwardRefExoticComponent<WarehouseBinProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WarehouseBin.d.ts.map