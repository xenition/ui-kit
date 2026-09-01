/**
 * `@xenition/ui/native/booking` — presentational scheduling components for
 * React Native, mirroring the web `@xenition/ui/booking` prop contracts
 * exactly. A `BookingResource` `{name,timezone,slotMinutes}` and a `BookingSlot`
 * `{startsAt,endsAt,spotsLeft}` (instants are ISO-8601 strings). Nothing
 * fetches — the app passes shaped data — and everything is styled via compiled
 * theme tokens (`useXenitionTheme()`), so a seed change restyles the whole flow
 * (dark mode included). The pure date helpers are shared with the web module,
 * never duplicated. Event idioms are native (`onSelectDate`/`onPick`).
 */

export { BookingCalendar } from './BookingCalendar';
export type { BookingCalendarProps, DayAvailability } from './BookingCalendar';
export { SlotPicker } from './SlotPicker';
export type { SlotPickerProps } from './SlotPicker';
export { BookingSummary } from './BookingSummary';
export type { BookingSummaryProps } from './BookingSummary';

// Alternate designs — separate drop-in components sharing each base prop
// contract (`<Name>V2Props`/`<Name>V3Props` alias the originals). Pick one at
// the import site; nothing changes on the base components.
export { BookingCalendarV2 } from './BookingCalendarV2';
export type { BookingCalendarV2Props } from './BookingCalendarV2';
export { BookingCalendarV3 } from './BookingCalendarV3';
export type { BookingCalendarV3Props } from './BookingCalendarV3';
export { SlotPickerV2 } from './SlotPickerV2';
export type { SlotPickerV2Props } from './SlotPickerV2';
export { SlotPickerV3 } from './SlotPickerV3';
export type { SlotPickerV3Props } from './SlotPickerV3';
export { BookingSummaryV2 } from './BookingSummaryV2';
export type { BookingSummaryV2Props } from './BookingSummaryV2';
export { BookingSummaryV3 } from './BookingSummaryV3';
export type { BookingSummaryV3Props } from './BookingSummaryV3';
export type { BookingResource, BookingSlot } from '../../booking/types';
export {
  toDayKey,
  dayKeyInTz,
  formatTimeInTz,
  addDays,
  startOfMonth,
  monthMatrix,
  weekRow,
} from '../../booking/datetime';

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `VERTICALS-V4-BRIEF.md`. Each is a
// drop-in for its base — same props plus optional additions.
export { BookingCalendarV4 } from './BookingCalendarV4';
export type { BookingCalendarV4Props } from './BookingCalendarV4';
export { SlotPickerV4 } from './SlotPickerV4';
export type { SlotPickerV4Props } from './SlotPickerV4';
export { BookingSummaryV4 } from './BookingSummaryV4';
export type { BookingSummaryV4Props, BookingSummaryLabels } from './BookingSummaryV4';
