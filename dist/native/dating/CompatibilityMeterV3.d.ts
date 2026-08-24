import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV3Props = CompatibilityMeterProps;
/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar**. The score is
 * quantised into ten discrete pips that fill in the band tone up to the value —
 * a chunky, glanceable read that is visually distinct from the original's smooth
 * progress bar — with the label, percentage, and a spelled-out band word above.
 * Same `CompatibilityMeterProps`; token-pure; clamped and NaN-guarded; loading
 * skeleton included.
 */
export declare function CompatibilityMeterV3({ score, label, showValue, size, loading, style, }: CompatibilityMeterV3Props): React.ReactElement;
//# sourceMappingURL=CompatibilityMeterV3.d.ts.map