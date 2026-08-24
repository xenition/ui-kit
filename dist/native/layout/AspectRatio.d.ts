import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export interface AspectRatioProps extends ViewProps {
    /** Width-to-height ratio, e.g. `16 / 9` or `1`. */
    ratio: number;
    /** Clip children to the (token-bound) corner radius. */
    rounded?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Locks its content to a fixed width-to-height `ratio` via RN's `aspectRatio`
 * style. When `rounded`, it clips to the theme's large corner radius token; the
 * `ratio` itself is a numeric layout literal. No literal colors.
 */
export declare function AspectRatio({ ratio, rounded, style, children, ...rest }: AspectRatioProps): React.ReactElement;
//# sourceMappingURL=AspectRatio.d.ts.map