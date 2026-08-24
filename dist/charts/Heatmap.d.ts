import * as React from 'react';
import { ChartColor } from './internal';
export interface HeatmapProps extends React.SVGAttributes<SVGSVGElement> {
    /** Row-major grid of values; intensity maps to cell opacity. */
    data: number[][];
    /** Theme color token painted at varying opacity. */
    color?: ChartColor;
    /** Value mapped to full opacity; defaults to the grid maximum. */
    max?: number;
    /** Cell edge length in px. */
    cellSize?: number;
    /** Gap between cells in px. */
    gap?: number;
}
/**
 * Grid heatmap — one inline SVG `<rect>` per cell, all painting the SAME
 * `var(--xen-<color>)` and varying only `fill-opacity` (`value / max`), so no
 * literal colors are introduced. A floor keeps zero cells faintly visible.
 * Empty / ragged grids are guarded, as is a zero max.
 */
export declare const Heatmap: React.ForwardRefExoticComponent<HeatmapProps & React.RefAttributes<SVGSVGElement>>;
//# sourceMappingURL=Heatmap.d.ts.map