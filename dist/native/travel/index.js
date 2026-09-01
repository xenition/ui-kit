"use strict";
/**
 * `@xenition/ui/native/travel` — composed travel, hospitality, and booking
 * blocks for React Native. Mobile-first, presentational only: every component
 * takes shaped data plus callbacks (nothing fetches) and is styled exclusively
 * from the compiled theme via `useXenitionTheme()`, so a seed change (dark mode
 * included) restyles the whole set. No literal colors, no external map or
 * native dependencies — `MapCard` is a static styled placeholder.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoyaltyCard = exports.FlightStatusBanner = exports.TripHeader = exports.WeatherStripV4 = exports.ReviewStarsV4 = exports.MapCardV4 = exports.BaggageRowV4 = exports.AmenityRowV4 = exports.PriceCalendarV4 = exports.SeatPickerV4 = exports.BoardingPassV4 = exports.TripSummaryV4 = exports.DestinationCardV4 = exports.ItineraryItemV4 = exports.HotelCardV4 = exports.FlightCardV4 = exports.WeatherStrip = exports.AmenityRow = exports.ReviewStars = exports.MapCard = exports.PriceCalendar = exports.BoardingPass = exports.BaggageRow = exports.TripSummary = exports.DestinationCardV3 = exports.DestinationCardV2 = exports.DestinationCard = exports.SeatPicker = exports.ItineraryItemV3 = exports.ItineraryItemV2 = exports.ItineraryItem = exports.HotelCardV3 = exports.HotelCardV2 = exports.HotelCard = exports.FlightCardV3 = exports.FlightCardV2 = exports.FlightCard = void 0;
var FlightCard_1 = require("./FlightCard");
Object.defineProperty(exports, "FlightCard", { enumerable: true, get: function () { return FlightCard_1.FlightCard; } });
var FlightCardV2_1 = require("./FlightCardV2");
Object.defineProperty(exports, "FlightCardV2", { enumerable: true, get: function () { return FlightCardV2_1.FlightCardV2; } });
var FlightCardV3_1 = require("./FlightCardV3");
Object.defineProperty(exports, "FlightCardV3", { enumerable: true, get: function () { return FlightCardV3_1.FlightCardV3; } });
var HotelCard_1 = require("./HotelCard");
Object.defineProperty(exports, "HotelCard", { enumerable: true, get: function () { return HotelCard_1.HotelCard; } });
var HotelCardV2_1 = require("./HotelCardV2");
Object.defineProperty(exports, "HotelCardV2", { enumerable: true, get: function () { return HotelCardV2_1.HotelCardV2; } });
var HotelCardV3_1 = require("./HotelCardV3");
Object.defineProperty(exports, "HotelCardV3", { enumerable: true, get: function () { return HotelCardV3_1.HotelCardV3; } });
var ItineraryItem_1 = require("./ItineraryItem");
Object.defineProperty(exports, "ItineraryItem", { enumerable: true, get: function () { return ItineraryItem_1.ItineraryItem; } });
var ItineraryItemV2_1 = require("./ItineraryItemV2");
Object.defineProperty(exports, "ItineraryItemV2", { enumerable: true, get: function () { return ItineraryItemV2_1.ItineraryItemV2; } });
var ItineraryItemV3_1 = require("./ItineraryItemV3");
Object.defineProperty(exports, "ItineraryItemV3", { enumerable: true, get: function () { return ItineraryItemV3_1.ItineraryItemV3; } });
var SeatPicker_1 = require("./SeatPicker");
Object.defineProperty(exports, "SeatPicker", { enumerable: true, get: function () { return SeatPicker_1.SeatPicker; } });
var DestinationCard_1 = require("./DestinationCard");
Object.defineProperty(exports, "DestinationCard", { enumerable: true, get: function () { return DestinationCard_1.DestinationCard; } });
var DestinationCardV2_1 = require("./DestinationCardV2");
Object.defineProperty(exports, "DestinationCardV2", { enumerable: true, get: function () { return DestinationCardV2_1.DestinationCardV2; } });
var DestinationCardV3_1 = require("./DestinationCardV3");
Object.defineProperty(exports, "DestinationCardV3", { enumerable: true, get: function () { return DestinationCardV3_1.DestinationCardV3; } });
var TripSummary_1 = require("./TripSummary");
Object.defineProperty(exports, "TripSummary", { enumerable: true, get: function () { return TripSummary_1.TripSummary; } });
var BaggageRow_1 = require("./BaggageRow");
Object.defineProperty(exports, "BaggageRow", { enumerable: true, get: function () { return BaggageRow_1.BaggageRow; } });
var BoardingPass_1 = require("./BoardingPass");
Object.defineProperty(exports, "BoardingPass", { enumerable: true, get: function () { return BoardingPass_1.BoardingPass; } });
var PriceCalendar_1 = require("./PriceCalendar");
Object.defineProperty(exports, "PriceCalendar", { enumerable: true, get: function () { return PriceCalendar_1.PriceCalendar; } });
var MapCard_1 = require("./MapCard");
Object.defineProperty(exports, "MapCard", { enumerable: true, get: function () { return MapCard_1.MapCard; } });
var ReviewStars_1 = require("./ReviewStars");
Object.defineProperty(exports, "ReviewStars", { enumerable: true, get: function () { return ReviewStars_1.ReviewStars; } });
var AmenityRow_1 = require("./AmenityRow");
Object.defineProperty(exports, "AmenityRow", { enumerable: true, get: function () { return AmenityRow_1.AmenityRow; } });
var WeatherStrip_1 = require("./WeatherStrip");
Object.defineProperty(exports, "WeatherStrip", { enumerable: true, get: function () { return WeatherStrip_1.WeatherStrip; } });
/*
 * ── V4 "journey" (boarding-pass) design line ──
 * A drop-in V4 variant for each of the 13 originals: elevated clean cards with a
 * small brand-gradient glyph disc, route rails with a plane glyph, dashed
 * boarding-pass tear lines, and gradient heroes on the peak moments (boarding
 * pass, trip summary, destination covers). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var FlightCardV4_1 = require("./FlightCardV4");
Object.defineProperty(exports, "FlightCardV4", { enumerable: true, get: function () { return FlightCardV4_1.FlightCardV4; } });
var HotelCardV4_1 = require("./HotelCardV4");
Object.defineProperty(exports, "HotelCardV4", { enumerable: true, get: function () { return HotelCardV4_1.HotelCardV4; } });
var ItineraryItemV4_1 = require("./ItineraryItemV4");
Object.defineProperty(exports, "ItineraryItemV4", { enumerable: true, get: function () { return ItineraryItemV4_1.ItineraryItemV4; } });
var DestinationCardV4_1 = require("./DestinationCardV4");
Object.defineProperty(exports, "DestinationCardV4", { enumerable: true, get: function () { return DestinationCardV4_1.DestinationCardV4; } });
var TripSummaryV4_1 = require("./TripSummaryV4");
Object.defineProperty(exports, "TripSummaryV4", { enumerable: true, get: function () { return TripSummaryV4_1.TripSummaryV4; } });
var BoardingPassV4_1 = require("./BoardingPassV4");
Object.defineProperty(exports, "BoardingPassV4", { enumerable: true, get: function () { return BoardingPassV4_1.BoardingPassV4; } });
var SeatPickerV4_1 = require("./SeatPickerV4");
Object.defineProperty(exports, "SeatPickerV4", { enumerable: true, get: function () { return SeatPickerV4_1.SeatPickerV4; } });
var PriceCalendarV4_1 = require("./PriceCalendarV4");
Object.defineProperty(exports, "PriceCalendarV4", { enumerable: true, get: function () { return PriceCalendarV4_1.PriceCalendarV4; } });
var AmenityRowV4_1 = require("./AmenityRowV4");
Object.defineProperty(exports, "AmenityRowV4", { enumerable: true, get: function () { return AmenityRowV4_1.AmenityRowV4; } });
var BaggageRowV4_1 = require("./BaggageRowV4");
Object.defineProperty(exports, "BaggageRowV4", { enumerable: true, get: function () { return BaggageRowV4_1.BaggageRowV4; } });
var MapCardV4_1 = require("./MapCardV4");
Object.defineProperty(exports, "MapCardV4", { enumerable: true, get: function () { return MapCardV4_1.MapCardV4; } });
var ReviewStarsV4_1 = require("./ReviewStarsV4");
Object.defineProperty(exports, "ReviewStarsV4", { enumerable: true, get: function () { return ReviewStarsV4_1.ReviewStarsV4; } });
var WeatherStripV4_1 = require("./WeatherStripV4");
Object.defineProperty(exports, "WeatherStripV4", { enumerable: true, get: function () { return WeatherStripV4_1.WeatherStripV4; } });
/* ── New composed blocks (V4 journey line) ── */
var TripHeader_1 = require("./TripHeader");
Object.defineProperty(exports, "TripHeader", { enumerable: true, get: function () { return TripHeader_1.TripHeader; } });
var FlightStatusBanner_1 = require("./FlightStatusBanner");
Object.defineProperty(exports, "FlightStatusBanner", { enumerable: true, get: function () { return FlightStatusBanner_1.FlightStatusBanner; } });
var LoyaltyCard_1 = require("./LoyaltyCard");
Object.defineProperty(exports, "LoyaltyCard", { enumerable: true, get: function () { return LoyaltyCard_1.LoyaltyCard; } });
//# sourceMappingURL=index.js.map