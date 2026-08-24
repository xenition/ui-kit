"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionCardV2 = QuestionCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * QuestionCard, design V2 — an **elevated, borderless card led by a big circular
 * number badge**. Where the original frames the prompt in a flat outlined box,
 * V2 floats on a token drop-shadow and anchors the question with a filled
 * primary badge showing its position (`number`, or `number / total` beneath it).
 * The prompt sits beside the badge as the `header`; required state is spoken and
 * marked (never color-alone), and the answer control drops in below the divider.
 * Token-pure — fill/shadow/tints all trace to compiled tokens.
 */
function QuestionCardV2({ title, helpText, number, total, required = false, error, variant = 'default', children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const compact = variant === 'compact';
    const pad = compact ? tokens.spacing.md : tokens.spacing.lg;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                borderWidth: 0,
                padding: pad,
                ...(0, elevation_1.shadow)('md', tokens),
                opacity: enter.opacity,
                transform: enter.transform,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 44,
                                    height: 44,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: number != null ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.12),
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    ...(0, elevation_1.shadow)('sm', tokens),
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: number != null ? colors.onPrimary : colors.primaryText,
                                        fontSize: tokens.typography.scale.lg,
                                        fontWeight: '800',
                                    }, children: number != null ? number : '?' }) }), number != null && total != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: `/ ${total}` })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { accessibilityRole: "header", accessibilityLabel: required ? `${title}, required` : title, style: {
                                    color: colors.onSurface,
                                    fontSize: compact ? tokens.typography.scale.base : tokens.typography.scale.lg,
                                    fontWeight: '800',
                                }, children: [title, required ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText }, children: " *" }) : null] }), helpText ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: helpText })) : null] })] }), children ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: (0, color_1.withAlpha)(colors.border, 0.9),
                }, children: children })) : null, error ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "text", style: {
                    marginTop: tokens.spacing.sm,
                    color: colors.dangerText,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '700',
                }, children: error })) : null] }));
}
//# sourceMappingURL=QuestionCardV2.js.map