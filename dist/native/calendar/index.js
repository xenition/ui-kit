"use strict";
/**
 * `@xenition/ui/native/calendar` — presentational React Native components for
 * calendar & scheduling surfaces (month/week/day views, agendas, time grids,
 * availability booking, and event-form rows). A full scheduling suite, distinct
 * from the single `Calendar` primitive (a static month grid).
 *
 * Every component is data + callbacks + variants only: no fetching, no SDK, no
 * date library. All `Date`s are passed in via props (`month`/`week`/`day`/`now`)
 * — nothing reads the clock at import time. All colors resolve from the
 * compiled theme tokens via `useXenitionTheme()` (semantic slots, ramps, or a
 * token-derived `withAlpha` tint) — never a literal hex. Built on the shared
 * `../primitives` (Card, Button, Modal, Icon, Segmented).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceRowV4 = exports.MonthViewV4 = exports.MiniCalendarV4 = exports.EventDetailSheetV4 = exports.EventBlockV4 = exports.DayAgendaV4 = exports.DateNavigatorV4 = exports.AvailabilityPickerV4 = exports.AllDayRowV4 = exports.resolveTone = exports.withAlpha = exports.weekdayHeader = exports.monthGrid = exports.timeRangeLabel = exports.hourLabel = exports.clockLabel = exports.minutesSinceMidnight = exports.weekDates = exports.startOfWeek = exports.addMonths = exports.addDays = exports.sameMonth = exports.sameDay = exports.monthLongLabel = exports.monthLabel = exports.weekdayLabel = exports.MONTHS_LONG = exports.MONTHS_SHORT = exports.WEEKDAYS_NARROW = exports.WEEKDAYS_SHORT = exports.TimezoneRow = exports.RecurrenceRow = exports.AllDayRow = exports.DateNavigator = exports.EventDetailSheet = exports.MiniCalendar = exports.AvailabilityPicker = exports.TimeGrid = exports.EventBlock = exports.DayAgenda = exports.AvailabilityPickerV3 = exports.AvailabilityPickerV2 = exports.EventBlockV3 = exports.EventBlockV2 = exports.DayAgendaV3 = exports.DayAgendaV2 = exports.MonthViewV3 = exports.MonthViewV2 = exports.WeekView = exports.MonthView = void 0;
exports.WeekViewV4 = exports.TimezoneRowV4 = exports.TimeGridV4 = void 0;
var MonthView_1 = require("./MonthView");
Object.defineProperty(exports, "MonthView", { enumerable: true, get: function () { return MonthView_1.MonthView; } });
var WeekView_1 = require("./WeekView");
Object.defineProperty(exports, "WeekView", { enumerable: true, get: function () { return WeekView_1.WeekView; } });
var MonthViewV2_1 = require("./MonthViewV2");
Object.defineProperty(exports, "MonthViewV2", { enumerable: true, get: function () { return MonthViewV2_1.MonthViewV2; } });
var MonthViewV3_1 = require("./MonthViewV3");
Object.defineProperty(exports, "MonthViewV3", { enumerable: true, get: function () { return MonthViewV3_1.MonthViewV3; } });
var DayAgendaV2_1 = require("./DayAgendaV2");
Object.defineProperty(exports, "DayAgendaV2", { enumerable: true, get: function () { return DayAgendaV2_1.DayAgendaV2; } });
var DayAgendaV3_1 = require("./DayAgendaV3");
Object.defineProperty(exports, "DayAgendaV3", { enumerable: true, get: function () { return DayAgendaV3_1.DayAgendaV3; } });
var EventBlockV2_1 = require("./EventBlockV2");
Object.defineProperty(exports, "EventBlockV2", { enumerable: true, get: function () { return EventBlockV2_1.EventBlockV2; } });
var EventBlockV3_1 = require("./EventBlockV3");
Object.defineProperty(exports, "EventBlockV3", { enumerable: true, get: function () { return EventBlockV3_1.EventBlockV3; } });
var AvailabilityPickerV2_1 = require("./AvailabilityPickerV2");
Object.defineProperty(exports, "AvailabilityPickerV2", { enumerable: true, get: function () { return AvailabilityPickerV2_1.AvailabilityPickerV2; } });
var AvailabilityPickerV3_1 = require("./AvailabilityPickerV3");
Object.defineProperty(exports, "AvailabilityPickerV3", { enumerable: true, get: function () { return AvailabilityPickerV3_1.AvailabilityPickerV3; } });
var DayAgenda_1 = require("./DayAgenda");
Object.defineProperty(exports, "DayAgenda", { enumerable: true, get: function () { return DayAgenda_1.DayAgenda; } });
var EventBlock_1 = require("./EventBlock");
Object.defineProperty(exports, "EventBlock", { enumerable: true, get: function () { return EventBlock_1.EventBlock; } });
var TimeGrid_1 = require("./TimeGrid");
Object.defineProperty(exports, "TimeGrid", { enumerable: true, get: function () { return TimeGrid_1.TimeGrid; } });
var AvailabilityPicker_1 = require("./AvailabilityPicker");
Object.defineProperty(exports, "AvailabilityPicker", { enumerable: true, get: function () { return AvailabilityPicker_1.AvailabilityPicker; } });
var MiniCalendar_1 = require("./MiniCalendar");
Object.defineProperty(exports, "MiniCalendar", { enumerable: true, get: function () { return MiniCalendar_1.MiniCalendar; } });
var EventDetailSheet_1 = require("./EventDetailSheet");
Object.defineProperty(exports, "EventDetailSheet", { enumerable: true, get: function () { return EventDetailSheet_1.EventDetailSheet; } });
var DateNavigator_1 = require("./DateNavigator");
Object.defineProperty(exports, "DateNavigator", { enumerable: true, get: function () { return DateNavigator_1.DateNavigator; } });
var AllDayRow_1 = require("./AllDayRow");
Object.defineProperty(exports, "AllDayRow", { enumerable: true, get: function () { return AllDayRow_1.AllDayRow; } });
var RecurrenceRow_1 = require("./RecurrenceRow");
Object.defineProperty(exports, "RecurrenceRow", { enumerable: true, get: function () { return RecurrenceRow_1.RecurrenceRow; } });
var TimezoneRow_1 = require("./TimezoneRow");
Object.defineProperty(exports, "TimezoneRow", { enumerable: true, get: function () { return TimezoneRow_1.TimezoneRow; } });
// Shared date/time + token helpers (no external deps).
var format_1 = require("./format");
Object.defineProperty(exports, "WEEKDAYS_SHORT", { enumerable: true, get: function () { return format_1.WEEKDAYS_SHORT; } });
Object.defineProperty(exports, "WEEKDAYS_NARROW", { enumerable: true, get: function () { return format_1.WEEKDAYS_NARROW; } });
Object.defineProperty(exports, "MONTHS_SHORT", { enumerable: true, get: function () { return format_1.MONTHS_SHORT; } });
Object.defineProperty(exports, "MONTHS_LONG", { enumerable: true, get: function () { return format_1.MONTHS_LONG; } });
Object.defineProperty(exports, "weekdayLabel", { enumerable: true, get: function () { return format_1.weekdayLabel; } });
Object.defineProperty(exports, "monthLabel", { enumerable: true, get: function () { return format_1.monthLabel; } });
Object.defineProperty(exports, "monthLongLabel", { enumerable: true, get: function () { return format_1.monthLongLabel; } });
Object.defineProperty(exports, "sameDay", { enumerable: true, get: function () { return format_1.sameDay; } });
Object.defineProperty(exports, "sameMonth", { enumerable: true, get: function () { return format_1.sameMonth; } });
Object.defineProperty(exports, "addDays", { enumerable: true, get: function () { return format_1.addDays; } });
Object.defineProperty(exports, "addMonths", { enumerable: true, get: function () { return format_1.addMonths; } });
Object.defineProperty(exports, "startOfWeek", { enumerable: true, get: function () { return format_1.startOfWeek; } });
Object.defineProperty(exports, "weekDates", { enumerable: true, get: function () { return format_1.weekDates; } });
Object.defineProperty(exports, "minutesSinceMidnight", { enumerable: true, get: function () { return format_1.minutesSinceMidnight; } });
Object.defineProperty(exports, "clockLabel", { enumerable: true, get: function () { return format_1.clockLabel; } });
Object.defineProperty(exports, "hourLabel", { enumerable: true, get: function () { return format_1.hourLabel; } });
Object.defineProperty(exports, "timeRangeLabel", { enumerable: true, get: function () { return format_1.timeRangeLabel; } });
Object.defineProperty(exports, "monthGrid", { enumerable: true, get: function () { return format_1.monthGrid; } });
Object.defineProperty(exports, "weekdayHeader", { enumerable: true, get: function () { return format_1.weekdayHeader; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return format_1.withAlpha; } });
Object.defineProperty(exports, "resolveTone", { enumerable: true, get: function () { return format_1.resolveTone; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `CALENDAR-CHAT-V4-BRIEF.md`. Each
// is a drop-in for its base — same props plus optional additions.
var AllDayRowV4_1 = require("./AllDayRowV4");
Object.defineProperty(exports, "AllDayRowV4", { enumerable: true, get: function () { return AllDayRowV4_1.AllDayRowV4; } });
var AvailabilityPickerV4_1 = require("./AvailabilityPickerV4");
Object.defineProperty(exports, "AvailabilityPickerV4", { enumerable: true, get: function () { return AvailabilityPickerV4_1.AvailabilityPickerV4; } });
var DateNavigatorV4_1 = require("./DateNavigatorV4");
Object.defineProperty(exports, "DateNavigatorV4", { enumerable: true, get: function () { return DateNavigatorV4_1.DateNavigatorV4; } });
var DayAgendaV4_1 = require("./DayAgendaV4");
Object.defineProperty(exports, "DayAgendaV4", { enumerable: true, get: function () { return DayAgendaV4_1.DayAgendaV4; } });
var EventBlockV4_1 = require("./EventBlockV4");
Object.defineProperty(exports, "EventBlockV4", { enumerable: true, get: function () { return EventBlockV4_1.EventBlockV4; } });
var EventDetailSheetV4_1 = require("./EventDetailSheetV4");
Object.defineProperty(exports, "EventDetailSheetV4", { enumerable: true, get: function () { return EventDetailSheetV4_1.EventDetailSheetV4; } });
var MiniCalendarV4_1 = require("./MiniCalendarV4");
Object.defineProperty(exports, "MiniCalendarV4", { enumerable: true, get: function () { return MiniCalendarV4_1.MiniCalendarV4; } });
var MonthViewV4_1 = require("./MonthViewV4");
Object.defineProperty(exports, "MonthViewV4", { enumerable: true, get: function () { return MonthViewV4_1.MonthViewV4; } });
var RecurrenceRowV4_1 = require("./RecurrenceRowV4");
Object.defineProperty(exports, "RecurrenceRowV4", { enumerable: true, get: function () { return RecurrenceRowV4_1.RecurrenceRowV4; } });
var TimeGridV4_1 = require("./TimeGridV4");
Object.defineProperty(exports, "TimeGridV4", { enumerable: true, get: function () { return TimeGridV4_1.TimeGridV4; } });
var TimezoneRowV4_1 = require("./TimezoneRowV4");
Object.defineProperty(exports, "TimezoneRowV4", { enumerable: true, get: function () { return TimezoneRowV4_1.TimezoneRowV4; } });
var WeekViewV4_1 = require("./WeekViewV4");
Object.defineProperty(exports, "WeekViewV4", { enumerable: true, get: function () { return WeekViewV4_1.WeekViewV4; } });
//# sourceMappingURL=index.js.map