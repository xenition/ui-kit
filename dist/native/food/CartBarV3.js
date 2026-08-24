"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartBarV3 = CartBarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
const color_1 = require("../primitives/internal/color");
const MAX_DOTS = 6;
/**
 * CartBar, alternate design **V3** — a *full-width itemised bar*. A surface-
 * toned bar with a top hairline that splits into a summary block (a row of dots
 * previewing how many items are in the cart, plus the running total) and a
 * distinct filled action Button — rather than the classic single filled pill.
 * The whole bar is pressable when `onPress` is set; empty/`loading` behave as
 * the classic. Same props as the classic.
 */
function CartBarV3({ itemCount, totalCents, currency = 'USD', label = 'View cart', onPress, variant = 'primary', loading = false, emptyLabel = 'Your cart is empty', formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const empty = itemCount <= 0;
    const accent = variant === 'accent' ? colors.accent : colors.primary;
    const disabled = empty || loading;
    const barStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderTopWidth: 1,
            borderColor: colors.border,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.lg,
        },
        style,
    ];
    if (empty) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: barStyle, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    const dotCount = Math.min(MAX_DOTS, Math.max(1, itemCount));
    const dots = Array.from({ length: dotCount }, (_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(accent, 0.55) } }, i)));
    const summary = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [itemCount, " ", itemCount === 1 ? 'item' : 'items'] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: dots }), itemCount > MAX_DOTS ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["+", itemCount - MAX_DOTS] })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: formatMoney(totalCents, currency) })] }));
    const action = ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: variant === 'accent' ? 'secondary' : 'primary', disabled: disabled, loading: loading, onPress: onPress, children: label }));
    // The action Button is the sole press target — no outer Pressable, so the
    // handler never double-fires. The bar itself is a plain summary container.
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: `${itemCount} items, ${formatMoney(totalCents, currency)}`, style: barStyle, children: [summary, action] }));
}
//# sourceMappingURL=CartBarV3.js.map