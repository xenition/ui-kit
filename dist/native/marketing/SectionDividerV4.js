"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDividerV4 = SectionDividerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const OrnamentRuleV4_1 = require("./OrnamentRuleV4");
/**
 * SectionDivider — **V4** "showcase" design (native mirror of the web V4).
 *
 * Same technique as the native base: `hairline` and `fade` use CSS gradients on
 * web, which React Native lacks here, so both are **approximated with solid
 * low-opacity token fills** (the tint always originates from a theme token);
 * `ornament` delegates to the ornament rule. The V4 *refines* the look — a
 * two-segment `hairline` that reads brighter toward the center (approximating
 * the web's fuller primary→accent gradient), a taller/cleaner surface-tinted
 * `fade`, and the `ornament` variant delegating to `OrnamentRuleV4` so its
 * sharpened rule carries through. Every variant/ornament/tone is honored.
 *
 * **Native-simplified / web-only:** the web `parallax` prop is scroll-linked and
 * is kept for parity but does nothing on native — there is no scroll-linked
 * drift here, so nothing to honor for reduced motion. Token-only colors.
 */
function SectionDividerV4({ variant = 'hairline', parallax: _parallax, ornament = 'diamond', tone = 'accent', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    void _parallax;
    if (variant === 'ornament') {
        return (0, jsx_runtime_1.jsx)(OrnamentRuleV4_1.OrnamentRuleV4, { ornament: ornament, tone: tone, style: style });
    }
    if (variant === 'fade') {
        // Taller, cleaner surface-tinted melt (V4 refinement over the base band).
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-section-divider-v4", accessibilityRole: "none", style: [
                { height: tokens.spacing['2xl'], flexDirection: 'column' },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.35) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.75) } })] }));
    }
    // hairline — two segments, brighter toward the center, approximating the web
    // V4's fuller primary→accent gradient with token-only fills.
    const p = tokens.ramps.primary[500];
    const a = tokens.ramps.accent[400];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-section-divider-v4", accessibilityRole: "none", style: [{ height: 1, flexDirection: 'row' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(p, 0.15) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(p, 0.7) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(a, 0.7) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, backgroundColor: (0, color_1.withAlpha)(a, 0.15) } })] }));
}
//# sourceMappingURL=SectionDividerV4.js.map