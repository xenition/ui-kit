/**
 * `@xenition/ui/native/marketplace` — composed classifieds / auction /
 * peer-marketplace blocks for React Native. Mobile-first and presentational
 * only: every component takes shaped data plus callbacks (nothing fetches) and
 * is styled exclusively from the compiled theme via `useXenitionTheme()`, so a
 * seed change (dark mode included) restyles the whole set. Colors come only
 * from `SemanticColors` slots / `tokens.ramps.*`, with a token-derived
 * `withAlpha` for tints — no literal colors — and there are no external
 * dependencies.
 */

export { ListingCard } from './ListingCard';
export type { ListingCardProps, ListingCardVariant } from './ListingCard';

export { SellerCard } from './SellerCard';
export type { SellerCardProps, SellerCardVariant } from './SellerCard';

// ── Alternate designs ─────────────────────────────────────────────────
// Drop-in redesigns of the high-traffic marketplace blocks: each `V2`/`V3`
// takes the SAME props as its base component (`<Name>V2Props = <Name>Props`)
// but renders a genuinely different layout, so an app can swap the visual
// treatment without touching call sites. Presentational and token-pure like
// the originals.
export { ListingCardV2 } from './ListingCardV2';
export type { ListingCardV2Props } from './ListingCardV2';
export { ListingCardV3 } from './ListingCardV3';
export type { ListingCardV3Props } from './ListingCardV3';

export { SellerCardV2 } from './SellerCardV2';
export type { SellerCardV2Props } from './SellerCardV2';
export { SellerCardV3 } from './SellerCardV3';
export type { SellerCardV3Props } from './SellerCardV3';

export { AuctionCardV2 } from './AuctionCardV2';
export type { AuctionCardV2Props } from './AuctionCardV2';
export { AuctionCardV3 } from './AuctionCardV3';
export type { AuctionCardV3Props } from './AuctionCardV3';

export { WatchlistRowV2 } from './WatchlistRowV2';
export type { WatchlistRowV2Props } from './WatchlistRowV2';
export { WatchlistRowV3 } from './WatchlistRowV3';
export type { WatchlistRowV3Props } from './WatchlistRowV3';

export { OfferRow } from './OfferRow';
export type { OfferRowProps, OfferStatus } from './OfferRow';

export { BidRow } from './BidRow';
export type { BidRowProps } from './BidRow';

export { AuctionCard } from './AuctionCard';
export type { AuctionCardProps, AuctionCardVariant } from './AuctionCard';

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

export { RatingBreakdown } from './RatingBreakdown';
export type { RatingBreakdownProps } from './RatingBreakdown';

export { ReportListing } from './ReportListing';
export type { ReportListingProps, ReportReason } from './ReportListing';

export type { Condition } from './internal';
