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
exports.weekRow = exports.monthMatrix = exports.startOfMonth = exports.addDays = exports.formatTimeInTz = exports.dayKeyInTz = exports.toDayKey = exports.BookingSummary = exports.SlotPicker = exports.BookingCalendar = void 0;
var BookingCalendar_1 = require("./BookingCalendar");
Object.defineProperty(exports, "BookingCalendar", { enumerable: true, get: function () { return BookingCalendar_1.BookingCalendar; } });
var SlotPicker_1 = require("./SlotPicker");
Object.defineProperty(exports, "SlotPicker", { enumerable: true, get: function () { return SlotPicker_1.SlotPicker; } });
var BookingSummary_1 = require("./BookingSummary");
Object.defineProperty(exports, "BookingSummary", { enumerable: true, get: function () { return BookingSummary_1.BookingSummary; } });
var datetime_1 = require("./datetime");
Object.defineProperty(exports, "toDayKey", { enumerable: true, get: function () { return datetime_1.toDayKey; } });
Object.defineProperty(exports, "dayKeyInTz", { enumerable: true, get: function () { return datetime_1.dayKeyInTz; } });
Object.defineProperty(exports, "formatTimeInTz", { enumerable: true, get: function () { return datetime_1.formatTimeInTz; } });
Object.defineProperty(exports, "addDays", { enumerable: true, get: function () { return datetime_1.addDays; } });
Object.defineProperty(exports, "startOfMonth", { enumerable: true, get: function () { return datetime_1.startOfMonth; } });
Object.defineProperty(exports, "monthMatrix", { enumerable: true, get: function () { return datetime_1.monthMatrix; } });
Object.defineProperty(exports, "weekRow", { enumerable: true, get: function () { return datetime_1.weekRow; } });
//# sourceMappingURL=index.js.map