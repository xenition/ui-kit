"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Eyebrow = Eyebrow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Tracked small-caps kicker label — the native mirror of the web `Eyebrow`.
 * Color comes from the semantic `primary`/`accent`/`muted` tokens (auto-
 * contrast-checked by the compiler); the optional flanking rules inherit the
 * same token color. No literal colors.
 */
function Eyebrow({ tone = 'accent', rule = false, align = 'start', style, children, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const color = tone === 'primary' ? colors.primary : tone === 'muted' ? colors.muted : colors.accent;
    const tick = ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { width: 24, height: 1, backgroundColor: color } }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: align === 'center' ? 'center' : 'flex-start',
            gap: tokens.spacing.xs,
        }, children: [rule ? tick : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: [
                    {
                        color,
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: 2,
                    },
                    style,
                ], children: children }), rule ? tick : null] }));
}
//# sourceMappingURL=Eyebrow.js.map