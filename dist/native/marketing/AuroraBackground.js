"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuroraBackground = AuroraBackground;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const AURORA_BLOBS = [
    { role: 'primary', step: 500, top: '-20%', left: '-10%', size: '55%', opacity: 0.4 },
    { role: 'accent', step: 400, top: '-10%', left: '55%', size: '50%', opacity: 0.32 },
    { role: 'primary', step: 700, top: '45%', left: '20%', size: '60%', opacity: 0.28 },
    { role: 'accent', step: 600, top: '55%', left: '65%', size: '45%', opacity: 0.28 },
];
const MESH_BLOBS = [
    { role: 'primary', step: 400, top: '-25%', left: '-15%', size: '70%', opacity: 0.36 },
    { role: 'accent', step: 500, top: '-20%', left: '60%', size: '65%', opacity: 0.32 },
    { role: 'primary', step: 600, top: '55%', left: '55%', size: '70%', opacity: 0.32 },
    { role: 'accent', step: 400, top: '60%', left: '-20%', size: '60%', opacity: 0.28 },
];
const RADIAL_BLOBS = [
    { role: 'primary', step: 600, top: '10%', left: '15%', size: '70%', opacity: 0.36 },
    { role: 'accent', step: 500, top: '25%', left: '30%', size: '40%', opacity: 0.28 },
];
const BLOBS = {
    aurora: AURORA_BLOBS,
    mesh: MESH_BLOBS,
    radial: RADIAL_BLOBS,
};
/**
 * Native mirror of the web `AuroraBackground`. The web version paints blurred,
 * slowly drifting radial-gradient blobs (plus grain/pattern overlays) using CSS
 * `filter: blur()`, keyframes, and `mix-blend-mode` — none of which exist in
 * React Native. Native therefore renders a **static, token-styled** layered
 * background: a few absolutely-positioned, low-opacity, fully-rounded ramp-color
 * Views (primary/accent steps 400–700), softened with a translucent alpha
 * derived from the token so they read as glows rather than hard discs. No
 * continuous animation — nothing to honor for reduced motion. `children` render
 * in an absolute-fill layer above the blobs. `grain` and `pattern` are accepted
 * for API parity but are **inert** on native (see prop docs). Token-only.
 */
function AuroraBackground({ variant = 'aurora', grain: _grain = false, pattern: _pattern = 'none', children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-aurora-background", pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFill, { overflow: 'hidden' }, style], children: [BLOBS[variant].map((blob, index) => {
                const base = tokens.ramps[blob.role][blob.step];
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        position: 'absolute',
                        top: blob.top,
                        left: blob.left,
                        width: blob.size,
                        aspectRatio: 1,
                        borderRadius: 9999,
                        backgroundColor: (0, color_1.withAlpha)(base, blob.opacity),
                    } }, index));
            }), children !== undefined && children !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill, children: children })) : null] }));
}
//# sourceMappingURL=AuroraBackground.js.map