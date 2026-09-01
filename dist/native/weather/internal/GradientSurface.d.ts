import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GradientSurfaceProps {
    /** Gradient stops, deepest last. Always compiled theme-token colors. */
    colors: string[];
    /** Start point (0–1). Default top. */
    start?: {
        x: number;
        y: number;
    };
    /** End point (0–1). Default bottom. */
    end?: {
        x: number;
        y: number;
    };
    /** Optional stop positions. */
    locations?: number[];
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/** Vertical (top→bottom) by default — the sky look. */
export declare function GradientSurface({ colors, start, end, locations, style, children, }: GradientSurfaceProps): React.ReactElement;
//# sourceMappingURL=GradientSurface.d.ts.map