"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCover = GenerativeCover;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("./internal/Gradient");
/** Deterministic FNV-1a hash → stable per-seed geometry. */
function hashSeed(seed) {
    let h = 2166136261;
    for (let i = 0; i < seed.length; i += 1) {
        h ^= seed.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
function initials(label) {
    return label
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');
}
/**
 * Native cover-art placeholder drawn when a product has no image — the native
 * counterpart of the web `GenerativeCover`. A deterministic two-token gradient
 * (seeded from the product slug) via `expo-linear-gradient`, with the product
 * initials overlaid. Token-only: both gradient stops are compiled ramp steps,
 * so it restyles from the seed and works in light + dark.
 */
function GenerativeCover({ seed, label, style, }) {
    const { tokens, colors } = (0, theme_1.useXenitionTheme)();
    const h = hashSeed(seed);
    // Pick two ramp steps deterministically from primary + accent.
    const primarySteps = [300, 400, 500, 600];
    const accentSteps = [400, 500, 600, 700];
    const from = tokens.ramps.primary[primarySteps[h % primarySteps.length]];
    const to = tokens.ramps.accent[accentSteps[(h >> 3) % accentSteps.length]];
    return ((0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [from, to], start: { x: 0, y: 0 }, end: { x: 1, y: 1 }, style: [{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style], children: label ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: tokens.spacing.sm,
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onPrimary,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    opacity: 0.9,
                }, children: initials(label) }) })) : null }));
}
//# sourceMappingURL=GenerativeCover.js.map