"use strict";
/**
 * `@xenition/ui/travel` — web (React DOM) parity of the native travel module:
 * composed travel, hospitality, and booking blocks. Presentational only: every
 * component takes shaped data plus callbacks (nothing fetches) and is styled
 * exclusively from the `--xen-*` token classes via the Tailwind preset, so a
 * seed change (dark mode included) restyles the whole set. No literal colors,
 * no external map dependency — `MapCard` is a static styled `div` placeholder.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherStrip = exports.AmenityRow = exports.ReviewStars = exports.MapCard = exports.PriceCalendar = exports.BoardingPass = exports.BaggageRow = exports.TripSummary = exports.DestinationCardV3 = exports.DestinationCardV2 = exports.DestinationCard = exports.SeatPicker = exports.ItineraryItemV3 = exports.ItineraryItemV2 = exports.ItineraryItem = exports.HotelCardV3 = exports.HotelCardV2 = exports.HotelCard = exports.FlightCardV3 = exports.FlightCardV2 = exports.FlightCard = void 0;
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
//# sourceMappingURL=index.js.map