import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Drop-in for {@link DeviceTileProps} — same props, the V4 "ambient" design. */
export type DeviceTileV4Props = DeviceTileProps;
/**
 * DeviceTile — **V4** "ambient" design. The control-panel take on a device tile:
 * an **active device glows** — when `on`, the tile takes a soft accent-tinted
 * wash, an accent border, and a glowing icon disc; `off`/`unavailable` stay calm.
 * A soft status pill + the on/off {@link Switch} keep the meaning readable
 * (status never by color alone). Same props/behavior as {@link DeviceTileProps};
 * token-only colors via `useXenitionTheme()`. `loading` shows a skeleton.
 */
export declare function DeviceTileV4({ name, icon, state, subtitle, onToggle, onPress, loading, style, }: DeviceTileV4Props): React.ReactElement;
//# sourceMappingURL=DeviceTileV4.d.ts.map