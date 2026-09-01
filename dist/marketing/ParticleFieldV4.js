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
exports.ParticleFieldV4 = exports.computeParticles = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const ParticleField_1 = require("./ParticleField");
Object.defineProperty(exports, "computeParticles", { enumerable: true, get: function () { return ParticleField_1.computeParticles; } });
/**
 * ParticleField — **V4** "showcase" design (web parity of the native V4).
 *
 * Same effect engine as the base {@link ParticleField}: four moods
 * (`ember`/`snow`/`fireflies`/`sparks`), pure-CSS keyframe animation, and the
 * deterministic golden-ratio layout from the shared `computeParticles` (reused,
 * never reinvented — same `seed`, same sky on server/client/e2e). The base
 * component owns the geometry, timing, keyframes **and reduced-motion**; the V4
 * only re-tints and re-tunes.
 *
 * The refinement: **tuned density + size per mood** (each mood gets a confident
 * default multiplier so embers feel sparser/warmer and fireflies denser), plus
 * richer multi-stop token gradients and a soft additive `screen` blend so the
 * particles read bolder while staying ambient. Passing an explicit `density`
 * still wins — the per-mood tuning only fills the default.
 *
 * **Reduced motion:** inherited from the base, which freezes each particle into
 * a faint deterministic static scatter under `prefers-reduced-motion: reduce`;
 * the V4 adds no new motion, so it degrades identically. Token-only colors.
 */
/** Per-mood default density (only applied when `density` is left unset). */
const MOOD_DENSITY = {
    ember: 16,
    sparks: 26,
    snow: 22,
    fireflies: 20,
};
/**
 * V4 re-tint sheet. Targets the same `[data-xen-particle]` dots the base
 * renders, scoped under `[data-xen-particles-v4]`, with richer multi-stop
 * ramp gradients and a soft additive blend. Color-bearing declarations
 * reference `--xen-*` variables exclusively; geometry/timing stay on the base.
 */
const PARTICLE_V4_CSS = `
[data-xen-particles-v4] [data-xen-particle] {
  mix-blend-mode: screen;
  filter: blur(0.5px);
}
[data-xen-particles-v4][data-xen-particles="ember"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-primary-400) 40%, var(--xen-primary-600) 62%, transparent 76%);
}
[data-xen-particles-v4][data-xen-particles="sparks"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-accent-400) 44%, var(--xen-accent-600) 64%, transparent 76%);
}
[data-xen-particles-v4][data-xen-particles="snow"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-neutral-50) 0%, var(--xen-neutral-100) 48%, var(--xen-neutral-300) 68%, transparent 82%);
}
[data-xen-particles-v4][data-xen-particles="fireflies"] [data-xen-particle] {
  background-image: radial-gradient(circle, var(--xen-accent-100) 0%, var(--xen-accent-300) 38%, var(--xen-accent-500) 60%, transparent 74%);
}
`;
exports.ParticleFieldV4 = React.forwardRef(function ParticleFieldV4({ mood = 'ember', density, seed = 1, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)('xen-particle-v4-styles', PARTICLE_V4_CSS);
    const tunedDensity = density ?? MOOD_DENSITY[mood];
    return ((0, jsx_runtime_1.jsx)(ParticleField_1.ParticleField, { ref: ref, "data-xen-particles-v4": "", mood: mood, density: tunedDensity, seed: seed, className: (0, cn_1.cn)(className), ...rest }));
});
//# sourceMappingURL=ParticleFieldV4.js.map