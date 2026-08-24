import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface ContainerProps extends ViewProps {
    /** Max content width in px; content is centered within it. Defaults to 480. */
    maxWidth?: number;
    /** Horizontal padding token. Defaults to `lg`. */
    padding?: SpaceKey;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Centered content column with a token-bound horizontal padding and a numeric
 * `maxWidth` cap — the native mirror of the web page container. Colors/padding
 * come from the compiled theme; only the numeric `maxWidth` is a layout literal.
 */
export declare function Container({ maxWidth, padding, style, children, ...rest }: ContainerProps): React.ReactElement;
//# sourceMappingURL=Container.d.ts.map