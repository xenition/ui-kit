import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export type StackDirection = 'row' | 'column';
export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface StackProps extends ViewProps {
    direction?: StackDirection;
    gap?: StackGap;
    /** Cross-axis alignment (mirrors web `align`). */
    align?: 'start' | 'center' | 'end' | 'stretch';
    /**
     * Main-axis distribution. Native-only additive prop (the web `Stack` relies
     * on flow layout); optional, so web usages still type-check unchanged.
     */
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Flexbox layout helper — the native mirror of the web `Stack` (`direction`,
 * `gap`, `align`), with an additive `justify`. Gap comes from the theme
 * spacing scale (RN `gap` is supported on modern React Native).
 */
export declare function Stack({ direction, gap, align, justify, style, children, ...rest }: StackProps): React.ReactElement;
//# sourceMappingURL=Stack.d.ts.map