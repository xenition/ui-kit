/**
 * `@xenition/ui/sports` — composed sports blocks for React DOM: scores,
 * standings, teams, fixtures, and live match views. Web parity of
 * `@xenition/ui/native/sports`, mirroring every name + prop contract with
 * `onPress` re-expressed as `onClick`. Presentational only — every component
 * takes shaped data plus callbacks (nothing fetches or subscribes) and is
 * styled exclusively from the `--xen-*` Tailwind token classes, so a seed
 * change (dark mode included) restyles the whole set. No literal colors, no
 * external chart / map dependencies: `LineupField` and `BracketView` are
 * static, styled `div` placeholders. Match state (live / final / upcoming) is
 * always conveyed by text + glyph, never color alone. Scope is scores /
 * standings / team apps — not betting or gambling.
 */

export { MatchScore } from './MatchScore';
export type { MatchScoreProps, MatchScoreTeam, MatchScoreStatus } from './MatchScore';
export { MatchScoreV2 } from './MatchScoreV2';
export type { MatchScoreV2Props } from './MatchScoreV2';
export { MatchScoreV3 } from './MatchScoreV3';
export type { MatchScoreV3Props } from './MatchScoreV3';

export { Standings } from './Standings';
export type { StandingsProps, StandingsRow, StandingsZone, StandingsForm } from './Standings';
export { StandingsV2 } from './StandingsV2';
export type { StandingsV2Props } from './StandingsV2';
export { StandingsV3 } from './StandingsV3';
export type { StandingsV3Props } from './StandingsV3';

export { TeamCard } from './TeamCard';
export type { TeamCardProps, TeamForm } from './TeamCard';
export { TeamCardV2 } from './TeamCardV2';
export type { TeamCardV2Props } from './TeamCardV2';
export { TeamCardV3 } from './TeamCardV3';
export type { TeamCardV3Props } from './TeamCardV3';

export { PlayerStatCard } from './PlayerStatCard';
export type { PlayerStatCardProps, PlayerStat } from './PlayerStatCard';
export { PlayerStatCardV2 } from './PlayerStatCardV2';
export type { PlayerStatCardV2Props } from './PlayerStatCardV2';
export { PlayerStatCardV3 } from './PlayerStatCardV3';
export type { PlayerStatCardV3Props } from './PlayerStatCardV3';

export { FixtureRow } from './FixtureRow';
export type { FixtureRowProps, FixtureStatus } from './FixtureRow';

export { LiveCommentary } from './LiveCommentary';
export type { LiveCommentaryProps, CommentaryEntry, CommentaryKind } from './LiveCommentary';

export { BracketView } from './BracketView';
export type { BracketViewProps, BracketRound, BracketMatch, BracketSlot } from './BracketView';

export { ScoreTicker } from './ScoreTicker';
export type { ScoreTickerProps, TickerMatch, TickerStatus } from './ScoreTicker';

export { StatComparison } from './StatComparison';
export type { StatComparisonProps, StatComparisonRow } from './StatComparison';

export { LineupField } from './LineupField';
export type { LineupFieldProps, LineupPlayer } from './LineupField';

export { MatchTimeline } from './MatchTimeline';
export type { MatchTimelineProps, MatchEvent, MatchEventKind } from './MatchTimeline';

export { LeagueBadge } from './LeagueBadge';
export type { LeagueBadgeProps, LeagueBadgeSize, LeagueBadgeVariant } from './LeagueBadge';
