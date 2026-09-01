"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listingGradient = listingGradient;
exports.listingScrim = listingScrim;
exports.listingInk = listingInk;
exports.listingInkSoft = listingInkSoft;
exports.listingTile = listingTile;
exports.listingBorder = listingBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (property / agent / mortgage). */
function listingGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** A dark neutral scrim (transparent → dark) for legible overlays on hero photos. */
function listingScrim(r, alpha = 0.7) {
    return [(0, color_1.withAlpha)(r.neutral[900], 0), (0, color_1.withAlpha)(r.neutral[900], alpha)];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function listingInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function listingInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function listingTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function listingBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=listing.js.map