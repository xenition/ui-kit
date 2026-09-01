"use strict";
/**
 * `@xenition/ui/native/dating` — composed, mobile-first dating / discovery
 * blocks for React Native. Swipe decks, profile cards, match celebrations,
 * compatibility meters, and the surrounding chrome (distance badges, prompts,
 * icebreakers, boost upsells). Each block is assembled from the native
 * primitives (`Card`, `Button`, `Avatar`, `Badge`, `Progress`, `Icon`) and reads
 * its colors/spacing/type from the compiled theme via `useXenitionTheme()` — no
 * literal colors, no DOM, no explicit content. Every component ships
 * `variant`/state props, empty/loading states, and a11y roles/labels (state is
 * never conveyed by color alone) so a builder can compose any tasteful dating
 * experience.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhoLikedYouRowV4 = exports.SwipeDeckV4 = exports.SwipeCardV4 = exports.ProfilePromptV4 = exports.ProfileCardV4 = exports.PhotoCarouselV4 = exports.MatchCelebrationV4 = exports.LikePassButtonsV4 = exports.IcebreakerChipV4 = exports.DistanceBadgeV4 = exports.CompatibilityMeterV4 = exports.BoostBannerV4 = exports.WhoLikedYouRow = exports.BoostBanner = exports.PhotoCarousel = exports.DistanceBadge = exports.ProfilePrompt = exports.IcebreakerChip = exports.CompatibilityMeterV3 = exports.CompatibilityMeterV2 = exports.CompatibilityMeter = exports.MatchCelebrationV3 = exports.MatchCelebrationV2 = exports.MatchCelebration = exports.LikePassButtons = exports.SwipeDeck = exports.SwipeCardV3 = exports.SwipeCardV2 = exports.SwipeCard = exports.ProfileCardV3 = exports.ProfileCardV2 = exports.ProfileCard = void 0;
var ProfileCard_1 = require("./ProfileCard");
Object.defineProperty(exports, "ProfileCard", { enumerable: true, get: function () { return ProfileCard_1.ProfileCard; } });
// Alternate designs (drop-in; same props as `ProfileCard`).
var ProfileCardV2_1 = require("./ProfileCardV2");
Object.defineProperty(exports, "ProfileCardV2", { enumerable: true, get: function () { return ProfileCardV2_1.ProfileCardV2; } });
var ProfileCardV3_1 = require("./ProfileCardV3");
Object.defineProperty(exports, "ProfileCardV3", { enumerable: true, get: function () { return ProfileCardV3_1.ProfileCardV3; } });
var SwipeCard_1 = require("./SwipeCard");
Object.defineProperty(exports, "SwipeCard", { enumerable: true, get: function () { return SwipeCard_1.SwipeCard; } });
// Alternate designs (drop-in; same props as `SwipeCard`).
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
// Alternate designs (drop-in; same props as `MatchCelebration`).
var MatchCelebrationV2_1 = require("./MatchCelebrationV2");
Object.defineProperty(exports, "MatchCelebrationV2", { enumerable: true, get: function () { return MatchCelebrationV2_1.MatchCelebrationV2; } });
var MatchCelebrationV3_1 = require("./MatchCelebrationV3");
Object.defineProperty(exports, "MatchCelebrationV3", { enumerable: true, get: function () { return MatchCelebrationV3_1.MatchCelebrationV3; } });
var CompatibilityMeter_1 = require("./CompatibilityMeter");
Object.defineProperty(exports, "CompatibilityMeter", { enumerable: true, get: function () { return CompatibilityMeter_1.CompatibilityMeter; } });
// Alternate designs (drop-in; same props as `CompatibilityMeter`).
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
// The V4 line (drop-in; each takes its base's props plus optional additions).
var BoostBannerV4_1 = require("./BoostBannerV4");
Object.defineProperty(exports, "BoostBannerV4", { enumerable: true, get: function () { return BoostBannerV4_1.BoostBannerV4; } });
var CompatibilityMeterV4_1 = require("./CompatibilityMeterV4");
Object.defineProperty(exports, "CompatibilityMeterV4", { enumerable: true, get: function () { return CompatibilityMeterV4_1.CompatibilityMeterV4; } });
var DistanceBadgeV4_1 = require("./DistanceBadgeV4");
Object.defineProperty(exports, "DistanceBadgeV4", { enumerable: true, get: function () { return DistanceBadgeV4_1.DistanceBadgeV4; } });
var IcebreakerChipV4_1 = require("./IcebreakerChipV4");
Object.defineProperty(exports, "IcebreakerChipV4", { enumerable: true, get: function () { return IcebreakerChipV4_1.IcebreakerChipV4; } });
var LikePassButtonsV4_1 = require("./LikePassButtonsV4");
Object.defineProperty(exports, "LikePassButtonsV4", { enumerable: true, get: function () { return LikePassButtonsV4_1.LikePassButtonsV4; } });
var MatchCelebrationV4_1 = require("./MatchCelebrationV4");
Object.defineProperty(exports, "MatchCelebrationV4", { enumerable: true, get: function () { return MatchCelebrationV4_1.MatchCelebrationV4; } });
var PhotoCarouselV4_1 = require("./PhotoCarouselV4");
Object.defineProperty(exports, "PhotoCarouselV4", { enumerable: true, get: function () { return PhotoCarouselV4_1.PhotoCarouselV4; } });
var ProfileCardV4_1 = require("./ProfileCardV4");
Object.defineProperty(exports, "ProfileCardV4", { enumerable: true, get: function () { return ProfileCardV4_1.ProfileCardV4; } });
var ProfilePromptV4_1 = require("./ProfilePromptV4");
Object.defineProperty(exports, "ProfilePromptV4", { enumerable: true, get: function () { return ProfilePromptV4_1.ProfilePromptV4; } });
var SwipeCardV4_1 = require("./SwipeCardV4");
Object.defineProperty(exports, "SwipeCardV4", { enumerable: true, get: function () { return SwipeCardV4_1.SwipeCardV4; } });
var SwipeDeckV4_1 = require("./SwipeDeckV4");
Object.defineProperty(exports, "SwipeDeckV4", { enumerable: true, get: function () { return SwipeDeckV4_1.SwipeDeckV4; } });
var WhoLikedYouRowV4_1 = require("./WhoLikedYouRowV4");
Object.defineProperty(exports, "WhoLikedYouRowV4", { enumerable: true, get: function () { return WhoLikedYouRowV4_1.WhoLikedYouRowV4; } });
//# sourceMappingURL=index.js.map