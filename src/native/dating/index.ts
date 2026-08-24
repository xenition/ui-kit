/**
 * `@xenition/ui/native/dating` — composed, mobile-first dating / discovery
 * blocks for React Native. Swipe decks, profile cards, match celebrations,
 * compatibility meters, and the surrounding chrome (distance badges, prompts,
 * icebreakers, boost upsells). Each block is assembled from the native
 * primitives (`Card`, `Button`, `Avatar`, `Badge`, `Progress`, `Icon`) and reads
 * its colors/spacing/type from the compiled theme via `useXenitionTheme()` — no
 * literal colors, no DOM, no explicit content. Every component ships
 * `variant`/state props, empty/loading states, and a11y roles/labels (state is
 * never conveyed by color alone) so a builder can compose any tasteful dating
 * experience.
 */

export { ProfileCard } from './ProfileCard';
export type {
  ProfileCardProps,
  ProfileCardData,
  ProfileCardVariant,
  ProfilePromptData,
} from './ProfileCard';

export { SwipeCard } from './SwipeCard';
export type {
  SwipeCardProps,
  SwipeCardProfile,
  SwipeCardVariant,
  SwipeOverlay,
} from './SwipeCard';

export { SwipeDeck } from './SwipeDeck';
export type { SwipeDeckProps, SwipeDecision } from './SwipeDeck';

export { LikePassButtons } from './LikePassButtons';
export type { LikePassButtonsProps, SwipeAction, LikePassSize } from './LikePassButtons';

export { MatchCelebration } from './MatchCelebration';
export type {
  MatchCelebrationProps,
  MatchCelebrationPerson,
  MatchCelebrationVariant,
} from './MatchCelebration';

export { CompatibilityMeter } from './CompatibilityMeter';
export type {
  CompatibilityMeterProps,
  CompatibilityMeterVariant,
  CompatibilityMeterSize,
} from './CompatibilityMeter';

export { IcebreakerChip } from './IcebreakerChip';
export type {
  IcebreakerChipProps,
  IcebreakerChipVariant,
  IcebreakerChipSize,
} from './IcebreakerChip';

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
