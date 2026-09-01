"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skyGradient = skyGradient;
exports.skyGradientSoft = skyGradientSoft;
exports.skyInk = skyInk;
exports.skyInkSoft = skyInkSoft;
exports.skyTile = skyTile;
exports.skyBorder = skyBorder;
const weather_utils_1 = require("../weather-utils");
/** Vertical gradient stops for a hero/panel ground (light-sky → deeper sky). */
function skyGradient(ramps) {
    return [ramps.primary[400], ramps.primary[600], ramps.primary[700]];
}
/** A subtler ground gradient, for secondary panels. */
function skyGradientSoft(ramps) {
    return [ramps.primary[400], ramps.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function skyInk(ramps) {
    return ramps.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function skyInkSoft(ramps) {
    return ramps.primary[100];
}
/** Translucent tile fill sitting on the gradient ground. */
function skyTile(ramps, alpha = 0.16) {
    return (0, weather_utils_1.withAlpha)(ramps.primary[50], alpha);
}
/** Hairline/edge color for a tile on the gradient ground. */
function skyBorder(ramps, alpha = 0.28) {
    return (0, weather_utils_1.withAlpha)(ramps.primary[50], alpha);
}
//# sourceMappingURL=v4-sky.js.map