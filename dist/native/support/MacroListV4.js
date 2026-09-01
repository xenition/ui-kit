"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MacroListV4 = MacroListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/**
 * MacroList — **V4** "calm console" design. A tidy list of macro rows, each an
 * elevated rounded card (≥44px) with a leading soft-tint glyph disc (one accent =
 * primary), the macro name + optional description, and an action-count run hint.
 * Press paints a soft-primary tint; `disabled` macros dim and stop responding.
 * Tapping reports the macro via `onApply`. Same props/behavior as
 * {@link MacroListProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. Dark-mode safe.
 */
function MacroListV4({ macros, onApply, loading = false, emptyText = 'No macros available.', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const cardBase = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading macros", style: [{ gap: tokens.spacing.sm }, style], children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { ...cardBase, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, padding: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 36, height: 36, borderRadius: 18, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: 4, backgroundColor: (0, internal_1.withAlpha)(colors.onSurface, 0.1) } })] }, i))) }));
    }
    if (macros.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: emptyText, style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "menu", style: [{ gap: tokens.spacing.sm }, style], children: macros.map((macro) => {
            const isDisabled = macro.disabled === true;
            const count = typeof macro.actionCount === 'number' && macro.actionCount > 0 ? macro.actionCount : undefined;
            const discColor = isDisabled ? colors.muted : colors.primary;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: isDisabled }, accessibilityLabel: `Apply macro ${macro.name}`, disabled: isDisabled || !onApply, onPress: onApply ? () => onApply(macro) : undefined, style: ({ pressed }) => ({
                    ...cardBase,
                    minHeight: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.md,
                    opacity: isDisabled ? 0.5 : 1,
                    backgroundColor: pressed && !isDisabled && onApply ? (0, internal_1.withAlpha)(colors.primary, 0.1) : colors.card,
                }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: 18,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, internal_1.withAlpha)(discColor, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: discColor, fontSize: tokens.typography.scale.base }, children: macro.glyph ?? '⚡' }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: isDisabled ? colors.muted : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '600',
                                }, children: macro.name }), macro.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: macro.description })) : null] }), count !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [count, " action", count === 1 ? '' : 's'] })) : null] }, macro.id));
        }) }));
}
//# sourceMappingURL=MacroListV4.js.map