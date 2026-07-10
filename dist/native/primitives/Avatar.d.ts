import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps {
    src?: string;
    /** Fallback initials source when there's no image. */
    name?: string;
    size?: AvatarSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. No literal colors.
 */
export declare function Avatar({ src, name, size, style }: AvatarProps): React.ReactElement;
//# sourceMappingURL=Avatar.d.ts.map