"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeagueBadge = exports.MatchTimeline = exports.LineupField = exports.StatComparison = exports.ScoreTicker = exports.BracketView = exports.LiveCommentary = exports.FixtureRow = exports.PlayerStatCardV3 = exports.PlayerStatCardV2 = exports.PlayerStatCard = exports.TeamCardV3 = exports.TeamCardV2 = exports.TeamCard = exports.StandingsV3 = exports.StandingsV2 = exports.Standings = exports.MatchScoreV3 = exports.MatchScoreV2 = exports.MatchScore = void 0;
var MatchScore_1 = require("./MatchScore");
Object.defineProperty(exports, "MatchScore", { enumerable: true, get: function () { return MatchScore_1.MatchScore; } });
var MatchScoreV2_1 = require("./MatchScoreV2");
Object.defineProperty(exports, "MatchScoreV2", { enumerable: true, get: function () { return MatchScoreV2_1.MatchScoreV2; } });
var MatchScoreV3_1 = require("./MatchScoreV3");
Object.defineProperty(exports, "MatchScoreV3", { enumerable: true, get: function () { return MatchScoreV3_1.MatchScoreV3; } });
var Standings_1 = require("./Standings");
Object.defineProperty(exports, "Standings", { enumerable: true, get: function () { return Standings_1.Standings; } });
var StandingsV2_1 = require("./StandingsV2");
Object.defineProperty(exports, "StandingsV2", { enumerable: true, get: function () { return StandingsV2_1.StandingsV2; } });
var StandingsV3_1 = require("./StandingsV3");
Object.defineProperty(exports, "StandingsV3", { enumerable: true, get: function () { return StandingsV3_1.StandingsV3; } });
var TeamCard_1 = require("./TeamCard");
Object.defineProperty(exports, "TeamCard", { enumerable: true, get: function () { return TeamCard_1.TeamCard; } });
var TeamCardV2_1 = require("./TeamCardV2");
Object.defineProperty(exports, "TeamCardV2", { enumerable: true, get: function () { return TeamCardV2_1.TeamCardV2; } });
var TeamCardV3_1 = require("./TeamCardV3");
Object.defineProperty(exports, "TeamCardV3", { enumerable: true, get: function () { return TeamCardV3_1.TeamCardV3; } });
var PlayerStatCard_1 = require("./PlayerStatCard");
Object.defineProperty(exports, "PlayerStatCard", { enumerable: true, get: function () { return PlayerStatCard_1.PlayerStatCard; } });
var PlayerStatCardV2_1 = require("./PlayerStatCardV2");
Object.defineProperty(exports, "PlayerStatCardV2", { enumerable: true, get: function () { return PlayerStatCardV2_1.PlayerStatCardV2; } });
var PlayerStatCardV3_1 = require("./PlayerStatCardV3");
Object.defineProperty(exports, "PlayerStatCardV3", { enumerable: true, get: function () { return PlayerStatCardV3_1.PlayerStatCardV3; } });
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