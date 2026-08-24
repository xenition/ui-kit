"use strict";
/**
 * `@xenition/ui/dating` — composed dating / discovery blocks for React DOM (web).
 * The web parity of `@xenition/ui/native/dating`: swipe decks, profile cards,
 * match celebrations, compatibility meters, and the surrounding chrome (distance
 * badges, prompts, icebreakers, boost upsells). Each block is assembled from the
 * web primitives (`Card`, `Button`, `Avatar`, `Badge`, `Progress`, `Icon`) plus
 * `EmptyState`, and every color/space comes from the `--xen-*` token classes via
 * the Tailwind preset — no literal colors, no explicit content. Interactive cards
 * are keyboard-operable `role="button"` containers, action cells are real
 * `<button>`s, and state is never conveyed by color alone. Native `onPress`
 * callbacks map to `onClick`; every component ships variant/state props, empty and
 * loading states, and a11y roles/labels.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoLikedYouRow = exports.BoostBanner = exports.PhotoCarousel = exports.DistanceBadge = exports.ProfilePrompt = exports.IcebreakerChip = exports.CompatibilityMeterV3 = exports.CompatibilityMeterV2 = exports.CompatibilityMeter = exports.MatchCelebrationV3 = exports.MatchCelebrationV2 = exports.MatchCelebration = exports.LikePassButtons = exports.SwipeDeck = exports.SwipeCardV3 = exports.SwipeCardV2 = exports.SwipeCard = exports.ProfileCardV3 = exports.ProfileCardV2 = exports.ProfileCard = void 0;
var ProfileCard_1 = require("./ProfileCard");
Object.defineProperty(exports, "ProfileCard", { enumerable: true, get: function () { return ProfileCard_1.ProfileCard; } });
var ProfileCardV2_1 = require("./ProfileCardV2");
Object.defineProperty(exports, "ProfileCardV2", { enumerable: true, get: function () { return ProfileCardV2_1.ProfileCardV2; } });
var ProfileCardV3_1 = require("./ProfileCardV3");
Object.defineProperty(exports, "ProfileCardV3", { enumerable: true, get: function () { return ProfileCardV3_1.ProfileCardV3; } });
var SwipeCard_1 = require("./SwipeCard");
Object.defineProperty(exports, "SwipeCard", { enumerable: true, get: function () { return SwipeCard_1.SwipeCard; } });
var SwipeCardV2_1 = require("./SwipeCardV2");
Object.defineProperty(exports, "SwipeCardV2", { enumerable: true, get: function () { return SwipeCardV2_1.SwipeCardV2; } });
var SwipeCardV3_1 = require("./SwipeCardV3");
Object.defineProperty(exports, "SwipeCardV3", { enumerable: true, get: function () { return SwipeCardV3_1.SwipeCardV3; } });
var SwipeDeck_1 = require("./SwipeDeck");
Object.defineProperty(exports, "SwipeDeck", { enumerable: true, get: function () { return SwipeDeck_1.SwipeDeck; } });
var LikePassButtons_1 = require("./LikePassButtons");
Object.defineProperty(exports, "LikePassButtons", { enumerable: true, get: function () { return LikePassButtons_1.LikePassButtons; } });
var MatchCelebration_1 = require("./MatchCelebration");
Object.defineProperty(exports, "MatchCelebration", { enumerable: true, get: function () { return MatchCelebration_1.MatchCelebration; } });
var MatchCelebrationV2_1 = require("./MatchCelebrationV2");
Object.defineProperty(exports, "MatchCelebrationV2", { enumerable: true, get: function () { return MatchCelebrationV2_1.MatchCelebrationV2; } });
var MatchCelebrationV3_1 = require("./MatchCelebrationV3");
Object.defineProperty(exports, "MatchCelebrationV3", { enumerable: true, get: function () { return MatchCelebrationV3_1.MatchCelebrationV3; } });
var CompatibilityMeter_1 = require("./CompatibilityMeter");
Object.defineProperty(exports, "CompatibilityMeter", { enumerable: true, get: function () { return CompatibilityMeter_1.CompatibilityMeter; } });
var CompatibilityMeterV2_1 = require("./CompatibilityMeterV2");
Object.defineProperty(exports, "CompatibilityMeterV2", { enumerable: true, get: function () { return CompatibilityMeterV2_1.CompatibilityMeterV2; } });
var CompatibilityMeterV3_1 = require("./CompatibilityMeterV3");
Object.defineProperty(exports, "CompatibilityMeterV3", { enumerable: true, get: function () { return CompatibilityMeterV3_1.CompatibilityMeterV3; } });
var IcebreakerChip_1 = require("./IcebreakerChip");
Object.defineProperty(exports, "IcebreakerChip", { enumerable: true, get: function () { return IcebreakerChip_1.IcebreakerChip; } });
var ProfilePrompt_1 = require("./ProfilePrompt");
Object.defineProperty(exports, "ProfilePrompt", { enumerable: true, get: function () { return ProfilePrompt_1.ProfilePrompt; } });
var DistanceBadge_1 = require("./DistanceBadge");
Object.defineProperty(exports, "DistanceBadge", { enumerable: true, get: function () { return DistanceBadge_1.DistanceBadge; } });
var PhotoCarousel_1 = require("./PhotoCarousel");
Object.defineProperty(exports, "PhotoCarousel", { enumerable: true, get: function () { return PhotoCarousel_1.PhotoCarousel; } });
var BoostBanner_1 = require("./BoostBanner");
Object.defineProperty(exports, "BoostBanner", { enumerable: true, get: function () { return BoostBanner_1.BoostBanner; } });
var WhoLikedYouRow_1 = require("./WhoLikedYouRow");
Object.defineProperty(exports, "WhoLikedYouRow", { enumerable: true, get: function () { return WhoLikedYouRow_1.WhoLikedYouRow; } });
//# sourceMappingURL=index.js.map