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

export { CourseCard } from './CourseCard';
export type { CourseCardProps, CourseLevel } from './CourseCard';

export { LessonRow } from './LessonRow';
export type { LessonRowProps, LessonStatus } from './LessonRow';

export { QuizQuestion } from './QuizQuestion';
export type { QuizQuestionProps, QuizChoice } from './QuizQuestion';

export { QuizOption } from './QuizOption';
export type { QuizOptionProps, QuizOptionState } from './QuizOption';

export { ProgressTracker } from './ProgressTracker';
export type { ProgressTrackerProps, ProgressStep, ProgressTrackerVariant } from './ProgressTracker';

export { FlashCard } from './FlashCard';
export type { FlashCardProps } from './FlashCard';

export { CertificateCard } from './CertificateCard';
export type { CertificateCardProps, CertificateVariant } from './CertificateCard';

export { ModuleAccordion } from './ModuleAccordion';
export type { ModuleAccordionProps, CourseModule, ModuleLesson } from './ModuleAccordion';

export { EnrollButton } from './EnrollButton';
export type { EnrollButtonProps, EnrollState } from './EnrollButton';

export { StreakBadge } from './StreakBadge';
export type { StreakBadgeProps, StreakTone, StreakBadgeSize } from './StreakBadge';

export { VideoLessonRow } from './VideoLessonRow';
export type { VideoLessonRowProps } from './VideoLessonRow';

export { LeaderboardRow } from './LeaderboardRow';
export type { LeaderboardRowProps } from './LeaderboardRow';

export { AchievementBadge } from './AchievementBadge';
export type { AchievementBadgeProps, AchievementTier, AchievementBadgeSize } from './AchievementBadge';

// ---------------------------------------------------------------------------
// Alternate designs (v2 / v3). Each is a drop-in for its base component: it
// accepts the SAME props (`<Name>V2Props = <Name>Props`) but renders a visually
// distinct layout, so two learning apps don't produce the same screen. Native,
// token-pure, a11y-preserving.
// ---------------------------------------------------------------------------

export { CourseCardV2 } from './CourseCardV2';
export type { CourseCardV2Props } from './CourseCardV2';
export { CourseCardV3 } from './CourseCardV3';
export type { CourseCardV3Props } from './CourseCardV3';

export { LessonRowV2 } from './LessonRowV2';
export type { LessonRowV2Props } from './LessonRowV2';
export { LessonRowV3 } from './LessonRowV3';
export type { LessonRowV3Props } from './LessonRowV3';

export { QuizQuestionV2 } from './QuizQuestionV2';
export type { QuizQuestionV2Props } from './QuizQuestionV2';
export { QuizQuestionV3 } from './QuizQuestionV3';
export type { QuizQuestionV3Props } from './QuizQuestionV3';

export { LeaderboardRowV2 } from './LeaderboardRowV2';
export type { LeaderboardRowV2Props } from './LeaderboardRowV2';
export { LeaderboardRowV3 } from './LeaderboardRowV3';
export type { LeaderboardRowV3Props } from './LeaderboardRowV3';

// ---------------------------------------------------------------------------
// V4 "campus" (bright modern learning-platform) design line — a drop-in V4 for
// each of the 13 originals: elevated cards, panels and rows with state by glyph
// + tone (never color alone) and big legible tabular-nums counts / scores /
// percentages. Four entity card/rows (`CourseCard`, `LessonRow`,
// `VideoLessonRow`, `LeaderboardRow`) add an optional `variant` (`full` |
// `compact`); `CertificateCard` / `ProgressTracker` reuse their base `variant`;
// the rest are pure drop-ins. The brand gradient is reserved for the campus
// moment — the `CertificateCard` award hero. Base/V2/V3 untouched; V4 is
// additive. Token-driven, dark-mode safe.
// ---------------------------------------------------------------------------

export { CourseCardV4, type CourseCardV4Props, type CourseCardLayout } from './CourseCardV4';
export { LessonRowV4, type LessonRowV4Props, type LessonRowLayout } from './LessonRowV4';
export { VideoLessonRowV4, type VideoLessonRowV4Props, type VideoLessonRowLayout } from './VideoLessonRowV4';
export { LeaderboardRowV4, type LeaderboardRowV4Props, type LeaderboardRowLayout } from './LeaderboardRowV4';
export { CertificateCardV4, type CertificateCardV4Props } from './CertificateCardV4';
export { ProgressTrackerV4, type ProgressTrackerV4Props } from './ProgressTrackerV4';
export { QuizQuestionV4, type QuizQuestionV4Props } from './QuizQuestionV4';
export { QuizOptionV4, type QuizOptionV4Props } from './QuizOptionV4';
export { FlashCardV4, type FlashCardV4Props } from './FlashCardV4';
export { ModuleAccordionV4, type ModuleAccordionV4Props } from './ModuleAccordionV4';
export { EnrollButtonV4, type EnrollButtonV4Props } from './EnrollButtonV4';
export { StreakBadgeV4, type StreakBadgeV4Props } from './StreakBadgeV4';
export { AchievementBadgeV4, type AchievementBadgeV4Props } from './AchievementBadgeV4';
