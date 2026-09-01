/**
 * `@xenition/ui/dating` — composed dating / discovery blocks for React DOM (web).
 * The web parity of `@xenition/ui/native/dating`: swipe decks, profile cards,
 * match celebrations, compatibility meters, and the surrounding chrome (distance
 * badges, prompts, icebreakers, boost upsells). Each block is assembled from the
 * web primitives (`Card`, `Button`, `Avatar`, `Badge`, `Progress`, `Icon`) plus
 * `EmptyState`, and every color/space comes from the `--xen-*` token classes via
 * the Tailwind preset — no literal colors, no explicit content. Interactive cards
 * are keyboard-operable `role="button"` containers, action cells are real
 * `<button>`s, and state is never conveyed by color alone. Native `onPress`
 * callbacks map to `onClick`; every component ships variant/state props, empty and
 * loading states, and a11y roles/labels.
 */
export { ProfileCard } from './ProfileCard';
export type { ProfileCardProps, ProfileCardData, ProfileCardVariant, ProfilePromptData, } from './ProfileCard';
export { ProfileCardV2 } from './ProfileCardV2';
export type { ProfileCardV2Props } from './ProfileCardV2';
export { ProfileCardV3 } from './ProfileCardV3';
export type { ProfileCardV3Props } from './ProfileCardV3';
export { SwipeCard } from './SwipeCard';
export type { SwipeCardProps, SwipeCardProfile, SwipeCardVariant, SwipeOverlay, } from './SwipeCard';
export { SwipeCardV2 } from './SwipeCardV2';
export type { SwipeCardV2Props } from './SwipeCardV2';
export { SwipeCardV3 } from './SwipeCardV3';
export type { SwipeCardV3Props } from './SwipeCardV3';
export { SwipeDeck } from './SwipeDeck';
export type { SwipeDeckProps, SwipeDecision } from './SwipeDeck';
export { LikePassButtons } from './LikePassButtons';
export type { LikePassButtonsProps, SwipeAction, LikePassSize } from './LikePassButtons';
export { MatchCelebration } from './MatchCelebration';
export type { MatchCelebrationProps, MatchCelebrationPerson, MatchCelebrationVariant, } from './MatchCelebration';
export { MatchCelebrationV2 } from './MatchCelebrationV2';
export type { MatchCelebrationV2Props } from './MatchCelebrationV2';
export { MatchCelebrationV3 } from './MatchCelebrationV3';
export type { MatchCelebrationV3Props } from './MatchCelebrationV3';
export { CompatibilityMeter } from './CompatibilityMeter';
export type { CompatibilityMeterProps, CompatibilityMeterVariant, CompatibilityMeterSize, } from './CompatibilityMeter';
export { CompatibilityMeterV2 } from './CompatibilityMeterV2';
export type { CompatibilityMeterV2Props } from './CompatibilityMeterV2';
export { CompatibilityMeterV3 } from './CompatibilityMeterV3';
export type { CompatibilityMeterV3Props } from './CompatibilityMeterV3';
export { IcebreakerChip } from './IcebreakerChip';
export type { IcebreakerChipProps, IcebreakerChipVariant, IcebreakerChipSize } from './IcebreakerChip';
export { ProfilePrompt } from './ProfilePrompt';
export type { ProfilePromptProps, ProfilePromptVariant } from './ProfilePrompt';
export { DistanceBadge } from './DistanceBadge';
export type { DistanceBadgeProps, DistanceUnit, DistanceBadgeVariant } from './DistanceBadge';
export { PhotoCarousel } from './PhotoCarousel';
export type { PhotoCarouselProps, CarouselPhoto, PhotoCarouselRatio } from './PhotoCarousel';
export { BoostBanner } from './BoostBanner';
export type { BoostBannerProps, BoostVariant } from './BoostBanner';
export { WhoLikedYouRow } from './WhoLikedYouRow';
export type { WhoLikedYouRowProps, Liker } from './WhoLikedYouRow';
export { BoostBannerV4, type BoostBannerV4Props } from './BoostBannerV4';
export { CompatibilityMeterV4, type CompatibilityMeterV4Props } from './CompatibilityMeterV4';
export { DistanceBadgeV4, type DistanceBadgeV4Props } from './DistanceBadgeV4';
export { IcebreakerChipV4, type IcebreakerChipV4Props } from './IcebreakerChipV4';
export { LikePassButtonsV4, type LikePassButtonsV4Props } from './LikePassButtonsV4';
export { MatchCelebrationV4, type MatchCelebrationV4Props } from './MatchCelebrationV4';
export { PhotoCarouselV4, type PhotoCarouselV4Props } from './PhotoCarouselV4';
export { ProfileCardV4, type ProfileCardV4Props } from './ProfileCardV4';
export { ProfilePromptV4, type ProfilePromptV4Props } from './ProfilePromptV4';
export { SwipeCardV4, type SwipeCardV4Props } from './SwipeCardV4';
export { SwipeDeckV4, type SwipeDeckV4Props } from './SwipeDeckV4';
export { WhoLikedYouRowV4, type WhoLikedYouRowV4Props } from './WhoLikedYouRowV4';
//# sourceMappingURL=index.d.ts.map