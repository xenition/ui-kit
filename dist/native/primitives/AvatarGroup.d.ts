import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type AvatarSize } from './Avatar';
export interface AvatarGroupProps {
    avatars: {
        name?: string;
        src?: string;
    }[];
    /** Max avatars before collapsing into a +N chip (default 4). */
    max?: number;
    size?: AvatarSize;
    style?: StyleProp<ViewStyle>;
}
/**
 * Overlapping avatar stack with a +N overflow chip — the native mirror of the
 * web `AvatarGroup`. Each avatar carries a token-bound surface ring; overflow
 * collapses into a neutral +N chip. No literal colors.
 */
export declare function AvatarGroup({ avatars, max, size, style }: AvatarGroupProps): React.ReactElement;
//# sourceMappingURL=AvatarGroup.d.ts.map