"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandGradient = brandGradient;
exports.brandDisc = brandDisc;
exports.brandInk = brandInk;
exports.brandInkSoft = brandInkSoft;
exports.brandTile = brandTile;
exports.brandBorder = brandBorder;
const format_1 = require("./format");
/** Deep brand gradient for a hero ground (mid → deep, so near-white ink reads). */
function brandGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A lighter gradient for the small leading glyph disc. */
function brandDisc(r) {
    return [r.primary[400], r.primary[600]];
}
/** Near-white ink for text/icons on the gradient. */
function brandInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient. */
function brandInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent chip fill on the gradient. */
function brandTile(r, alpha = 0.16) {
    return (0, format_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline for a frosted chip on the gradient. */
function brandBorder(r, alpha = 0.3) {
    return (0, format_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=brand.js.map