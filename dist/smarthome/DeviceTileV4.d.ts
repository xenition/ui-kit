import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Drop-in for {@link DeviceTileProps} — same props, the V4 "ambient" design. */
export type DeviceTileV4Props = DeviceTileProps;
/**
 * DeviceTile — **V4** "ambient" design (web parity of the native V4). The
 * control-panel take on a device tile: an **active device glows** — when `on`,
 * the tile takes a soft success-tinted wash, a success border, and a glowing icon
 * disc; `off`/`unavailable` stay calm. A soft status pill + the on/off
 * {@link Switch} keep the meaning readable (status never by color alone). Same
 * props/behavior as {@link DeviceTileProps}; all colors from `--xen-*` token
 * classes (no literals). `loading` shows a skeleton.
 */
export declare const DeviceTileV4: React.ForwardRefExoticComponent<DeviceTileProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DeviceTileV4.d.ts.map