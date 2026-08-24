import * as React from 'react';
import { ChartColor } from './internal';
export interface StackedBarSegment {
    value: number;
    /** Theme color token for this segment; defaults to the cycled series color. */
    color?: ChartColor;
    /** Opacity applied to the color (for series that share one theme color). */
    opacity?: number;
    label?: string;
}
export interface StackedBarProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Segments laid end-to-end; each width is its share of the total. */
    segments: StackedBarSegment[];
    /** Bar height in px. */
    height?: number;
}
/**
 * Single horizontal stacked bar — inline SVG `<rect>`s, each sized to its share
 * of the total. Colors come from the cycled series vars (or an explicit token),
 * distinguished by `opacity` rather than literal hex. Guards an empty list and
 * a zero total.
 */
export declare const StackedBar: React.ForwardRefExoticComponent<StackedBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StackedBar.d.ts.map