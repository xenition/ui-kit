import * as React from 'react';
import { type AvatarSize } from './Avatar';
export interface AvatarGroupProps {
    avatars: {
        name?: string;
        src?: string;
    }[];
    /** Max avatars before collapsing into a +N chip (default 4). */
    max?: number;
    size?: AvatarSize;
    className?: string;
}
/** Overlapping avatar stack with a +N overflow chip — bound to the theme tokens. */
export declare function AvatarGroup({ avatars, max, size, className }: AvatarGroupProps): React.ReactElement;
//# sourceMappingURL=AvatarGroup.d.ts.map