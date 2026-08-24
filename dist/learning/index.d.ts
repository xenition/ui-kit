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
//# sourceMappingURL=index.d.ts.map