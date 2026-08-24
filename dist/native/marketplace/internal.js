"use strict";
/**
 * Internal helpers shared across the native marketplace components. Not part of
 * the public surface — the barrel does not re-export these.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAlpha = withAlpha;
/**
 * Token-derived translucent tint. Takes a resolved theme hex (always sourced
 * from a `SemanticColors` slot or a `tokens.ramps.*` step — never a literal)
 * and returns an `rgba(...)` string so tints stay traceable to a token and no
 * hex literal is ever introduced. Mirrors the primitive `withAlpha` in
 * `Button`/`Badge`.
 */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
//# sourceMappingURL=internal.js.map