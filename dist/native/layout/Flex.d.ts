import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export type FlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface FlexProps extends ViewProps {
    direction?: FlexDirection;
    /** Space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    /** Flex grow factor for this container. */
    grow?: number;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * General-purpose flex container exposing `direction`/`align`/`justify`/`wrap`
 * plus a token-bound `gap` — the escape hatch when `Row`/`Column` are too
 * opinionated. Gap traces to the compiled spacing scale; no literal colors.
 */
export declare function Flex({ direction, gap, align, justify, wrap, grow, style, children, ...rest }: FlexProps): React.ReactElement;
//# sourceMappingURL=Flex.d.ts.map