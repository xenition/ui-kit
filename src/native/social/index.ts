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

// ── Alternate designs (V2 / V3) — drop-in, same props as the V1 above ──
export { PostCardV2 } from './PostCardV2';
export type { PostCardV2Props } from './PostCardV2';
export { PostCardV3 } from './PostCardV3';
export type { PostCardV3Props } from './PostCardV3';

export { UserCardV2 } from './UserCardV2';
export type { UserCardV2Props } from './UserCardV2';
export { UserCardV3 } from './UserCardV3';
export type { UserCardV3Props } from './UserCardV3';

export { CommentItemV2 } from './CommentItemV2';
export type { CommentItemV2Props } from './CommentItemV2';
export { CommentItemV3 } from './CommentItemV3';
export type { CommentItemV3Props } from './CommentItemV3';

export { StoryBarV2 } from './StoryBarV2';
export type { StoryBarV2Props } from './StoryBarV2';
export { StoryBarV3 } from './StoryBarV3';
export type { StoryBarV3Props } from './StoryBarV3';

/*
 * ── V4 "feed" (clean social) design line ──
 * A drop-in V4 variant for each of the 14 originals: clean airy elevated cards,
 * larger rounded avatars, a primary verified tick, soft-primary action states,
 * gradient story rings, and a brand gradient reserved for the identity moments
 * (profile header, story viewer). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
export { PostCardV4 } from './PostCardV4';
export type { PostCardV4Props } from './PostCardV4';
export { CommentItemV4 } from './CommentItemV4';
export type { CommentItemV4Props } from './CommentItemV4';
export { StoryBarV4 } from './StoryBarV4';
export type { StoryBarV4Props } from './StoryBarV4';
export { UserCardV4 } from './UserCardV4';
export type { UserCardV4Props } from './UserCardV4';
export { EngagementBarV4 } from './EngagementBarV4';
export type { EngagementBarV4Props } from './EngagementBarV4';
export { ReactionBarV4 } from './ReactionBarV4';
export type { ReactionBarV4Props } from './ReactionBarV4';
export { FollowButtonV4 } from './FollowButtonV4';
export type { FollowButtonV4Props } from './FollowButtonV4';
export { HashtagChipV4 } from './HashtagChipV4';
export type { HashtagChipV4Props } from './HashtagChipV4';
export { MentionTextV4 } from './MentionTextV4';
export type { MentionTextV4Props } from './MentionTextV4';
export { PollV4 } from './PollV4';
export type { PollV4Props } from './PollV4';
export { ProfileStatsV4 } from './ProfileStatsV4';
export type { ProfileStatsV4Props } from './ProfileStatsV4';
export { ShareSheetV4 } from './ShareSheetV4';
export type { ShareSheetV4Props } from './ShareSheetV4';
export { StoryRingV4 } from './StoryRingV4';
export type { StoryRingV4Props } from './StoryRingV4';
export { FeedListV4 } from './FeedListV4';
export type { FeedListV4Props } from './FeedListV4';

/* ── New components (V4 feed line) ── */
export { ProfileHeader } from './ProfileHeader';
export type { ProfileHeaderProps, ProfileStat as ProfileHeaderStat } from './ProfileHeader';
export { StoryViewer } from './StoryViewer';
export type { StoryViewerProps, StoryAuthor } from './StoryViewer';
export { PostComposer } from './PostComposer';
export type { PostComposerProps } from './PostComposer';
export { NotificationRow } from './NotificationRow';
export type { NotificationRowProps, NotificationKind, NotificationActor } from './NotificationRow';
export { TrendingCard } from './TrendingCard';
export type { TrendingCardProps } from './TrendingCard';
export { SuggestedUsers } from './SuggestedUsers';
export type { SuggestedUsersProps, SuggestedUser } from './SuggestedUsers';
