"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCoverV4 = GenerativeCoverV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Gradient_1 = require("../commerce/internal/Gradient");
/**
 * GenerativeCover — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base (`native/commerce/GenerativeCover`): React
 * Native has no SVG print-plate engine here, so the cover is a **deterministic
 * two-token `Gradient`** (via the shared `expo-linear-gradient` wrapper) seeded
 * from `seed`, with `form` varying the gradient *direction*. The web twin draws
 * the full geometry; what the two share is the seeded decision.
 *
 * The V4 *refines* the look: crisper, higher-contrast token defaults — a
 * saturated `primary` ground into a light `accent` far stop (rather than the
 * base's primary→accent mid-tones that could land two similar values together
 * and flatten) — plus a soft seeded diagonal so the plate reads bolder and
 * more three-dimensional at thumbnail size. Every `CoverForm` is honored via
 * the direction table. Explicit `ink`/`paper` roles override the V4 defaults.
 *
 * **Native-simplified, web-only note:** unlike web there is no per-form
 * geometry — `form` only steers the gradient axis. Token-only colors via
 * `useXenitionTheme()`, dark-mode safe. Static — no motion, nothing to reduce.
 */
const FORMS = ['arc', 'bands', 'orbit', 'grid', 'wave', 'stack'];
/** Gradient axis per form — the one thing a two-stop gradient can say about it. */
const FORM_DIRS = {
    arc: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
    bands: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
    orbit: { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
    grid: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
    wave: { start: { x: 0, y: 1 }, end: { x: 1, y: 0 } },
    stack: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
};
/** FNV-1a — stable per-seed geometry, matching the base's hash. */
function hashSeed(seed) {
    const s = String(seed);
    let h = 2166136261;
    for (let i = 0; i < s.length; i += 1) {
        h ^= s.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}
const RAMP_ROLE = /^(primary|accent|neutral)-(\d+)$/;
/** Resolve a color role (`primary-700`, `accent`, `surface`, …) to a token color. */
function resolveRole(role, tokens, colors) {
    if (!role)
        return undefined;
    const step = RAMP_ROLE.exec(role);
    if (step) {
        const ramp = tokens.ramps[step[1]];
        return ramp[Number(step[2])];
    }
    return colors[role];
}
function initials(label) {
    return label
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('');
}
function GenerativeCoverV4({ seed, label, form, ink, paper, style, }) {
    const { tokens, colors } = (0, theme_1.useXenitionTheme)();
    const h = hashSeed(seed);
    // V4 confident defaults: saturated primary ground → light accent far stop for
    // crisper contrast than the base's mid-tone pairing. Explicit roles override.
    const primarySteps = [500, 600, 700];
    const accentSteps = [200, 300, 400];
    const from = resolveRole(paper, tokens, colors) ??
        tokens.ramps.primary[primarySteps[h % primarySteps.length]];
    const to = resolveRole(ink, tokens, colors) ??
        // `>>>` (not `>>`): h is a full uint32; a signed shift could go negative and
        // index the step table with a negative key → invalid stop → black plate.
        tokens.ramps.accent[accentSteps[(h >>> 3) % accentSteps.length]];
    const dir = FORM_DIRS[form ?? FORMS[h % FORMS.length]];
    const wrapStyle = [{ flex: 1, overflow: 'hidden' }, style];
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: wrapStyle, children: (0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [from, to], start: dir.start, end: dir.end, style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onPrimary,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '800',
                    letterSpacing: 0.5,
                    opacity: 0.92,
                }, children: initials(label) })) : null }) }));
}
//# sourceMappingURL=GenerativeCoverV4.js.map