"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chambersGradient = chambersGradient;
exports.chambersInk = chambersInk;
exports.chambersInkSoft = chambersInkSoft;
exports.chambersTile = chambersTile;
exports.chambersBorder = chambersBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing chambers moment (the matter hero). */
function chambersGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function chambersInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function chambersInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function chambersTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function chambersBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=chambers.js.map