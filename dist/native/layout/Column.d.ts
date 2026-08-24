import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export type Align = 'start' | 'center' | 'end' | 'stretch';
export type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export interface ColumnProps extends ViewProps {
    /** Vertical space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Vertical flex column with a token-bound `gap` plus `align`/`justify`
 * controls — the native mirror of the web vertical stack. Gap traces to the
 * compiled spacing scale; no literal colors.
 */
export declare function Column({ gap, align, justify, style, children, ...rest }: ColumnProps): React.ReactElement;
//# sourceMappingURL=Column.d.ts.map