"use strict";
/**
 * `@xenition/ui/native/gaming` — React Native building blocks for game,
 * esports, and player-progression apps. Store/library tiles (`GameCard`),
 * player identity (`PlayerStatCard`), competition surfaces (`TournamentBracket`,
 * `ScoreBoard`, `LeaderboardPodium`), session flow (`LobbyRow`,
 * `MatchmakingStatus`), progression (`LevelBar`, `QuestCard`,
 * `AchievementUnlock`), loadout (`InventoryItem`), and a HUD `ControllerHint`.
 *
 * Every component is a **presentation shell with no game-state dependency**:
 * scores, xp, matchmaking phase, and quest progress come in as props and
 * intents (join, claim, accept, tap a match) go out via callbacks, so an app
 * wires its real backend behind them. All components compose the
 * `native/primitives` and style exclusively from the compiled theme tokens
 * (`SemanticColors` + `tokens.*`) via `useXenitionTheme()` — no literal colors,
 * no DOM. Native only, mobile-first.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerHint = exports.InventoryItem = exports.AchievementUnlock = exports.QuestCard = exports.LevelBar = exports.MatchmakingStatus = exports.LobbyRow = exports.LeaderboardPodium = exports.ScoreBoard = exports.TournamentBracket = exports.PlayerStatCard = exports.GameCard = exports.formatElapsed = exports.clamp = exports.formatCount = exports.withAlpha = exports.rarityColorKey = exports.rarityRank = void 0;
var types_1 = require("./types");
Object.defineProperty(exports, "rarityRank", { enumerable: true, get: function () { return types_1.rarityRank; } });
Object.defineProperty(exports, "rarityColorKey", { enumerable: true, get: function () { return types_1.rarityColorKey; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return types_1.withAlpha; } });
Object.defineProperty(exports, "formatCount", { enumerable: true, get: function () { return types_1.formatCount; } });
Object.defineProperty(exports, "clamp", { enumerable: true, get: function () { return types_1.clamp; } });
Object.defineProperty(exports, "formatElapsed", { enumerable: true, get: function () { return types_1.formatElapsed; } });
// ── store / library ───────────────────────────────────────────────────
var GameCard_1 = require("./GameCard");
Object.defineProperty(exports, "GameCard", { enumerable: true, get: function () { return GameCard_1.GameCard; } });
// ── player identity ───────────────────────────────────────────────────
var PlayerStatCard_1 = require("./PlayerStatCard");
Object.defineProperty(exports, "PlayerStatCard", { enumerable: true, get: function () { return PlayerStatCard_1.PlayerStatCard; } });
// ── competition ───────────────────────────────────────────────────────
var TournamentBracket_1 = require("./TournamentBracket");
Object.defineProperty(exports, "TournamentBracket", { enumerable: true, get: function () { return TournamentBracket_1.TournamentBracket; } });
var ScoreBoard_1 = require("./ScoreBoard");
Object.defineProperty(exports, "ScoreBoard", { enumerable: true, get: function () { return ScoreBoard_1.ScoreBoard; } });
var LeaderboardPodium_1 = require("./LeaderboardPodium");
Object.defineProperty(exports, "LeaderboardPodium", { enumerable: true, get: function () { return LeaderboardPodium_1.LeaderboardPodium; } });
// ── session flow ──────────────────────────────────────────────────────
var LobbyRow_1 = require("./LobbyRow");
Object.defineProperty(exports, "LobbyRow", { enumerable: true, get: function () { return LobbyRow_1.LobbyRow; } });
var MatchmakingStatus_1 = require("./MatchmakingStatus");
Object.defineProperty(exports, "MatchmakingStatus", { enumerable: true, get: function () { return MatchmakingStatus_1.MatchmakingStatus; } });
// ── progression ───────────────────────────────────────────────────────
var LevelBar_1 = require("./LevelBar");
Object.defineProperty(exports, "LevelBar", { enumerable: true, get: function () { return LevelBar_1.LevelBar; } });
var QuestCard_1 = require("./QuestCard");
Object.defineProperty(exports, "QuestCard", { enumerable: true, get: function () { return QuestCard_1.QuestCard; } });
var AchievementUnlock_1 = require("./AchievementUnlock");
Object.defineProperty(exports, "AchievementUnlock", { enumerable: true, get: function () { return AchievementUnlock_1.AchievementUnlock; } });
// ── loadout ───────────────────────────────────────────────────────────
var InventoryItem_1 = require("./InventoryItem");
Object.defineProperty(exports, "InventoryItem", { enumerable: true, get: function () { return InventoryItem_1.InventoryItem; } });
// ── HUD ───────────────────────────────────────────────────────────────
var ControllerHint_1 = require("./ControllerHint");
Object.defineProperty(exports, "ControllerHint", { enumerable: true, get: function () { return ControllerHint_1.ControllerHint; } });
//# sourceMappingURL=index.js.map