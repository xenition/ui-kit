/**
 * Shared data shapes + helpers for `@xenition/ui/native/gaming` — the game /
 * esports / player-progression building blocks. These are plain data records
 * (no colors, no styling) that the gaming components accept as props, plus a
 * couple of pure formatting/token helpers reused across the module.
 *
 * The components are **presentation shells only**: they never own game state.
 * Values (scores, xp, matchmaking phase, quest progress) are passed in and
 * intents (join, claim, accept, tap a match) come back out via callbacks, so an
 * app wires its real game backend behind them.
 */
import type { SemanticColors } from '../theme';
/** Item / loot rarity — orders low→high; drives the accent tint + label. */
export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
/** Lifecycle a quest surface reflects in its control + a11y state. */
export type QuestState = 'locked' | 'active' | 'completed' | 'claimed';
/** Matchmaking phase a `MatchmakingStatus` reflects (drives label + control). */
export type MatchmakingPhase = 'idle' | 'searching' | 'found' | 'failed';
/** A game / title in a store, library, or discovery surface. */
export interface GameRecord {
    /** Stable unique id (used as a React list key). */
    id: string;
    /** Display title. */
    title: string;
    /** Genre / category label, e.g. `'Roguelike'`. */
    genre?: string;
    /** Cover / key-art image URL; a glyph placeholder is drawn when absent. */
    coverUrl?: string;
    /** Star rating in `[0, 5]`. */
    rating?: number;
    /** Pre-formatted price label, e.g. `'$19.99'` or `'Free'`. */
    price?: string;
    /** Whether the title is already installed / owned. */
    installed?: boolean;
}
/** One named stat cell shown in a `PlayerStatCard`, e.g. `K/D · 2.4`. */
export interface PlayerStatEntry {
    /** Short stat label, e.g. `'K/D'`, `'Wins'`. */
    label: string;
    /** Pre-formatted stat value, e.g. `'2.4'`, `'128'`. */
    value: string;
}
/** A player's profile summary + headline stats. */
export interface PlayerProfile {
    /** Stable unique id. */
    id: string;
    /** Handle / gamertag. */
    name: string;
    /** Avatar image URL; falls back to initials when absent. */
    avatarUrl?: string;
    /** Rank / tier label, e.g. `'Diamond II'`. */
    rank?: string;
    /** Current level number. */
    level?: number;
    /** Headline stat cells (rendered in a grid). */
    stats?: PlayerStatEntry[];
}
/** One bracket match — two named sides with optional scores + a winner. */
export interface BracketMatch {
    /** Stable unique id. */
    id: string;
    /** Top competitor name (nullish → `TBD`). */
    home?: string;
    /** Bottom competitor name (nullish → `TBD`). */
    away?: string;
    /** Top competitor score. */
    homeScore?: number;
    /** Bottom competitor score. */
    awayScore?: number;
    /** Which side has advanced, if decided. */
    winner?: 'home' | 'away';
}
/** A named round (column) of a single-elimination bracket. */
export interface BracketRound {
    /** Round label, e.g. `'Quarterfinals'`. */
    name: string;
    /** Matches in the round (top→bottom). */
    matches: BracketMatch[];
}
/** A joinable multiplayer lobby / room. */
export interface GameLobby {
    /** Stable unique id. */
    id: string;
    /** Lobby / room name. */
    name: string;
    /** Host handle. */
    host?: string;
    /** Game mode label, e.g. `'Ranked 5v5'`. */
    mode?: string;
    /** Filled player slots. */
    players: number;
    /** Total player slots. */
    capacity: number;
    /** Whether a password is required. */
    locked?: boolean;
    /** Whether the match has already started. */
    inProgress?: boolean;
}
/** One row of a `ScoreBoard` — a team or player and its score. */
export interface ScoreEntry {
    /** Stable unique id. */
    id: string;
    /** Team / player name. */
    name: string;
    /** Numeric score. */
    score: number;
    /** Optional avatar / crest URL. */
    avatarUrl?: string;
    /** Secondary stat label, e.g. `'12 / 3 / 8'`. */
    detail?: string;
}
/** An inventory / loadout item. */
export interface GameItem {
    /** Stable unique id. */
    id: string;
    /** Item name. */
    name: string;
    /** Rarity tier (drives the accent tint + label). */
    rarity?: ItemRarity;
    /** Icon glyph / emoji shown when there's no image. */
    glyph?: string;
    /** Item art URL. */
    imageUrl?: string;
    /** Stack quantity (shown as `×N` when > 1). */
    quantity?: number;
    /** Whether the item is currently equipped. */
    equipped?: boolean;
}
/** A quest / mission with progress + a reward. */
export interface Quest {
    /** Stable unique id. */
    id: string;
    /** Quest title. */
    title: string;
    /** One-line objective description. */
    description?: string;
    /** Steps completed so far. */
    progress: number;
    /** Steps required to complete. */
    goal: number;
    /** Pre-formatted reward label, e.g. `'500 XP'`. */
    reward?: string;
}
/** An unlockable achievement / trophy. */
export interface Achievement {
    /** Stable unique id. */
    id: string;
    /** Achievement title. */
    title: string;
    /** Short description / criteria. */
    description?: string;
    /** Icon glyph / emoji. */
    glyph?: string;
    /** Gamerscore / point value. */
    points?: number;
}
/** One leaderboard standing (used by `LeaderboardPodium`). */
export interface LeaderboardEntry {
    /** Stable unique id. */
    id: string;
    /** Player handle. */
    name: string;
    /** Score / points shown under the name. */
    score: number;
    /** Avatar image URL; falls back to initials. */
    avatarUrl?: string;
}
/**
 * Ordinal rank for a rarity tier (`common` = 0 … `legendary` = 4). Used to
 * sort / compare rarities and to size accents; unknown tiers fall back to 0.
 */
export declare function rarityRank(rarity?: ItemRarity): number;
/**
 * Map a rarity tier to a **semantic color slot** so every rarity accent traces
 * to a token (never a literal). `common` reads as muted; higher tiers escalate
 * through success → primary → accent → warn.
 */
export declare function rarityColorKey(rarity?: ItemRarity): keyof SemanticColors;
/**
 * Token-derived translucent tint from a resolved hex (no literal hex; mirrors
 * the primitives' `withAlpha`). Returns an `rgba(...)` string so soft fills
 * still trace to a token color.
 */
export declare function withAlpha(hex: string, alpha: number): string;
/** Compact count, e.g. `1234` → `'1.2K'`, `2_000_000` → `'2M'`; guards junk. */
export declare function formatCount(n?: number): string;
/** Clamp `n` into `[min, max]`; non-finite input collapses to `min`. */
export declare function clamp(n: number, min: number, max: number): number;
/** Format `mm:ss` from whole seconds; guards nullish / negative / non-finite. */
export declare function formatElapsed(totalSeconds?: number): string;
//# sourceMappingURL=types.d.ts.map