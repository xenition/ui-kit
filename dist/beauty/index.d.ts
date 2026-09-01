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
export { ServiceMenuItemV2 } from './ServiceMenuItemV2';
export type { ServiceMenuItemV2Props } from './ServiceMenuItemV2';
export { ServiceMenuItemV3 } from './ServiceMenuItemV3';
export type { ServiceMenuItemV3Props } from './ServiceMenuItemV3';
export { StylistCard } from './StylistCard';
export type { StylistCardProps, StylistCardVariant } from './StylistCard';
export { StylistCardV2 } from './StylistCardV2';
export type { StylistCardV2Props } from './StylistCardV2';
export { StylistCardV3 } from './StylistCardV3';
export type { StylistCardV3Props } from './StylistCardV3';
export { AppointmentSlot } from './AppointmentSlot';
export type { AppointmentSlotProps, AppointmentSlotStatus } from './AppointmentSlot';
export { BeforeAfter } from './BeforeAfter';
export type { BeforeAfterProps, BeforeAfterVariant } from './BeforeAfter';
export { TreatmentCard } from './TreatmentCard';
export type { TreatmentCardProps, TreatmentVariant } from './TreatmentCard';
export { TreatmentCardV2 } from './TreatmentCardV2';
export type { TreatmentCardV2Props } from './TreatmentCardV2';
export { TreatmentCardV3 } from './TreatmentCardV3';
export type { TreatmentCardV3Props } from './TreatmentCardV3';
export { LoyaltyCard } from './LoyaltyCard';
export type { LoyaltyCardProps, LoyaltyTier } from './LoyaltyCard';
export { LoyaltyCardV2 } from './LoyaltyCardV2';
export type { LoyaltyCardV2Props } from './LoyaltyCardV2';
export { LoyaltyCardV3 } from './LoyaltyCardV3';
export type { LoyaltyCardV3Props } from './LoyaltyCardV3';
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
export { formatMoney } from '../commerce/money';
export type { MoneyFormatter } from '../commerce/money';
export { AppointmentSlotV4 } from './AppointmentSlotV4';
export type { AppointmentSlotV4Props } from './AppointmentSlotV4';
export { BeforeAfterV4 } from './BeforeAfterV4';
export type { BeforeAfterV4Props } from './BeforeAfterV4';
export { GiftCardRowV4 } from './GiftCardRowV4';
export type { GiftCardRowV4Props } from './GiftCardRowV4';
export { LookbookGridV4 } from './LookbookGridV4';
export type { LookbookGridV4Props } from './LookbookGridV4';
export { LoyaltyCardV4 } from './LoyaltyCardV4';
export type { LoyaltyCardV4Props } from './LoyaltyCardV4';
export { PriceListRowV4 } from './PriceListRowV4';
export type { PriceListRowV4Props } from './PriceListRowV4';
export { ProductRecommendationV4 } from './ProductRecommendationV4';
export type { ProductRecommendationV4Props } from './ProductRecommendationV4';
export { ReviewCardV4 } from './ReviewCardV4';
export type { ReviewCardV4Props } from './ReviewCardV4';
export { SalonBookingBarV4 } from './SalonBookingBarV4';
export type { SalonBookingBarV4Props } from './SalonBookingBarV4';
export { ServiceMenuItemV4 } from './ServiceMenuItemV4';
export type { ServiceMenuItemV4Props } from './ServiceMenuItemV4';
export { StylistCardV4 } from './StylistCardV4';
export type { StylistCardV4Props } from './StylistCardV4';
export { TreatmentCardV4 } from './TreatmentCardV4';
export type { TreatmentCardV4Props } from './TreatmentCardV4';
//# sourceMappingURL=index.d.ts.map