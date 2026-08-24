"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixQuestion = MatrixQuestion;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A matrix / grid question — one `radiogroup` per statement row, each sharing
 * the same column choices, laid out as a header row plus one selectable cell
 * per column. The chosen cell in a row fills with the primary token and is
 * announced via `accessibilityState.selected` (state is never color-only). An
 * empty `rows` or `columns` list renders a muted empty state. No literal
 * colors.
 */
function MatrixQuestion({ rows, columns, value, onChange, accessibilityLabel = 'Rating matrix', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (rows.length === 0 || columns.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "Nothing to rate here." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1.4 } }), columns.map((c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center', fontWeight: '600' }, children: c.label }) }, c.id)))] }), rows.map((row) => {
                const chosen = value[row.id];
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: row.label, style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: tokens.spacing.xs,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1.4, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: row.label }), columns.map((c) => {
                            const selected = chosen === c.id;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${row.label}: ${c.label}`, disabled: disabled, onPress: () => onChange(row.id, c.id), style: { flex: 1, alignItems: 'center', paddingVertical: tokens.spacing.xs, opacity: disabled ? 0.5 : 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 24,
                                        height: 24,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: tokens.radius.full,
                                        borderWidth: selected ? 0 : 1,
                                        borderColor: colors.border,
                                        backgroundColor: selected ? colors.primary : colors.surface,
                                    }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 10,
                                            height: 10,
                                            borderRadius: tokens.radius.full,
                                            backgroundColor: colors.onPrimary,
                                        } })) : null }) }, c.id));
                        })] }, row.id));
            })] }));
}
//# sourceMappingURL=MatrixQuestion.js.map