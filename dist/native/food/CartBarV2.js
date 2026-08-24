"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBarV2 = CartBarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const commerce_1 = require("../commerce");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * CartBar, alternate design **V2** — an *elevated floating pill*. Instead of a
 * full-width filled bar, V2 is a rounded-full, self-centred pill that hovers
 * above the content with a real drop shadow — the classic "N items · total"
 * FAB-style checkout affordance. Empty and `loading` states behave exactly as
 * the classic (collapses to a muted, non-interactive pill). Same props.
 */
function CartBarV2({ itemCount, totalCents, currency = 'USD', label = 'View cart', onPress, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const empty = itemCount <= 0;
    const bg = variant === 'accent' ? colors.accent : colors.primary;
    const fg = variant === 'accent' ? colors.onAccent : colors.onPrimary;
    const disabled = empty || loading;
    const pillStyle = [
        {
            alignSelf: 'center',
            maxWidth: 480,
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.full,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.lg,
            backgroundColor: empty ? colors.surface : bg,
            borderWidth: empty ? 1 : 0,
            borderColor: colors.border,
            ...(0, elevation_1.shadow)(empty ? 'sm' : 'lg', tokens),
        },
        style,
    ];
    if (empty) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: pillStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            minWidth: 26,
                            height: 26,
                            paddingHorizontal: tokens.spacing.xs,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: fg,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: bg, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: itemCount }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: loading ? 'Updating…' : label })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: formatMoney(totalCents, currency) })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: pillStyle, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}, ${itemCount} items, ${formatMoney(totalCents, currency)}`, accessibilityState: { disabled, busy: loading }, disabled: disabled, onPress: onPress, style: ({ pressed }) => [pillStyle, { opacity: pressed ? 0.9 : 1 }], children: content }));
}
//# sourceMappingURL=CartBarV2.js.map