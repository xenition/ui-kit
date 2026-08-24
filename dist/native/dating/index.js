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
exports.WhoLikedYouRow = exports.BoostBanner = exports.PhotoCarousel = exports.DistanceBadge = exports.ProfilePrompt = exports.IcebreakerChip = exports.CompatibilityMeter = exports.MatchCelebration = exports.LikePassButtons = exports.SwipeDeck = exports.SwipeCard = exports.ProfileCard = void 0;
var ProfileCard_1 = require("./ProfileCard");
Object.defineProperty(exports, "ProfileCard", { enumerable: true, get: function () { return ProfileCard_1.ProfileCard; } });
var SwipeCard_1 = require("./SwipeCard");
Object.defineProperty(exports, "SwipeCard", { enumerable: true, get: function () { return SwipeCard_1.SwipeCard; } });
var SwipeDeck_1 = require("./SwipeDeck");
Object.defineProperty(exports, "SwipeDeck", { enumerable: true, get: function () { return SwipeDeck_1.SwipeDeck; } });
var LikePassButtons_1 = require("./LikePassButtons");
Object.defineProperty(exports, "LikePassButtons", { enumerable: true, get: function () { return LikePassButtons_1.LikePassButtons; } });
var MatchCelebration_1 = require("./MatchCelebration");
Object.defineProperty(exports, "MatchCelebration", { enumerable: true, get: function () { return MatchCelebration_1.MatchCelebration; } });
var CompatibilityMeter_1 = require("./CompatibilityMeter");
Object.defineProperty(exports, "CompatibilityMeter", { enumerable: true, get: function () { return CompatibilityMeter_1.CompatibilityMeter; } });
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