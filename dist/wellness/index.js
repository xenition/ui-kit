"use strict";
/**
 * `@xenition/ui/wellness` — token-bound React DOM components for meditation,
 * mindfulness, and wellbeing screens. The web parity of
 * `@xenition/ui/native/wellness`: the same component and prop names
 * (`onPress` → `onClick`, RN → DOM), styled exclusively via the `--xen-*` theme
 * tokens (no literal colors), composing the shared web `../primitives`
 * (Button/Textarea/Progress/Skeleton/Slider), `../charts` (ProgressRing), and
 * the shared `../commerce` EmptyState. The BreathingGuide's easing is CSS-driven
 * and disabled under `prefers-reduced-motion`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoundscapeRowV4 = exports.ProgressCalendarV4 = exports.WellnessGoalRingV4 = exports.JournalPromptV4 = exports.GratitudeEntryV4 = exports.MoodCheckInV4 = exports.SessionTimerV4 = exports.BreathingGuideV4 = exports.MindfulnessStreakV4 = exports.DailyQuoteCardV4 = exports.SleepStoryCardV4 = exports.MeditationSessionCardV4 = exports.GoalPicker = exports.TeacherCard = exports.ReminderCard = exports.StatsSummary = exports.MoodTrend = exports.CategoryTile = exports.CategoryGrid = exports.AchievementBadge = exports.CourseCard = exports.SessionCompleteCard = exports.FeaturedSessionHero = exports.AudioPlayer = exports.WellnessHeader = exports.ProgressCalendar = exports.DailyQuoteCard = exports.SessionTimer = exports.SoundscapeRow = exports.WellnessGoalRing = exports.JournalPrompt = exports.GratitudeEntry = exports.SleepStoryCardV3 = exports.SleepStoryCardV2 = exports.SleepStoryCard = exports.MindfulnessStreakV3 = exports.MindfulnessStreakV2 = exports.MindfulnessStreak = exports.MoodCheckInV3 = exports.MoodCheckInV2 = exports.MoodCheckIn = exports.BreathingGuide = exports.MeditationSessionCardV3 = exports.MeditationSessionCardV2 = exports.MeditationSessionCard = void 0;
var MeditationSessionCard_1 = require("./MeditationSessionCard");
Object.defineProperty(exports, "MeditationSessionCard", { enumerable: true, get: function () { return MeditationSessionCard_1.MeditationSessionCard; } });
var MeditationSessionCardV2_1 = require("./MeditationSessionCardV2");
Object.defineProperty(exports, "MeditationSessionCardV2", { enumerable: true, get: function () { return MeditationSessionCardV2_1.MeditationSessionCardV2; } });
var MeditationSessionCardV3_1 = require("./MeditationSessionCardV3");
Object.defineProperty(exports, "MeditationSessionCardV3", { enumerable: true, get: function () { return MeditationSessionCardV3_1.MeditationSessionCardV3; } });
var BreathingGuide_1 = require("./BreathingGuide");
Object.defineProperty(exports, "BreathingGuide", { enumerable: true, get: function () { return BreathingGuide_1.BreathingGuide; } });
var MoodCheckIn_1 = require("./MoodCheckIn");
Object.defineProperty(exports, "MoodCheckIn", { enumerable: true, get: function () { return MoodCheckIn_1.MoodCheckIn; } });
var MoodCheckInV2_1 = require("./MoodCheckInV2");
Object.defineProperty(exports, "MoodCheckInV2", { enumerable: true, get: function () { return MoodCheckInV2_1.MoodCheckInV2; } });
var MoodCheckInV3_1 = require("./MoodCheckInV3");
Object.defineProperty(exports, "MoodCheckInV3", { enumerable: true, get: function () { return MoodCheckInV3_1.MoodCheckInV3; } });
var MindfulnessStreak_1 = require("./MindfulnessStreak");
Object.defineProperty(exports, "MindfulnessStreak", { enumerable: true, get: function () { return MindfulnessStreak_1.MindfulnessStreak; } });
var MindfulnessStreakV2_1 = require("./MindfulnessStreakV2");
Object.defineProperty(exports, "MindfulnessStreakV2", { enumerable: true, get: function () { return MindfulnessStreakV2_1.MindfulnessStreakV2; } });
var MindfulnessStreakV3_1 = require("./MindfulnessStreakV3");
Object.defineProperty(exports, "MindfulnessStreakV3", { enumerable: true, get: function () { return MindfulnessStreakV3_1.MindfulnessStreakV3; } });
var SleepStoryCard_1 = require("./SleepStoryCard");
Object.defineProperty(exports, "SleepStoryCard", { enumerable: true, get: function () { return SleepStoryCard_1.SleepStoryCard; } });
var SleepStoryCardV2_1 = require("./SleepStoryCardV2");
Object.defineProperty(exports, "SleepStoryCardV2", { enumerable: true, get: function () { return SleepStoryCardV2_1.SleepStoryCardV2; } });
var SleepStoryCardV3_1 = require("./SleepStoryCardV3");
Object.defineProperty(exports, "SleepStoryCardV3", { enumerable: true, get: function () { return SleepStoryCardV3_1.SleepStoryCardV3; } });
var GratitudeEntry_1 = require("./GratitudeEntry");
Object.defineProperty(exports, "GratitudeEntry", { enumerable: true, get: function () { return GratitudeEntry_1.GratitudeEntry; } });
var JournalPrompt_1 = require("./JournalPrompt");
Object.defineProperty(exports, "JournalPrompt", { enumerable: true, get: function () { return JournalPrompt_1.JournalPrompt; } });
var WellnessGoalRing_1 = require("./WellnessGoalRing");
Object.defineProperty(exports, "WellnessGoalRing", { enumerable: true, get: function () { return WellnessGoalRing_1.WellnessGoalRing; } });
var SoundscapeRow_1 = require("./SoundscapeRow");
Object.defineProperty(exports, "SoundscapeRow", { enumerable: true, get: function () { return SoundscapeRow_1.SoundscapeRow; } });
var SessionTimer_1 = require("./SessionTimer");
Object.defineProperty(exports, "SessionTimer", { enumerable: true, get: function () { return SessionTimer_1.SessionTimer; } });
var DailyQuoteCard_1 = require("./DailyQuoteCard");
Object.defineProperty(exports, "DailyQuoteCard", { enumerable: true, get: function () { return DailyQuoteCard_1.DailyQuoteCard; } });
var ProgressCalendar_1 = require("./ProgressCalendar");
Object.defineProperty(exports, "ProgressCalendar", { enumerable: true, get: function () { return ProgressCalendar_1.ProgressCalendar; } });
// ── New composed blocks — home, audio player, browse, progress, celebration ──
// A gradient + glassmorphic "calm" design line; gradient/glass are used only on
// the hero surfaces, the player and the celebration, while browse tiles get soft
// per-category tints and lists/stats stay clean. All token-driven, no literals.
var WellnessHeader_1 = require("./WellnessHeader");
Object.defineProperty(exports, "WellnessHeader", { enumerable: true, get: function () { return WellnessHeader_1.WellnessHeader; } });
var AudioPlayer_1 = require("./AudioPlayer");
Object.defineProperty(exports, "AudioPlayer", { enumerable: true, get: function () { return AudioPlayer_1.AudioPlayer; } });
var FeaturedSessionHero_1 = require("./FeaturedSessionHero");
Object.defineProperty(exports, "FeaturedSessionHero", { enumerable: true, get: function () { return FeaturedSessionHero_1.FeaturedSessionHero; } });
var SessionCompleteCard_1 = require("./SessionCompleteCard");
Object.defineProperty(exports, "SessionCompleteCard", { enumerable: true, get: function () { return SessionCompleteCard_1.SessionCompleteCard; } });
var CourseCard_1 = require("./CourseCard");
Object.defineProperty(exports, "CourseCard", { enumerable: true, get: function () { return CourseCard_1.CourseCard; } });
var AchievementBadge_1 = require("./AchievementBadge");
Object.defineProperty(exports, "AchievementBadge", { enumerable: true, get: function () { return AchievementBadge_1.AchievementBadge; } });
var CategoryGrid_1 = require("./CategoryGrid");
Object.defineProperty(exports, "CategoryGrid", { enumerable: true, get: function () { return CategoryGrid_1.CategoryGrid; } });
Object.defineProperty(exports, "CategoryTile", { enumerable: true, get: function () { return CategoryGrid_1.CategoryTile; } });
var MoodTrend_1 = require("./MoodTrend");
Object.defineProperty(exports, "MoodTrend", { enumerable: true, get: function () { return MoodTrend_1.MoodTrend; } });
var StatsSummary_1 = require("./StatsSummary");
Object.defineProperty(exports, "StatsSummary", { enumerable: true, get: function () { return StatsSummary_1.StatsSummary; } });
var ReminderCard_1 = require("./ReminderCard");
Object.defineProperty(exports, "ReminderCard", { enumerable: true, get: function () { return ReminderCard_1.ReminderCard; } });
var TeacherCard_1 = require("./TeacherCard");
Object.defineProperty(exports, "TeacherCard", { enumerable: true, get: function () { return TeacherCard_1.TeacherCard; } });
var GoalPicker_1 = require("./GoalPicker");
Object.defineProperty(exports, "GoalPicker", { enumerable: true, get: function () { return GoalPicker_1.GoalPicker; } });
// ── V4 "calm" line for the ORIGINAL components — gradient/glass, matching the new blocks ──
var MeditationSessionCardV4_1 = require("./MeditationSessionCardV4");
Object.defineProperty(exports, "MeditationSessionCardV4", { enumerable: true, get: function () { return MeditationSessionCardV4_1.MeditationSessionCardV4; } });
var SleepStoryCardV4_1 = require("./SleepStoryCardV4");
Object.defineProperty(exports, "SleepStoryCardV4", { enumerable: true, get: function () { return SleepStoryCardV4_1.SleepStoryCardV4; } });
var DailyQuoteCardV4_1 = require("./DailyQuoteCardV4");
Object.defineProperty(exports, "DailyQuoteCardV4", { enumerable: true, get: function () { return DailyQuoteCardV4_1.DailyQuoteCardV4; } });
var MindfulnessStreakV4_1 = require("./MindfulnessStreakV4");
Object.defineProperty(exports, "MindfulnessStreakV4", { enumerable: true, get: function () { return MindfulnessStreakV4_1.MindfulnessStreakV4; } });
var BreathingGuideV4_1 = require("./BreathingGuideV4");
Object.defineProperty(exports, "BreathingGuideV4", { enumerable: true, get: function () { return BreathingGuideV4_1.BreathingGuideV4; } });
var SessionTimerV4_1 = require("./SessionTimerV4");
Object.defineProperty(exports, "SessionTimerV4", { enumerable: true, get: function () { return SessionTimerV4_1.SessionTimerV4; } });
var MoodCheckInV4_1 = require("./MoodCheckInV4");
Object.defineProperty(exports, "MoodCheckInV4", { enumerable: true, get: function () { return MoodCheckInV4_1.MoodCheckInV4; } });
var GratitudeEntryV4_1 = require("./GratitudeEntryV4");
Object.defineProperty(exports, "GratitudeEntryV4", { enumerable: true, get: function () { return GratitudeEntryV4_1.GratitudeEntryV4; } });
var JournalPromptV4_1 = require("./JournalPromptV4");
Object.defineProperty(exports, "JournalPromptV4", { enumerable: true, get: function () { return JournalPromptV4_1.JournalPromptV4; } });
var WellnessGoalRingV4_1 = require("./WellnessGoalRingV4");
Object.defineProperty(exports, "WellnessGoalRingV4", { enumerable: true, get: function () { return WellnessGoalRingV4_1.WellnessGoalRingV4; } });
var ProgressCalendarV4_1 = require("./ProgressCalendarV4");
Object.defineProperty(exports, "ProgressCalendarV4", { enumerable: true, get: function () { return ProgressCalendarV4_1.ProgressCalendarV4; } });
var SoundscapeRowV4_1 = require("./SoundscapeRowV4");
Object.defineProperty(exports, "SoundscapeRowV4", { enumerable: true, get: function () { return SoundscapeRowV4_1.SoundscapeRowV4; } });
//# sourceMappingURL=index.js.map