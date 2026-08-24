import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Same public contract as {@link ForecastStrip} — a drop-in alternate design. */
export type ForecastStripV2Props = ForecastStripProps;
/**
 * ForecastStrip, redesigned (v2): a **row of day cards**. Each day is a raised
 * mini-card — label, condition glyph, high/low, and a precip chip — that fills
 * primary-tinted when selected. Bolder than v1's compact columns. Same props,
 * token-only.
 */
export declare const ForecastStripV2: React.ForwardRefExoticComponent<ForecastStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ForecastStripV2.d.ts.map