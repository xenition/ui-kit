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
exports.resolveTone = exports.withAlpha = exports.weekdayHeader = exports.monthGrid = exports.timeRangeLabel = exports.hourLabel = exports.clockLabel = exports.minutesSinceMidnight = exports.weekDates = exports.startOfWeek = exports.addMonths = exports.addDays = exports.sameMonth = exports.sameDay = exports.monthLongLabel = exports.monthLabel = exports.weekdayLabel = exports.MONTHS_LONG = exports.MONTHS_SHORT = exports.WEEKDAYS_NARROW = exports.WEEKDAYS_SHORT = exports.TimezoneRow = exports.RecurrenceRow = exports.AllDayRow = exports.DateNavigator = exports.EventDetailSheet = exports.MiniCalendar = exports.AvailabilityPicker = exports.TimeGrid = exports.EventBlock = exports.DayAgenda = exports.WeekView = exports.MonthView = void 0;
var MonthView_1 = require("./MonthView");
Object.defineProperty(exports, "MonthView", { enumerable: true, get: function () { return MonthView_1.MonthView; } });
var WeekView_1 = require("./WeekView");
Object.defineProperty(exports, "WeekView", { enumerable: true, get: function () { return WeekView_1.WeekView; } });
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
//# sourceMappingURL=index.js.map