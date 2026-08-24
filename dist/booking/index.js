"use strict";
/**
 * `@xenition/ui/booking` — presentational scheduling components.
 *
 * Props mirror the booking module: a `BookingResource`
 * `{name,timezone,slotMinutes}` and a `BookingSlot` `{startsAt,endsAt,spotsLeft}`
 * (instants are ISO-8601 strings). Nothing fetches — the app passes shaped
 * data — and everything is styled via the `--xen-*` tokens, so a seed change
 * restyles the whole flow (dark mode included). Keyboard + ARIA throughout.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.weekRow = exports.monthMatrix = exports.startOfMonth = exports.addDays = exports.formatTimeInTz = exports.dayKeyInTz = exports.toDayKey = exports.BookingSummaryV3 = exports.BookingSummaryV2 = exports.BookingSummary = exports.SlotPickerV3 = exports.SlotPickerV2 = exports.SlotPicker = exports.BookingCalendarV3 = exports.BookingCalendarV2 = exports.BookingCalendar = void 0;
var BookingCalendar_1 = require("./BookingCalendar");
Object.defineProperty(exports, "BookingCalendar", { enumerable: true, get: function () { return BookingCalendar_1.BookingCalendar; } });
var BookingCalendarV2_1 = require("./BookingCalendarV2");
Object.defineProperty(exports, "BookingCalendarV2", { enumerable: true, get: function () { return BookingCalendarV2_1.BookingCalendarV2; } });
var BookingCalendarV3_1 = require("./BookingCalendarV3");
Object.defineProperty(exports, "BookingCalendarV3", { enumerable: true, get: function () { return BookingCalendarV3_1.BookingCalendarV3; } });
var SlotPicker_1 = require("./SlotPicker");
Object.defineProperty(exports, "SlotPicker", { enumerable: true, get: function () { return SlotPicker_1.SlotPicker; } });
var SlotPickerV2_1 = require("./SlotPickerV2");
Object.defineProperty(exports, "SlotPickerV2", { enumerable: true, get: function () { return SlotPickerV2_1.SlotPickerV2; } });
var SlotPickerV3_1 = require("./SlotPickerV3");
Object.defineProperty(exports, "SlotPickerV3", { enumerable: true, get: function () { return SlotPickerV3_1.SlotPickerV3; } });
var BookingSummary_1 = require("./BookingSummary");
Object.defineProperty(exports, "BookingSummary", { enumerable: true, get: function () { return BookingSummary_1.BookingSummary; } });
var BookingSummaryV2_1 = require("./BookingSummaryV2");
Object.defineProperty(exports, "BookingSummaryV2", { enumerable: true, get: function () { return BookingSummaryV2_1.BookingSummaryV2; } });
var BookingSummaryV3_1 = require("./BookingSummaryV3");
Object.defineProperty(exports, "BookingSummaryV3", { enumerable: true, get: function () { return BookingSummaryV3_1.BookingSummaryV3; } });
var datetime_1 = require("./datetime");
Object.defineProperty(exports, "toDayKey", { enumerable: true, get: function () { return datetime_1.toDayKey; } });
Object.defineProperty(exports, "dayKeyInTz", { enumerable: true, get: function () { return datetime_1.dayKeyInTz; } });
Object.defineProperty(exports, "formatTimeInTz", { enumerable: true, get: function () { return datetime_1.formatTimeInTz; } });
Object.defineProperty(exports, "addDays", { enumerable: true, get: function () { return datetime_1.addDays; } });
Object.defineProperty(exports, "startOfMonth", { enumerable: true, get: function () { return datetime_1.startOfMonth; } });
Object.defineProperty(exports, "monthMatrix", { enumerable: true, get: function () { return datetime_1.monthMatrix; } });
Object.defineProperty(exports, "weekRow", { enumerable: true, get: function () { return datetime_1.weekRow; } });
//# sourceMappingURL=index.js.map