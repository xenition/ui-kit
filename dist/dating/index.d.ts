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
export { SwipeCard } from './SwipeCard';
export type { SwipeCardProps, SwipeCardProfile, SwipeCardVariant, SwipeOverlay, } from './SwipeCard';
export { SwipeDeck } from './SwipeDeck';
export type { SwipeDeckProps, SwipeDecision } from './SwipeDeck';
export { LikePassButtons } from './LikePassButtons';
export type { LikePassButtonsProps, SwipeAction, LikePassSize } from './LikePassButtons';
export { MatchCelebration } from './MatchCelebration';
export type { MatchCelebrationProps, MatchCelebrationPerson, MatchCelebrationVariant, } from './MatchCelebration';
export { CompatibilityMeter } from './CompatibilityMeter';
export type { CompatibilityMeterProps, CompatibilityMeterVariant, CompatibilityMeterSize, } from './CompatibilityMeter';
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
//# sourceMappingURL=index.d.ts.map