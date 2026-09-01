"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuroraBackgroundV4 = AuroraBackgroundV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const Gradient_1 = require("../commerce/internal/Gradient");
/*
 * Same blob compositions as the native base (positions + steps kept so a given
 * variant reads the same), tuned a touch brighter at the core so the V4 reads
 * bolder. Every value is a ramp role/step or an opacity — never a literal.
 */
const AURORA_BLOBS = [
    { role: 'primary', step: 500, top: '-20%', left: '-10%', size: '55%', opacity: 0.5 },
    { role: 'accent', step: 400, top: '-10%', left: '55%', size: '50%', opacity: 0.42 },
    { role: 'primary', step: 700, top: '45%', left: '20%', size: '60%', opacity: 0.36 },
    { role: 'accent', step: 600, top: '55%', left: '65%', size: '45%', opacity: 0.36 },
];
const MESH_BLOBS = [
    { role: 'primary', step: 400, top: '-25%', left: '-15%', size: '70%', opacity: 0.46 },
    { role: 'accent', step: 500, top: '-20%', left: '60%', size: '65%', opacity: 0.42 },
    { role: 'primary', step: 600, top: '55%', left: '55%', size: '70%', opacity: 0.42 },
    { role: 'accent', step: 400, top: '60%', left: '-20%', size: '60%', opacity: 0.36 },
];
const RADIAL_BLOBS = [
    { role: 'primary', step: 600, top: '10%', left: '15%', size: '70%', opacity: 0.46 },
    { role: 'accent', step: 500, top: '25%', left: '30%', size: '40%', opacity: 0.36 },
];
const BLOBS = {
    aurora: AURORA_BLOBS,
    mesh: MESH_BLOBS,
    radial: RADIAL_BLOBS,
};
/**
 * AuroraBackground — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base {@link AuroraBackground}: a static,
 * token-styled layered background of absolutely-positioned, fully-rounded
 * ramp-color Views — React Native has no CSS `filter: blur`, keyframes or
 * `mix-blend-mode`, so nothing animates and there is nothing to honor for
 * reduced motion (it is already the rest state). The V4 *refines* the look:
 * each blob is drawn as a soft **radial `Gradient`** (bright ramp core →
 * translucent edge via `withAlpha`) instead of a flat alpha disc, giving the
 * smoother, more confident falloff the web V4 gets from multi-stop radials.
 * The blob compositions match the base per `variant`, so `aurora`/`mesh`/
 * `radial` read the same, only cleaner.
 *
 * `grain` and `pattern` remain **inert** on native (no SVG-filter / CSS
 * tiling equivalent), accepted for API parity exactly as in the base.
 * `children` render in an absolute-fill layer above the blobs. Token-only.
 */
function AuroraBackgroundV4({ variant = 'aurora', grain: _grain = false, pattern: _pattern = 'none', children, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    // Keep referenced so the exported prop union stays live for tooling/tests.
    const _p = _pattern;
    void _p;
    void _grain;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-aurora-background-v4", pointerEvents: "none", style: [react_native_1.StyleSheet.absoluteFill, { overflow: 'hidden' }, style], children: [BLOBS[variant].map((blob, index) => {
                const core = tokens.ramps[blob.role][blob.step];
                return ((0, jsx_runtime_1.jsx)(Gradient_1.Gradient, { colors: [(0, color_1.withAlpha)(core, blob.opacity), (0, color_1.withAlpha)(core, 0)], start: { x: 0.5, y: 0.5 }, end: { x: 1, y: 1 }, style: {
                        position: 'absolute',
                        top: blob.top,
                        left: blob.left,
                        width: blob.size,
                        aspectRatio: 1,
                        borderRadius: 9999,
                    } }, index));
            }), children !== undefined && children !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: react_native_1.StyleSheet.absoluteFill, children: children })) : null] }));
}
//# sourceMappingURL=AuroraBackgroundV4.js.map