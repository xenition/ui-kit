import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import type { MatchScoreTeam, MatchScoreStatus } from './MatchScore';
/** One crest·score·score·crest hero for a live/near-live fixture. Presentational only. */
export interface MatchHeaderProps {
    /** Home side (crest glyph, name, score). */
    home: MatchScoreTeam;
    /** Away side (crest glyph, name, score). */
    away: MatchScoreTeam;
    /** Match lifecycle — drives the live pulse + status label (never color alone). */
    status: MatchScoreStatus;
    /** Live clock label (e.g. `67'`) — surfaced in the frosted pill when `status === 'live'`. */
    minute?: string;
    /** Competition / round caption above the scoreline (e.g. `Premier League · MD 12`). */
    competition?: string;
    /** Stadium / venue line under the competition. */
    venue?: string;
    /** Fires on the optional back affordance; the chevron only renders when set. */
    onBack?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * MatchHeader — the sports module's **live-match peak**. A full brand-gradient
 * hero: the competition + venue read in near-white / frosted ink at the top, a
 * big crest·score·score·crest line dominates the middle, and a live pulse +
 * minute sit in a frosted pill (`broadcastTile`) — the "LIVE" state is announced
 * to assistive tech via `accessibilityLiveRegion` and reinforced by a dot plus
 * text, never color alone. Presentational only: shaped `home`/`away` teams, a
 * `status`, and an optional `onBack`; nothing fetches. Token-only colors via
 * `useXenitionTheme()` + `broadcast*(tokens.ramps)` — no literals, dark-safe.
 */
export declare function MatchHeader({ home, away, status, minute, competition, venue, onBack, style, }: MatchHeaderProps): React.ReactElement;
//# sourceMappingURL=MatchHeader.d.ts.map