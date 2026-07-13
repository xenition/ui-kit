"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCover = GenerativeCover;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("./internal/Gradient");
/** Deterministic FNV-1a hash → stable per-seed geometry. */
function hashSeed(seed) {
    const s = String(seed);
    let h = 2166136261;
    for (let i = 0; i < s.length; i += 1) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
const FORM_DIRS = {
    arc: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    bands: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    orbit: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
    grid: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    wave: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
    stack: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};
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
/** Resolve a color role (`primary-700`, `accent`, `surface`, …) to a token color. */
function resolveRole(role, tokens, colors) {
    if (!role)
        return undefined;
    const ramp = /^(primary|accent|neutral)-(\d+)$/.exec(role);
    if (ramp) {
        const steps = tokens.ramps[ramp[1]];
        return steps[Number(ramp[2])];
    }
    return colors[role];
}
function GenerativeCover({ seed, label, form, ink, paper, style, }) {
    const { tokens, colors } = (0, theme_1.useXenitionTheme)();
    const h = hashSeed(seed);
    // Explicit ink/paper roles override the seeded gradient (brand-themed plate,
    // matching the web cover); otherwise pick two ramp steps deterministically.
    const primarySteps = [300, 400, 500, 600];
    const accentSteps = [400, 500, 600, 700];
    const from = resolveRole(paper, tokens, colors)
        ?? tokens.ramps.primary[primarySteps[h % primarySteps.length]];
    const to = resolveRole(ink, tokens, colors)
        // >>> not >>: h is a full uint32, and a signed shift on h >= 2^31 goes
        // negative, indexing accentSteps[-n] -> undefined -> an invalid gradient
        // stop that renders as a black plate (caught live on tpl-restaurant's
        // 'ember-oak-hero' seed).
        ?? tokens.ramps.accent[accentSteps[(h >>> 3) % accentSteps.length]];
    const dir = FORM_DIRS[form ?? ['arc', 'bands', 'orbit', 'grid', 'wave', 'stack'][h % 6]];
    return ((0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [from, to], start: dir.start, end: dir.end, style: [{ flex: 1, alignItems: 'center', justifyContent: 'center' }, style], children: label ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
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