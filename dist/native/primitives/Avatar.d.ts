import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'rounded' | 'square';
export type AvatarStatus = 'online' | 'away' | 'busy' | 'offline';
export interface AvatarProps {
    src?: string;
    /** Fallback initials source when there's no image. */
    name?: string;
    size?: AvatarSize;
    /** Corner treatment. Defaults to `circle`. */
    shape?: AvatarShape;
    /** Presence indicator dot at the bottom-right. */
    status?: AvatarStatus;
    /** Draw a colored ring (status-colored when a `status` is set). */
    ring?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * User avatar — the native mirror of the web `Avatar`: image with an initials
 * fallback, bound to the theme tokens. The default (`md`, `circle`, no status,
 * no ring) renders exactly as before; `shape`, the extended `xs`/`xl` sizes, a
 * `status` presence dot, and a `ring` are additive. No literal colors.
 */
export declare function Avatar({ src, name, size, shape, status, ring, style, }: AvatarProps): React.ReactElement;
//# sourceMappingURL=Avatar.d.ts.map