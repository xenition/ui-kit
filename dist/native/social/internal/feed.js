"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedGradient = feedGradient;
exports.feedStory = feedStory;
exports.feedInk = feedInk;
exports.feedInkSoft = feedInkSoft;
exports.feedTile = feedTile;
exports.feedBorder = feedBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (profile header / story viewer). */
function feedGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue "story" gradient (accent → primary) for story rings and covers. */
function feedStory(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function feedInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function feedInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function feedTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function feedBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=feed.js.map