"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.focusGradient = focusGradient;
exports.focusCelebrate = focusCelebrate;
exports.focusInk = focusInk;
exports.focusInkSoft = focusInkSoft;
exports.focusTile = focusTile;
exports.focusBorder = focusBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (completion / results). */
function focusGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue celebratory gradient (accent → primary) for the completion peak. */
function focusCelebrate(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function focusInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function focusInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function focusTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function focusBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=focus.js.map