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
exports.SuggestedUsers = exports.TrendingCard = exports.NotificationRow = exports.PostComposer = exports.StoryViewer = exports.ProfileHeader = exports.FeedListV4 = exports.StoryRingV4 = exports.ShareSheetV4 = exports.ProfileStatsV4 = exports.PollV4 = exports.MentionTextV4 = exports.HashtagChipV4 = exports.FollowButtonV4 = exports.ReactionBarV4 = exports.EngagementBarV4 = exports.UserCardV4 = exports.StoryBarV4 = exports.CommentItemV4 = exports.PostCardV4 = exports.formatCount = exports.EngagementBar = exports.ProfileStats = exports.parseMentions = exports.MentionText = exports.HashtagChip = exports.Poll = exports.ShareSheet = exports.CommentItemV3 = exports.CommentItemV2 = exports.CommentItem = exports.ReactionBar = exports.FollowButton = exports.UserCardV3 = exports.UserCardV2 = exports.UserCard = exports.StoryRing = exports.StoryBarV3 = exports.StoryBarV2 = exports.StoryBar = exports.FeedList = exports.PostCardV3 = exports.PostCardV2 = exports.PostCard = void 0;
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
/*
 * ── V4 "feed" (clean social) design line ──
 * A drop-in V4 variant for each of the 14 originals: clean airy elevated cards,
 * larger rounded avatars, a primary verified tick, soft-primary action states,
 * gradient story rings, and a brand gradient reserved for the identity moments
 * (profile header, story viewer). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var PostCardV4_1 = require("./PostCardV4");
Object.defineProperty(exports, "PostCardV4", { enumerable: true, get: function () { return PostCardV4_1.PostCardV4; } });
var CommentItemV4_1 = require("./CommentItemV4");
Object.defineProperty(exports, "CommentItemV4", { enumerable: true, get: function () { return CommentItemV4_1.CommentItemV4; } });
var StoryBarV4_1 = require("./StoryBarV4");
Object.defineProperty(exports, "StoryBarV4", { enumerable: true, get: function () { return StoryBarV4_1.StoryBarV4; } });
var UserCardV4_1 = require("./UserCardV4");
Object.defineProperty(exports, "UserCardV4", { enumerable: true, get: function () { return UserCardV4_1.UserCardV4; } });
var EngagementBarV4_1 = require("./EngagementBarV4");
Object.defineProperty(exports, "EngagementBarV4", { enumerable: true, get: function () { return EngagementBarV4_1.EngagementBarV4; } });
var ReactionBarV4_1 = require("./ReactionBarV4");
Object.defineProperty(exports, "ReactionBarV4", { enumerable: true, get: function () { return ReactionBarV4_1.ReactionBarV4; } });
var FollowButtonV4_1 = require("./FollowButtonV4");
Object.defineProperty(exports, "FollowButtonV4", { enumerable: true, get: function () { return FollowButtonV4_1.FollowButtonV4; } });
var HashtagChipV4_1 = require("./HashtagChipV4");
Object.defineProperty(exports, "HashtagChipV4", { enumerable: true, get: function () { return HashtagChipV4_1.HashtagChipV4; } });
var MentionTextV4_1 = require("./MentionTextV4");
Object.defineProperty(exports, "MentionTextV4", { enumerable: true, get: function () { return MentionTextV4_1.MentionTextV4; } });
var PollV4_1 = require("./PollV4");
Object.defineProperty(exports, "PollV4", { enumerable: true, get: function () { return PollV4_1.PollV4; } });
var ProfileStatsV4_1 = require("./ProfileStatsV4");
Object.defineProperty(exports, "ProfileStatsV4", { enumerable: true, get: function () { return ProfileStatsV4_1.ProfileStatsV4; } });
var ShareSheetV4_1 = require("./ShareSheetV4");
Object.defineProperty(exports, "ShareSheetV4", { enumerable: true, get: function () { return ShareSheetV4_1.ShareSheetV4; } });
var StoryRingV4_1 = require("./StoryRingV4");
Object.defineProperty(exports, "StoryRingV4", { enumerable: true, get: function () { return StoryRingV4_1.StoryRingV4; } });
var FeedListV4_1 = require("./FeedListV4");
Object.defineProperty(exports, "FeedListV4", { enumerable: true, get: function () { return FeedListV4_1.FeedListV4; } });
/* ── New components (V4 feed line) ── */
var ProfileHeader_1 = require("./ProfileHeader");
Object.defineProperty(exports, "ProfileHeader", { enumerable: true, get: function () { return ProfileHeader_1.ProfileHeader; } });
var StoryViewer_1 = require("./StoryViewer");
Object.defineProperty(exports, "StoryViewer", { enumerable: true, get: function () { return StoryViewer_1.StoryViewer; } });
var PostComposer_1 = require("./PostComposer");
Object.defineProperty(exports, "PostComposer", { enumerable: true, get: function () { return PostComposer_1.PostComposer; } });
var NotificationRow_1 = require("./NotificationRow");
Object.defineProperty(exports, "NotificationRow", { enumerable: true, get: function () { return NotificationRow_1.NotificationRow; } });
var TrendingCard_1 = require("./TrendingCard");
Object.defineProperty(exports, "TrendingCard", { enumerable: true, get: function () { return TrendingCard_1.TrendingCard; } });
var SuggestedUsers_1 = require("./SuggestedUsers");
Object.defineProperty(exports, "SuggestedUsers", { enumerable: true, get: function () { return SuggestedUsers_1.SuggestedUsers; } });
//# sourceMappingURL=index.js.map