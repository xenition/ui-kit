"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studioGradient = studioGradient;
exports.studioScrim = studioScrim;
exports.studioInk = studioInk;
exports.studioInkSoft = studioInkSoft;
exports.studioTile = studioTile;
exports.studioBorder = studioBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing studio moment (gallery header / booking). */
function studioGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on cover photos. */
function studioScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function studioInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function studioInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function studioTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function studioBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=studio.js.map