"use strict";
/**
 * `@xenition/ui/native/kids` — token-bound React Native components for
 * parenting, family, and kids apps. Genuine RN components (View/Text/Pressable)
 * styled exclusively from the compiled theme via `useXenitionTheme()`, composing
 * the shared `../primitives` (Card/Button/Badge/Avatar/Progress) and `../charts`
 * (LineChart). No literal colors; mobile-first.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.needsExplanation = exports.nextAward = exports.starParts = exports.meterParts = exports.StickerRewardV4 = exports.ScreenTimeBarV4 = exports.SchoolEventRowV4 = exports.RoutineRowV4 = exports.RewardStarV4 = exports.MilestoneCardV4 = exports.GrowthChartV4 = exports.FamilyMemberRowV4 = exports.ChoreListV4 = exports.ChoreCardV4 = exports.ChildSwitcherV4 = exports.ChildProfileCardV4 = exports.BehaviorBadgeV4 = exports.AllowanceTrackerV4 = exports.AllowanceTrackerV3 = exports.AllowanceTrackerV2 = exports.RewardStarV3 = exports.RewardStarV2 = exports.ChoreCardV3 = exports.ChoreCardV2 = exports.ChildProfileCardV3 = exports.ChildProfileCardV2 = exports.StickerReward = exports.FamilyMemberRow = exports.SchoolEventRow = exports.BehaviorBadge = exports.RoutineRow = exports.GrowthChart = exports.ScreenTimeBar = exports.RewardStar = exports.MilestoneCard = exports.AllowanceTracker = exports.ChoreCard = exports.ChildProfileCard = void 0;
var ChildProfileCard_1 = require("./ChildProfileCard");
Object.defineProperty(exports, "ChildProfileCard", { enumerable: true, get: function () { return ChildProfileCard_1.ChildProfileCard; } });
var ChoreCard_1 = require("./ChoreCard");
Object.defineProperty(exports, "ChoreCard", { enumerable: true, get: function () { return ChoreCard_1.ChoreCard; } });
var AllowanceTracker_1 = require("./AllowanceTracker");
Object.defineProperty(exports, "AllowanceTracker", { enumerable: true, get: function () { return AllowanceTracker_1.AllowanceTracker; } });
var MilestoneCard_1 = require("./MilestoneCard");
Object.defineProperty(exports, "MilestoneCard", { enumerable: true, get: function () { return MilestoneCard_1.MilestoneCard; } });
var RewardStar_1 = require("./RewardStar");
Object.defineProperty(exports, "RewardStar", { enumerable: true, get: function () { return RewardStar_1.RewardStar; } });
var ScreenTimeBar_1 = require("./ScreenTimeBar");
Object.defineProperty(exports, "ScreenTimeBar", { enumerable: true, get: function () { return ScreenTimeBar_1.ScreenTimeBar; } });
var GrowthChart_1 = require("./GrowthChart");
Object.defineProperty(exports, "GrowthChart", { enumerable: true, get: function () { return GrowthChart_1.GrowthChart; } });
var RoutineRow_1 = require("./RoutineRow");
Object.defineProperty(exports, "RoutineRow", { enumerable: true, get: function () { return RoutineRow_1.RoutineRow; } });
var BehaviorBadge_1 = require("./BehaviorBadge");
Object.defineProperty(exports, "BehaviorBadge", { enumerable: true, get: function () { return BehaviorBadge_1.BehaviorBadge; } });
var SchoolEventRow_1 = require("./SchoolEventRow");
Object.defineProperty(exports, "SchoolEventRow", { enumerable: true, get: function () { return SchoolEventRow_1.SchoolEventRow; } });
var FamilyMemberRow_1 = require("./FamilyMemberRow");
Object.defineProperty(exports, "FamilyMemberRow", { enumerable: true, get: function () { return FamilyMemberRow_1.FamilyMemberRow; } });
var StickerReward_1 = require("./StickerReward");
Object.defineProperty(exports, "StickerReward", { enumerable: true, get: function () { return StickerReward_1.StickerReward; } });
// Alternate designs (v2 / v3) — drop-in redesigns that keep each base
// component's exact props (`<Name>V2Props = <Name>Props`).
var ChildProfileCardV2_1 = require("./ChildProfileCardV2");
Object.defineProperty(exports, "ChildProfileCardV2", { enumerable: true, get: function () { return ChildProfileCardV2_1.ChildProfileCardV2; } });
var ChildProfileCardV3_1 = require("./ChildProfileCardV3");
Object.defineProperty(exports, "ChildProfileCardV3", { enumerable: true, get: function () { return ChildProfileCardV3_1.ChildProfileCardV3; } });
var ChoreCardV2_1 = require("./ChoreCardV2");
Object.defineProperty(exports, "ChoreCardV2", { enumerable: true, get: function () { return ChoreCardV2_1.ChoreCardV2; } });
var ChoreCardV3_1 = require("./ChoreCardV3");
Object.defineProperty(exports, "ChoreCardV3", { enumerable: true, get: function () { return ChoreCardV3_1.ChoreCardV3; } });
var RewardStarV2_1 = require("./RewardStarV2");
Object.defineProperty(exports, "RewardStarV2", { enumerable: true, get: function () { return RewardStarV2_1.RewardStarV2; } });
var RewardStarV3_1 = require("./RewardStarV3");
Object.defineProperty(exports, "RewardStarV3", { enumerable: true, get: function () { return RewardStarV3_1.RewardStarV3; } });
var AllowanceTrackerV2_1 = require("./AllowanceTrackerV2");
Object.defineProperty(exports, "AllowanceTrackerV2", { enumerable: true, get: function () { return AllowanceTrackerV2_1.AllowanceTrackerV2; } });
var AllowanceTrackerV3_1 = require("./AllowanceTrackerV3");
Object.defineProperty(exports, "AllowanceTrackerV3", { enumerable: true, get: function () { return AllowanceTrackerV3_1.AllowanceTrackerV3; } });
// V4 — the redesigned line. Every `XV4` takes `XProps` plus optional additions
// that default to the base's behaviour, so an app can swap `X` for `XV4` and
// see the fix without a surprise. `ChoreListV4` and `ChildSwitcherV4` are new:
// the module had no list container and no way to choose which child you were
// looking at.
var AllowanceTrackerV4_1 = require("./AllowanceTrackerV4");
Object.defineProperty(exports, "AllowanceTrackerV4", { enumerable: true, get: function () { return AllowanceTrackerV4_1.AllowanceTrackerV4; } });
var BehaviorBadgeV4_1 = require("./BehaviorBadgeV4");
Object.defineProperty(exports, "BehaviorBadgeV4", { enumerable: true, get: function () { return BehaviorBadgeV4_1.BehaviorBadgeV4; } });
var ChildProfileCardV4_1 = require("./ChildProfileCardV4");
Object.defineProperty(exports, "ChildProfileCardV4", { enumerable: true, get: function () { return ChildProfileCardV4_1.ChildProfileCardV4; } });
var ChildSwitcherV4_1 = require("./ChildSwitcherV4");
Object.defineProperty(exports, "ChildSwitcherV4", { enumerable: true, get: function () { return ChildSwitcherV4_1.ChildSwitcherV4; } });
var ChoreCardV4_1 = require("./ChoreCardV4");
Object.defineProperty(exports, "ChoreCardV4", { enumerable: true, get: function () { return ChoreCardV4_1.ChoreCardV4; } });
var ChoreListV4_1 = require("./ChoreListV4");
Object.defineProperty(exports, "ChoreListV4", { enumerable: true, get: function () { return ChoreListV4_1.ChoreListV4; } });
var FamilyMemberRowV4_1 = require("./FamilyMemberRowV4");
Object.defineProperty(exports, "FamilyMemberRowV4", { enumerable: true, get: function () { return FamilyMemberRowV4_1.FamilyMemberRowV4; } });
var GrowthChartV4_1 = require("./GrowthChartV4");
Object.defineProperty(exports, "GrowthChartV4", { enumerable: true, get: function () { return GrowthChartV4_1.GrowthChartV4; } });
var MilestoneCardV4_1 = require("./MilestoneCardV4");
Object.defineProperty(exports, "MilestoneCardV4", { enumerable: true, get: function () { return MilestoneCardV4_1.MilestoneCardV4; } });
var RewardStarV4_1 = require("./RewardStarV4");
Object.defineProperty(exports, "RewardStarV4", { enumerable: true, get: function () { return RewardStarV4_1.RewardStarV4; } });
var RoutineRowV4_1 = require("./RoutineRowV4");
Object.defineProperty(exports, "RoutineRowV4", { enumerable: true, get: function () { return RoutineRowV4_1.RoutineRowV4; } });
var SchoolEventRowV4_1 = require("./SchoolEventRowV4");
Object.defineProperty(exports, "SchoolEventRowV4", { enumerable: true, get: function () { return SchoolEventRowV4_1.SchoolEventRowV4; } });
var ScreenTimeBarV4_1 = require("./ScreenTimeBarV4");
Object.defineProperty(exports, "ScreenTimeBarV4", { enumerable: true, get: function () { return ScreenTimeBarV4_1.ScreenTimeBarV4; } });
var StickerRewardV4_1 = require("./StickerRewardV4");
Object.defineProperty(exports, "StickerRewardV4", { enumerable: true, get: function () { return StickerRewardV4_1.StickerRewardV4; } });
// The module's arithmetic, shared byte-for-byte with the web twin.
var family_v4_1 = require("../../kids/family-v4");
Object.defineProperty(exports, "meterParts", { enumerable: true, get: function () { return family_v4_1.meterParts; } });
Object.defineProperty(exports, "starParts", { enumerable: true, get: function () { return family_v4_1.starParts; } });
Object.defineProperty(exports, "nextAward", { enumerable: true, get: function () { return family_v4_1.nextAward; } });
Object.defineProperty(exports, "needsExplanation", { enumerable: true, get: function () { return family_v4_1.needsExplanation; } });
//# sourceMappingURL=index.js.map