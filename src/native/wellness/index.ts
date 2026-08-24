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

export { MeditationSessionCard } from './MeditationSessionCard';
export type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

export { BreathingGuide } from './BreathingGuide';
export type {
  BreathingGuideProps,
  BreathingPattern,
  BreathPhase,
  BreathStep,
} from './BreathingGuide';

export { MoodCheckIn } from './MoodCheckIn';
export type { MoodCheckInProps, Mood } from './MoodCheckIn';

export { MindfulnessStreak } from './MindfulnessStreak';
export type { MindfulnessStreakProps, MindfulnessStreakTone } from './MindfulnessStreak';

export { SleepStoryCard } from './SleepStoryCard';
export type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

export { GratitudeEntry } from './GratitudeEntry';
export type { GratitudeEntryProps, GratitudeItem } from './GratitudeEntry';

export { JournalPrompt } from './JournalPrompt';
export type { JournalPromptProps, JournalCategory } from './JournalPrompt';

export { WellnessGoalRing } from './WellnessGoalRing';
export type { WellnessGoalRingProps, WellnessGoalColor } from './WellnessGoalRing';

export { SoundscapeRow } from './SoundscapeRow';
export type { SoundscapeRowProps, Soundscape } from './SoundscapeRow';

export { SessionTimer } from './SessionTimer';
export type { SessionTimerProps, SessionTimerTone } from './SessionTimer';

export { DailyQuoteCard } from './DailyQuoteCard';
export type { DailyQuoteCardProps, DailyQuoteTone } from './DailyQuoteCard';

export { ProgressCalendar } from './ProgressCalendar';
export type {
  ProgressCalendarProps,
  ProgressCalendarDay,
  ProgressCalendarTone,
} from './ProgressCalendar';

// ── Alternate designs (v2 / v3) ────────────────────────────────────────────
// Drop-in redesigns that share each base component's prop contract exactly
// (`<Name>V{2,3}Props = <Name>Props`) — pick one for visual variety.
export { MeditationSessionCardV2 } from './MeditationSessionCardV2';
export type { MeditationSessionCardV2Props } from './MeditationSessionCardV2';
export { MeditationSessionCardV3 } from './MeditationSessionCardV3';
export type { MeditationSessionCardV3Props } from './MeditationSessionCardV3';

export { MoodCheckInV2 } from './MoodCheckInV2';
export type { MoodCheckInV2Props } from './MoodCheckInV2';
export { MoodCheckInV3 } from './MoodCheckInV3';
export type { MoodCheckInV3Props } from './MoodCheckInV3';

export { SleepStoryCardV2 } from './SleepStoryCardV2';
export type { SleepStoryCardV2Props } from './SleepStoryCardV2';
export { SleepStoryCardV3 } from './SleepStoryCardV3';
export type { SleepStoryCardV3Props } from './SleepStoryCardV3';

export { MindfulnessStreakV2 } from './MindfulnessStreakV2';
export type { MindfulnessStreakV2Props } from './MindfulnessStreakV2';
export { MindfulnessStreakV3 } from './MindfulnessStreakV3';
export type { MindfulnessStreakV3Props } from './MindfulnessStreakV3';
