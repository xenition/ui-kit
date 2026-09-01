"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rallyGradient = rallyGradient;
exports.rallyCelebrate = rallyCelebrate;
exports.rallyScrim = rallyScrim;
exports.rallyInk = rallyInk;
exports.rallyInkSoft = rallyInkSoft;
exports.rallyTile = rallyTile;
exports.rallyBorder = rallyBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing rally moment (the thank-you hero). */
function rallyGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Festive two-hue wash (warm accent → brand primary) for the celebration peak. */
function rallyCelebrate(r) {
    return [r.accent[400], r.primary[600]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero photo. */
function rallyScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function rallyInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function rallyInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function rallyTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function rallyBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=rally.js.map