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

// Shared date/time helpers (no external deps, no clock at import).
export {
  weekdayLabel,
  monthLabel,
  sameDay,
  countdownParts,
  WEEKDAYS_SHORT,
  MONTHS_SHORT,
} from './format';
export type { CountdownParts } from './format';
