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
export type { BookingResource, BookingSlot } from '../../booking/types';
export { toDayKey, dayKeyInTz, formatTimeInTz, addDays, startOfMonth, monthMatrix, weekRow, } from '../../booking/datetime';
//# sourceMappingURL=index.d.ts.map