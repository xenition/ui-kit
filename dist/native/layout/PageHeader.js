"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeader = PageHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Screen header: a prominent `title` with optional `subtitle` on the left and
 * an `actions` slot on the right, laid out over a token bottom border. Type
 * sizes, colors, and spacing trace to the compiled theme; no literal colors.
 * The title carries the `header` accessibility role.
 */
function PageHeader({ title, subtitle, actions, style, ...rest }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: tokens.spacing.md,
                paddingBottom: tokens.spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], ...rest, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), actions ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexShrink: 0 }, children: actions }) : null] }));
}
//# sourceMappingURL=PageHeader.js.map