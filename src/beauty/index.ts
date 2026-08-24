/**
 * `@xenition/ui/beauty` — composed salon / spa / beauty-services blocks for the
 * web (React DOM). The web-parity twin of `@xenition/ui/native/beauty`:
 * presentational only, every component takes shaped data plus callbacks (nothing
 * fetches, no SDK import) and is styled exclusively via the `--xen-*` theme
 * tokens, so a seed change (dark mode included) restyles the whole set. No
 * literal colors — token classes only — and no external dependencies:
 * `BeforeAfter` is a styled split/toggle built from plain `div`s + `img`, no
 * slider library. Money is always integer **cents**, formatted through the
 * shared `formatMoney` (re-exported from the commerce module).
 */

export { ServiceMenuItem } from './ServiceMenuItem';
export type { ServiceMenuItemProps, ServiceCategory } from './ServiceMenuItem';

export { StylistCard } from './StylistCard';
export type { StylistCardProps, StylistCardVariant } from './StylistCard';

export { AppointmentSlot } from './AppointmentSlot';
export type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';

export { BeforeAfter } from './BeforeAfter';
export type { BeforeAfterProps, BeforeAfterVariant } from './BeforeAfter';

export { TreatmentCard } from './TreatmentCard';
export type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';

export { LoyaltyCard } from './LoyaltyCard';
export type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';

export { ProductRecommendation } from './ProductRecommendation';
export type { ProductRecommendationProps } from './ProductRecommendation';

export { SalonBookingBar } from './SalonBookingBar';
export type { SalonBookingBarProps } from './SalonBookingBar';

export { ReviewCard } from './ReviewCard';
export type { ReviewCardProps, ReviewCardVariant } from './ReviewCard';

export { LookbookGrid } from './LookbookGrid';
export type { LookbookGridProps, LookbookItem } from './LookbookGrid';

export { PriceListRow } from './PriceListRow';
export type { PriceListRowProps, PriceListRowVariant } from './PriceListRow';

export { GiftCardRow } from './GiftCardRow';
export type { GiftCardRowProps, GiftCardStatus } from './GiftCardRow';

// Shared money formatter — one home across platforms/modules.
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';
