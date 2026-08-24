"use strict";
/**
 * `@xenition/ui/native/learning` — composed React Native blocks for e-learning,
 * course, and gamification screens: course cards, lesson and video-lesson rows,
 * quiz questions/options, progress trackers, flashcards, certificates, module
 * outlines, enroll CTAs, streak badges, leaderboard rows, and achievement
 * badges. Every block is styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — colors resolve from `SemanticColors` keys, never
 * literal hex — with a11y roles/labels and empty/loading states. Quiz options
 * are `radio`s whose correct/incorrect state is surfaced with glyphs + spoken
 * text, never color alone. Mobile-first, native-only.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRowV3 = exports.LeaderboardRowV2 = exports.QuizQuestionV3 = exports.QuizQuestionV2 = exports.LessonRowV3 = exports.LessonRowV2 = exports.CourseCardV3 = exports.CourseCardV2 = exports.AchievementBadge = exports.LeaderboardRow = exports.VideoLessonRow = exports.StreakBadge = exports.EnrollButton = exports.ModuleAccordion = exports.CertificateCard = exports.FlashCard = exports.ProgressTracker = exports.QuizOption = exports.QuizQuestion = exports.LessonRow = exports.CourseCard = void 0;
var CourseCard_1 = require("./CourseCard");
Object.defineProperty(exports, "CourseCard", { enumerable: true, get: function () { return CourseCard_1.CourseCard; } });
var LessonRow_1 = require("./LessonRow");
Object.defineProperty(exports, "LessonRow", { enumerable: true, get: function () { return LessonRow_1.LessonRow; } });
var QuizQuestion_1 = require("./QuizQuestion");
Object.defineProperty(exports, "QuizQuestion", { enumerable: true, get: function () { return QuizQuestion_1.QuizQuestion; } });
var QuizOption_1 = require("./QuizOption");
Object.defineProperty(exports, "QuizOption", { enumerable: true, get: function () { return QuizOption_1.QuizOption; } });
var ProgressTracker_1 = require("./ProgressTracker");
Object.defineProperty(exports, "ProgressTracker", { enumerable: true, get: function () { return ProgressTracker_1.ProgressTracker; } });
var FlashCard_1 = require("./FlashCard");
Object.defineProperty(exports, "FlashCard", { enumerable: true, get: function () { return FlashCard_1.FlashCard; } });
var CertificateCard_1 = require("./CertificateCard");
Object.defineProperty(exports, "CertificateCard", { enumerable: true, get: function () { return CertificateCard_1.CertificateCard; } });
var ModuleAccordion_1 = require("./ModuleAccordion");
Object.defineProperty(exports, "ModuleAccordion", { enumerable: true, get: function () { return ModuleAccordion_1.ModuleAccordion; } });
var EnrollButton_1 = require("./EnrollButton");
Object.defineProperty(exports, "EnrollButton", { enumerable: true, get: function () { return EnrollButton_1.EnrollButton; } });
var StreakBadge_1 = require("./StreakBadge");
Object.defineProperty(exports, "StreakBadge", { enumerable: true, get: function () { return StreakBadge_1.StreakBadge; } });
var VideoLessonRow_1 = require("./VideoLessonRow");
Object.defineProperty(exports, "VideoLessonRow", { enumerable: true, get: function () { return VideoLessonRow_1.VideoLessonRow; } });
var LeaderboardRow_1 = require("./LeaderboardRow");
Object.defineProperty(exports, "LeaderboardRow", { enumerable: true, get: function () { return LeaderboardRow_1.LeaderboardRow; } });
var AchievementBadge_1 = require("./AchievementBadge");
Object.defineProperty(exports, "AchievementBadge", { enumerable: true, get: function () { return AchievementBadge_1.AchievementBadge; } });
// ---------------------------------------------------------------------------
// Alternate designs (v2 / v3). Each is a drop-in for its base component: it
// accepts the SAME props (`<Name>V2Props = <Name>Props`) but renders a visually
// distinct layout, so two learning apps don't produce the same screen. Native,
// token-pure, a11y-preserving.
// ---------------------------------------------------------------------------
var CourseCardV2_1 = require("./CourseCardV2");
Object.defineProperty(exports, "CourseCardV2", { enumerable: true, get: function () { return CourseCardV2_1.CourseCardV2; } });
var CourseCardV3_1 = require("./CourseCardV3");
Object.defineProperty(exports, "CourseCardV3", { enumerable: true, get: function () { return CourseCardV3_1.CourseCardV3; } });
var LessonRowV2_1 = require("./LessonRowV2");
Object.defineProperty(exports, "LessonRowV2", { enumerable: true, get: function () { return LessonRowV2_1.LessonRowV2; } });
var LessonRowV3_1 = require("./LessonRowV3");
Object.defineProperty(exports, "LessonRowV3", { enumerable: true, get: function () { return LessonRowV3_1.LessonRowV3; } });
var QuizQuestionV2_1 = require("./QuizQuestionV2");
Object.defineProperty(exports, "QuizQuestionV2", { enumerable: true, get: function () { return QuizQuestionV2_1.QuizQuestionV2; } });
var QuizQuestionV3_1 = require("./QuizQuestionV3");
Object.defineProperty(exports, "QuizQuestionV3", { enumerable: true, get: function () { return QuizQuestionV3_1.QuizQuestionV3; } });
var LeaderboardRowV2_1 = require("./LeaderboardRowV2");
Object.defineProperty(exports, "LeaderboardRowV2", { enumerable: true, get: function () { return LeaderboardRowV2_1.LeaderboardRowV2; } });
var LeaderboardRowV3_1 = require("./LeaderboardRowV3");
Object.defineProperty(exports, "LeaderboardRowV3", { enumerable: true, get: function () { return LeaderboardRowV3_1.LeaderboardRowV3; } });
//# sourceMappingURL=index.js.map