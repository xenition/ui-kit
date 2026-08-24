import * as React from 'react';
import type { ForecastStripProps } from './ForecastStrip';
/** Same public contract as {@link ForecastStrip} — a drop-in alternate design. */
export type ForecastStripV3Props = ForecastStripProps;
/**
 * ForecastStrip, redesigned (v3): a **vertical day list**. Each day is a hairline
 * row — label, condition glyph, a precip hint, and the high/low pinned right —
 * stacked for an at-a-glance week. The opposite of v2's card row. Same props,
 * token-only.
 */
export declare const ForecastStripV3: React.ForwardRefExoticComponent<ForecastStripProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ForecastStripV3.d.ts.map