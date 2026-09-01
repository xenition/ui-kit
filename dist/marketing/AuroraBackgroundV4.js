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
exports.AuroraBackgroundV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const AuroraBackground_1 = require("./AuroraBackground");
/**
 * AuroraBackground — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link AuroraBackground}: blurred, slowly
 * drifting radial-gradient blobs built from the theme's `primary`/`accent`
 * ramp steps, with optional grain and dot/grid pattern overlays. The V4 is a
 * *refined* take — richer **multi-stop** primary→accent blobs (three-stop
 * radial gradients instead of the base's single-stop-to-transparent) for a
 * smoother, more confident falloff, a slightly deeper blur, and a warmer
 * `screen` blend so the aurora reads bolder while staying subtle enough to sit
 * behind content. Every `variant`/`grain`/`pattern` value is honored exactly.
 *
 * The base `AuroraBackground` is rendered underneath as the geometry/animation
 * layer (so its keyframes, blob placement, grain and pattern all still apply
 * and stay in one place); the V4 sheet only re-tints those same blobs. Every
 * color is a `--xen-*` token — no literals.
 *
 * **Reduced motion:** inherited from the base, which disables the blob
 * keyframes under `prefers-reduced-motion: reduce`; the V4 adds no new motion,
 * so it degrades to the same static token-only rest state.
 */
/** Ramp steps a V4 blob may re-tint — theme variables only, never literals. */
const BLOB_RAMPS = [
    'primary-400',
    'primary-500',
    'primary-600',
    'primary-700',
    'accent-400',
    'accent-500',
    'accent-600',
];
/**
 * V4 re-tint sheet. Targets the *same* `[data-xen-aurora-blob]` elements the
 * base renders, but paints each with a richer multi-stop radial gradient and a
 * softer, wider falloff — so the base owns geometry + timing + reduced-motion,
 * and this owns only the refined look. Color-bearing declarations reference
 * `--xen-*` variables exclusively.
 */
const AURORA_V4_CSS = `
[data-xen-aurora-v4] [data-xen-aurora-blob] {
  filter: blur(72px);
  mix-blend-mode: screen;
}
${BLOB_RAMPS.map((ramp) => `[data-xen-aurora-v4] [data-xen-aurora-blob="${ramp}"] { background-image: radial-gradient(circle closest-side, var(--xen-${ramp}) 0%, color-mix(in srgb, var(--xen-${ramp}) 55%, transparent) 46%, transparent 78%); }`).join('\n')}
`;
exports.AuroraBackgroundV4 = React.forwardRef(function AuroraBackgroundV4({ variant = 'aurora', grain = false, pattern = 'none', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-aurora-v4-styles', AURORA_V4_CSS);
    // Keep referenced so the exported prop unions stay live for tooling/tests.
    const v = variant;
    const p = pattern;
    return ((0, jsx_runtime_1.jsx)(AuroraBackground_1.AuroraBackground, { ref: ref, "data-xen-aurora-v4": "", variant: v, grain: grain, pattern: p, className: (0, cn_1.cn)(className), ...rest }));
});
//# sourceMappingURL=AuroraBackgroundV4.js.map