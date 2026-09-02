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
exports.AchievementBadgeV4 = exports.StreakBadgeV4 = exports.EnrollButtonV4 = exports.ModuleAccordionV4 = exports.FlashCardV4 = exports.QuizOptionV4 = exports.QuizQuestionV4 = exports.ProgressTrackerV4 = exports.CertificateCardV4 = exports.LeaderboardRowV4 = exports.VideoLessonRowV4 = exports.LessonRowV4 = exports.CourseCardV4 = exports.AchievementBadge = exports.LeaderboardRow = exports.VideoLessonRow = exports.StreakBadge = exports.EnrollButton = exports.ModuleAccordion = exports.CertificateCard = exports.FlashCard = exports.ProgressTracker = exports.QuizOption = exports.QuizQuestionV3 = exports.QuizQuestionV2 = exports.QuizQuestion = exports.LessonRowV3 = exports.LessonRowV2 = exports.LessonRow = exports.CourseCardV3 = exports.CourseCardV2 = exports.CourseCard = void 0;
var CourseCard_1 = require("./CourseCard");
Object.defineProperty(exports, "CourseCard", { enumerable: true, get: function () { return CourseCard_1.CourseCard; } });
var CourseCardV2_1 = require("./CourseCardV2");
Object.defineProperty(exports, "CourseCardV2", { enumerable: true, get: function () { return CourseCardV2_1.CourseCardV2; } });
var CourseCardV3_1 = require("./CourseCardV3");
Object.defineProperty(exports, "CourseCardV3", { enumerable: true, get: function () { return CourseCardV3_1.CourseCardV3; } });
var LessonRow_1 = require("./LessonRow");
Object.defineProperty(exports, "LessonRow", { enumerable: true, get: function () { return LessonRow_1.LessonRow; } });
var LessonRowV2_1 = require("./LessonRowV2");
Object.defineProperty(exports, "LessonRowV2", { enumerable: true, get: function () { return LessonRowV2_1.LessonRowV2; } });
var LessonRowV3_1 = require("./LessonRowV3");
Object.defineProperty(exports, "LessonRowV3", { enumerable: true, get: function () { return LessonRowV3_1.LessonRowV3; } });
var QuizQuestion_1 = require("./QuizQuestion");
Object.defineProperty(exports, "QuizQuestion", { enumerable: true, get: function () { return QuizQuestion_1.QuizQuestion; } });
var QuizQuestionV2_1 = require("./QuizQuestionV2");
Object.defineProperty(exports, "QuizQuestionV2", { enumerable: true, get: function () { return QuizQuestionV2_1.QuizQuestionV2; } });
var QuizQuestionV3_1 = require("./QuizQuestionV3");
Object.defineProperty(exports, "QuizQuestionV3", { enumerable: true, get: function () { return QuizQuestionV3_1.QuizQuestionV3; } });
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
/*
 * ── V4 "campus" (bright modern learning-platform) design line ──
 * A drop-in V4 variant for each of the 13 originals: elevated cards, panels and
 * rows with state by glyph + tone (never color alone) and big legible
 * tabular-nums counts / scores / percentages. Four entity card/rows
 * (`CourseCard`, `LessonRow`, `VideoLessonRow`, `LeaderboardRow`) add an optional
 * `variant` (`full` | `compact`); `CertificateCard` / `ProgressTracker` reuse
 * their base `variant`; the rest are pure drop-ins (`XxxV4Props = XxxProps`). The
 * brand gradient is reserved for the campus moment — the `CertificateCard` award
 * hero. Base/V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe,
 * web + native.
 */
var CourseCardV4_1 = require("./CourseCardV4");
Object.defineProperty(exports, "CourseCardV4", { enumerable: true, get: function () { return CourseCardV4_1.CourseCardV4; } });
var LessonRowV4_1 = require("./LessonRowV4");
Object.defineProperty(exports, "LessonRowV4", { enumerable: true, get: function () { return LessonRowV4_1.LessonRowV4; } });
var VideoLessonRowV4_1 = require("./VideoLessonRowV4");
Object.defineProperty(exports, "VideoLessonRowV4", { enumerable: true, get: function () { return VideoLessonRowV4_1.VideoLessonRowV4; } });
var LeaderboardRowV4_1 = require("./LeaderboardRowV4");
Object.defineProperty(exports, "LeaderboardRowV4", { enumerable: true, get: function () { return LeaderboardRowV4_1.LeaderboardRowV4; } });
var CertificateCardV4_1 = require("./CertificateCardV4");
Object.defineProperty(exports, "CertificateCardV4", { enumerable: true, get: function () { return CertificateCardV4_1.CertificateCardV4; } });
var ProgressTrackerV4_1 = require("./ProgressTrackerV4");
Object.defineProperty(exports, "ProgressTrackerV4", { enumerable: true, get: function () { return ProgressTrackerV4_1.ProgressTrackerV4; } });
var QuizQuestionV4_1 = require("./QuizQuestionV4");
Object.defineProperty(exports, "QuizQuestionV4", { enumerable: true, get: function () { return QuizQuestionV4_1.QuizQuestionV4; } });
var QuizOptionV4_1 = require("./QuizOptionV4");
Object.defineProperty(exports, "QuizOptionV4", { enumerable: true, get: function () { return QuizOptionV4_1.QuizOptionV4; } });
var FlashCardV4_1 = require("./FlashCardV4");
Object.defineProperty(exports, "FlashCardV4", { enumerable: true, get: function () { return FlashCardV4_1.FlashCardV4; } });
var ModuleAccordionV4_1 = require("./ModuleAccordionV4");
Object.defineProperty(exports, "ModuleAccordionV4", { enumerable: true, get: function () { return ModuleAccordionV4_1.ModuleAccordionV4; } });
var EnrollButtonV4_1 = require("./EnrollButtonV4");
Object.defineProperty(exports, "EnrollButtonV4", { enumerable: true, get: function () { return EnrollButtonV4_1.EnrollButtonV4; } });
var StreakBadgeV4_1 = require("./StreakBadgeV4");
Object.defineProperty(exports, "StreakBadgeV4", { enumerable: true, get: function () { return StreakBadgeV4_1.StreakBadgeV4; } });
var AchievementBadgeV4_1 = require("./AchievementBadgeV4");
Object.defineProperty(exports, "AchievementBadgeV4", { enumerable: true, get: function () { return AchievementBadgeV4_1.AchievementBadgeV4; } });
//# sourceMappingURL=index.js.map