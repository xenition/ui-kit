"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroList = MacroList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * A tappable list of agent macros (bundled actions that mutate a ticket). Each
 * row shows a glyph, name, optional description, and an action-count hint;
 * tapping a row reports the macro via `onApply`. Handles `loading` (placeholder
 * rows) and empty states, and skips `disabled` macros with a dimmed,
 * non-interactive row. Indexing is guarded and colors come from tokens only.
 */
function MacroList({ macros, onApply, loading = false, emptyText = 'No macros available.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading macros", style: style, children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 24, height: 24, borderRadius: 6, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } })] }, i))) }));
    }
    if (macros.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyText, style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: style, children: macros.map((macro) => {
            const isDisabled = macro.disabled === true;
            const count = typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
            const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: macro.glyph ?? '⚡', size: "lg", color: isDisabled ? 'muted' : 'primary' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: isDisabled ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: macro.name }), macro.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: macro.description })) : null] }), count !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [count, " action", count === 1 ? '' : 's'] })) : null] }));
            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: isDisabled }, accessibilityLabel: `Apply macro ${macro.name}`, disabled: isDisabled || !onApply, onPress: onApply ? () => onApply(macro) : undefined, style: ({ pressed }) => ({
                    padding: tokens.spacing.md,
                    borderBottomColor: colors.border,
                    borderBottomWidth: 1,
                    opacity: isDisabled ? 0.5 : pressed ? 0.7 : 1,
                    backgroundColor: pressed && !isDisabled ? (0, internal_1.withAlpha)(colors.primary, 0.06) : 'transparent',
                }), children: row }, macro.id));
        }) }));
}
//# sourceMappingURL=MacroList.js.map