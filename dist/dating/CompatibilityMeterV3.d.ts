import * as React from 'react';
import type { CompatibilityMeterProps } from './CompatibilityMeter';
/** Drop-in alternate design — identical props to `CompatibilityMeter`. */
export type CompatibilityMeterV3Props = CompatibilityMeterProps;
/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar** (web parity of
 * the native V3). The score is quantised into ten discrete pips that fill in the
 * band tone up to the value — a chunky, glanceable read distinct from the base's
 * smooth progress bar — with the label, percentage, and a spelled-out band word on
 * a header row above. Same `CompatibilityMeterProps`; token classes only; clamped
 * and NaN-guarded; loading skeleton included.
 */
export declare const CompatibilityMeterV3: React.ForwardRefExoticComponent<CompatibilityMeterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CompatibilityMeterV3.d.ts.map