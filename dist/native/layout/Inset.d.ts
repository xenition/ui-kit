import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface InsetProps extends ViewProps {
    /** Uniform padding on all sides, from the spacing scale. Defaults to `md`. */
    space?: SpaceKey;
    /** Override horizontal padding independently. */
    horizontal?: SpaceKey;
    /** Override vertical padding independently. */
    vertical?: SpaceKey;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Pads its children inward by a token-bound amount — uniform via `space`, or
 * per-axis via `horizontal`/`vertical`. All padding traces to the compiled
 * spacing scale; no literal colors.
 */
export declare function Inset({ space, horizontal, vertical, style, children, ...rest }: InsetProps): React.ReactElement;
//# sourceMappingURL=Inset.d.ts.map