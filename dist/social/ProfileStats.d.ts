import * as React from 'react';
export interface ProfileStat {
    /** Caption under the value (e.g. `Followers`). */
    label: string;
    /** Headline number/string (pre-formatted, e.g. `12.4k`). */
    value: string | number;
    /** Makes the column clickable (e.g. open the followers list). */
    onClick?: () => void;
}
export interface ProfileStatsProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The stat columns, left to right (posts / followers / following …). */
    stats: ReadonlyArray<ProfileStat>;
    /** Draw thin dividers between columns. Default `false`. */
    dividers?: boolean;
}
/**
 * A horizontal row of value-over-label stat columns for a profile header
 * (posts, followers, following, …). Any column can be clickable. Renders bare
 * (not a card) so it drops into any header. Web parity of the native
 * `ProfileStats`; token-only.
 */
export declare const ProfileStats: React.ForwardRefExoticComponent<ProfileStatsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProfileStats.d.ts.map