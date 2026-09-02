"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchGradient = dispatchGradient;
exports.dispatchInk = dispatchInk;
exports.dispatchInkSoft = dispatchInkSoft;
exports.dispatchTile = dispatchTile;
exports.dispatchBorder = dispatchBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing dispatch moment (the tracking hero). */
function dispatchGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function dispatchInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function dispatchInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function dispatchTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function dispatchBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=dispatch.js.map