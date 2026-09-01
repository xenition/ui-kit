"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastGradient = broadcastGradient;
exports.broadcastTrophy = broadcastTrophy;
exports.broadcastInk = broadcastInk;
exports.broadcastInkSoft = broadcastInkSoft;
exports.broadcastTile = broadcastTile;
exports.broadcastBorder = broadcastBorder;
const color_1 = require("../../primitives/internal/color");
/** Deep brand gradient for a text-bearing hero (match header / player / final). */
function broadcastGradient(r) {
    return [r.primary[500], r.primary[600], r.primary[700]];
}
/** Two-hue "trophy" gradient (accent → primary) for the champion celebration. */
function broadcastTrophy(r) {
    return [r.accent[400], r.primary[600]];
}
/** Near-white primary ink for text/icons on the gradient ground. */
function broadcastInk(r) {
    return r.primary[50];
}
/** Softer secondary ink on the gradient ground. */
function broadcastInkSoft(r) {
    return r.primary[100];
}
/** Frosted translucent tile fill sitting on the gradient (glass chips). */
function broadcastTile(r, alpha = 0.16) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
/** Hairline/edge for a frosted tile on the gradient ground. */
function broadcastBorder(r, alpha = 0.3) {
    return (0, color_1.withAlpha)(r.primary[50], alpha);
}
//# sourceMappingURL=broadcast.js.map