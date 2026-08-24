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
exports.WeatherStrip = exports.AmenityRow = exports.ReviewStars = exports.MapCard = exports.PriceCalendar = exports.BoardingPass = exports.BaggageRow = exports.TripSummary = exports.DestinationCard = exports.SeatPicker = exports.ItineraryItem = exports.HotelCard = exports.FlightCard = void 0;
var FlightCard_1 = require("./FlightCard");
Object.defineProperty(exports, "FlightCard", { enumerable: true, get: function () { return FlightCard_1.FlightCard; } });
var HotelCard_1 = require("./HotelCard");
Object.defineProperty(exports, "HotelCard", { enumerable: true, get: function () { return HotelCard_1.HotelCard; } });
var ItineraryItem_1 = require("./ItineraryItem");
Object.defineProperty(exports, "ItineraryItem", { enumerable: true, get: function () { return ItineraryItem_1.ItineraryItem; } });
var SeatPicker_1 = require("./SeatPicker");
Object.defineProperty(exports, "SeatPicker", { enumerable: true, get: function () { return SeatPicker_1.SeatPicker; } });
var DestinationCard_1 = require("./DestinationCard");
Object.defineProperty(exports, "DestinationCard", { enumerable: true, get: function () { return DestinationCard_1.DestinationCard; } });
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