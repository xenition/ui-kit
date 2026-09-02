/**
 * `@xenition/ui/kids` — token-bound React DOM components for parenting, family,
 * and kids apps. The web parity of `@xenition/ui/native/kids`: same component
 * names and prop contracts (`onPress` → `onClick`, RN → DOM), composing the
 * shared `../primitives` (Card/Button/Badge/Avatar/Progress/Icon), `../charts`
 * (LineChart), and `../commerce` (EmptyState). Every color is a `--xen-*` token
 * utility class — no literal colors.
 */
export { ChildProfileCard } from './ChildProfileCard';
export type { ChildProfileCardProps, ChildMood } from './ChildProfileCard';
export { ChildProfileCardV2 } from './ChildProfileCardV2';
export type { ChildProfileCardV2Props } from './ChildProfileCardV2';
export { ChildProfileCardV3 } from './ChildProfileCardV3';
export type { ChildProfileCardV3Props } from './ChildProfileCardV3';
export { ChoreCard } from './ChoreCard';
export type { ChoreCardProps, ChoreStatus } from './ChoreCard';
export { ChoreCardV2 } from './ChoreCardV2';
export type { ChoreCardV2Props } from './ChoreCardV2';
export { ChoreCardV3 } from './ChoreCardV3';
export type { ChoreCardV3Props } from './ChoreCardV3';
export { AllowanceTracker } from './AllowanceTracker';
export type { AllowanceTrackerProps, AllowanceGoal } from './AllowanceTracker';
export { AllowanceTrackerV2 } from './AllowanceTrackerV2';
export type { AllowanceTrackerV2Props } from './AllowanceTrackerV2';
export { AllowanceTrackerV3 } from './AllowanceTrackerV3';
export type { AllowanceTrackerV3Props } from './AllowanceTrackerV3';
export { MilestoneCard } from './MilestoneCard';
export type { MilestoneCardProps, MilestoneCategory } from './MilestoneCard';
export { RewardStar } from './RewardStar';
export type { RewardStarProps, RewardStarSize } from './RewardStar';
export { RewardStarV2 } from './RewardStarV2';
export type { RewardStarV2Props } from './RewardStarV2';
export { RewardStarV3 } from './RewardStarV3';
export type { RewardStarV3Props } from './RewardStarV3';
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
export { AllowanceTrackerV4, type AllowanceTrackerV4Props } from './AllowanceTrackerV4';
export { BehaviorBadgeV4, type BehaviorBadgeV4Props } from './BehaviorBadgeV4';
export { ChildProfileCardV4, type ChildProfileCardV4Props } from './ChildProfileCardV4';
export { ChildSwitcherV4, type ChildSwitcherV4Props, type ChildSwitcherItem, } from './ChildSwitcherV4';
export { ChoreCardV4, type ChoreCardV4Props } from './ChoreCardV4';
export { ChoreListV4, type ChoreListV4Props, type ChoreListItem } from './ChoreListV4';
export { FamilyMemberRowV4, type FamilyMemberRowV4Props } from './FamilyMemberRowV4';
export { GrowthChartV4, type GrowthChartV4Props, type GrowthPoint } from './GrowthChartV4';
export { MilestoneCardV4, type MilestoneCardV4Props, type MilestoneStatus, } from './MilestoneCardV4';
export { RewardStarV4, type RewardStarV4Props } from './RewardStarV4';
export { RoutineRowV4, type RoutineRowV4Props } from './RoutineRowV4';
export { SchoolEventRowV4, type SchoolEventRowV4Props } from './SchoolEventRowV4';
export { ScreenTimeBarV4, type ScreenTimeBarV4Props } from './ScreenTimeBarV4';
export { StickerRewardV4, type StickerRewardV4Props } from './StickerRewardV4';
/** The kids V4 line's arithmetic, shared with the native twin. */
export { meterParts, starParts, nextAward, needsExplanation } from './family-v4';
export type { MeterParts, StarParts } from './family-v4';
//# sourceMappingURL=index.d.ts.map