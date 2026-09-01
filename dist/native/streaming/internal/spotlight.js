"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spotlightGradient = spotlightGradient;
exports.spotlightGlow = spotlightGlow;
exports.spotlightInk = spotlightInk;
exports.spotlightInkSoft = spotlightInkSoft;
exports.spotlightTile = spotlightTile;
exports.spotlightBorder = spotlightBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (full-screen player / album). */
function spotlightGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue "glow" gradient (accent → primary) for artwork backdrops / covers. */
function spotlightGlow(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function spotlightInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function spotlightInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass controls). */
function spotlightTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function spotlightBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=spotlight.js.map