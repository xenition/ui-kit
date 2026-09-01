/**
 * `@xenition/ui/travel` — web (React DOM) parity of the native travel module:
 * composed travel, hospitality, and booking blocks. Presentational only: every
 * component takes shaped data plus callbacks (nothing fetches) and is styled
 * exclusively from the `--xen-*` token classes via the Tailwind preset, so a
 * seed change (dark mode included) restyles the whole set. No literal colors,
 * no external map dependency — `MapCard` is a static styled `div` placeholder.
 */

export { FlightCard } from './FlightCard';
export type { FlightCardProps, FlightCardVariant, FlightLeg } from './FlightCard';
export { FlightCardV2 } from './FlightCardV2';
export type { FlightCardV2Props } from './FlightCardV2';
export { FlightCardV3 } from './FlightCardV3';
export type { FlightCardV3Props } from './FlightCardV3';

export { HotelCard } from './HotelCard';
export type { HotelCardProps, HotelCardVariant } from './HotelCard';
export { HotelCardV2 } from './HotelCardV2';
export type { HotelCardV2Props } from './HotelCardV2';
export { HotelCardV3 } from './HotelCardV3';
export type { HotelCardV3Props } from './HotelCardV3';

export { ItineraryItem } from './ItineraryItem';
export type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';
export { ItineraryItemV2 } from './ItineraryItemV2';
export type { ItineraryItemV2Props } from './ItineraryItemV2';
export { ItineraryItemV3 } from './ItineraryItemV3';
export type { ItineraryItemV3Props } from './ItineraryItemV3';

export { SeatPicker } from './SeatPicker';
export type { SeatPickerProps, Seat, SeatStatus } from './SeatPicker';

export { DestinationCard } from './DestinationCard';
export type { DestinationCardProps, DestinationCardVariant } from './DestinationCard';
export { DestinationCardV2 } from './DestinationCardV2';
export type { DestinationCardV2Props } from './DestinationCardV2';
export { DestinationCardV3 } from './DestinationCardV3';
export type { DestinationCardV3Props } from './DestinationCardV3';

export { TripSummary } from './TripSummary';
export type { TripSummaryProps, TripLineItem } from './TripSummary';

export { BaggageRow } from './BaggageRow';
export type { BaggageRowProps, BaggageKind } from './BaggageRow';

export { BoardingPass } from './BoardingPass';
export type { BoardingPassProps, BoardingField } from './BoardingPass';

export { PriceCalendar } from './PriceCalendar';
export type { PriceCalendarProps, PriceDay } from './PriceCalendar';

export { MapCard } from './MapCard';
export type { MapCardProps } from './MapCard';

export { ReviewStars } from './ReviewStars';
export type { ReviewStarsProps, ReviewBucket } from './ReviewStars';

export { AmenityRow } from './AmenityRow';
export type { AmenityRowProps, AmenityRowVariant, Amenity } from './AmenityRow';

export { WeatherStrip } from './WeatherStrip';
export type { WeatherStripProps, WeatherDay } from './WeatherStrip';

/*
 * ── V4 "journey" (boarding-pass) design line ──
 * A drop-in V4 variant for each of the 13 originals: elevated clean cards with a
 * small brand-gradient glyph disc, route rails with a plane glyph, dashed
 * boarding-pass tear lines, and gradient heroes on the peak moments (boarding
 * pass, trip summary, destination covers). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
export { FlightCardV4 } from './FlightCardV4';
export type { FlightCardV4Props } from './FlightCardV4';
export { HotelCardV4 } from './HotelCardV4';
export type { HotelCardV4Props } from './HotelCardV4';
export { ItineraryItemV4 } from './ItineraryItemV4';
export type { ItineraryItemV4Props } from './ItineraryItemV4';
export { DestinationCardV4 } from './DestinationCardV4';
export type { DestinationCardV4Props } from './DestinationCardV4';
export { TripSummaryV4 } from './TripSummaryV4';
export type { TripSummaryV4Props } from './TripSummaryV4';
export { BoardingPassV4 } from './BoardingPassV4';
export type { BoardingPassV4Props } from './BoardingPassV4';
export { SeatPickerV4 } from './SeatPickerV4';
export type { SeatPickerV4Props } from './SeatPickerV4';
export { PriceCalendarV4 } from './PriceCalendarV4';
export type { PriceCalendarV4Props } from './PriceCalendarV4';
export { AmenityRowV4 } from './AmenityRowV4';
export type { AmenityRowV4Props } from './AmenityRowV4';
export { BaggageRowV4 } from './BaggageRowV4';
export type { BaggageRowV4Props } from './BaggageRowV4';
export { MapCardV4 } from './MapCardV4';
export type { MapCardV4Props } from './MapCardV4';
export { ReviewStarsV4 } from './ReviewStarsV4';
export type { ReviewStarsV4Props } from './ReviewStarsV4';
export { WeatherStripV4 } from './WeatherStripV4';
export type { WeatherStripV4Props } from './WeatherStripV4';

/* ── New composed blocks (V4 journey line) ── */
export { TripHeader } from './TripHeader';
export type { TripHeaderProps, TripPlace } from './TripHeader';
export { FlightStatusBanner } from './FlightStatusBanner';
export type { FlightStatusBannerProps, FlightStatus } from './FlightStatusBanner';
export { LoyaltyCard } from './LoyaltyCard';
export type { LoyaltyCardProps } from './LoyaltyCard';
