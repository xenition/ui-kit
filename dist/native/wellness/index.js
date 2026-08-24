"use strict";
/**
 * `@xenition/ui/native/wellness` — composed React Native blocks for meditation,
 * mindfulness, and wellbeing screens: session and sleep-story cards, an animated
 * breathing coach, mood check-ins, gratitude and journaling entries, streaks,
 * goal rings, soundscape mixers, session timers, daily quotes, and a month
 * progress calendar. Every block is styled exclusively from the compiled theme
 * tokens via `useXenitionTheme()` — colors resolve from `SemanticColors` keys,
 * `tokens.ramps.*`, or a `withAlpha` tint, never a literal hex — and animation
 * (BreathingGuide) is gated on the OS "Reduce Motion" setting. Mobile-first,
 * native-only.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MindfulnessStreakV3 = exports.MindfulnessStreakV2 = exports.SleepStoryCardV3 = exports.SleepStoryCardV2 = exports.MoodCheckInV3 = exports.MoodCheckInV2 = exports.MeditationSessionCardV3 = exports.MeditationSessionCardV2 = exports.ProgressCalendar = exports.DailyQuoteCard = exports.SessionTimer = exports.SoundscapeRow = exports.WellnessGoalRing = exports.JournalPrompt = exports.GratitudeEntry = exports.SleepStoryCard = exports.MindfulnessStreak = exports.MoodCheckIn = exports.BreathingGuide = exports.MeditationSessionCard = void 0;
var MeditationSessionCard_1 = require("./MeditationSessionCard");
Object.defineProperty(exports, "MeditationSessionCard", { enumerable: true, get: function () { return MeditationSessionCard_1.MeditationSessionCard; } });
var BreathingGuide_1 = require("./BreathingGuide");
Object.defineProperty(exports, "BreathingGuide", { enumerable: true, get: function () { return BreathingGuide_1.BreathingGuide; } });
var MoodCheckIn_1 = require("./MoodCheckIn");
Object.defineProperty(exports, "MoodCheckIn", { enumerable: true, get: function () { return MoodCheckIn_1.MoodCheckIn; } });
var MindfulnessStreak_1 = require("./MindfulnessStreak");
Object.defineProperty(exports, "MindfulnessStreak", { enumerable: true, get: function () { return MindfulnessStreak_1.MindfulnessStreak; } });
var SleepStoryCard_1 = require("./SleepStoryCard");
Object.defineProperty(exports, "SleepStoryCard", { enumerable: true, get: function () { return SleepStoryCard_1.SleepStoryCard; } });
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
// ── Alternate designs (v2 / v3) ────────────────────────────────────────────
// Drop-in redesigns that share each base component's prop contract exactly
// (`<Name>V{2,3}Props = <Name>Props`) — pick one for visual variety.
var MeditationSessionCardV2_1 = require("./MeditationSessionCardV2");
Object.defineProperty(exports, "MeditationSessionCardV2", { enumerable: true, get: function () { return MeditationSessionCardV2_1.MeditationSessionCardV2; } });
var MeditationSessionCardV3_1 = require("./MeditationSessionCardV3");
Object.defineProperty(exports, "MeditationSessionCardV3", { enumerable: true, get: function () { return MeditationSessionCardV3_1.MeditationSessionCardV3; } });
var MoodCheckInV2_1 = require("./MoodCheckInV2");
Object.defineProperty(exports, "MoodCheckInV2", { enumerable: true, get: function () { return MoodCheckInV2_1.MoodCheckInV2; } });
var MoodCheckInV3_1 = require("./MoodCheckInV3");
Object.defineProperty(exports, "MoodCheckInV3", { enumerable: true, get: function () { return MoodCheckInV3_1.MoodCheckInV3; } });
var SleepStoryCardV2_1 = require("./SleepStoryCardV2");
Object.defineProperty(exports, "SleepStoryCardV2", { enumerable: true, get: function () { return SleepStoryCardV2_1.SleepStoryCardV2; } });
var SleepStoryCardV3_1 = require("./SleepStoryCardV3");
Object.defineProperty(exports, "SleepStoryCardV3", { enumerable: true, get: function () { return SleepStoryCardV3_1.SleepStoryCardV3; } });
var MindfulnessStreakV2_1 = require("./MindfulnessStreakV2");
Object.defineProperty(exports, "MindfulnessStreakV2", { enumerable: true, get: function () { return MindfulnessStreakV2_1.MindfulnessStreakV2; } });
var MindfulnessStreakV3_1 = require("./MindfulnessStreakV3");
Object.defineProperty(exports, "MindfulnessStreakV3", { enumerable: true, get: function () { return MindfulnessStreakV3_1.MindfulnessStreakV3; } });
//# sourceMappingURL=index.js.map