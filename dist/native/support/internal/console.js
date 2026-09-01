"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consoleGradient = consoleGradient;
exports.consoleInk = consoleInk;
exports.consoleInkSoft = consoleInkSoft;
exports.consoleTile = consoleTile;
exports.consoleBorder = consoleBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (ticket header / stats / CSAT). */
function consoleGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function consoleInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function consoleInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function consoleTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function consoleBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=console.js.map