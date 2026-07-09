"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerativeCover = exports.COVER_FORMS = void 0;
exports.hashSeed = hashSeed;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
exports.COVER_FORMS = [
    'arc',
    'bands',
    'orbit',
    'grid',
    'wave',
    'stack',
];
const ROLE_PATTERN = /^(?:(?:primary|accent|neutral)-(?:50|100|200|300|400|500|600|700|800|900|950)|surface|on-surface|primary|on-primary|accent|on-accent|muted|border)$/;
function roleVar(role, prop) {
    if (!ROLE_PATTERN.test(role)) {
        throw new Error(`GenerativeCover: invalid ${prop} role "${role}". Use a ramp step like "primary-600" or a semantic slot like "surface" — literal colors are not accepted.`);
    }
    return `var(--xen-${role})`;
}
/** FNV-1a — tiny, stable string hash for seeding. */
function hashSeed(seed) {
    const text = String(seed);
    let hash = 0x811c9dc5;
    for (let i = 0; i < text.length; i += 1) {
        hash ^= text.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
}
/** mulberry32 PRNG — deterministic geometry jitter from the seed hash. */
function mulberry32(a) {
    let state = a;
    return () => {
        state |= 0;
        state = (state + 0x6d2b79f5) | 0;
        let t = Math.imul(state ^ (state >>> 15), 1 | state);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}
const round = (value) => Math.round(value * 10) / 10;
/* Each form re-creates one of the portfolio template's "print plates",
   parameterized: the same grammar, but the seed jitters radii, rotations,
   phases, and satellite placement so no two covers are identical. */
function arcForm(rng, ink) {
    const cx = round(80 + rng() * 120);
    const cy = round(840 + rng() * 80);
    const rings = [560, 470, 380, 290, 200].map((r) => round(r + (rng() - 0.5) * 60));
    const sx = round(540 + rng() * 160);
    const sy = round(180 + rng() * 140);
    return ((0, jsx_runtime_1.jsxs)("g", { fill: "none", stroke: ink, children: [rings.map((r, i) => ((0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, strokeWidth: 26 - i * 4 }, i))), (0, jsx_runtime_1.jsx)("circle", { cx: sx, cy: sy, r: round(34 + rng() * 24), fill: ink, stroke: "none" })] }));
}
function bandsForm(rng, ink) {
    const angle = round(-9 + rng() * 8);
    const ys = [80, 220, 330, 480, 560, 700, 830].map((y) => round(y + (rng() - 0.5) * 50));
    return ((0, jsx_runtime_1.jsx)("g", { transform: `rotate(${angle} 400 500)`, children: ys.map((y, i) => ((0, jsx_runtime_1.jsx)("rect", { x: -100, y: y, width: 1000, height: i % 2 === 0 ? 64 : 22, fill: ink }, i))) }));
}
function orbitForm(rng, ink) {
    const cx = round(380 + rng() * 120);
    const cy = round(380 + rng() * 120);
    const radii = [330, 228, 126].map((r) => round(r + (rng() - 0.5) * 40));
    return ((0, jsx_runtime_1.jsxs)("g", { children: [radii.map((r, i) => ((0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: ink, strokeWidth: 3 }, i))), (0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cy, r: round(26 + rng() * 16), fill: ink }), (0, jsx_runtime_1.jsx)("circle", { cx: round(620 + rng() * 140), cy: round(180 + rng() * 140), r: round(20 + rng() * 12), fill: ink }), (0, jsx_runtime_1.jsx)("circle", { cx: round(140 + rng() * 100), cy: round(680 + rng() * 120), r: round(12 + rng() * 8), fill: ink }), (0, jsx_runtime_1.jsx)("path", { d: `M 60 ${round(860 + rng() * 60)} H 740`, stroke: ink, strokeWidth: 3 })] }));
}
function gridForm(rng, ink) {
    const cols = [100, 200, 300, 400, 500, 600, 700];
    const rows = [100, 200, 300, 400, 500, 600, 700, 800, 900];
    const blockX = 100 + Math.floor(rng() * 5) * 100;
    const blockY = 100 + Math.floor(rng() * 6) * 100;
    const dotX = 100 + Math.floor(rng() * 6) * 100 + 100;
    const dotY = 100 + Math.floor(rng() * 7) * 100 + 100;
    return ((0, jsx_runtime_1.jsxs)("g", { stroke: ink, strokeWidth: 2.5, children: [cols.map((x) => ((0, jsx_runtime_1.jsx)("line", { x1: x, y1: 100, x2: x, y2: 900 }, `v${x}`))), rows.map((y) => ((0, jsx_runtime_1.jsx)("line", { x1: 100, y1: y, x2: 700, y2: y }, `h${y}`))), (0, jsx_runtime_1.jsx)("rect", { x: blockX, y: blockY, width: 200, height: 200, fill: ink, stroke: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: dotX, cy: dotY, r: round(40 + rng() * 20), fill: ink, stroke: "none" })] }));
}
function waveForm(rng, ink) {
    const base = round(240 + rng() * 120);
    const gap = round(84 + rng() * 28);
    const amp = round(70 + rng() * 50);
    const sx = round(560 + rng() * 160);
    const sy = round(130 + rng() * 100);
    return ((0, jsx_runtime_1.jsxs)("g", { fill: "none", stroke: ink, children: [[0, 1, 2, 3, 4, 5].map((i) => {
                const y = base + i * gap;
                return ((0, jsx_runtime_1.jsx)("path", { strokeWidth: i === 5 ? 14 : 5, d: `M -40 ${y} C 160 ${round(y - amp)}, 320 ${round(y + amp)}, 520 ${y} S 840 ${round(y - amp)}, 900 ${y}` }, i));
            }), (0, jsx_runtime_1.jsx)("circle", { cx: sx, cy: sy, r: round(44 + rng() * 24), fill: ink, stroke: "none" })] }));
}
const STACK_LAYERS = [
    [560, 660, 90],
    [440, 540, 66],
    [500, 430, 52],
    [340, 340, 40],
    [260, 270, 26],
    [160, 216, 14],
];
function stackForm(rng, ink) {
    const layers = STACK_LAYERS.map(([w, y, h]) => ({
        width: round(w * (0.85 + rng() * 0.3)),
        y,
        height: h,
    }));
    return ((0, jsx_runtime_1.jsxs)("g", { fill: ink, children: [layers.map((layer, i) => ((0, jsx_runtime_1.jsx)("rect", { x: round(400 - layer.width / 2), y: layer.y, width: layer.width, height: layer.height }, i))), (0, jsx_runtime_1.jsx)("rect", { x: 120, y: 800, width: 560, height: 8 })] }));
}
const FORM_RENDERERS = {
    arc: arcForm,
    bands: bandsForm,
    orbit: orbitForm,
    grid: gridForm,
    wave: waveForm,
    stack: stackForm,
};
/**
 * Deterministic generative cover art — the portfolio template's "print
 * plates" as a kit component. Two token color roles (`ink` over `paper`), six
 * composition grammars, and a seeded PRNG for geometry, so covers need no
 * stock imagery and restyle with the theme. Same `{seed, form, ink, paper}`
 * always renders identical markup (SSR === client === e2e). Static SVG — no
 * motion, nothing to reduce. Invalid color roles throw at render, never
 * "best-effort" paint.
 */
exports.GenerativeCover = React.forwardRef(function GenerativeCover({ seed, form, ink = 'primary-600', paper = 'neutral-100', label, className, style, ...rest }, ref) {
    const inkVar = roleVar(ink, 'ink');
    const paperVar = roleVar(paper, 'paper');
    const hash = hashSeed(seed);
    const resolvedForm = form ?? exports.COVER_FORMS[hash % exports.COVER_FORMS.length];
    const art = FORM_RENDERERS[resolvedForm](mulberry32(hash), inkVar);
    return ((0, jsx_runtime_1.jsxs)("svg", { ref: ref, viewBox: "0 0 800 1000", preserveAspectRatio: "xMidYMid slice", "data-xen-cover": resolvedForm, className: (0, cn_1.cn)('block h-full w-full', className), style: style, ...(label !== undefined
            ? { role: 'img', 'aria-label': label }
            : { 'aria-hidden': true }), ...rest, children: [(0, jsx_runtime_1.jsx)("rect", { width: 800, height: 1000, fill: paperVar }), art] }));
});
//# sourceMappingURL=GenerativeCover.js.map