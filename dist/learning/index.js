"use strict";
/**
 * `@xenition/ui/learning` — composed React DOM blocks for e-learning, course,
 * and gamification screens: course cards, lesson and video-lesson rows, quiz
 * questions/options, progress trackers, flashcards, certificates, module
 * outlines, enroll CTAs, streak badges, leaderboard rows, and achievement
 * badges. This is the web parity of `@xenition/ui/native/learning`. Every block
 * is styled exclusively from the `--xen-*` theme tokens (no literal colors — CI
 * lint rule), with a11y roles/labels and empty/loading states. Quiz options are
 * `radio`s whose correct/incorrect state is surfaced with glyphs + spoken text,
 * never color alone.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementBadge = exports.LeaderboardRow = exports.VideoLessonRow = exports.StreakBadge = exports.EnrollButton = exports.ModuleAccordion = exports.CertificateCard = exports.FlashCard = exports.ProgressTracker = exports.QuizOption = exports.QuizQuestion = exports.LessonRow = exports.CourseCard = void 0;
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
//# sourceMappingURL=index.js.map