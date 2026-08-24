/**
 * `@xenition/ui/social` — composed social / feed / community blocks for React
 * DOM. Web parity of `@xenition/ui/native/social`: the same component names and
 * prop contracts, with `onPress` → `onClick`, RN styles → Tailwind token
 * classes, and `View`/`Text`/`Pressable` → `div`/`span`/`button`. Every block
 * is assembled from the web primitives (`Avatar`, `Button`, `Icon`, …) and
 * styled exclusively via the `--xen-*` theme tokens — no literal colors (CI
 * lint rule) — so a seed change restyles the whole social surface, dark mode
 * included. Each ships variant/state props, empty/loading states, and
 * `role`/`aria-*` a11y (state announced, never color alone).
 */
export { PostCard } from './PostCard';
export type { PostCardProps, PostVariant, PostAuthor, PostLink, PostVideo, } from './PostCard';
export { PostCardV2 } from './PostCardV2';
export type { PostCardV2Props } from './PostCardV2';
export { PostCardV3 } from './PostCardV3';
export type { PostCardV3Props } from './PostCardV3';
export { FeedList } from './FeedList';
export type { FeedListProps } from './FeedList';
export { StoryBar } from './StoryBar';
export type { StoryBarProps, Story } from './StoryBar';
export { StoryBarV2 } from './StoryBarV2';
export type { StoryBarV2Props } from './StoryBarV2';
export { StoryBarV3 } from './StoryBarV3';
export type { StoryBarV3Props } from './StoryBarV3';
export { StoryRing } from './StoryRing';
export type { StoryRingProps, StoryState } from './StoryRing';
export { UserCard } from './UserCard';
export type { UserCardProps, UserCardVariant, SocialUser } from './UserCard';
export { UserCardV2 } from './UserCardV2';
export type { UserCardV2Props } from './UserCardV2';
export { UserCardV3 } from './UserCardV3';
export type { UserCardV3Props } from './UserCardV3';
export { FollowButton } from './FollowButton';
export type { FollowButtonProps, FollowState } from './FollowButton';
export { ReactionBar } from './ReactionBar';
export type { ReactionBarProps, Reaction } from './ReactionBar';
export { CommentItem } from './CommentItem';
export type { CommentItemProps } from './CommentItem';
export { CommentItemV2 } from './CommentItemV2';
export type { CommentItemV2Props } from './CommentItemV2';
export { CommentItemV3 } from './CommentItemV3';
export type { CommentItemV3Props } from './CommentItemV3';
export { ShareSheet } from './ShareSheet';
export type { ShareSheetProps, ShareTarget } from './ShareSheet';
export { Poll } from './Poll';
export type { PollProps, PollOption } from './Poll';
export { HashtagChip } from './HashtagChip';
export type { HashtagChipProps, HashtagChipSize } from './HashtagChip';
export { MentionText, parseMentions } from './MentionText';
export type { MentionTextProps, MentionColor } from './MentionText';
export { ProfileStats } from './ProfileStats';
export type { ProfileStatsProps, ProfileStat } from './ProfileStats';
export { EngagementBar, formatCount } from './EngagementBar';
export type { EngagementBarProps } from './EngagementBar';
//# sourceMappingURL=index.d.ts.map