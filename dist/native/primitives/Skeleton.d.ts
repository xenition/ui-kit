import * as React from 'react';
import { type DimensionValue, type StyleProp, type ViewStyle } from 'react-native';
export interface SkeletonProps {
    /** Shape of the placeholder. */
    variant?: 'text' | 'rect' | 'circle';
    /** Width (number = px, string = percentage). */
    width?: DimensionValue;
    /** Height (number = px, string = percentage). */
    height?: DimensionValue;
    /** For `text`: render N stacked lines (last one shorter). */
    lines?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Shimmering loading placeholder — the native mirror of the web `Skeleton`.
 * Where the web shape shimmers via `animate-pulse`, native drives an `Animated`
 * opacity loop. The block is filled with the `muted` token; the corner radius is
 * keyed off the variant (`circle`→full, `rect`→md, `text`→sm). No literal colors.
 */
export declare function Skeleton({ variant, width, height, lines, style, }: SkeletonProps): React.ReactElement;
//# sourceMappingURL=Skeleton.d.ts.map