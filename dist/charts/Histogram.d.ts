import * as React from 'react';
import { ChartColor } from './internal';
export interface HistogramProps extends React.SVGAttributes<SVGSVGElement> {
    /** Bin counts; each becomes an adjacent (gapless) vertical bar. */
    bins: number[];
    /** Plot height in px. */
    height?: number;
    /** Theme color token for the bars. */
    color?: ChartColor;
    /** Count mapped to full height; defaults to the largest bin. */
    max?: number;
}
/**
 * Frequency histogram — inline SVG `<rect>`s sitting flush (a hairline
 * `--xen-surface` gap between them) to read as a distribution. Bars fill with
 * `var(--xen-<color>)` and a `--xen-muted` baseline stands in for the axis.
 * Divide-by-zero is guarded via {@link safeMax}.
 */
export declare const Histogram: React.ForwardRefExoticComponent<HistogramProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=Histogram.d.ts.map