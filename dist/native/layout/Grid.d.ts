import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface GridProps extends ViewProps {
    /** Number of equal-width columns. Defaults to 2. */
    columns?: number;
    /** Gutter between cells, from the spacing scale. Defaults to `md`. */
    gap?: SpaceKey;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Fixed-column grid that wraps its children into equal-width cells using the
 * classic gutter technique (negative container margin + per-cell padding), so
 * the token-bound `gap` traces to the compiled spacing scale. Column count is
 * a numeric layout literal; no literal colors.
 */
export declare function Grid({ columns, gap, style, children, ...rest }: GridProps): React.ReactElement;
//# sourceMappingURL=Grid.d.ts.map