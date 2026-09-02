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

// V4 — the redesigned line. Every `XV4` takes `XProps` plus optional additions
// that default to the base's behaviour, so an app can swap `X` for `XV4` and
// see the fix without a surprise. `ChoreListV4` and `ChildSwitcherV4` are new:
// the module had no list container and no way to choose which child you were
// looking at.
export { AllowanceTrackerV4 } from './AllowanceTrackerV4';
export type { AllowanceTrackerV4Props } from './AllowanceTrackerV4';

export { BehaviorBadgeV4 } from './BehaviorBadgeV4';
export type { BehaviorBadgeV4Props } from './BehaviorBadgeV4';

export { ChildProfileCardV4 } from './ChildProfileCardV4';
export type { ChildProfileCardV4Props } from './ChildProfileCardV4';

export { ChildSwitcherV4 } from './ChildSwitcherV4';
export type { ChildSwitcherV4Props, ChildSwitcherItem } from './ChildSwitcherV4';

export { ChoreCardV4 } from './ChoreCardV4';
export type { ChoreCardV4Props } from './ChoreCardV4';

export { ChoreListV4 } from './ChoreListV4';
export type { ChoreListV4Props, ChoreListItem } from './ChoreListV4';

export { FamilyMemberRowV4 } from './FamilyMemberRowV4';
export type { FamilyMemberRowV4Props } from './FamilyMemberRowV4';

export { GrowthChartV4 } from './GrowthChartV4';
export type { GrowthChartV4Props, GrowthPoint } from './GrowthChartV4';

export { MilestoneCardV4 } from './MilestoneCardV4';
export type { MilestoneCardV4Props, MilestoneStatus } from './MilestoneCardV4';

export { RewardStarV4 } from './RewardStarV4';
export type { RewardStarV4Props } from './RewardStarV4';

export { RoutineRowV4 } from './RoutineRowV4';
export type { RoutineRowV4Props } from './RoutineRowV4';

export { SchoolEventRowV4 } from './SchoolEventRowV4';
export type { SchoolEventRowV4Props } from './SchoolEventRowV4';

export { ScreenTimeBarV4 } from './ScreenTimeBarV4';
export type { ScreenTimeBarV4Props } from './ScreenTimeBarV4';

export { StickerRewardV4 } from './StickerRewardV4';
export type { StickerRewardV4Props } from './StickerRewardV4';

// The module's arithmetic, shared byte-for-byte with the web twin.
export {
  meterParts,
  starParts,
  nextAward,
  needsExplanation,
  type MeterParts,
  type StarParts,
} from '../../kids/family-v4';
