import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Same public contract as {@link DeviceTile} — a drop-in alternate design. */
export type DeviceTileV2Props = DeviceTileProps;
/**
 * DeviceTile, redesigned (v2): a **big square control tile**. The icon rides in a
 * large state-tinted disc up top, the name + subtitle sit beneath, and the Switch
 * anchors the bottom — an on device tints the whole tile. Distinct from v1's row.
 * Same props, token-only.
 */
export declare const DeviceTileV2: React.ForwardRefExoticComponent<DeviceTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeviceTileV2.d.ts.map