"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSummaryV4 = ResponseSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * ResponseSummary — **V4** "focus" design. The calm, legible read-back of the
 * respondent's answers before submit: a titled list of airy rows where the
 * question sits small and muted above its bold on-surface answer. Skipped
 * answers render muted and italic with an explicit, spoken "Skipped" marker (not
 * color-only), and each row can expose a primary `Edit` affordance when `onEdit`
 * is supplied. An empty `answers` array renders a muted empty state. One accent
 * (primary), no gradients. Same props/behavior as {@link ResponseSummaryProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha`.
 */
function ResponseSummaryV4({ answers, title = 'Review your answers', onEdit, editLabel = 'Edit', emptyText = 'No answers to review yet.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (answers.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "lg", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { alignItems: 'center', gap: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyText }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: answers.map((a, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`, style: {
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap: tokens.spacing.sm,
                            minHeight: 44,
                            paddingVertical: tokens.spacing.xs,
                            paddingTop: i === 0 ? tokens.spacing.xs : tokens.spacing.sm,
                            borderTopWidth: i === 0 ? 0 : 1,
                            borderTopColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: a.question }), a.skipped ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            alignSelf: 'flex-start',
                                            paddingHorizontal: tokens.spacing.sm,
                                            paddingVertical: 2,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                                color: colors.muted,
                                                fontSize: tokens.typography.scale.xs,
                                                fontWeight: '700',
                                                fontStyle: 'italic',
                                            }, children: "Skipped" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '700',
                                        }, children: a.answer }))] }), onEdit ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${editLabel} ${a.question}`, onPress: () => onEdit(a.id), hitSlop: 8, style: { minHeight: 44, justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: editLabel }) })) : null] }, a.id))) })] }) }));
}
//# sourceMappingURL=ResponseSummaryV4.js.map