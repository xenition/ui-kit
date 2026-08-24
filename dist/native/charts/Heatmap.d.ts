import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type SemanticColors } from '../theme';
export type HeatmapColor = keyof SemanticColors;
export interface HeatmapProps {
    /** Row-major grid of values; intensity maps to cell opacity. */
    data: number[][];
    /** Theme color key painted at varying opacity. */
    color?: HeatmapColor;
    /** Value mapped to full opacity; defaults to the grid maximum. */
    max?: number;
    /** Cell edge length in px. */
    cellSize?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Grid heatmap — token-bound, View-based (no SVG). Every cell paints ONE theme
 * color and varies only its `opacity` (`value / max`), so no literal colors are
 * introduced. Empty cells fall back to a `border`-tinted blank.
 */
export declare function Heatmap({ data, color, max, cellSize, style, }: HeatmapProps): React.ReactElement;
//# sourceMappingURL=Heatmap.d.ts.map