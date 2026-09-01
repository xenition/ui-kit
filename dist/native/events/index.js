"use strict";
/**
 * `@xenition/ui/native/events` — presentational React Native components for
 * event, ticketing and conference surfaces (browse → schedule → ticket →
 * check-in). Every component is data + callbacks + variants only: no fetching,
 * no SDK import, no barcode/scan dependency (the `TicketStub` barcode is a
 * token-drawn placeholder). All colors resolve from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors. Built on the shared
 * `../primitives` (Card, Button, Badge, Icon, Avatar, AvatarGroup, Rating).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueCardV4 = exports.TicketTypeRowV4 = exports.TicketStubV4 = exports.SpeakerCardV4 = exports.SessionCardV4 = exports.ScheduleRowV4 = exports.RSVPButtonV4 = exports.EventCardV4 = exports.CountdownBadgeV4 = exports.CheckInRowV4 = exports.CalendarStripV4 = exports.AgendaListV4 = exports.MONTHS_SHORT = exports.WEEKDAYS_SHORT = exports.countdownParts = exports.sameDay = exports.monthLabel = exports.weekdayLabel = exports.SessionCardV3 = exports.SessionCardV2 = exports.SpeakerCardV3 = exports.SpeakerCardV2 = exports.TicketStubV3 = exports.TicketStubV2 = exports.EventCardV3 = exports.EventCardV2 = exports.SessionCard = exports.CalendarStrip = exports.CheckInRow = exports.TicketTypeRow = exports.CountdownBadge = exports.VenueCard = exports.ScheduleRow = exports.SpeakerCard = exports.AgendaList = exports.RSVPButton = exports.TicketStub = exports.EventCard = void 0;
var EventCard_1 = require("./EventCard");
Object.defineProperty(exports, "EventCard", { enumerable: true, get: function () { return EventCard_1.EventCard; } });
var TicketStub_1 = require("./TicketStub");
Object.defineProperty(exports, "TicketStub", { enumerable: true, get: function () { return TicketStub_1.TicketStub; } });
var RSVPButton_1 = require("./RSVPButton");
Object.defineProperty(exports, "RSVPButton", { enumerable: true, get: function () { return RSVPButton_1.RSVPButton; } });
var AgendaList_1 = require("./AgendaList");
Object.defineProperty(exports, "AgendaList", { enumerable: true, get: function () { return AgendaList_1.AgendaList; } });
var SpeakerCard_1 = require("./SpeakerCard");
Object.defineProperty(exports, "SpeakerCard", { enumerable: true, get: function () { return SpeakerCard_1.SpeakerCard; } });
var ScheduleRow_1 = require("./ScheduleRow");
Object.defineProperty(exports, "ScheduleRow", { enumerable: true, get: function () { return ScheduleRow_1.ScheduleRow; } });
var VenueCard_1 = require("./VenueCard");
Object.defineProperty(exports, "VenueCard", { enumerable: true, get: function () { return VenueCard_1.VenueCard; } });
var CountdownBadge_1 = require("./CountdownBadge");
Object.defineProperty(exports, "CountdownBadge", { enumerable: true, get: function () { return CountdownBadge_1.CountdownBadge; } });
var TicketTypeRow_1 = require("./TicketTypeRow");
Object.defineProperty(exports, "TicketTypeRow", { enumerable: true, get: function () { return TicketTypeRow_1.TicketTypeRow; } });
var CheckInRow_1 = require("./CheckInRow");
Object.defineProperty(exports, "CheckInRow", { enumerable: true, get: function () { return CheckInRow_1.CheckInRow; } });
var CalendarStrip_1 = require("./CalendarStrip");
Object.defineProperty(exports, "CalendarStrip", { enumerable: true, get: function () { return CalendarStrip_1.CalendarStrip; } });
var SessionCard_1 = require("./SessionCard");
Object.defineProperty(exports, "SessionCard", { enumerable: true, get: function () { return SessionCard_1.SessionCard; } });
// Alternate drop-in designs (v2 / v3) — same props as the base component.
var EventCardV2_1 = require("./EventCardV2");
Object.defineProperty(exports, "EventCardV2", { enumerable: true, get: function () { return EventCardV2_1.EventCardV2; } });
var EventCardV3_1 = require("./EventCardV3");
Object.defineProperty(exports, "EventCardV3", { enumerable: true, get: function () { return EventCardV3_1.EventCardV3; } });
var TicketStubV2_1 = require("./TicketStubV2");
Object.defineProperty(exports, "TicketStubV2", { enumerable: true, get: function () { return TicketStubV2_1.TicketStubV2; } });
var TicketStubV3_1 = require("./TicketStubV3");
Object.defineProperty(exports, "TicketStubV3", { enumerable: true, get: function () { return TicketStubV3_1.TicketStubV3; } });
var SpeakerCardV2_1 = require("./SpeakerCardV2");
Object.defineProperty(exports, "SpeakerCardV2", { enumerable: true, get: function () { return SpeakerCardV2_1.SpeakerCardV2; } });
var SpeakerCardV3_1 = require("./SpeakerCardV3");
Object.defineProperty(exports, "SpeakerCardV3", { enumerable: true, get: function () { return SpeakerCardV3_1.SpeakerCardV3; } });
var SessionCardV2_1 = require("./SessionCardV2");
Object.defineProperty(exports, "SessionCardV2", { enumerable: true, get: function () { return SessionCardV2_1.SessionCardV2; } });
var SessionCardV3_1 = require("./SessionCardV3");
Object.defineProperty(exports, "SessionCardV3", { enumerable: true, get: function () { return SessionCardV3_1.SessionCardV3; } });
// Shared date/time helpers (no external deps).
var format_1 = require("./format");
Object.defineProperty(exports, "weekdayLabel", { enumerable: true, get: function () { return format_1.weekdayLabel; } });
Object.defineProperty(exports, "monthLabel", { enumerable: true, get: function () { return format_1.monthLabel; } });
Object.defineProperty(exports, "sameDay", { enumerable: true, get: function () { return format_1.sameDay; } });
Object.defineProperty(exports, "countdownParts", { enumerable: true, get: function () { return format_1.countdownParts; } });
Object.defineProperty(exports, "WEEKDAYS_SHORT", { enumerable: true, get: function () { return format_1.WEEKDAYS_SHORT; } });
Object.defineProperty(exports, "MONTHS_SHORT", { enumerable: true, get: function () { return format_1.MONTHS_SHORT; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `EVENTS-FIELDSERVICE-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
var AgendaListV4_1 = require("./AgendaListV4");
Object.defineProperty(exports, "AgendaListV4", { enumerable: true, get: function () { return AgendaListV4_1.AgendaListV4; } });
var CalendarStripV4_1 = require("./CalendarStripV4");
Object.defineProperty(exports, "CalendarStripV4", { enumerable: true, get: function () { return CalendarStripV4_1.CalendarStripV4; } });
var CheckInRowV4_1 = require("./CheckInRowV4");
Object.defineProperty(exports, "CheckInRowV4", { enumerable: true, get: function () { return CheckInRowV4_1.CheckInRowV4; } });
var CountdownBadgeV4_1 = require("./CountdownBadgeV4");
Object.defineProperty(exports, "CountdownBadgeV4", { enumerable: true, get: function () { return CountdownBadgeV4_1.CountdownBadgeV4; } });
var EventCardV4_1 = require("./EventCardV4");
Object.defineProperty(exports, "EventCardV4", { enumerable: true, get: function () { return EventCardV4_1.EventCardV4; } });
var RSVPButtonV4_1 = require("./RSVPButtonV4");
Object.defineProperty(exports, "RSVPButtonV4", { enumerable: true, get: function () { return RSVPButtonV4_1.RSVPButtonV4; } });
var ScheduleRowV4_1 = require("./ScheduleRowV4");
Object.defineProperty(exports, "ScheduleRowV4", { enumerable: true, get: function () { return ScheduleRowV4_1.ScheduleRowV4; } });
var SessionCardV4_1 = require("./SessionCardV4");
Object.defineProperty(exports, "SessionCardV4", { enumerable: true, get: function () { return SessionCardV4_1.SessionCardV4; } });
var SpeakerCardV4_1 = require("./SpeakerCardV4");
Object.defineProperty(exports, "SpeakerCardV4", { enumerable: true, get: function () { return SpeakerCardV4_1.SpeakerCardV4; } });
var TicketStubV4_1 = require("./TicketStubV4");
Object.defineProperty(exports, "TicketStubV4", { enumerable: true, get: function () { return TicketStubV4_1.TicketStubV4; } });
var TicketTypeRowV4_1 = require("./TicketTypeRowV4");
Object.defineProperty(exports, "TicketTypeRowV4", { enumerable: true, get: function () { return TicketTypeRowV4_1.TicketTypeRowV4; } });
var VenueCardV4_1 = require("./VenueCardV4");
Object.defineProperty(exports, "VenueCardV4", { enumerable: true, get: function () { return VenueCardV4_1.VenueCardV4; } });
//# sourceMappingURL=index.js.map