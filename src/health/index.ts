/**
 * `@xenition/ui/health` — composed React DOM blocks for fitness, health, and
 * wellness screens: workout and meal cards, habit / exercise rows, streak
 * counters, activity and metric rings, water / sleep / mood trackers, and vital
 * / body-composition stat tiles. Web parity of `@xenition/ui/native/health`:
 * every block mirrors its native prop contract (with `onPress` → `onClick` /
 * `onPress` kept where native used it) and is styled exclusively from the
 * `--xen-*` theme tokens via Tailwind classes — no literal colors — with each
 * ring/chart carrying an `aria-label`.
 */

export { WorkoutCard } from './WorkoutCard';
export type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

export { HabitRow } from './HabitRow';
export type { HabitRowProps } from './HabitRow';

export { StreakCounter } from './StreakCounter';
export type { StreakCounterProps, StreakCounterTone } from './StreakCounter';

export { MetricRing } from './MetricRing';
export type { MetricRingProps, MetricRingColor } from './MetricRing';

export { MealCard } from './MealCard';
export type { MealCardProps, MealVariant, MealMacros } from './MealCard';

export { WaterTracker } from './WaterTracker';
export type { WaterTrackerProps } from './WaterTracker';

export { SleepBar } from './SleepBar';
export type { SleepBarProps, SleepQuality } from './SleepBar';

export { ActivityRings } from './ActivityRings';
export type { ActivityRingsProps, ActivityRing, ActivityRingColor } from './ActivityRings';

export { GoalCard } from './GoalCard';
export type { GoalCardProps, GoalCardColor } from './GoalCard';

export { VitalStat } from './VitalStat';
export type { VitalStatProps, VitalStatVariant } from './VitalStat';

export { ExerciseRow } from './ExerciseRow';
export type { ExerciseRowProps } from './ExerciseRow';

export { MoodPicker } from './MoodPicker';
export type { MoodPickerProps, Mood } from './MoodPicker';

export { BodyMetricCard } from './BodyMetricCard';
export type { BodyMetricCardProps, BodyMetricVariant } from './BodyMetricCard';
