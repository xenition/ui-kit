"use strict";
/**
 * `@xenition/ui/social` — composed social / feed / community blocks for React
 * DOM. Web parity of `@xenition/ui/native/social`: the same component names and
 * prop contracts, with `onPress` → `onClick`, RN styles → Tailwind token
 * classes, and `View`/`Text`/`Pressable` → `div`/`span`/`button`. Every block
 * is assembled from the web primitives (`Avatar`, `Button`, `Icon`, …) and
 * styled exclusively via the `--xen-*` theme tokens — no literal colors (CI
 * lint rule) — so a seed change restyles the whole social surface, dark mode
 * included. Each ships variant/state props, empty/loading states, and
 * `role`/`aria-*` a11y (state announced, never color alone).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCount = exports.EngagementBar = exports.ProfileStats = exports.parseMentions = exports.MentionText = exports.HashtagChip = exports.Poll = exports.ShareSheet = exports.CommentItemV3 = exports.CommentItemV2 = exports.CommentItem = exports.ReactionBar = exports.FollowButton = exports.UserCardV3 = exports.UserCardV2 = exports.UserCard = exports.StoryRing = exports.StoryBarV3 = exports.StoryBarV2 = exports.StoryBar = exports.FeedList = exports.PostCardV3 = exports.PostCardV2 = exports.PostCard = void 0;
var PostCard_1 = require("./PostCard");
Object.defineProperty(exports, "PostCard", { enumerable: true, get: function () { return PostCard_1.PostCard; } });
var PostCardV2_1 = require("./PostCardV2");
Object.defineProperty(exports, "PostCardV2", { enumerable: true, get: function () { return PostCardV2_1.PostCardV2; } });
var PostCardV3_1 = require("./PostCardV3");
Object.defineProperty(exports, "PostCardV3", { enumerable: true, get: function () { return PostCardV3_1.PostCardV3; } });
var FeedList_1 = require("./FeedList");
Object.defineProperty(exports, "FeedList", { enumerable: true, get: function () { return FeedList_1.FeedList; } });
var StoryBar_1 = require("./StoryBar");
Object.defineProperty(exports, "StoryBar", { enumerable: true, get: function () { return StoryBar_1.StoryBar; } });
var StoryBarV2_1 = require("./StoryBarV2");
Object.defineProperty(exports, "StoryBarV2", { enumerable: true, get: function () { return StoryBarV2_1.StoryBarV2; } });
var StoryBarV3_1 = require("./StoryBarV3");
Object.defineProperty(exports, "StoryBarV3", { enumerable: true, get: function () { return StoryBarV3_1.StoryBarV3; } });
var StoryRing_1 = require("./StoryRing");
Object.defineProperty(exports, "StoryRing", { enumerable: true, get: function () { return StoryRing_1.StoryRing; } });
var UserCard_1 = require("./UserCard");
Object.defineProperty(exports, "UserCard", { enumerable: true, get: function () { return UserCard_1.UserCard; } });
var UserCardV2_1 = require("./UserCardV2");
Object.defineProperty(exports, "UserCardV2", { enumerable: true, get: function () { return UserCardV2_1.UserCardV2; } });
var UserCardV3_1 = require("./UserCardV3");
Object.defineProperty(exports, "UserCardV3", { enumerable: true, get: function () { return UserCardV3_1.UserCardV3; } });
var FollowButton_1 = require("./FollowButton");
Object.defineProperty(exports, "FollowButton", { enumerable: true, get: function () { return FollowButton_1.FollowButton; } });
var ReactionBar_1 = require("./ReactionBar");
Object.defineProperty(exports, "ReactionBar", { enumerable: true, get: function () { return ReactionBar_1.ReactionBar; } });
var CommentItem_1 = require("./CommentItem");
Object.defineProperty(exports, "CommentItem", { enumerable: true, get: function () { return CommentItem_1.CommentItem; } });
var CommentItemV2_1 = require("./CommentItemV2");
Object.defineProperty(exports, "CommentItemV2", { enumerable: true, get: function () { return CommentItemV2_1.CommentItemV2; } });
var CommentItemV3_1 = require("./CommentItemV3");
Object.defineProperty(exports, "CommentItemV3", { enumerable: true, get: function () { return CommentItemV3_1.CommentItemV3; } });
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
Object.defineProperty(exports, "formatCount", { enumerable: true, get: function () { return EngagementBar_1.formatCount; } });
//# sourceMappingURL=index.js.map