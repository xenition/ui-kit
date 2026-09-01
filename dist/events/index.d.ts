/**
 * `@xenition/ui/events` — presentational React DOM components for event,
 * ticketing and conference surfaces (browse → schedule → ticket → check-in).
 * The web parity of `@xenition/ui/native/events`: same names, same prop
 * contracts, with `onPress` mapped to `onClick`. Every component is data +
 * callbacks + variants only — no fetching, no SDK import, no barcode/scan
 * dependency (the `TicketStub` barcode is a token-drawn placeholder). All colors
 * resolve from the `--xen-*` tokens via the Tailwind preset — no literal colors.
 * Built on the shared `../primitives` (Card, Button, Badge, Icon, Avatar,
 * AvatarGroup, Rating) and `../commerce` (EmptyState).
 */
export { EventCard } from './EventCard';
export type { EventCardProps, EventCardVariant } from './EventCard';
export { EventCardV2 } from './EventCardV2';
export type { EventCardV2Props } from './EventCardV2';
export { EventCardV3 } from './EventCardV3';
export type { EventCardV3Props } from './EventCardV3';
export { TicketStub } from './TicketStub';
export type { TicketStubProps, TicketStubVariant, TicketStubField } from './TicketStub';
export { TicketStubV2 } from './TicketStubV2';
export type { TicketStubV2Props } from './TicketStubV2';
export { TicketStubV3 } from './TicketStubV3';
export type { TicketStubV3Props } from './TicketStubV3';
export { RSVPButton } from './RSVPButton';
export type { RSVPButtonProps, RSVPStatus, RSVPButtonSize } from './RSVPButton';
export { AgendaList } from './AgendaList';
export type { AgendaListProps, AgendaItem, AgendaItemStatus } from './AgendaList';
export { SpeakerCard } from './SpeakerCard';
export type { SpeakerCardProps, SpeakerCardVariant } from './SpeakerCard';
export { SpeakerCardV2 } from './SpeakerCardV2';
export type { SpeakerCardV2Props } from './SpeakerCardV2';
export { SpeakerCardV3 } from './SpeakerCardV3';
export type { SpeakerCardV3Props } from './SpeakerCardV3';
export { ScheduleRow } from './ScheduleRow';
export type { ScheduleRowProps, ScheduleStatus } from './ScheduleRow';
export { VenueCard } from './VenueCard';
export type { VenueCardProps, VenueCardVariant } from './VenueCard';
export { CountdownBadge } from './CountdownBadge';
export type { CountdownBadgeProps, CountdownVariant, CountdownTone } from './CountdownBadge';
export { TicketTypeRow } from './TicketTypeRow';
export type { TicketTypeRowProps } from './TicketTypeRow';
export { CheckInRow } from './CheckInRow';
export type { CheckInRowProps } from './CheckInRow';
export { CalendarStrip } from './CalendarStrip';
export type { CalendarStripProps } from './CalendarStrip';
export { SessionCard } from './SessionCard';
export type { SessionCardProps, SessionCardVariant, SessionSpeaker } from './SessionCard';
export { SessionCardV2 } from './SessionCardV2';
export type { SessionCardV2Props } from './SessionCardV2';
export { SessionCardV3 } from './SessionCardV3';
export type { SessionCardV3Props } from './SessionCardV3';
export { weekdayLabel, monthLabel, sameDay, countdownParts, WEEKDAYS_SHORT, MONTHS_SHORT, } from './format';
export type { CountdownParts } from './format';
export { AgendaListV4 } from './AgendaListV4';
export type { AgendaListV4Props } from './AgendaListV4';
export { CalendarStripV4 } from './CalendarStripV4';
export type { CalendarStripV4Props } from './CalendarStripV4';
export { CheckInRowV4 } from './CheckInRowV4';
export type { CheckInRowV4Props } from './CheckInRowV4';
export { CountdownBadgeV4 } from './CountdownBadgeV4';
export type { CountdownBadgeV4Props, CountdownUnitLabels } from './CountdownBadgeV4';
export { EventCardV4 } from './EventCardV4';
export type { EventCardV4Props } from './EventCardV4';
export { RSVPButtonV4 } from './RSVPButtonV4';
export type { RSVPButtonV4Props } from './RSVPButtonV4';
export { ScheduleRowV4 } from './ScheduleRowV4';
export type { ScheduleRowV4Props } from './ScheduleRowV4';
export { SessionCardV4 } from './SessionCardV4';
export type { SessionCardV4Props } from './SessionCardV4';
export { SpeakerCardV4 } from './SpeakerCardV4';
export type { SpeakerCardV4Props } from './SpeakerCardV4';
export { TicketStubV4 } from './TicketStubV4';
export type { TicketStubV4Props } from './TicketStubV4';
export { TicketTypeRowV4 } from './TicketTypeRowV4';
export type { TicketTypeRowV4Props } from './TicketTypeRowV4';
export { VenueCardV4 } from './VenueCardV4';
export type { VenueCardV4Props } from './VenueCardV4';
//# sourceMappingURL=index.d.ts.map