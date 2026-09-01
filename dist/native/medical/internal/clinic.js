"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinicGradient = clinicGradient;
exports.clinicScrim = clinicScrim;
exports.clinicInk = clinicInk;
exports.clinicInkSoft = clinicInkSoft;
exports.clinicTile = clinicTile;
exports.clinicBorder = clinicBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing clinic moment (the visit-summary hero). */
function clinicGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on a hero header. */
function clinicScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function clinicInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function clinicInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function clinicTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function clinicBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=clinic.js.map