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
