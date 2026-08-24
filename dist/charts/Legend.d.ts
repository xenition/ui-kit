import * as React from 'react';
import { ChartColor } from './internal';
export interface LegendItem {
    label: string;
    /** Theme color token for the swatch; defaults to the cycled series color. */
    color?: ChartColor;
    /** Opacity applied to the swatch color (for single-color series). */
    opacity?: number;
}
export interface LegendProps extends React.HTMLAttributes<HTMLDivElement> {
    items: LegendItem[];
    /** Stack vertically instead of wrapping in a row. */
    vertical?: boolean;
}
/**
 * Chart legend — each entry is a color swatch (a theme color token, optionally
 * at reduced `opacity`, or the cycled series color) beside its `text-on-surface`
 * label. No literal colors. Guards an empty item list.
 */
export declare const Legend: React.ForwardRefExoticComponent<LegendProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Legend.d.ts.map