import * as React from 'react';
export type AvatarSize = 'sm' | 'md' | 'lg';
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    alt?: string;
    /** Fallback initials source when there's no image. */
    name?: string;
    size?: AvatarSize;
}
/** User avatar — image with an initials fallback, bound to the theme tokens. */
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Avatar.d.ts.map