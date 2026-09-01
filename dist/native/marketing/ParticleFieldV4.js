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
exports.ParticleFieldV4 = ParticleFieldV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const GOLDEN = 0.618033988749895;
/*
 * Same mood → role/step/size mapping as the native base, with V4-tuned size
 * ranges (a touch larger, cleaner cores) and a confident per-mood default
 * density. Token-only: fill color is always a ramp step.
 */
const TUNING = {
    ember: { sizeMin: 3.5, sizeMax: 9, role: 'primary', step: 400, defaultDensity: 16 },
    sparks: { sizeMin: 2, sizeMax: 5, role: 'accent', step: 500, defaultDensity: 26 },
    snow: { sizeMin: 3, sizeMax: 7, role: 'neutral', step: 200, defaultDensity: 22 },
    fireflies: { sizeMin: 3, sizeMax: 6, role: 'accent', step: 400, defaultDensity: 20 },
};
const clampDensity = (density) => Math.max(0, Math.min(80, Math.round(density)));
/**
 * Deterministic golden-ratio low-discrepancy scatter — the same pure math the
 * native base inlines (its web sibling's `computeParticles` pulls DOM helpers
 * at import), so the same `(mood, density, seed)` lands the same layout on
 * every device and matches the base.
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
            // Slightly bolder peak than the base for the "showcase" read.
            opacity: Number((0.4 + t * 0.4).toFixed(2)),
        };
    });
}
/**
 * ParticleField — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: a **static, deterministic scatter** of
 * small fully-rounded token-colored dot Views — React Native has no CSS
 * keyframe engine here, so nothing animates and there is nothing to honor for
 * reduced motion (it is already the reduced-motion rest pose). The V4 *refines*
 * the look: V4-tuned size ranges + confident per-mood default density, and a
 * soft two-stop token core (bright center → translucent edge) so each dot reads
 * cleaner and bolder than the base's flat alpha disc.
 *
 * `mood`/`density`/`seed` are honored exactly as in the base: `mood` selects the
 * dot color + size range, `density`/`seed` drive the same golden-ratio layout.
 * An explicit `density` overrides the per-mood default. Token-only colors.
 */
function ParticleFieldV4({ mood = 'ember', density, seed = 1, children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const tune = TUNING[mood];
    const resolvedDensity = density ?? tune.defaultDensity;
    const particles = React.useMemo(() => computeNativeParticles(mood, resolvedDensity, seed), [mood, resolvedDensity, seed]);
    const core = tokens.ramps[tune.role][tune.step];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-particle-field-v4", pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFill, { overflow: 'hidden' }, style], children: [particles.map((p, index) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: p.x,
                    top: p.y,
                    width: p.size,
                    height: p.size,
                    borderRadius: 9999,
                    backgroundColor: (0, color_1.withAlpha)(core, p.opacity),
                    // Bright inner core → soft token halo, without a gradient dep.
                    borderWidth: p.size > 4 ? 0.5 : 0,
                    borderColor: (0, color_1.withAlpha)(core, Math.min(1, p.opacity + 0.25)),
                } }, index))), children !== undefined && children !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill, children: children })) : null] }));
}
//# sourceMappingURL=ParticleFieldV4.js.map