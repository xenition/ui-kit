"use strict";
/**
 * `@xenition/ui/native/sports` — composed sports blocks for React Native:
 * scores, standings, teams, fixtures, and live match views. Mobile-first and
 * presentational only — every component takes shaped data plus callbacks
 * (nothing fetches or subscribes) and is styled exclusively from the compiled
 * theme via `useXenitionTheme()`, so a seed change (dark mode included)
 * restyles the whole set. No literal colors, no external chart / map / native
 * dependencies: `LineupField` and `BracketView` are static, styled `View`
 * placeholders. Match state (live / final / upcoming) is always conveyed by
 * text + glyph, never color alone. Scope is scores / standings / team apps —
 * not betting or gambling.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueBadge = exports.MatchTimeline = exports.LineupField = exports.StatComparison = exports.ScoreTicker = exports.BracketView = exports.LiveCommentary = exports.FixtureRow = exports.PlayerStatCard = exports.TeamCard = exports.Standings = exports.MatchScore = void 0;
var MatchScore_1 = require("./MatchScore");
Object.defineProperty(exports, "MatchScore", { enumerable: true, get: function () { return MatchScore_1.MatchScore; } });
var Standings_1 = require("./Standings");
Object.defineProperty(exports, "Standings", { enumerable: true, get: function () { return Standings_1.Standings; } });
var TeamCard_1 = require("./TeamCard");
Object.defineProperty(exports, "TeamCard", { enumerable: true, get: function () { return TeamCard_1.TeamCard; } });
var PlayerStatCard_1 = require("./PlayerStatCard");
Object.defineProperty(exports, "PlayerStatCard", { enumerable: true, get: function () { return PlayerStatCard_1.PlayerStatCard; } });
var FixtureRow_1 = require("./FixtureRow");
Object.defineProperty(exports, "FixtureRow", { enumerable: true, get: function () { return FixtureRow_1.FixtureRow; } });
var LiveCommentary_1 = require("./LiveCommentary");
Object.defineProperty(exports, "LiveCommentary", { enumerable: true, get: function () { return LiveCommentary_1.LiveCommentary; } });
var BracketView_1 = require("./BracketView");
Object.defineProperty(exports, "BracketView", { enumerable: true, get: function () { return BracketView_1.BracketView; } });
var ScoreTicker_1 = require("./ScoreTicker");
Object.defineProperty(exports, "ScoreTicker", { enumerable: true, get: function () { return ScoreTicker_1.ScoreTicker; } });
var StatComparison_1 = require("./StatComparison");
Object.defineProperty(exports, "StatComparison", { enumerable: true, get: function () { return StatComparison_1.StatComparison; } });
var LineupField_1 = require("./LineupField");
Object.defineProperty(exports, "LineupField", { enumerable: true, get: function () { return LineupField_1.LineupField; } });
var MatchTimeline_1 = require("./MatchTimeline");
Object.defineProperty(exports, "MatchTimeline", { enumerable: true, get: function () { return MatchTimeline_1.MatchTimeline; } });
var LeagueBadge_1 = require("./LeagueBadge");
Object.defineProperty(exports, "LeagueBadge", { enumerable: true, get: function () { return LeagueBadge_1.LeagueBadge; } });
//# sourceMappingURL=index.js.map