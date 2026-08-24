import * as React from 'react';
import type { LightControlProps } from './LightControl';
/** Same public contract as {@link LightControl} — a drop-in alternate design. */
export type LightControlV2Props = LightControlProps;
/**
 * LightControl, redesigned (v2): an **elevated lighting panel**. A header pairs
 * the name with the on/off Switch; a large brightness slider shows a big percent
 * read-out, and a warm↔cool color-temperature slider sits below when provided.
 * Distinct from v1. Same props, token-only.
 */
export declare const LightControlV2: React.ForwardRefExoticComponent<LightControlProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LightControlV2.d.ts.map