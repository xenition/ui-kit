"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionDivider = SectionDivider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const OrnamentRule_1 = require("./OrnamentRule");
/**
 * Section separator — the native mirror of the web `SectionDivider`.
 *
 * The web `hairline` and `fade` variants use CSS gradients (`linear-gradient`
 * + `color-mix`); React Native has no CSS gradients here, so both are
 * **approximated with solid low-opacity token fills** (the tint always
 * originates from a theme token). The web `parallax` prop is scroll-linked and
 * is kept for parity but does nothing on native.
 */
function SectionDivider({ variant = 'hairline', parallax: _parallax, ornament = 'diamond', tone = 'accent', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (variant === 'ornament') {
        return (0, jsx_runtime_1.jsx)(OrnamentRule_1.OrnamentRule, { ornament: ornament, tone: tone, style: style });
    }
    if (variant === 'fade') {
        // Web fades the surface upward; native approximates with a tall low-opacity
        // surface-tinted band.
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-section-divider", accessibilityRole: "none", style: [
                {
                    height: tokens.spacing['2xl'],
                    backgroundColor: (0, color_1.withAlpha)(colors.surface, 0.6),
                },
                style,
            ] }));
    }
    // hairline — solid low-opacity primary tint approximating the primary→accent
    // gradient rule.
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-section-divider", accessibilityRole: "none", style: [
            { height: 1, backgroundColor: (0, color_1.withAlpha)(tokens.ramps.primary[500], 0.55) },
            style,
        ] }));
}
//# sourceMappingURL=SectionDivider.js.map