import * as React from 'react';
import type { MatchScoreTeam, MatchScoreStatus } from './MatchScore';
/** One crest·score·score·crest hero for a live/near-live fixture. Presentational only. */
export interface MatchHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
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
}
/**
 * MatchHeader — the sports module's **live-match peak** (web parity of the native
 * twin). A full brand-gradient hero: the competition + venue read in near-white /
 * frosted ink at the top, a big crest·score·score·crest line dominates the middle,
 * and a live pulse + minute sit in a frosted pill (`bg-primary-50/15`) — the "LIVE"
 * state is announced via an `aria-live` region and reinforced by a pulsing dot
 * plus text, never color alone. Presentational only: shaped `home`/`away` teams,
 * a `status`, and an optional `onBack`; nothing fetches. Every color derives from
 * the brand ramp (`--xen-*` classes + gradient utilities) — no literals, dark-safe.
 */
export declare const MatchHeader: React.ForwardRefExoticComponent<MatchHeaderProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatchHeader.d.ts.map