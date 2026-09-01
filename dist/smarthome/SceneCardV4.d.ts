import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Drop-in for {@link SceneCardProps} — same props, the V4 "ambient" design. */
export type SceneCardV4Props = SceneCardProps;
/**
 * SceneCard — **V4** "ambient" design (web parity of the native V4). A calm scene
 * tile: a glyph sits in a tinted disc, with the scene name, an optional
 * description, and a device count. When `active`, the whole card glows — a soft
 * primary-tinted wash (`bg-primary/[0.08]`), a primary border, and a glowing glyph
 * disc (`bg-primary/15 border-primary/40`) — plus an "Active" {@link Badge} so the
 * running state is labeled, not color-only. The card is a `role="button"` surface
 * firing `onActivate` on click / Enter / Space. `deviceCount` renders defensively
 * (only when a positive number). Same props/behavior as {@link SceneCardProps};
 * all colors from `--xen-*` token classes (no literals).
 */
export declare const SceneCardV4: React.ForwardRefExoticComponent<SceneCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SceneCardV4.d.ts.map