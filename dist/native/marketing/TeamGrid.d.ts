import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TeamMember {
    /** Display name — also the source for the initials-fallback avatar. */
    name: string;
    /** Role / title line. */
    role?: string;
    /** Short bio paragraph. */
    bio?: string;
    /** Avatar image URL; falls back to initials when omitted. */
    avatar?: string;
}
export interface TeamGridProps {
    /** Team / member cards (mirrors the web `members` array). */
    members: TeamMember[];
    /** Max columns; native wraps into rows of this width (default 2 for phones). */
    columns?: 2 | 3 | 4;
    style?: StyleProp<ViewStyle>;
}
/**
 * Responsive grid of team/member cards — the native mirror of the web
 * `TeamGrid`. Cards wrap via flex `basis` rather than CSS grid breakpoints,
 * with an initials-fallback avatar. The web `socials` link row is dropped
 * (no `href` navigation surface on these cards). Token-only.
 */
export declare function TeamGrid({ members, columns, style, }: TeamGridProps): React.ReactElement;
//# sourceMappingURL=TeamGrid.d.ts.map