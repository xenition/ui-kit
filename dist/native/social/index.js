"use strict";
/**
 * `@xenition/ui/native/social` — composed, mobile-first social/feed/community
 * blocks for React Native. Each block is assembled from the native primitives
 * (`Avatar`, `Button`, …) and reads its colors/spacing/type from the compiled
 * theme via `useXenitionTheme()` — no literal colors, no DOM. Every component
 * ships `variant`/state props for variety, empty/loading states, and a11y
 * labels/roles so a builder can compose any social experience.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBarV3 = exports.StoryBarV2 = exports.CommentItemV3 = exports.CommentItemV2 = exports.UserCardV3 = exports.UserCardV2 = exports.PostCardV3 = exports.PostCardV2 = exports.EngagementBar = exports.ProfileStats = exports.parseMentions = exports.MentionText = exports.HashtagChip = exports.Poll = exports.ShareSheet = exports.CommentItem = exports.ReactionBar = exports.FollowButton = exports.UserCard = exports.StoryRing = exports.StoryBar = exports.FeedList = exports.PostCard = void 0;
var PostCard_1 = require("./PostCard");
Object.defineProperty(exports, "PostCard", { enumerable: true, get: function () { return PostCard_1.PostCard; } });
var FeedList_1 = require("./FeedList");
Object.defineProperty(exports, "FeedList", { enumerable: true, get: function () { return FeedList_1.FeedList; } });
var StoryBar_1 = require("./StoryBar");
Object.defineProperty(exports, "StoryBar", { enumerable: true, get: function () { return StoryBar_1.StoryBar; } });
var StoryRing_1 = require("./StoryRing");
Object.defineProperty(exports, "StoryRing", { enumerable: true, get: function () { return StoryRing_1.StoryRing; } });
var UserCard_1 = require("./UserCard");
Object.defineProperty(exports, "UserCard", { enumerable: true, get: function () { return UserCard_1.UserCard; } });
var FollowButton_1 = require("./FollowButton");
Object.defineProperty(exports, "FollowButton", { enumerable: true, get: function () { return FollowButton_1.FollowButton; } });
var ReactionBar_1 = require("./ReactionBar");
Object.defineProperty(exports, "ReactionBar", { enumerable: true, get: function () { return ReactionBar_1.ReactionBar; } });
var CommentItem_1 = require("./CommentItem");
Object.defineProperty(exports, "CommentItem", { enumerable: true, get: function () { return CommentItem_1.CommentItem; } });
var ShareSheet_1 = require("./ShareSheet");
Object.defineProperty(exports, "ShareSheet", { enumerable: true, get: function () { return ShareSheet_1.ShareSheet; } });
var Poll_1 = require("./Poll");
Object.defineProperty(exports, "Poll", { enumerable: true, get: function () { return Poll_1.Poll; } });
var HashtagChip_1 = require("./HashtagChip");
Object.defineProperty(exports, "HashtagChip", { enumerable: true, get: function () { return HashtagChip_1.HashtagChip; } });
var MentionText_1 = require("./MentionText");
Object.defineProperty(exports, "MentionText", { enumerable: true, get: function () { return MentionText_1.MentionText; } });
Object.defineProperty(exports, "parseMentions", { enumerable: true, get: function () { return MentionText_1.parseMentions; } });
var ProfileStats_1 = require("./ProfileStats");
Object.defineProperty(exports, "ProfileStats", { enumerable: true, get: function () { return ProfileStats_1.ProfileStats; } });
var EngagementBar_1 = require("./EngagementBar");
Object.defineProperty(exports, "EngagementBar", { enumerable: true, get: function () { return EngagementBar_1.EngagementBar; } });
// ── Alternate designs (V2 / V3) — drop-in, same props as the V1 above ──
var PostCardV2_1 = require("./PostCardV2");
Object.defineProperty(exports, "PostCardV2", { enumerable: true, get: function () { return PostCardV2_1.PostCardV2; } });
var PostCardV3_1 = require("./PostCardV3");
Object.defineProperty(exports, "PostCardV3", { enumerable: true, get: function () { return PostCardV3_1.PostCardV3; } });
var UserCardV2_1 = require("./UserCardV2");
Object.defineProperty(exports, "UserCardV2", { enumerable: true, get: function () { return UserCardV2_1.UserCardV2; } });
var UserCardV3_1 = require("./UserCardV3");
Object.defineProperty(exports, "UserCardV3", { enumerable: true, get: function () { return UserCardV3_1.UserCardV3; } });
var CommentItemV2_1 = require("./CommentItemV2");
Object.defineProperty(exports, "CommentItemV2", { enumerable: true, get: function () { return CommentItemV2_1.CommentItemV2; } });
var CommentItemV3_1 = require("./CommentItemV3");
Object.defineProperty(exports, "CommentItemV3", { enumerable: true, get: function () { return CommentItemV3_1.CommentItemV3; } });
var StoryBarV2_1 = require("./StoryBarV2");
Object.defineProperty(exports, "StoryBarV2", { enumerable: true, get: function () { return StoryBarV2_1.StoryBarV2; } });
var StoryBarV3_1 = require("./StoryBarV3");
Object.defineProperty(exports, "StoryBarV3", { enumerable: true, get: function () { return StoryBarV3_1.StoryBarV3; } });
//# sourceMappingURL=index.js.map