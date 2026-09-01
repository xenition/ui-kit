import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface GradientSurfaceProps {
    colors: string[];
    start?: {
        x: number;
        y: number;
    };
    end?: {
        x: number;
        y: number;
    };
    locations?: number[];
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/** Diagonal by default — a soft, calm wash. */
export declare function GradientSurface({ colors, start, end, locations, style, children, }: GradientSurfaceProps): React.ReactElement;
//# sourceMappingURL=GradientSurface.d.ts.map