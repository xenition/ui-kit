/**
 * `@xenition/ui/booking` — presentational scheduling components.
 *
 * Props mirror the booking module: a `BookingResource`
 * `{name,timezone,slotMinutes}` and a `BookingSlot` `{startsAt,endsAt,spotsLeft}`
 * (instants are ISO-8601 strings). Nothing fetches — the app passes shaped
 * data — and everything is styled via the `--xen-*` tokens, so a seed change
 * restyles the whole flow (dark mode included). Keyboard + ARIA throughout.
 */

export { BookingCalendar } from './BookingCalendar';
export type { BookingCalendarProps, DayAvailability } from './BookingCalendar';
export { SlotPicker } from './SlotPicker';
export type { SlotPickerProps } from './SlotPicker';
export { BookingSummary } from './BookingSummary';
export type { BookingSummaryProps } from './BookingSummary';
export type { BookingResource, BookingSlot } from './types';
export {
  toDayKey,
  dayKeyInTz,
  formatTimeInTz,
  addDays,
  startOfMonth,
  monthMatrix,
  weekRow,
} from './datetime';
