"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Callout = Callout;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Callout — a lightweight boxed emphasis block for asides and tips, lighter
 * than `Banner` (no solid fill). A `surface` card with a full 1px border and
 * title tinted to the tone token (`info`→primary, `success`→success,
 * `warn`→warn, `danger`→danger, `neutral`→border/muted), plus an optional
 * leading icon. Body copy stays `onSurface`. No literal colors.
 */
function Callout({ tone = 'info', icon, title, children, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const toneColor = {
        info: colors.primary,
        success: colors.success,
        warn: colors.warn,
        danger: colors.danger,
        neutral: colors.muted,
    };
    const edge = tone === 'neutral' ? colors.border : toneColor[tone];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: edge,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: 2 }, children: icon }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, fontWeight: '700', color: toneColor[tone] }, children: title })) : null, typeof children === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.onSurface }, children: children })) : (children)] })] }));
}
//# sourceMappingURL=Callout.js.map