import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ProfileStat {
    /** Caption under the value (e.g. `Followers`). */
    label: string;
    /** Headline number/string (pre-formatted, e.g. `12.4k`). */
    value: string | number;
    /** Makes the column tappable (e.g. open the followers list). */
    onPress?: () => void;
}
export interface ProfileStatsProps {
    /** The stat columns, left to right (posts / followers / following …). */
    stats: ReadonlyArray<ProfileStat>;
    /** Draw thin dividers between columns. Default `false`. */
    dividers?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A horizontal row of value-over-label stat columns for a profile header
 * (posts, followers, following, …). Any column can be tappable. Renders bare
 * (not a card) so it drops into any header. Token-only.
 */
export declare function ProfileStats({ stats, dividers, style }: ProfileStatsProps): React.ReactElement;
//# sourceMappingURL=ProfileStats.d.ts.map