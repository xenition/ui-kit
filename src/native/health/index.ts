/**
 * `@xenition/ui/native/health` — composed React Native blocks for fitness,
 * health, and wellness screens: workout and meal cards, habit / exercise rows,
 * streak counters, activity and metric rings, water / sleep / mood trackers,
 * and vital / body-composition stat tiles. Every block is styled exclusively
 * from the compiled theme tokens via `useXenitionTheme()` — colors resolve from
 * `SemanticColors` keys, never literal hex — and each ring/chart carries an
 * `accessibilityLabel`. Mobile-first, native-only.
 */

export { WorkoutCard } from './WorkoutCard';
export type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

// Alternate designs (same props, drop-in): hero card + compact row.
export { WorkoutCardV2 } from './WorkoutCardV2';
export type { WorkoutCardV2Props } from './WorkoutCardV2';
export { WorkoutCardV3 } from './WorkoutCardV3';
export type { WorkoutCardV3Props } from './WorkoutCardV3';

export { HabitRow } from './HabitRow';
export type { HabitRowProps } from './HabitRow';

// Alternate designs (same props, drop-in): circular tile + minimal line.
export { HabitRowV2 } from './HabitRowV2';
export type { HabitRowV2Props } from './HabitRowV2';
export { HabitRowV3 } from './HabitRowV3';
export type { HabitRowV3Props } from './HabitRowV3';

export { StreakCounter } from './StreakCounter';
export type { StreakCounterProps, StreakCounterTone } from './StreakCounter';

export { MetricRing } from './MetricRing';
export type { MetricRingProps, MetricRingColor } from './MetricRing';

export { MealCard } from './MealCard';
export type { MealCardProps, MealVariant, MealMacros } from './MealCard';

// Alternate designs (same props, drop-in): image-hero + dense macro-bar line.
export { MealCardV2 } from './MealCardV2';
export type { MealCardV2Props } from './MealCardV2';
export { MealCardV3 } from './MealCardV3';
export type { MealCardV3Props } from './MealCardV3';

export { WaterTracker } from './WaterTracker';
export type { WaterTrackerProps } from './WaterTracker';

export { SleepBar } from './SleepBar';
export type { SleepBarProps, SleepQuality } from './SleepBar';

export { ActivityRings } from './ActivityRings';
export type { ActivityRingsProps, ActivityRing, ActivityRingColor } from './ActivityRings';

export { GoalCard } from './GoalCard';
export type { GoalCardProps, GoalCardColor } from './GoalCard';

// Alternate designs (same props, drop-in): ProgressRing hero + thin value-first line.
export { GoalCardV2 } from './GoalCardV2';
export type { GoalCardV2Props } from './GoalCardV2';
export { GoalCardV3 } from './GoalCardV3';
export type { GoalCardV3Props } from './GoalCardV3';

export { VitalStat } from './VitalStat';
export type { VitalStatProps, VitalStatVariant } from './VitalStat';

export { ExerciseRow } from './ExerciseRow';
export type { ExerciseRowProps } from './ExerciseRow';

export { MoodPicker } from './MoodPicker';
export type { MoodPickerProps, Mood } from './MoodPicker';

export { BodyMetricCard } from './BodyMetricCard';
export type { BodyMetricCardProps, BodyMetricVariant } from './BodyMetricCard';
