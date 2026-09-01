"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGradient = registerGradient;
exports.registerCelebrate = registerCelebrate;
exports.registerInk = registerInk;
exports.registerInkSoft = registerInkSoft;
exports.registerTile = registerTile;
exports.registerBorder = registerBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (payment / sales / register). */
function registerGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue celebratory gradient (accent → primary) for the payment-success peak. */
function registerCelebrate(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function registerInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function registerInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function registerTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function registerBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=register.js.map