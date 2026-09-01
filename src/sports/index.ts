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

/*
 * ── V4 "broadcast" (matchday) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated cards, bold
 * scorelines and big numerals, soft-tint status pills with a live pulse, and a
 * brand gradient reserved for the matchday moments (match header, player
 * profile, champion card, the feature scoreline). Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
export { MatchScoreV4 } from './MatchScoreV4';
export type { MatchScoreV4Props } from './MatchScoreV4';
export { PlayerStatCardV4 } from './PlayerStatCardV4';
export type { PlayerStatCardV4Props } from './PlayerStatCardV4';
export { StandingsV4 } from './StandingsV4';
export type { StandingsV4Props } from './StandingsV4';
export { TeamCardV4 } from './TeamCardV4';
export type { TeamCardV4Props } from './TeamCardV4';
export { FixtureRowV4 } from './FixtureRowV4';
export type { FixtureRowV4Props } from './FixtureRowV4';
export { ScoreTickerV4 } from './ScoreTickerV4';
export type { ScoreTickerV4Props } from './ScoreTickerV4';
export { LiveCommentaryV4 } from './LiveCommentaryV4';
export type { LiveCommentaryV4Props } from './LiveCommentaryV4';
export { BracketViewV4 } from './BracketViewV4';
export type { BracketViewV4Props } from './BracketViewV4';
export { MatchTimelineV4 } from './MatchTimelineV4';
export type { MatchTimelineV4Props } from './MatchTimelineV4';
export { LineupFieldV4 } from './LineupFieldV4';
export type { LineupFieldV4Props } from './LineupFieldV4';
export { StatComparisonV4 } from './StatComparisonV4';
export type { StatComparisonV4Props } from './StatComparisonV4';
export { LeagueBadgeV4 } from './LeagueBadgeV4';
export type { LeagueBadgeV4Props } from './LeagueBadgeV4';

/* ── New components (V4 broadcast line) ── */
export { MatchHeader } from './MatchHeader';
export type { MatchHeaderProps } from './MatchHeader';
export { PlayerProfileHeader } from './PlayerProfileHeader';
export type { PlayerProfileHeaderProps, PlayerStat as PlayerProfileStat } from './PlayerProfileHeader';
export { ChampionCard } from './ChampionCard';
export type { ChampionCardProps, ChampionStat } from './ChampionCard';
export { TeamFormGuide } from './TeamFormGuide';
export type { TeamFormGuideProps, TeamFormResult } from './TeamFormGuide';
export { EventFeed } from './EventFeed';
export type { EventFeedProps, EventFeedItem, EventFeedKind } from './EventFeed';
export { OddsBar } from './OddsBar';
export type { OddsBarProps, OddsPick } from './OddsBar';
