"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.journeyGradient = journeyGradient;
exports.journeyDisc = journeyDisc;
exports.journeyHorizon = journeyHorizon;
exports.journeyInk = journeyInk;
exports.journeyInkSoft = journeyInkSoft;
exports.journeyTile = journeyTile;
exports.journeyBorder = journeyBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep journey gradient for a text-bearing hero/header (mid → deep). */
function journeyGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A lighter gradient for the small leading glyph disc. */
function journeyDisc(r) {
    return [r.primary[400], r.primary[600]];
}
/** Two-hue "horizon" gradient (accent → primary) for decorative covers. */
function journeyHorizon(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function journeyInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function journeyInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function journeyTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function journeyBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=journey.js.map