import * as React from 'react';
import { type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import type { SpacingScale } from '../../theme/types';
export type SpaceKey = keyof SpacingScale;
export interface ScrollAreaProps extends ScrollViewProps {
    /** Inner content padding, from the spacing scale. Defaults to `lg`. */
    padding?: SpaceKey;
    /** Fill the theme surface color behind the content. */
    filled?: boolean;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Themed `ScrollView` with token-bound content padding and an optional theme
 * `surface` background — the native mirror of the web scroll container. Padding
 * and color trace to the compiled theme; no literal colors.
 */
export declare function ScrollArea({ padding, filled, style, contentContainerStyle, children, ...rest }: ScrollAreaProps): React.ReactElement;
//# sourceMappingURL=ScrollArea.d.ts.map