import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface DividerProps extends ViewProps {
    orientation?: 'horizontal' | 'vertical';
    /** Inset the divider from the cross axis by a spacing token. */
    inset?: SpaceKey;
    style?: StyleProp<ViewStyle>;
}
/**
 * A one-pixel rule in the theme `border` color, horizontal or vertical, with an
 * optional token-bound `inset`. Color and inset trace to the compiled theme; no
 * literal colors. Exposed to assistive tech with the `separator` role.
 */
export declare function Divider({ orientation, inset, style, ...rest }: DividerProps): React.ReactElement;
//# sourceMappingURL=Divider.d.ts.map