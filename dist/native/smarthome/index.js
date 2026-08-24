"use strict";
/**
 * `@xenition/ui/native/smarthome` — presentational IoT / smart-home / device-
 * control blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Switch`, `Slider`, `EmptyState`) and the shared
 * View-based `BarChart`, styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — colors resolve to `SemanticColors` keys (plus
 * `tokens.ramps.*` tints for the light warm/cool hint); no literal hex, no new
 * dependencies. The circular `ThermostatDial` is drawn with the available
 * `react-native-svg` peer (the same peer the SVG charts use). Every component is
 * mobile-first and takes data + callbacks + variants/states (on / off / offline)
 * with empty + loading affordances and color-independent status labels; none
 * fetches or imports the SDK.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LightControlV3 = exports.LightControlV2 = exports.SceneCardV3 = exports.SceneCardV2 = exports.ThermostatDialV3 = exports.ThermostatDialV2 = exports.DeviceTileV3 = exports.DeviceTileV2 = exports.ScheduleRow = exports.DeviceToggleRow = exports.RoomGroup = exports.LockControl = exports.CameraTile = exports.EnergyUsage = exports.AutomationRule = exports.SensorReading = exports.SceneCard = exports.LightControl = exports.ThermostatDial = exports.DeviceTile = void 0;
var DeviceTile_1 = require("./DeviceTile");
Object.defineProperty(exports, "DeviceTile", { enumerable: true, get: function () { return DeviceTile_1.DeviceTile; } });
var ThermostatDial_1 = require("./ThermostatDial");
Object.defineProperty(exports, "ThermostatDial", { enumerable: true, get: function () { return ThermostatDial_1.ThermostatDial; } });
var LightControl_1 = require("./LightControl");
Object.defineProperty(exports, "LightControl", { enumerable: true, get: function () { return LightControl_1.LightControl; } });
var SceneCard_1 = require("./SceneCard");
Object.defineProperty(exports, "SceneCard", { enumerable: true, get: function () { return SceneCard_1.SceneCard; } });
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
// ── alternate designs (drop-in, same Props) ───────────────────────────
// V2/V3 are genuinely different presentations of the four most-used blocks,
// each a separate component sharing the original prop contract (not a variant
// prop) so they can be swapped in place. See design-variants.native.spec.tsx.
var DeviceTileV2_1 = require("./DeviceTileV2");
Object.defineProperty(exports, "DeviceTileV2", { enumerable: true, get: function () { return DeviceTileV2_1.DeviceTileV2; } });
var DeviceTileV3_1 = require("./DeviceTileV3");
Object.defineProperty(exports, "DeviceTileV3", { enumerable: true, get: function () { return DeviceTileV3_1.DeviceTileV3; } });
var ThermostatDialV2_1 = require("./ThermostatDialV2");
Object.defineProperty(exports, "ThermostatDialV2", { enumerable: true, get: function () { return ThermostatDialV2_1.ThermostatDialV2; } });
var ThermostatDialV3_1 = require("./ThermostatDialV3");
Object.defineProperty(exports, "ThermostatDialV3", { enumerable: true, get: function () { return ThermostatDialV3_1.ThermostatDialV3; } });
var SceneCardV2_1 = require("./SceneCardV2");
Object.defineProperty(exports, "SceneCardV2", { enumerable: true, get: function () { return SceneCardV2_1.SceneCardV2; } });
var SceneCardV3_1 = require("./SceneCardV3");
Object.defineProperty(exports, "SceneCardV3", { enumerable: true, get: function () { return SceneCardV3_1.SceneCardV3; } });
var LightControlV2_1 = require("./LightControlV2");
Object.defineProperty(exports, "LightControlV2", { enumerable: true, get: function () { return LightControlV2_1.LightControlV2; } });
var LightControlV3_1 = require("./LightControlV3");
Object.defineProperty(exports, "LightControlV3", { enumerable: true, get: function () { return LightControlV3_1.LightControlV3; } });
//# sourceMappingURL=index.js.map