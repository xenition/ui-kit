import * as React from 'react';
import type { DeviceTileProps } from './DeviceTile';
/** Alternate design (V3) — identical prop contract to {@link DeviceTileProps}. */
export type DeviceTileV3Props = DeviceTileProps;
/**
 * DeviceTile — alternate design **V3**: a compact single-line list row. A small
 * tinted glyph leads, the name + subtitle stack in the middle, and a status
 * glyph+text pair (never color-alone) precedes an inline {@link Switch}. Drop-in
 * replacement for `DeviceTile` — same props — meant for dense device lists.
 */
export declare function DeviceTileV3({ name, icon, state, subtitle, onToggle, onPress, loading, style, }: DeviceTileV3Props): React.ReactElement;
//# sourceMappingURL=DeviceTileV3.d.ts.map