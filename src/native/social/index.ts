/**
 * `@xenition/ui/native/social` — composed, mobile-first social/feed/community
 * blocks for React Native. Each block is assembled from the native primitives
 * (`Avatar`, `Button`, …) and reads its colors/spacing/type from the compiled
 * theme via `useXenitionTheme()` — no literal colors, no DOM. Every component
 * ships `variant`/state props for variety, empty/loading states, and a11y
 * labels/roles so a builder can compose any social experience.
 */

export { PostCard } from './PostCard';
export type {
  PostCardProps,
  PostVariant,
  PostAuthor,
  PostLink,
  PostVideo,
} from './PostCard';

export { FeedList } from './FeedList';
export type { FeedListProps } from './FeedList';

export { StoryBar } from './StoryBar';
export type { StoryBarProps, Story } from './StoryBar';

export { StoryRing } from './StoryRing';
export type { StoryRingProps, StoryState } from './StoryRing';

export { UserCard } from './UserCard';
export type { UserCardProps, UserCardVariant, SocialUser } from './UserCard';

export { FollowButton } from './FollowButton';
export type { FollowButtonProps, FollowState } from './FollowButton';

export { ReactionBar } from './ReactionBar';
export type { ReactionBarProps, Reaction } from './ReactionBar';

export { CommentItem } from './CommentItem';
export type { CommentItemProps } from './CommentItem';

export { ShareSheet } from './ShareSheet';
export type { ShareSheetProps, ShareTarget } from './ShareSheet';

export { Poll } from './Poll';
export type { PollProps, PollOption } from './Poll';

export { HashtagChip } from './HashtagChip';
export type { HashtagChipProps, HashtagChipSize } from './HashtagChip';

export { MentionText, parseMentions } from './MentionText';
export type { MentionTextProps } from './MentionText';

export { ProfileStats } from './ProfileStats';
export type { ProfileStatsProps, ProfileStat } from './ProfileStats';

export { EngagementBar } from './EngagementBar';
export type { EngagementBarProps } from './EngagementBar';
