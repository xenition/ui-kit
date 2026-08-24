/**
 * `@xenition/ui/native/kids` — token-bound React Native components for
 * parenting, family, and kids apps. Genuine RN components (View/Text/Pressable)
 * styled exclusively from the compiled theme via `useXenitionTheme()`, composing
 * the shared `../primitives` (Card/Button/Badge/Avatar/Progress) and `../charts`
 * (LineChart). No literal colors; mobile-first.
 */

export { ChildProfileCard } from './ChildProfileCard';
export type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';

export { ChoreCard } from './ChoreCard';
export type { ChoreCardProps, ChoreStatus } from './ChoreCard';

export { AllowanceTracker } from './AllowanceTracker';
export type { AllowanceTrackerProps, AllowanceGoal } from './AllowanceTracker';

export { MilestoneCard } from './MilestoneCard';
export type { MilestoneCardProps, MilestoneCategory } from './MilestoneCard';

export { RewardStar } from './RewardStar';
export type { RewardStarProps, RewardStarSize } from './RewardStar';

export { ScreenTimeBar } from './ScreenTimeBar';
export type { ScreenTimeBarProps } from './ScreenTimeBar';

export { GrowthChart } from './GrowthChart';
export type { GrowthChartProps, GrowthMetric } from './GrowthChart';

export { RoutineRow } from './RoutineRow';
export type { RoutineRowProps, RoutineSlot } from './RoutineRow';

export { BehaviorBadge } from './BehaviorBadge';
export type { BehaviorBadgeProps, BehaviorTone } from './BehaviorBadge';

export { SchoolEventRow } from './SchoolEventRow';
export type { SchoolEventRowProps, SchoolEventType } from './SchoolEventRow';

export { FamilyMemberRow } from './FamilyMemberRow';
export type { FamilyMemberRowProps, FamilyRole } from './FamilyMemberRow';

export { StickerReward } from './StickerReward';
export type { StickerRewardProps, Sticker } from './StickerReward';

// Alternate designs (v2 / v3) — drop-in redesigns that keep each base
// component's exact props (`<Name>V2Props = <Name>Props`).
export { ChildProfileCardV2 } from './ChildProfileCardV2';
export type { ChildProfileCardV2Props } from './ChildProfileCardV2';
export { ChildProfileCardV3 } from './ChildProfileCardV3';
export type { ChildProfileCardV3Props } from './ChildProfileCardV3';

export { ChoreCardV2 } from './ChoreCardV2';
export type { ChoreCardV2Props } from './ChoreCardV2';
export { ChoreCardV3 } from './ChoreCardV3';
export type { ChoreCardV3Props } from './ChoreCardV3';

export { RewardStarV2 } from './RewardStarV2';
export type { RewardStarV2Props } from './RewardStarV2';
export { RewardStarV3 } from './RewardStarV3';
export type { RewardStarV3Props } from './RewardStarV3';

export { AllowanceTrackerV2 } from './AllowanceTrackerV2';
export type { AllowanceTrackerV2Props } from './AllowanceTrackerV2';
export { AllowanceTrackerV3 } from './AllowanceTrackerV3';
export type { AllowanceTrackerV3Props } from './AllowanceTrackerV3';
