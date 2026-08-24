"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSummary = ResponseSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A read-back of the respondent's answers before submit — a titled list of
 * question/answer rows inside a token `Card`. Skipped answers render in the
 * muted tone and are announced as skipped (not color-only). When `onEdit` is
 * supplied each row exposes an `Edit` button. An empty `answers` array renders
 * a muted empty state. No literal colors.
 */
function ResponseSummary({ answers, title = 'Review your answers', onEdit, editLabel = 'Edit', emptyText = 'No answers to review yet.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (answers.length === 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "lg", style: style, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: { alignItems: 'center', gap: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: emptyText }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: "md", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: answers.map((a, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a.skipped ? `${a.question}: skipped` : `${a.question}: ${a.answer}`, style: {
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                            gap: tokens.spacing.sm,
                            paddingTop: i === 0 ? 0 : tokens.spacing.sm,
                            borderTopWidth: i === 0 ? 0 : 1,
                            borderTopColor: colors.border,
                        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: a.question }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            color: a.skipped ? colors.muted : colors.onSurface,
                                            fontSize: tokens.typography.scale.base,
                                            fontStyle: a.skipped ? 'italic' : 'normal',
                                            fontWeight: a.skipped ? '400' : '600',
                                        }, children: a.skipped ? 'Skipped' : a.answer })] }), onEdit ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${editLabel} ${a.question}`, onPress: () => onEdit(a.id), hitSlop: 8, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: editLabel }) })) : null] }, a.id))) })] }) }));
}
//# sourceMappingURL=ResponseSummary.js.map