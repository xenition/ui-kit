/**
 * `@xenition/ui/calendar` — presentational React DOM components for calendar &
 * scheduling surfaces (month/week/day views, agendas, time grids, availability
 * booking, and event-form rows). The web parity of `@xenition/ui/native/calendar`,
 * and a full scheduling suite distinct from the single `Calendar` primitive (a
 * static month grid).
 *
 * Every component is data + callbacks + variants only: no fetching, no SDK, no
 * date library. All `Date`s are passed in via props (`month`/`week`/`day`/`now`)
 * — nothing reads the clock at import time. Every color resolves from the
 * `--xen-*` theme tokens via Tailwind utility classes (`bg-primary`,
 * `text-on-surface`, or a `toneClasses` token pair) — never a literal hex. Built
 * on the shared `../primitives` (Card, Button, Modal, Icon, Segmented) and the
 * `../commerce` `EmptyState`.
 */
export { MonthView } from './MonthView';
export type { MonthViewProps, MonthViewDensity } from './MonthView';
export { MonthViewV2 } from './MonthViewV2';
export type { MonthViewV2Props } from './MonthViewV2';
export { MonthViewV3 } from './MonthViewV3';
export type { MonthViewV3Props } from './MonthViewV3';
export { WeekView } from './WeekView';
export type { WeekViewProps } from './WeekView';
export { DayAgenda } from './DayAgenda';
export type { DayAgendaProps } from './DayAgenda';
export { DayAgendaV2 } from './DayAgendaV2';
export type { DayAgendaV2Props } from './DayAgendaV2';
export { DayAgendaV3 } from './DayAgendaV3';
export type { DayAgendaV3Props } from './DayAgendaV3';
export { EventBlock } from './EventBlock';
export type { EventBlockProps, EventBlockVariant, EventBlockSize } from './EventBlock';
export { EventBlockV2 } from './EventBlockV2';
export type { EventBlockV2Props } from './EventBlockV2';
export { EventBlockV3 } from './EventBlockV3';
export type { EventBlockV3Props } from './EventBlockV3';
export { TimeGrid } from './TimeGrid';
export type { TimeGridProps } from './TimeGrid';
export { AvailabilityPicker } from './AvailabilityPicker';
export type { AvailabilityPickerProps } from './AvailabilityPicker';
export { AvailabilityPickerV2 } from './AvailabilityPickerV2';
export type { AvailabilityPickerV2Props } from './AvailabilityPickerV2';
export { AvailabilityPickerV3 } from './AvailabilityPickerV3';
export type { AvailabilityPickerV3Props } from './AvailabilityPickerV3';
export { MiniCalendar } from './MiniCalendar';
export type { MiniCalendarProps, MiniCalendarVariant } from './MiniCalendar';
export { EventDetailSheet } from './EventDetailSheet';
export type { EventDetailSheetProps } from './EventDetailSheet';
export { DateNavigator } from './DateNavigator';
export type { DateNavigatorProps } from './DateNavigator';
export { AllDayRow } from './AllDayRow';
export type { AllDayRowProps } from './AllDayRow';
export { RecurrenceRow } from './RecurrenceRow';
export type { RecurrenceRowProps, RecurrenceFreq, RecurrenceOption } from './RecurrenceRow';
export { TimezoneRow } from './TimezoneRow';
export type { TimezoneRowProps } from './TimezoneRow';
export type { CalendarEvent, EventTone, CalendarViewMode, AvailabilitySlot } from './types';
export { WEEKDAYS_SHORT, WEEKDAYS_NARROW, MONTHS_SHORT, MONTHS_LONG, weekdayLabel, monthLabel, monthLongLabel, sameDay, sameMonth, addDays, addMonths, startOfWeek, weekDates, minutesSinceMidnight, clockLabel, hourLabel, timeRangeLabel, monthGrid, weekdayHeader, toneClasses, } from './format';
export type { ToneClasses } from './format';
//# sourceMappingURL=index.d.ts.map