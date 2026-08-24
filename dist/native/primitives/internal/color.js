"use strict";
/**
 * Color helpers for the native layer. React Native has no `color-mix()`, so
 * translucency (GlassPanel) is produced by deriving an `rgba()` string from a
 * **token** hex value — the input is always a compiled-theme color, never a
 * literal, so components stay token-pure.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hexToRgb = hexToRgb;
exports.withAlpha = withAlpha;
/** Parse a `#rgb` / `#rrggbb` hex into `[r, g, b]` (0–255). */
function hexToRgb(hex) {
    let h = hex.trim().replace('#', '');
    if (h.length === 3) {
        h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    const int = Number.parseInt(h, 16);
    if (!Number.isFinite(int))
        return [0, 0, 0];
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}
/**
 * Turn a token hex into an `rgba()` string at the given alpha. Used for the
 * translucent glass surfaces and gradient placeholder tints — the color always
 * originates from a theme token, so no literal color is introduced.
 */
function withAlpha(hex, alpha) {
    const [r, g, b] = hexToRgb(hex);
    const a = Math.max(0, Math.min(1, alpha));
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}
//# sourceMappingURL=color.js.map