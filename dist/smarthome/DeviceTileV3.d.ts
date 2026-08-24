import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Same public contract as {@link DeviceTile} — a drop-in alternate design. */
export type DeviceTileV3Props = DeviceTileProps;
/**
 * DeviceTile, redesigned (v3): a **dense device row**. A leading icon with a small
 * state dot, the name + subtitle inline, and the Switch pinned right — hairline-
 * bordered for a long device list. The opposite of v2's square tile. Same props,
 * token-only.
 */
export declare const DeviceTileV3: React.ForwardRefExoticComponent<DeviceTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeviceTileV3.d.ts.map