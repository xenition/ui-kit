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
export { WorkoutCardV2 } from './WorkoutCardV2';
export type { WorkoutCardV2Props } from './WorkoutCardV2';
export { WorkoutCardV3 } from './WorkoutCardV3';
export type { WorkoutCardV3Props } from './WorkoutCardV3';
export { HabitRow } from './HabitRow';
export type { HabitRowProps } from './HabitRow';
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
export { ActivityRingsV4, type ActivityRingsV4Props } from './ActivityRingsV4';
export { BodyMetricCardV4, type BodyMetricCardV4Props } from './BodyMetricCardV4';
export { ExerciseRowV4, type ExerciseRowV4Props } from './ExerciseRowV4';
export { GoalCardV4, type GoalCardV4Props } from './GoalCardV4';
export { HabitRowV4, type HabitRowV4Props } from './HabitRowV4';
export { HealthRangeBarV4, type HealthRangeBarV4Props } from './HealthRangeBarV4';
export { MealCardV4, type MealCardV4Props, type Macro } from './MealCardV4';
export { MetricRingV4, type MetricRingV4Props } from './MetricRingV4';
export { MoodPickerV4, type MoodPickerV4Props } from './MoodPickerV4';
export { SleepBarV4, type SleepBarV4Props } from './SleepBarV4';
export { SleepStagesV4, type SleepStagesV4Props, type SleepStage, type SleepStageSegment, } from './SleepStagesV4';
export { StreakCounterV4, type StreakCounterV4Props } from './StreakCounterV4';
export { VitalStatV4, type VitalStatV4Props } from './VitalStatV4';
export { WaterTrackerV4, type WaterTrackerV4Props } from './WaterTrackerV4';
export { WorkoutCardV4, type WorkoutCardV4Props } from './WorkoutCardV4';
/** The health V4 line's arithmetic, shared with the native twin. */
export { goalParts, rangeVerdict, pluralizeUnit } from './goal-v4';
export type { GoalParts, HealthRange, RangeVerdict } from './goal-v4';
/** The surface presets the 15 V4 components take, matching the native twin. */
export type { Appearance } from './internal/tone-v4';
//# sourceMappingURL=index.d.ts.map