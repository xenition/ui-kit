"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeRateRow = ExchangeRateRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const motion_1 = require("../primitives/internal/motion");
/**
 * A currency-pair quote row: `BASE → QUOTE`, the rate at fixed precision, and an
 * optional signed change chip (up = `success`, down = `danger`). The rate is a
 * display-only number formatted to `precision` decimals via `toFixed`, so the
 * shown value never drifts. Colors trace to tokens; becomes a button when
 * `onPress` is given.
 */
function ExchangeRateRow({ baseCurrency, quoteCurrency, rate, changePct, precision = 4, onPress, appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const safeRate = Number.isFinite(rate) ? rate : 0;
    const hasChange = typeof changePct === 'number' && Number.isFinite(changePct);
    const up = (changePct ?? 0) >= 0;
    // FILL-AS-TEXT: the change chip is TEXT, so it reads the AA-guaranteed *Text slots.
    const changeColor = up ? colors.successText : colors.dangerText;
    // Appearance surface FIRST; layout (radius/padding) stays AFTER. Classic → unchanged.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flex: 1 }, children: [baseCurrency, " ", (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted }, children: "\u2192" }), " ", quoteCurrency] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                }, children: safeRate.toFixed(Math.max(0, Math.trunc(precision))) }), hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: changeColor, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [up ? '▲' : '▼', " ", up ? '+' : '', changePct.toFixed(2), "%"] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${baseCurrency} to ${quoteCurrency}, ${safeRate.toFixed(Math.max(0, Math.trunc(precision)))}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=ExchangeRateRow.js.map