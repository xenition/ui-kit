import * as React from 'react';
import type { LoadPlanBarProps } from './LoadPlanBar';
/** Drop-in for {@link LoadPlanBarProps} — same props, the V4 "dispatch" design. */
export type LoadPlanBarV4Props = LoadPlanBarProps;
/**
 * LoadPlanBar — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `accessibilityValue` and echoed in the figure, so
 * fullness is never color-only. Token-only colors via `useXenitionTheme()`.
 */
export declare function LoadPlanBarV4({ segments, utilization, caption, warnAt, loading, style, }: LoadPlanBarV4Props): React.ReactElement;
//# sourceMappingURL=LoadPlanBarV4.d.ts.map