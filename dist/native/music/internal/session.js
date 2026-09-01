"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionGradient = sessionGradient;
exports.sessionScrim = sessionScrim;
exports.sessionInk = sessionInk;
exports.sessionInkSoft = sessionInkSoft;
exports.sessionTile = sessionTile;
exports.sessionBorder = sessionBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing session moment (the waveform hero). */
function sessionGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on the signal ground. */
function sessionScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function sessionInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function sessionInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function sessionTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function sessionBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=session.js.map