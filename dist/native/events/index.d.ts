/**
 * `@xenition/ui/native/events` — presentational React Native components for
 * event, ticketing and conference surfaces (browse → schedule → ticket →
 * check-in). Every component is data + callbacks + variants only: no fetching,
 * no SDK import, no barcode/scan dependency (the `TicketStub` barcode is a
 * token-drawn placeholder). All colors resolve from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors. Built on the shared
 * `../primitives` (Card, Button, Badge, Icon, Avatar, AvatarGroup, Rating).
 */
export { EventCard } from './EventCard';
export type { EventCardProps, EventCardVariant } from './EventCard';
export { TicketStub } from './TicketStub';
export type { TicketStubProps, TicketStubVariant, TicketStubField } from './TicketStub';
export { RSVPButton } from './RSVPButton';
export type { RSVPButtonProps, RSVPStatus, RSVPButtonSize } from './RSVPButton';
export { AgendaList } from './AgendaList';
export type { AgendaListProps, AgendaItem, AgendaItemStatus } from './AgendaList';
export { SpeakerCard } from './SpeakerCard';
export type { SpeakerCardProps, SpeakerCardVariant } from './SpeakerCard';
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
export { weekdayLabel, monthLabel, sameDay, countdownParts, WEEKDAYS_SHORT, MONTHS_SHORT, } from './format';
export type { CountdownParts } from './format';
//# sourceMappingURL=index.d.ts.map