/**
 * `@xenition/ui/gaming` — web (React DOM) building blocks for game, esports, and
 * player-progression apps. The DOM parity of `native/gaming`: store/library
 * tiles (`GameCard`), player identity (`PlayerStatCard`), competition surfaces
 * (`TournamentBracket`, `ScoreBoard`, `LeaderboardPodium`), session flow
 * (`LobbyRow`, `MatchmakingStatus`), progression (`LevelBar`, `QuestCard`,
 * `AchievementUnlock`), loadout (`InventoryItem`), and a HUD `ControllerHint`.
 *
 * Every component is a **presentation shell with no game-state dependency**:
 * scores, xp, matchmaking phase, and quest progress come in as props and intents
 * (join, claim, accept, click a match) go out via callbacks, so an app wires its
 * real backend behind them. All components compose the web `primitives` /
 * `commerce` and style exclusively from the `--xen-*` token utility classes — no
 * literal colors. Web only.
 */

// ── shared data shapes + helpers ──────────────────────────────────────
export type {
  ItemRarity,
  QuestState,
  MatchmakingPhase,
  RaritySlot,
  GameRecord,
  PlayerStatEntry,
  PlayerProfile,
  BracketMatch,
  BracketRound,
  GameLobby,
  ScoreEntry,
  GameItem,
  Quest,
  Achievement,
  LeaderboardEntry,
} from './types';
export {
  rarityRank,
  rarityColorKey,
  RARITY_TEXT_CLASS,
  RARITY_BORDER_CLASS,
  formatCount,
  clamp,
  formatElapsed,
} from './types';

// ── store / library ───────────────────────────────────────────────────
export { GameCard } from './GameCard';
export type { GameCardProps, GameCardVariant } from './GameCard';
export { GameCardV2 } from './GameCardV2';
export type { GameCardV2Props } from './GameCardV2';
export { GameCardV3 } from './GameCardV3';
export type { GameCardV3Props } from './GameCardV3';

// ── player identity ───────────────────────────────────────────────────
export { PlayerStatCard } from './PlayerStatCard';
export type { PlayerStatCardProps, PlayerStatCardVariant } from './PlayerStatCard';
export { PlayerStatCardV2 } from './PlayerStatCardV2';
export type { PlayerStatCardV2Props } from './PlayerStatCardV2';
export { PlayerStatCardV3 } from './PlayerStatCardV3';
export type { PlayerStatCardV3Props } from './PlayerStatCardV3';

// ── competition ───────────────────────────────────────────────────────
export { TournamentBracket } from './TournamentBracket';
export type { TournamentBracketProps } from './TournamentBracket';
export { ScoreBoard } from './ScoreBoard';
export type { ScoreBoardProps, ScoreBoardVariant } from './ScoreBoard';
export { LeaderboardPodium } from './LeaderboardPodium';
export type { LeaderboardPodiumProps } from './LeaderboardPodium';
export { LeaderboardPodiumV2 } from './LeaderboardPodiumV2';
export type { LeaderboardPodiumV2Props } from './LeaderboardPodiumV2';
export { LeaderboardPodiumV3 } from './LeaderboardPodiumV3';
export type { LeaderboardPodiumV3Props } from './LeaderboardPodiumV3';

// ── session flow ──────────────────────────────────────────────────────
export { LobbyRow } from './LobbyRow';
export type { LobbyRowProps, LobbyRowVariant } from './LobbyRow';
export { MatchmakingStatus } from './MatchmakingStatus';
export type { MatchmakingStatusProps } from './MatchmakingStatus';

// ── progression ───────────────────────────────────────────────────────
export { LevelBar } from './LevelBar';
export type { LevelBarProps, LevelBarVariant } from './LevelBar';
export { QuestCard } from './QuestCard';
export type { QuestCardProps } from './QuestCard';
export { QuestCardV2 } from './QuestCardV2';
export type { QuestCardV2Props } from './QuestCardV2';
export { QuestCardV3 } from './QuestCardV3';
export type { QuestCardV3Props } from './QuestCardV3';
export { AchievementUnlock } from './AchievementUnlock';
export type { AchievementUnlockProps, AchievementUnlockVariant } from './AchievementUnlock';

// ── loadout ───────────────────────────────────────────────────────────
export { InventoryItem } from './InventoryItem';
export type { InventoryItemProps, InventoryItemVariant } from './InventoryItem';

// ── HUD ───────────────────────────────────────────────────────────────
export { ControllerHint } from './ControllerHint';
export type {
  ControllerHintProps,
  ControllerHintItem,
  ControllerHintVariant,
  ControllerHintSize,
} from './ControllerHint';
