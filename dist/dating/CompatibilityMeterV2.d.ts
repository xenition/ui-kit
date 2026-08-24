import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV2Props = CompatibilityMeterProps;
/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial** (web parity of
 * the native V2). A large, tone-tinted disc makes the numeric percentage the hero,
 * with the label caption above and the spelled-out band word in a pill beneath — a
 * stat-tile feel, distinct from the base's slim inline bar/ring. Same
 * `CompatibilityMeterProps`; token classes only; input is clamped and NaN-guarded;
 * a loading skeleton is included and meaning never rests on color.
 */
export declare const CompatibilityMeterV2: React.ForwardRefExoticComponent<CompatibilityMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompatibilityMeterV2.d.ts.map