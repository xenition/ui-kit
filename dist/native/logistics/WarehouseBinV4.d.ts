import * as React from 'react';
import type { WarehouseBinProps } from './WarehouseBin';
/** Drop-in for {@link WarehouseBinProps} — same props, the V4 "dispatch" design. */
export type WarehouseBinV4Props = WarehouseBinProps;
/**
 * WarehouseBin — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a storage-location tile: an elevated
 * rounded card with a soft shadow, the bin code + zone, a big legible
 * **tabular-nums** fill percentage, a token fill bar sized to `fill`, an item
 * count, and an occupancy chip carried by a glyph + word (never color alone).
 * Exposes a `progressbar` role with `accessibilityValue` so fullness is
 * announced, not color-inferred. Tappable when `onPress` is set. Token-only
 * colors via `useXenitionTheme()`.
 */
export declare function WarehouseBinV4({ code, zone, fill, itemCount, state, selected, onPress, testID, style, }: WarehouseBinV4Props): React.ReactElement;
//# sourceMappingURL=WarehouseBinV4.d.ts.map