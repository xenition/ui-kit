import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Alternate design (V3) — identical prop contract to {@link SceneCardProps}. */
export type SceneCardV3Props = SceneCardProps;
/**
 * SceneCard — alternate design **V3**: a compact pill/chip row. A small leading
 * glyph, the scene name, and a device count sit inline in a rounded-full
 * chip; the active state fills the chip with a primary tint, swaps to a filled
 * glyph, and appends a "✓ Active" text marker (not color-alone). Drop-in
 * replacement for `SceneCard` — same props — for horizontally scrolling scene
 * strips. `deviceCount` renders only when positive.
 */
export declare function SceneCardV3({ name, icon, deviceCount, active, onActivate, style, }: SceneCardV3Props): React.ReactElement;
//# sourceMappingURL=SceneCardV3.d.ts.map