import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV2Props = CompatibilityMeterProps;
/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial**. A large
 * filled, tone-tinted disc makes the numeric percentage the hero, with the label
 * caption above and the spelled-out band word in a pill beneath — a stat-tile
 * feel distinct from the original's slim inline ring. Same
 * `CompatibilityMeterProps`; token-pure tints via `withAlpha`; input is clamped
 * and NaN-guarded; a loading skeleton is included.
 */
export declare function CompatibilityMeterV2({ score, label, showValue, size, loading, style, }: CompatibilityMeterV2Props): React.ReactElement;
//# sourceMappingURL=CompatibilityMeterV2.d.ts.map