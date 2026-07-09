import * as React from 'react';
import { type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
export interface CardProps extends ViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Themed surface container — the native mirror of the web `Card`: token-bound
 * background, border, radius, and padding. No literal colors.
 */
export declare function Card({ style, children, ...rest }: CardProps): React.ReactElement;
//# sourceMappingURL=Card.d.ts.map