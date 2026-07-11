import * as React from 'react';
export interface TeamMember {
    /** Display name — also the source for the initials-fallback avatar. */
    name: string;
    /** Role / title line. */
    role?: React.ReactNode;
    /** Short bio paragraph. */
    bio?: React.ReactNode;
    /** Avatar image URL; falls back to initials when omitted. */
    avatar?: string;
    /** Social links rendered as a row under the bio. */
    socials?: {
        label: string;
        href: string;
        icon?: React.ReactNode;
    }[];
}
export interface TeamGridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Team / member cards. */
    members: TeamMember[];
    /** Column count at the largest breakpoint. */
    columns?: 2 | 3 | 4;
}
/** Responsive grid of team/member cards with an initials-fallback avatar. */
export declare const TeamGrid: React.ForwardRefExoticComponent<TeamGridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TeamGrid.d.ts.map