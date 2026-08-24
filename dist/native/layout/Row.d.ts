import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface RowProps extends ViewProps {
    /** Space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Horizontal flex row with a token-bound `gap` plus `align`/`justify`/`wrap`
 * controls — the native mirror of the web horizontal stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
export declare function Row({ gap, align, justify, wrap, style, children, ...rest }: RowProps): React.ReactElement;
//# sourceMappingURL=Row.d.ts.map