"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.campusGradient = campusGradient;
exports.campusInk = campusInk;
exports.campusInkSoft = campusInkSoft;
exports.campusTile = campusTile;
exports.campusBorder = campusBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing campus moment (the certificate hero). */
function campusGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function campusInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function campusInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function campusTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function campusBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=campus.js.map