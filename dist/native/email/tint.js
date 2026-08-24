"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAlpha = withAlpha;
/**
 * Internal helper for the email module: derive a translucent tint from a
 * theme-token hex so soft-filled chips/labels stay token-bound (no literal
 * colors). Mirrors the `withAlpha` used by `Button`/`GlassPanel`. Not exported
 * from the module barrel — components import it directly.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
//# sourceMappingURL=tint.js.map