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
exports.ParticleField = ParticleField;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const GOLDEN = 0.618033988749895;
const TUNING = {
    ember: { sizeMin: 3, sizeMax: 8, role: 'primary', step: 400 },
    sparks: { sizeMin: 2, sizeMax: 4.5, role: 'accent', step: 500 },
    snow: { sizeMin: 2.5, sizeMax: 6.5, role: 'neutral', step: 200 },
    fireflies: { sizeMin: 3, sizeMax: 5.5, role: 'accent', step: 400 },
};
const clampDensity = (density) => Math.max(0, Math.min(80, Math.round(density)));
/**
 * Deterministic golden-ratio low-discrepancy scatter — replicated from the web
 * `computeParticles` (its module pulls DOM helpers at import, so we inline the
 * pure math here). Same (mood, density, seed) → same layout on every device.
 */
function computeNativeParticles(mood, density, seed) {
    const tune = TUNING[mood];
    return Array.from({ length: clampDensity(density) }, (_, i) => {
        const t = ((i + seed) * GOLDEN) % 1;
        const u = ((i + seed + 7) * GOLDEN) % 1;
        const v = ((i + seed + 13) * GOLDEN) % 1;
        return {
            x: `${(t * 100).toFixed(1)}%`,
            y: `${(8 + v * 84).toFixed(1)}%`,
            size: Number((tune.sizeMin + u * (tune.sizeMax - tune.sizeMin)).toFixed(1)),
            opacity: Number((0.35 + t * 0.4).toFixed(2)),
        };
    });
}
/**
 * Native mirror of the web `ParticleField`. The web version animates each
 * particle on an infinite CSS keyframe path (rise/fall/blink). React Native
 * gets a **static, deterministic scatter** of small fully-rounded token-colored
 * dot Views — no animation loop, so there is nothing to honor for reduced
 * motion (it is already the reduced-motion rest pose). The `mood`/`density`/
 * `seed` props are preserved: `mood` selects the dot color + size range,
 * `density`/`seed` drive the same golden-ratio layout as web. Token-only.
 */
function ParticleField({ mood = 'ember', density = 18, seed = 1, children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const particles = React.useMemo(() => computeNativeParticles(mood, density, seed), [mood, density, seed]);
    const base = tokens.ramps[TUNING[mood].role][TUNING[mood].step];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-particle-field", pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFill, { overflow: 'hidden' }, style], children: [particles.map((p, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    borderRadius: 9999,
                    backgroundColor: (0, color_1.withAlpha)(base, p.opacity),
                } }, index))), children !== undefined && children !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill, children: children })) : null] }));
}
//# sourceMappingURL=ParticleField.js.map