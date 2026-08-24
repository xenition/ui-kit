import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Same public contract as {@link SceneCard} — a drop-in alternate design. */
export type SceneCardV2Props = SceneCardProps;
/**
 * SceneCard, redesigned (v2): a **bold scene tile**. A large icon in an accent
 * disc, the name and description centered, and a device-count footer; the active
 * scene fills with an accent ring + tint. Tapping runs the scene. Distinct from
 * v1's row. Same props, token-only.
 */
export declare const SceneCardV2: React.ForwardRefExoticComponent<SceneCardProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SceneCardV2.d.ts.map