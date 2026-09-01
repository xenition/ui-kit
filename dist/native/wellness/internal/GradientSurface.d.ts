import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GradientSurfaceProps {
    /** Gradient stops, deepest last. Always compiled theme-token colors. */
    colors: string[];
    /** Start point (0–1). Default top-left. */
    start?: {
        x: number;
        y: number;
    };
    /** End point (0–1). Default bottom-right (a soft diagonal, calmer than vertical). */
    end?: {
        x: number;
        y: number;
    };
    locations?: number[];
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/** Diagonal by default — a softer, calmer wash than a hard vertical. */
export declare function GradientSurface({ colors, start, end, locations, style, children, }: GradientSurfaceProps): React.ReactElement;
//# sourceMappingURL=GradientSurface.d.ts.map