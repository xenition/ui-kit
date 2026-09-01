import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Drop-in for {@link SceneCardProps} — same props, the V4 "ambient" design. */
export type SceneCardV4Props = SceneCardProps;
/**
 * SceneCard — **V4** "ambient" design. A calm scene tile: a glyph sits in a tinted
 * disc, with the scene name, an optional description, and a device count. When
 * `active`, the whole card glows — a soft primary-tinted wash
 * (`withAlpha(primary, 0.08)`), a primary border, and a glowing glyph disc — plus
 * an "Active" {@link Badge} so the running state is labeled, not color-only.
 * Pressing anywhere fires `onActivate`. `deviceCount` renders defensively (only
 * when a positive number). Same props/behavior as {@link SceneCardProps};
 * token-only colors via `useXenitionTheme()` (+ `withAlpha`).
 */
export declare function SceneCardV4({ name, icon, description, deviceCount, active, onActivate, style, }: SceneCardV4Props): React.ReactElement;
//# sourceMappingURL=SceneCardV4.d.ts.map