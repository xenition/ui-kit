"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTag = PriceTag;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("./money");
const SIZE_KEY = {
    sm: 'sm',
    md: 'base',
    lg: 'xl',
};
/**
 * Formatted price with an optional strikethrough "compare-at" — the native
 * mirror of the web `PriceTag`. All money is integer cents formatted through
 * {@link formatMoney} (overridable via `formatMoney`). Token-only: the current
 * price reads `on-surface`, the struck original is `muted`.
 */
function PriceTag({ cents, currency = 'USD', compareAtCents, formatMoney: format = money_1.formatMoney, size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale[SIZE_KEY[size]],
                    fontWeight: '600',
                }, children: format(cents, currency) }), hasCompare ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    textDecorationLine: 'line-through',
                }, children: format(compareAtCents, currency) })) : null] }));
}
//# sourceMappingURL=PriceTag.js.map