"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealCardV3 = DealCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("../commerce/money");
/**
 * DealCard **design V3** — a *minimal single line*: a small stage/outcome dot,
 * the deal name + account stacked, and the value pushed hard to the right.
 * No card chrome, no meter — a scannable roster row for long deal lists. Same
 * props as {@link DealCard}, same integer-cents money. The dot is reinforced by
 * an outcome word for screen readers, so meaning never rests on color alone.
 * Token-pure; won reads `successText`, lost `dangerText`.
 */
function DealCardV3({ name, company, valueCents, currency = 'USD', stage, probability, outcome = 'open', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const dotColor = outcome === 'won' ? colors.success : outcome === 'lost' ? colors.danger : outcome === 'pending' ? colors.warn : colors.primary;
    const valueColor = outcome === 'won' ? colors.successText : outcome === 'lost' ? colors.dangerText : colors.onSurface;
    const outcomeWord = outcome === 'won' ? 'Won' : outcome === 'lost' ? 'Lost' : outcome === 'pending' ? 'Pending' : 'Open';
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading deal", style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 64, height: tokens.typography.scale.sm, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `${outcomeWord}`, style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), company || stage ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [company, stage].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: valueColor, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: (0, money_1.formatMoney)(valueCents, currency) }), probability != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${Math.round(probability)}%` })) : null] })] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Deal ${name}${company ? `, ${company}` : ''}`, onPress: onPress, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=DealCardV3.js.map