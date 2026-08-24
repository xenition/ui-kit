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
exports.AuroraBackground = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
/** Ramp steps a blob may use — theme variables only, never literal colors. */
const BLOB_RAMPS = [
    'primary-400',
    'primary-500',
    'primary-600',
    'primary-700',
    'accent-400',
    'accent-500',
    'accent-600',
];
const AURORA_BLOBS = [
    { ramp: 'primary-500', top: '-20%', left: '-10%', size: '55%', opacity: 0.45, animation: 'xen-aurora-a', duration: '26s' },
    { ramp: 'accent-400', top: '-10%', left: '55%', size: '50%', opacity: 0.35, animation: 'xen-aurora-b', duration: '32s' },
    { ramp: 'primary-700', top: '45%', left: '20%', size: '60%', opacity: 0.3, animation: 'xen-aurora-c', duration: '38s' },
    { ramp: 'accent-600', top: '55%', left: '65%', size: '45%', opacity: 0.3, animation: 'xen-aurora-b', duration: '29s' },
];
const MESH_BLOBS = [
    { ramp: 'primary-400', top: '-25%', left: '-15%', size: '70%', opacity: 0.4, animation: 'xen-aurora-c', duration: '40s' },
    { ramp: 'accent-500', top: '-20%', left: '60%', size: '65%', opacity: 0.35, animation: 'xen-aurora-a', duration: '34s' },
    { ramp: 'primary-600', top: '55%', left: '55%', size: '70%', opacity: 0.35, animation: 'xen-aurora-b', duration: '42s' },
    { ramp: 'accent-400', top: '60%', left: '-20%', size: '60%', opacity: 0.3, animation: 'xen-aurora-a', duration: '36s' },
];
const RADIAL_BLOBS = [
    { ramp: 'primary-600', top: '10%', left: '15%', size: '70%', opacity: 0.4, animation: 'xen-aurora-pulse', duration: '18s' },
    { ramp: 'accent-500', top: '25%', left: '30%', size: '40%', opacity: 0.3, animation: 'xen-aurora-pulse', duration: '24s' },
];
const BLOBS = {
    aurora: AURORA_BLOBS,
    mesh: MESH_BLOBS,
    radial: RADIAL_BLOBS,
};
/**
 * Inline SVG grain (feTurbulence) as a data URI — self-contained, no asset,
 * no colors (a monochrome noise rect blended at low opacity).
 */
const GRAIN_DATA_URI = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";
/**
 * All color-bearing declarations live in this injected sheet and reference
 * `--xen-*` variables exclusively — the aurora restyles by theme seed alone,
 * and the kit's no-literal-colors rule stays greppable/testable in one place.
 * Inline styles on the elements carry geometry and timing only.
 */
const AURORA_CSS = `
@keyframes xen-aurora-a {
  0%, 100% { transform: translate3d(-6%, -4%, 0) scale(1); }
  50% { transform: translate3d(10%, 8%, 0) scale(1.15); }
}
@keyframes xen-aurora-b {
  0%, 100% { transform: translate3d(6%, 8%, 0) scale(1.1); }
  50% { transform: translate3d(-10%, -6%, 0) scale(0.95); }
}
@keyframes xen-aurora-c {
  0%, 100% { transform: translate3d(0, 6%, 0) scale(0.95) rotate(0deg); }
  50% { transform: translate3d(4%, -8%, 0) scale(1.2) rotate(12deg); }
}
@keyframes xen-aurora-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.18); }
}
[data-xen-aurora-blob] {
  position: absolute;
  aspect-ratio: 1 / 1;
  border-radius: 9999px;
  filter: blur(64px);
  will-change: transform;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
${BLOB_RAMPS.map((ramp) => `[data-xen-aurora-blob="${ramp}"] { background-image: radial-gradient(circle closest-side, var(--xen-${ramp}), transparent); }`).join('\n')}
[data-xen-aurora-pattern="dots"] {
  background-image: radial-gradient(var(--xen-on-surface) 1px, transparent 1px);
  background-size: 24px 24px;
  opacity: 0.07;
}
[data-xen-aurora-pattern="grid"] {
  background-image: linear-gradient(var(--xen-border) 1px, transparent 1px), linear-gradient(90deg, var(--xen-border) 1px, transparent 1px);
  background-size: 48px 48px;
  opacity: 0.35;
}
[data-xen-aurora-grain] {
  background-image: url("${GRAIN_DATA_URI}");
  background-repeat: repeat;
  opacity: 0.05;
  mix-blend-mode: overlay;
}
@media (prefers-reduced-motion: reduce) {
  [data-xen-aurora-blob] { animation: none !important; }
}
`;
/**
 * Animated layered gradient background: blurred radial "aurora" blobs built
 * from the theme's primary/accent ramp steps (400–700), drifting on slow CSS
 * keyframe paths, with optional grain and dot/grid pattern overlays.
 *
 * Shared machinery behind `GradientHero` and `CTABanner`; use it directly to
 * build custom striking sections. Position it inside a `relative
 * overflow-hidden` parent — it renders `absolute inset-0` and is
 * `aria-hidden` (purely decorative). Dark mode needs nothing special: the
 * ramp variables are the theme, so the blobs read correctly over either
 * surface.
 */
exports.AuroraBackground = React.forwardRef(function AuroraBackground({ variant = 'aurora', grain = false, pattern = 'none', className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-aurora-styles', AURORA_CSS);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-hidden": "true", "data-xen-aurora": variant, className: (0, cn_1.cn)('pointer-events-none absolute inset-0 overflow-hidden', className), ...rest, children: [BLOBS[variant].map((blob, index) => ((0, jsx_runtime_1.jsx)("div", { "data-xen-aurora-blob": blob.ramp, style: {
                    top: blob.top,
                    left: blob.left,
                    width: blob.size,
                    opacity: blob.opacity,
                    animationName: blob.animation,
                    animationDuration: blob.duration,
                } }, index))), pattern !== 'none' ? ((0, jsx_runtime_1.jsx)("div", { "data-xen-aurora-pattern": pattern, className: "absolute inset-0" })) : null, grain ? (0, jsx_runtime_1.jsx)("div", { "data-xen-aurora-grain": "", className: "absolute inset-0" }) : null] }));
});
//# sourceMappingURL=AuroraBackground.js.map