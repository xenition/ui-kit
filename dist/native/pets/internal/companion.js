"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companionGradient = companionGradient;
exports.companionScrim = companionScrim;
exports.companionInk = companionInk;
exports.companionInkSoft = companionInkSoft;
exports.companionTile = companionTile;
exports.companionBorder = companionBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing companion moment (the profile hero). */
function companionGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero photo. */
function companionScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function companionInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function companionInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function companionTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function companionBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=companion.js.map