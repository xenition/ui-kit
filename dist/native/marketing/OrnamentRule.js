"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrnamentRule = OrnamentRule;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * Editorial divider — the native mirror of the web `OrnamentRule`: a 1px rule
 * flanking an optional centered diamond/dot/line ornament. Purely decorative
 * and static, token-tinted via `tone`.
 *
 * The web version fades each half of the rule with a horizontal gradient
 * (`linear-gradient` + `color-mix`). React Native has no CSS gradients here, so
 * the fade is **approximated with a solid low-opacity token border** — the tint
 * always originates from a theme token, so no literal color is introduced.
 */
function OrnamentRule({ ornament = 'diamond', tone = 'accent', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const toneColor = tone === 'accent'
        ? tokens.ramps.accent[400]
        : tone === 'primary'
            ? tokens.ramps.primary[400]
            : colors.border;
    // Solid low-opacity token color approximating the web gradient fade.
    const ruleColor = (0, color_1.withAlpha)(toneColor, 0.4);
    const ornamentStyle = ornament === 'none'
        ? null
        : ornament === 'diamond'
            ? { width: 7, height: 7, transform: [{ rotate: '45deg' }] }
            : ornament === 'dot'
                ? { width: 6, height: 6, borderRadius: 9999 }
                : { width: 24, height: 1 };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { testID: "xen-ornament-rule", accessibilityRole: "none", style: [
            { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: ruleColor } }), ornamentStyle ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginHorizontal: tokens.spacing.md,
                    backgroundColor: toneColor,
                    ...ornamentStyle,
                } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: ruleColor } })] }));
}
//# sourceMappingURL=OrnamentRule.js.map