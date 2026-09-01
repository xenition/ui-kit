"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatrixQuestionV4 = MatrixQuestionV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * MatrixQuestion — **V4** "clean form / focus" design. A calm, legible row×column
 * grid: one `radiogroup` per statement row sharing the same column choices, laid
 * out as a header row plus one big-tap-target cell per column. Legible column
 * headers sit above zebra-free rows separated only by a hairline `border`. The
 * chosen cell fills with a solid **primary** disc (on a soft primary tint) and is
 * announced via `accessibilityState.selected` — state is never color-only. One
 * accent, generous 8-pt air, no gradients. An empty `rows`/`columns` list renders
 * a muted empty state. Same props/behavior as {@link MatrixQuestionProps};
 * token-only colors via `useXenitionTheme()` + `withAlpha` (no literal colors).
 */
function MatrixQuestionV4({ rows, columns, value, onChange, accessibilityLabel = 'Rating matrix', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (rows.length === 0 || columns.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "Nothing to rate here." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: accessibilityLabel, style: [
            {
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    paddingHorizontal: tokens.spacing.sm,
                    paddingTop: tokens.spacing.sm,
                    paddingBottom: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1.4 } }), columns.map((c) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                textAlign: 'center',
                                fontWeight: '700',
                                letterSpacing: 0.4,
                            }, children: c.label }) }, c.id)))] }), rows.map((row) => {
                const chosen = value[row.id];
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: row.label, style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: tokens.spacing.sm,
                        borderTopWidth: 1,
                        borderTopColor: colors.border,
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1.4,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                                paddingVertical: tokens.spacing.sm,
                                paddingRight: tokens.spacing.sm,
                            }, children: row.label }), columns.map((c) => {
                            const selected = chosen === c.id;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `${row.label}: ${c.label}`, disabled: disabled, onPress: () => onChange(row.id, c.id), style: {
                                    flex: 1,
                                    minHeight: 44,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: tokens.radius.md,
                                    backgroundColor: selected ? (0, color_1.withAlpha)(colors.primary, 0.12) : 'transparent',
                                    opacity: disabled ? 0.5 : 1,
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 28,
                                        height: 28,
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
//# sourceMappingURL=MatrixQuestionV4.js.map