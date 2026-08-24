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
//# sourceMappingURL=index.d.ts.map