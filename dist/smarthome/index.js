"use strict";
/**
 * `@xenition/ui/smarthome` — presentational IoT / smart-home / device-control
 * blocks for React DOM. The web parity of `@xenition/ui/native/smarthome`:
 * identical names + prop contract, with `onPress`→`onClick` and React Native
 * views/`Pressable`s rewritten to DOM elements. Composed from the web primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Switch`, `Slider`) and the shared inline-
 * SVG `BarChart`, plus the shared `EmptyState`. Styled exclusively through the
 * Tailwind `--xen-*` token classes — no literal colors; the circular
 * `ThermostatDial` is a dependency-free inline `<svg>` arc whose stroke/fill
 * reference `var(--xen-*)`. Status is always carried by text + a glyph (never
 * color alone), interactive parts expose proper a11y roles, and every component
 * has empty / loading affordances. None fetches or imports the SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertCard = exports.FavoritesGrid = exports.DEFAULT_MODES = exports.ModeSelector = exports.EnergyDashboard = exports.RoomHeader = exports.HomeHeader = exports.EnergyUsageV4 = exports.SensorReadingV4 = exports.ScheduleRowV4 = exports.AutomationRuleV4 = exports.RoomGroupV4 = exports.CameraTileV4 = exports.LockControlV4 = exports.DeviceToggleRowV4 = exports.SceneCardV4 = exports.ThermostatDialV4 = exports.LightControlV4 = exports.DeviceTileV4 = exports.ScheduleRow = exports.DeviceToggleRow = exports.RoomGroup = exports.LockControl = exports.CameraTile = exports.EnergyUsage = exports.AutomationRule = exports.SensorReading = exports.SceneCardV3 = exports.SceneCardV2 = exports.SceneCard = exports.LightControlV3 = exports.LightControlV2 = exports.LightControl = exports.ThermostatDialV3 = exports.ThermostatDialV2 = exports.ThermostatDial = exports.DeviceTileV3 = exports.DeviceTileV2 = exports.DeviceTile = void 0;
var DeviceTile_1 = require("./DeviceTile");
Object.defineProperty(exports, "DeviceTile", { enumerable: true, get: function () { return DeviceTile_1.DeviceTile; } });
var DeviceTileV2_1 = require("./DeviceTileV2");
Object.defineProperty(exports, "DeviceTileV2", { enumerable: true, get: function () { return DeviceTileV2_1.DeviceTileV2; } });
var DeviceTileV3_1 = require("./DeviceTileV3");
Object.defineProperty(exports, "DeviceTileV3", { enumerable: true, get: function () { return DeviceTileV3_1.DeviceTileV3; } });
var ThermostatDial_1 = require("./ThermostatDial");
Object.defineProperty(exports, "ThermostatDial", { enumerable: true, get: function () { return ThermostatDial_1.ThermostatDial; } });
var ThermostatDialV2_1 = require("./ThermostatDialV2");
Object.defineProperty(exports, "ThermostatDialV2", { enumerable: true, get: function () { return ThermostatDialV2_1.ThermostatDialV2; } });
var ThermostatDialV3_1 = require("./ThermostatDialV3");
Object.defineProperty(exports, "ThermostatDialV3", { enumerable: true, get: function () { return ThermostatDialV3_1.ThermostatDialV3; } });
var LightControl_1 = require("./LightControl");
Object.defineProperty(exports, "LightControl", { enumerable: true, get: function () { return LightControl_1.LightControl; } });
var LightControlV2_1 = require("./LightControlV2");
Object.defineProperty(exports, "LightControlV2", { enumerable: true, get: function () { return LightControlV2_1.LightControlV2; } });
var LightControlV3_1 = require("./LightControlV3");
Object.defineProperty(exports, "LightControlV3", { enumerable: true, get: function () { return LightControlV3_1.LightControlV3; } });
var SceneCard_1 = require("./SceneCard");
Object.defineProperty(exports, "SceneCard", { enumerable: true, get: function () { return SceneCard_1.SceneCard; } });
var SceneCardV2_1 = require("./SceneCardV2");
Object.defineProperty(exports, "SceneCardV2", { enumerable: true, get: function () { return SceneCardV2_1.SceneCardV2; } });
var SceneCardV3_1 = require("./SceneCardV3");
Object.defineProperty(exports, "SceneCardV3", { enumerable: true, get: function () { return SceneCardV3_1.SceneCardV3; } });
var SensorReading_1 = require("./SensorReading");
Object.defineProperty(exports, "SensorReading", { enumerable: true, get: function () { return SensorReading_1.SensorReading; } });
var AutomationRule_1 = require("./AutomationRule");
Object.defineProperty(exports, "AutomationRule", { enumerable: true, get: function () { return AutomationRule_1.AutomationRule; } });
var EnergyUsage_1 = require("./EnergyUsage");
Object.defineProperty(exports, "EnergyUsage", { enumerable: true, get: function () { return EnergyUsage_1.EnergyUsage; } });
var CameraTile_1 = require("./CameraTile");
Object.defineProperty(exports, "CameraTile", { enumerable: true, get: function () { return CameraTile_1.CameraTile; } });
var LockControl_1 = require("./LockControl");
Object.defineProperty(exports, "LockControl", { enumerable: true, get: function () { return LockControl_1.LockControl; } });
var RoomGroup_1 = require("./RoomGroup");
Object.defineProperty(exports, "RoomGroup", { enumerable: true, get: function () { return RoomGroup_1.RoomGroup; } });
var DeviceToggleRow_1 = require("./DeviceToggleRow");
Object.defineProperty(exports, "DeviceToggleRow", { enumerable: true, get: function () { return DeviceToggleRow_1.DeviceToggleRow; } });
var ScheduleRow_1 = require("./ScheduleRow");
Object.defineProperty(exports, "ScheduleRow", { enumerable: true, get: function () { return ScheduleRow_1.ScheduleRow; } });
/*
 * ── V4 "ambient" (control-panel) design line ──
 * A drop-in V4 variant for each of the 12 originals: calm control surfaces where
 * an active device glows (soft accent wash + glowing icon disc), big legible
 * dials/sliders, and a brand gradient reserved for the dashboard moments (home
 * header, room header, energy dashboard). Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native.
 */
var DeviceTileV4_1 = require("./DeviceTileV4");
Object.defineProperty(exports, "DeviceTileV4", { enumerable: true, get: function () { return DeviceTileV4_1.DeviceTileV4; } });
var LightControlV4_1 = require("./LightControlV4");
Object.defineProperty(exports, "LightControlV4", { enumerable: true, get: function () { return LightControlV4_1.LightControlV4; } });
var ThermostatDialV4_1 = require("./ThermostatDialV4");
Object.defineProperty(exports, "ThermostatDialV4", { enumerable: true, get: function () { return ThermostatDialV4_1.ThermostatDialV4; } });
var SceneCardV4_1 = require("./SceneCardV4");
Object.defineProperty(exports, "SceneCardV4", { enumerable: true, get: function () { return SceneCardV4_1.SceneCardV4; } });
var DeviceToggleRowV4_1 = require("./DeviceToggleRowV4");
Object.defineProperty(exports, "DeviceToggleRowV4", { enumerable: true, get: function () { return DeviceToggleRowV4_1.DeviceToggleRowV4; } });
var LockControlV4_1 = require("./LockControlV4");
Object.defineProperty(exports, "LockControlV4", { enumerable: true, get: function () { return LockControlV4_1.LockControlV4; } });
var CameraTileV4_1 = require("./CameraTileV4");
Object.defineProperty(exports, "CameraTileV4", { enumerable: true, get: function () { return CameraTileV4_1.CameraTileV4; } });
var RoomGroupV4_1 = require("./RoomGroupV4");
Object.defineProperty(exports, "RoomGroupV4", { enumerable: true, get: function () { return RoomGroupV4_1.RoomGroupV4; } });
var AutomationRuleV4_1 = require("./AutomationRuleV4");
Object.defineProperty(exports, "AutomationRuleV4", { enumerable: true, get: function () { return AutomationRuleV4_1.AutomationRuleV4; } });
var ScheduleRowV4_1 = require("./ScheduleRowV4");
Object.defineProperty(exports, "ScheduleRowV4", { enumerable: true, get: function () { return ScheduleRowV4_1.ScheduleRowV4; } });
var SensorReadingV4_1 = require("./SensorReadingV4");
Object.defineProperty(exports, "SensorReadingV4", { enumerable: true, get: function () { return SensorReadingV4_1.SensorReadingV4; } });
var EnergyUsageV4_1 = require("./EnergyUsageV4");
Object.defineProperty(exports, "EnergyUsageV4", { enumerable: true, get: function () { return EnergyUsageV4_1.EnergyUsageV4; } });
/* ── New components (V4 ambient line) ── */
var HomeHeader_1 = require("./HomeHeader");
Object.defineProperty(exports, "HomeHeader", { enumerable: true, get: function () { return HomeHeader_1.HomeHeader; } });
var RoomHeader_1 = require("./RoomHeader");
Object.defineProperty(exports, "RoomHeader", { enumerable: true, get: function () { return RoomHeader_1.RoomHeader; } });
var EnergyDashboard_1 = require("./EnergyDashboard");
Object.defineProperty(exports, "EnergyDashboard", { enumerable: true, get: function () { return EnergyDashboard_1.EnergyDashboard; } });
var ModeSelector_1 = require("./ModeSelector");
Object.defineProperty(exports, "ModeSelector", { enumerable: true, get: function () { return ModeSelector_1.ModeSelector; } });
Object.defineProperty(exports, "DEFAULT_MODES", { enumerable: true, get: function () { return ModeSelector_1.DEFAULT_MODES; } });
var FavoritesGrid_1 = require("./FavoritesGrid");
Object.defineProperty(exports, "FavoritesGrid", { enumerable: true, get: function () { return FavoritesGrid_1.FavoritesGrid; } });
var AlertCard_1 = require("./AlertCard");
Object.defineProperty(exports, "AlertCard", { enumerable: true, get: function () { return AlertCard_1.AlertCard; } });
//# sourceMappingURL=index.js.map