import * as React from 'react';
import type { WarehouseBinProps } from './WarehouseBin';
/** Drop-in for {@link WarehouseBinProps} — same props, the V4 "dispatch" design. */
export type WarehouseBinV4Props = WarehouseBinProps;
/**
 * WarehouseBin — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a storage-location tile: an elevated
 * rounded card with a soft shadow, the bin code + zone, a big legible
 * **tabular-nums** fill percentage, a token fill bar sized to `fill`, an item
 * count, and an occupancy chip carried by a glyph + word (never color alone).
 * Exposes a `progressbar` role with `aria-valuenow` so fullness is announced,
 * not color-inferred. Clickable when `onClick` is set. Identical props/behavior
 * to {@link WarehouseBinProps}. All colors from `--xen-*` token classes (no
 * literals).
 */
export declare const WarehouseBinV4: React.ForwardRefExoticComponent<WarehouseBinProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=WarehouseBinV4.d.ts.map