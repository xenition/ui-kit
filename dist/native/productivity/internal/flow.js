"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowGradient = flowGradient;
exports.flowMomentum = flowMomentum;
exports.flowInk = flowInk;
exports.flowInkSoft = flowInkSoft;
exports.flowTile = flowTile;
exports.flowBorder = flowBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (project / today / review). */
function flowGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue "momentum" gradient (accent → primary) for a decorative cover. */
function flowMomentum(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function flowInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function flowInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function flowTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function flowBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=flow.js.map