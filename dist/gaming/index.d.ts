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
export type { ItemRarity, QuestState, MatchmakingPhase, RaritySlot, GameRecord, PlayerStatEntry, PlayerProfile, BracketMatch, BracketRound, GameLobby, ScoreEntry, GameItem, Quest, Achievement, LeaderboardEntry, } from './types';
export { rarityRank, rarityColorKey, RARITY_TEXT_CLASS, RARITY_BORDER_CLASS, formatCount, clamp, formatElapsed, } from './types';
export { GameCard } from './GameCard';
export type { GameCardProps, GameCardVariant } from './GameCard';
export { PlayerStatCard } from './PlayerStatCard';
export type { PlayerStatCardProps, PlayerStatCardVariant } from './PlayerStatCard';
export { TournamentBracket } from './TournamentBracket';
export type { TournamentBracketProps } from './TournamentBracket';
export { ScoreBoard } from './ScoreBoard';
export type { ScoreBoardProps, ScoreBoardVariant } from './ScoreBoard';
export { LeaderboardPodium } from './LeaderboardPodium';
export type { LeaderboardPodiumProps } from './LeaderboardPodium';
export { LobbyRow } from './LobbyRow';
export type { LobbyRowProps, LobbyRowVariant } from './LobbyRow';
export { MatchmakingStatus } from './MatchmakingStatus';
export type { MatchmakingStatusProps } from './MatchmakingStatus';
export { LevelBar } from './LevelBar';
export type { LevelBarProps, LevelBarVariant } from './LevelBar';
export { QuestCard } from './QuestCard';
export type { QuestCardProps } from './QuestCard';
export { AchievementUnlock } from './AchievementUnlock';
export type { AchievementUnlockProps, AchievementUnlockVariant } from './AchievementUnlock';
export { InventoryItem } from './InventoryItem';
export type { InventoryItemProps, InventoryItemVariant } from './InventoryItem';
export { ControllerHint } from './ControllerHint';
export type { ControllerHintProps, ControllerHintItem, ControllerHintVariant, ControllerHintSize, } from './ControllerHint';
//# sourceMappingURL=index.d.ts.map