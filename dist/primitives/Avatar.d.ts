import * as React from 'react';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';
export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
    src?: string;
    alt?: string;
    /** Fallback initials source when there's no image. */
    name?: string;
    size?: AvatarSize;
    /** Corner treatment. Defaults to `circle`. */
    shape?: AvatarShape;
    /** Presence indicator dot at the bottom-right. */
    status?: AvatarStatus;
    /** Draw a colored ring (status-colored when a `status` is set). */
    ring?: boolean;
}
/**
 * User avatar — image with an initials fallback, bound to the theme tokens. The
 * default (`md`, `circle`, no status, no ring) renders exactly as before; the
 * extended `xs`/`xl` sizes, `shape`, a `status` presence dot, and a `ring` are
 * additive opt-ins mirroring the native `Avatar`. No literal colors.
 */
export declare const Avatar: React.ForwardRefExoticComponent<AvatarProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=Avatar.d.ts.map