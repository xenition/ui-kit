/**
 * `@xenition/ui/native/travel` — composed travel, hospitality, and booking
 * blocks for React Native. Mobile-first, presentational only: every component
 * takes shaped data plus callbacks (nothing fetches) and is styled exclusively
 * from the compiled theme via `useXenitionTheme()`, so a seed change (dark mode
 * included) restyles the whole set. No literal colors, no external map or
 * native dependencies — `MapCard` is a static styled placeholder.
 */

export { FlightCard } from './FlightCard';
export type { FlightCardProps, FlightCardVariant, FlightLeg } from './FlightCard';

export { HotelCard } from './HotelCard';
export type { HotelCardProps, HotelCardVariant } from './HotelCard';

export { ItineraryItem } from './ItineraryItem';
export type { ItineraryItemProps, ItineraryKind, ItineraryStatus } from './ItineraryItem';

export { SeatPicker } from './SeatPicker';
export type { SeatPickerProps, Seat, SeatStatus } from './SeatPicker';

export { DestinationCard } from './DestinationCard';
export type { DestinationCardProps, DestinationCardVariant } from './DestinationCard';

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
