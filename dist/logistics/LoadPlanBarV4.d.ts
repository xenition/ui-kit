import * as React from 'react';
import type { LoadPlanBarProps } from './LoadPlanBar';
/** Drop-in for {@link LoadPlanBarProps} — same props, the V4 "dispatch" design. */
export type LoadPlanBarV4Props = LoadPlanBarProps;
/**
 * LoadPlanBar — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `aria-valuenow` and echoed in the figure, so
 * fullness is never color-only. Identical props/behavior to
 * {@link LoadPlanBarProps}. Every fill is a token ramp class — no literals.
 */
export declare const LoadPlanBarV4: React.ForwardRefExoticComponent<LoadPlanBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LoadPlanBarV4.d.ts.map