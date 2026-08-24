import * as React from 'react';
import type { LightControlProps } from './LightControl';
/** Same public contract as {@link LightControl} — a drop-in alternate design. */
export type LightControlV3Props = LightControlProps;
/**
 * LightControl, redesigned (v3): a **compact light row**. The name + on/off Switch
 * on one line, with an inline brightness slider and a small percent read-out
 * beneath — the color-temperature control is folded away. A dense list row vs.
 * v2's panel. Same props, token-only.
 */
export declare const LightControlV3: React.ForwardRefExoticComponent<LightControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LightControlV3.d.ts.map