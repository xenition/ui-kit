import * as React from 'react';
import type { SceneCardProps } from './SceneCard';
/** Same public contract as {@link SceneCard} — a drop-in alternate design. */
export type SceneCardV3Props = SceneCardProps;
/**
 * SceneCard, redesigned (v3): a **compact scene row**. A leading icon, the name
 * over a description·device-count line, and an "Active" dot + word on the trailing
 * edge — hairline-bordered for a scenes list. Tapping runs the scene. The
 * opposite of v2's tile. Same props, token-only.
 */
export declare const SceneCardV3: React.ForwardRefExoticComponent<SceneCardProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=SceneCardV3.d.ts.map