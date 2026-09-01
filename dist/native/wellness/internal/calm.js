"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calmGradient = calmGradient;
exports.calmDawn = calmDawn;
exports.calmInk = calmInk;
exports.calmInkSoft = calmInkSoft;
exports.calmTile = calmTile;
exports.calmBorder = calmBorder;
const color_1 = require("../../primitives/internal/color");
/** Primary-hue gradient stops for a text-bearing hero/panel (light → deep). */
function calmGradient(r) {
    return [r.primary[400], r.primary[600], r.primary[700]];
}
/** Two-hue "dawn" gradient (accent → primary) for decorative grounds/covers. */
function calmDawn(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function calmInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function calmInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function calmTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function calmBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=calm.js.map