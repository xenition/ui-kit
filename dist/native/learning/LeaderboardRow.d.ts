import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface LeaderboardRowProps {
    /** 1-based rank. */
    rank: number;
    /** Participant name. */
    name?: string;
    /** Avatar image URI (initials fallback from `name`). */
    avatar?: string;
    /** Score / points. */
    score?: number;
    /** Unit label after the score (default "pts"). */
    scoreUnit?: string;
    /** Highlight this row as the current user. */
    highlighted?: boolean;
    /** Renders a muted empty placeholder slot (unfilled rank). */
    empty?: boolean;
    /** Optional short delta/trend note, e.g. "▲2". */
    trend?: string;
    /** Fires when the row is pressed. */
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Token-only colors.
 */
export declare function LeaderboardRow({ rank, name, avatar, score, scoreUnit, highlighted, empty, trend, onPress, style, }: LeaderboardRowProps): React.ReactElement;
//# sourceMappingURL=LeaderboardRow.d.ts.map