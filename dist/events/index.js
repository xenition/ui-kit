"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONTHS_SHORT = exports.WEEKDAYS_SHORT = exports.countdownParts = exports.sameDay = exports.monthLabel = exports.weekdayLabel = exports.SessionCardV3 = exports.SessionCardV2 = exports.SessionCard = exports.CalendarStrip = exports.CheckInRow = exports.TicketTypeRow = exports.CountdownBadge = exports.VenueCard = exports.ScheduleRow = exports.SpeakerCardV3 = exports.SpeakerCardV2 = exports.SpeakerCard = exports.AgendaList = exports.RSVPButton = exports.TicketStubV3 = exports.TicketStubV2 = exports.TicketStub = exports.EventCardV3 = exports.EventCardV2 = exports.EventCard = void 0;
var EventCard_1 = require("./EventCard");
Object.defineProperty(exports, "EventCard", { enumerable: true, get: function () { return EventCard_1.EventCard; } });
var EventCardV2_1 = require("./EventCardV2");
Object.defineProperty(exports, "EventCardV2", { enumerable: true, get: function () { return EventCardV2_1.EventCardV2; } });
var EventCardV3_1 = require("./EventCardV3");
Object.defineProperty(exports, "EventCardV3", { enumerable: true, get: function () { return EventCardV3_1.EventCardV3; } });
var TicketStub_1 = require("./TicketStub");
Object.defineProperty(exports, "TicketStub", { enumerable: true, get: function () { return TicketStub_1.TicketStub; } });
var TicketStubV2_1 = require("./TicketStubV2");
Object.defineProperty(exports, "TicketStubV2", { enumerable: true, get: function () { return TicketStubV2_1.TicketStubV2; } });
var TicketStubV3_1 = require("./TicketStubV3");
Object.defineProperty(exports, "TicketStubV3", { enumerable: true, get: function () { return TicketStubV3_1.TicketStubV3; } });
var RSVPButton_1 = require("./RSVPButton");
Object.defineProperty(exports, "RSVPButton", { enumerable: true, get: function () { return RSVPButton_1.RSVPButton; } });
var AgendaList_1 = require("./AgendaList");
Object.defineProperty(exports, "AgendaList", { enumerable: true, get: function () { return AgendaList_1.AgendaList; } });
var SpeakerCard_1 = require("./SpeakerCard");
Object.defineProperty(exports, "SpeakerCard", { enumerable: true, get: function () { return SpeakerCard_1.SpeakerCard; } });
var SpeakerCardV2_1 = require("./SpeakerCardV2");
Object.defineProperty(exports, "SpeakerCardV2", { enumerable: true, get: function () { return SpeakerCardV2_1.SpeakerCardV2; } });
var SpeakerCardV3_1 = require("./SpeakerCardV3");
Object.defineProperty(exports, "SpeakerCardV3", { enumerable: true, get: function () { return SpeakerCardV3_1.SpeakerCardV3; } });
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
var SessionCardV2_1 = require("./SessionCardV2");
Object.defineProperty(exports, "SessionCardV2", { enumerable: true, get: function () { return SessionCardV2_1.SessionCardV2; } });
var SessionCardV3_1 = require("./SessionCardV3");
Object.defineProperty(exports, "SessionCardV3", { enumerable: true, get: function () { return SessionCardV3_1.SessionCardV3; } });
// Shared date/time helpers (no external deps, no clock at import).
var format_1 = require("./format");
Object.defineProperty(exports, "weekdayLabel", { enumerable: true, get: function () { return format_1.weekdayLabel; } });
Object.defineProperty(exports, "monthLabel", { enumerable: true, get: function () { return format_1.monthLabel; } });
Object.defineProperty(exports, "sameDay", { enumerable: true, get: function () { return format_1.sameDay; } });
Object.defineProperty(exports, "countdownParts", { enumerable: true, get: function () { return format_1.countdownParts; } });
Object.defineProperty(exports, "WEEKDAYS_SHORT", { enumerable: true, get: function () { return format_1.WEEKDAYS_SHORT; } });
Object.defineProperty(exports, "MONTHS_SHORT", { enumerable: true, get: function () { return format_1.MONTHS_SHORT; } });
//# sourceMappingURL=index.js.map