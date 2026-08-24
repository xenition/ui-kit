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
exports.ControllerHint = exports.InventoryItem = exports.AchievementUnlock = exports.QuestCardV3 = exports.QuestCardV2 = exports.QuestCard = exports.LevelBar = exports.MatchmakingStatus = exports.LobbyRow = exports.LeaderboardPodiumV3 = exports.LeaderboardPodiumV2 = exports.LeaderboardPodium = exports.ScoreBoard = exports.TournamentBracket = exports.PlayerStatCardV3 = exports.PlayerStatCardV2 = exports.PlayerStatCard = exports.GameCardV3 = exports.GameCardV2 = exports.GameCard = exports.formatElapsed = exports.clamp = exports.formatCount = exports.withAlpha = exports.rarityColorKey = exports.rarityRank = void 0;
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
var GameCardV2_1 = require("./GameCardV2");
Object.defineProperty(exports, "GameCardV2", { enumerable: true, get: function () { return GameCardV2_1.GameCardV2; } });
var GameCardV3_1 = require("./GameCardV3");
Object.defineProperty(exports, "GameCardV3", { enumerable: true, get: function () { return GameCardV3_1.GameCardV3; } });
// ── player identity ───────────────────────────────────────────────────
var PlayerStatCard_1 = require("./PlayerStatCard");
Object.defineProperty(exports, "PlayerStatCard", { enumerable: true, get: function () { return PlayerStatCard_1.PlayerStatCard; } });
var PlayerStatCardV2_1 = require("./PlayerStatCardV2");
Object.defineProperty(exports, "PlayerStatCardV2", { enumerable: true, get: function () { return PlayerStatCardV2_1.PlayerStatCardV2; } });
var PlayerStatCardV3_1 = require("./PlayerStatCardV3");
Object.defineProperty(exports, "PlayerStatCardV3", { enumerable: true, get: function () { return PlayerStatCardV3_1.PlayerStatCardV3; } });
// ── competition ───────────────────────────────────────────────────────
var TournamentBracket_1 = require("./TournamentBracket");
Object.defineProperty(exports, "TournamentBracket", { enumerable: true, get: function () { return TournamentBracket_1.TournamentBracket; } });
var ScoreBoard_1 = require("./ScoreBoard");
Object.defineProperty(exports, "ScoreBoard", { enumerable: true, get: function () { return ScoreBoard_1.ScoreBoard; } });
var LeaderboardPodium_1 = require("./LeaderboardPodium");
Object.defineProperty(exports, "LeaderboardPodium", { enumerable: true, get: function () { return LeaderboardPodium_1.LeaderboardPodium; } });
var LeaderboardPodiumV2_1 = require("./LeaderboardPodiumV2");
Object.defineProperty(exports, "LeaderboardPodiumV2", { enumerable: true, get: function () { return LeaderboardPodiumV2_1.LeaderboardPodiumV2; } });
var LeaderboardPodiumV3_1 = require("./LeaderboardPodiumV3");
Object.defineProperty(exports, "LeaderboardPodiumV3", { enumerable: true, get: function () { return LeaderboardPodiumV3_1.LeaderboardPodiumV3; } });
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
var QuestCardV2_1 = require("./QuestCardV2");
Object.defineProperty(exports, "QuestCardV2", { enumerable: true, get: function () { return QuestCardV2_1.QuestCardV2; } });
var QuestCardV3_1 = require("./QuestCardV3");
Object.defineProperty(exports, "QuestCardV3", { enumerable: true, get: function () { return QuestCardV3_1.QuestCardV3; } });
var AchievementUnlock_1 = require("./AchievementUnlock");
Object.defineProperty(exports, "AchievementUnlock", { enumerable: true, get: function () { return AchievementUnlock_1.AchievementUnlock; } });
// ── loadout ───────────────────────────────────────────────────────────
var InventoryItem_1 = require("./InventoryItem");
Object.defineProperty(exports, "InventoryItem", { enumerable: true, get: function () { return InventoryItem_1.InventoryItem; } });
// ── HUD ───────────────────────────────────────────────────────────────
var ControllerHint_1 = require("./ControllerHint");
Object.defineProperty(exports, "ControllerHint", { enumerable: true, get: function () { return ControllerHint_1.ControllerHint; } });
//# sourceMappingURL=index.js.map