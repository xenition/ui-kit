import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Alternate design (V2) — identical prop contract to {@link DeviceTileProps}. */
export type DeviceTileV2Props = DeviceTileProps;
/**
 * DeviceTile — alternate design **V2**: a big square glass-panel tile. A large
 * centered glyph sits inside a soft on/off glow (a tinted, radiused halo that
 * only lights when the device is `on`), the name + a status {@link Badge} label
 * the state without relying on color alone, and a full-width {@link Switch}
 * anchors the bottom. Drop-in replacement for `DeviceTile` — same props. The
 * glow tint is derived from the accent token via `withAlpha` (never a literal),
 * and `unavailable` dims the panel and disables the toggle.
 */
export declare function DeviceTileV2({ name, icon, state, subtitle, onToggle, onPress, loading, style, }: DeviceTileV2Props): React.ReactElement;
//# sourceMappingURL=DeviceTileV2.d.ts.map