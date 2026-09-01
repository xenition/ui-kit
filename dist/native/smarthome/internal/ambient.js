"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ambientGradient = ambientGradient;
exports.ambientDusk = ambientDusk;
exports.ambientInk = ambientInk;
exports.ambientInkSoft = ambientInkSoft;
exports.ambientTile = ambientTile;
exports.ambientBorder = ambientBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (home / room / energy). */
function ambientGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue "dusk" gradient (accent → primary) for a decorative room cover. */
function ambientDusk(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function ambientInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function ambientInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function ambientTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function ambientBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=ambient.js.map