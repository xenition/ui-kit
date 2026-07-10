import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type SpinnerSize = 'sm' | 'md' | 'lg';
export interface SpinnerProps {
    size?: SpinnerSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed loading spinner — the native mirror of the web `Spinner`. An
 * `ActivityIndicator` tinted with the primary token. No literal colors.
 */
export declare function Spinner({ size, style }: SpinnerProps): React.ReactElement;
//# sourceMappingURL=Spinner.d.ts.map