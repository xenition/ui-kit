/**
 * `@xenition/ui/marketplace` — composed classifieds / auction / peer-marketplace
 * blocks for React DOM. The web parity of `@xenition/ui/native/marketplace`:
 * every component takes shaped data plus callbacks (nothing fetches) and is
 * styled exclusively from the `--xen-*` theme tokens via Tailwind utility
 * classes (no literal colors), so a seed change (dark mode included) restyles
 * the whole set. Money is always integer **cents**, formatted through the shared
 * `formatMoney`. `onPress` becomes `onClick`; interactive cards are
 * `role="button"` divs with keyboard support and action cells are real
 * `<button>`s.
 */

export { ListingCard } from './ListingCard';
export type { ListingCardProps, ListingCardVariant } from './ListingCard';
export { ListingCardV2 } from './ListingCardV2';
export type { ListingCardV2Props } from './ListingCardV2';
export { ListingCardV3 } from './ListingCardV3';
export type { ListingCardV3Props } from './ListingCardV3';

export { SellerCard } from './SellerCard';
export type { SellerCardProps, SellerCardVariant } from './SellerCard';
export { SellerCardV2 } from './SellerCardV2';
export type { SellerCardV2Props } from './SellerCardV2';
export { SellerCardV3 } from './SellerCardV3';
export type { SellerCardV3Props } from './SellerCardV3';

export { OfferRow } from './OfferRow';
export type { OfferRowProps, OfferStatus } from './OfferRow';

export { BidRow } from './BidRow';
export type { BidRowProps } from './BidRow';

export { AuctionCard } from './AuctionCard';
export type { AuctionCardProps, AuctionCardVariant } from './AuctionCard';
export { AuctionCardV2 } from './AuctionCardV2';
export type { AuctionCardV2Props } from './AuctionCardV2';
export { AuctionCardV3 } from './AuctionCardV3';
export type { AuctionCardV3Props } from './AuctionCardV3';

export { CategoryTile } from './CategoryTile';
export type { CategoryTileProps, CategoryTileVariant } from './CategoryTile';

export { ConditionBadge } from './ConditionBadge';
export type { ConditionBadgeProps, ConditionBadgeSize, ConditionBadgeVariant } from './ConditionBadge';

export { ShippingOption } from './ShippingOption';
export type { ShippingOptionProps } from './ShippingOption';

export { MakeOfferForm } from './MakeOfferForm';
export type { MakeOfferFormProps } from './MakeOfferForm';

export { WatchlistRow } from './WatchlistRow';
export type { WatchlistRowProps } from './WatchlistRow';
export { WatchlistRowV2 } from './WatchlistRowV2';
export type { WatchlistRowV2Props } from './WatchlistRowV2';
export { WatchlistRowV3 } from './WatchlistRowV3';
export type { WatchlistRowV3Props } from './WatchlistRowV3';

export { RatingBreakdown } from './RatingBreakdown';
export type { RatingBreakdownProps } from './RatingBreakdown';

export { ReportListing } from './ReportListing';
export type { ReportListingProps, ReportReason } from './ReportListing';

export type { Condition } from './internal';

/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Twelve components on the current design pattern. See
 * `COMMERCE-MARKETPLACE-V4-BRIEF.md` — marketplace and commerce were upgraded
 * as one surface, so `ListingCardV4` and `commerce`'s `ProductCardV4` share an
 * anatomy on purpose: a storefront and a marketplace must read as one product.
 * ------------------------------------------------------------------------ */

export { ListingCardV4 } from './ListingCardV4';
export type { ListingCardV4Props, ListingCardV4Aspect } from './ListingCardV4';

export { AuctionCardV4, AUCTION_V4_TIMING, formatRemainingV4, spokenRemainingV4, useCountdownV4 } from './AuctionCardV4';
export type { AuctionCardV4Props } from './AuctionCardV4';

export { SellerCardV4 } from './SellerCardV4';
export type { SellerCardV4Props } from './SellerCardV4';

export { CategoryTileV4 } from './CategoryTileV4';
export type { CategoryTileV4Props } from './CategoryTileV4';

export { ConditionBadgeV4, CONDITION_V4_LABEL } from './ConditionBadgeV4';
export type { ConditionBadgeV4Props } from './ConditionBadgeV4';

export { RatingBreakdownV4 } from './RatingBreakdownV4';
export type { RatingBreakdownV4Props } from './RatingBreakdownV4';

export { BidRowV4 } from './BidRowV4';
export type { BidRowV4Props } from './BidRowV4';

export { OfferRowV4 } from './OfferRowV4';
export type { OfferRowV4Props } from './OfferRowV4';

export { MakeOfferFormV4 } from './MakeOfferFormV4';
export type { MakeOfferFormV4Props } from './MakeOfferFormV4';

export { ShippingOptionV4 } from './ShippingOptionV4';
export type { ShippingOptionV4Props } from './ShippingOptionV4';

export { WatchlistRowV4 } from './WatchlistRowV4';
export type { WatchlistRowV4Props } from './WatchlistRowV4';

export { ReportListingV4 } from './ReportListingV4';
export type { ReportListingV4Props } from './ReportListingV4';
