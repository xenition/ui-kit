"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipSelector = TipSelector;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
/** Compute a tip amount (integer cents) from a subtotal and a percentage. */
function tipCentsFor(subtotalCents, percent) {
    return Math.round((subtotalCents * percent) / 100);
}
/**
 * TipSelector — **V4** "register" design. A `radiogroup` of big (≥44px) tip
 * options: each preset shows the **% bold** and the computed amount
 * (`subtotal × pct / 100`) in `tabular-nums` below, plus a "No tip" and an
 * optional "Custom" option. The selected option fills **solid primary** with
 * on-primary ink; the rest stay calm on `surface`. Presentational only —
 * selection is driven by props and reported via callbacks. Token-only colors
 * via `useXenitionTheme()`, dark-mode safe.
 */
function TipSelector({ subtotalCents, currency = 'USD', percents = [15, 18, 20], selectedPercent, customCents, onSelectPercent, onNoTip, onCustom, testID, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const customSelected = typeof customCents === 'number' && customCents != null;
    const noTipSelected = (selectedPercent === null || selectedPercent === undefined) && !customSelected;
    const renderOption = (key, selected, ariaLabel, top, bottom, onPress) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: ariaLabel, onPress: onPress, style: ({ pressed }) => ({
            flexGrow: 1,
            flexBasis: 72,
            minHeight: 44,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            borderRadius: tokens.radius.md,
            borderWidth: 1,
            borderColor: selected ? colors.primary : colors.border,
            backgroundColor: selected ? colors.primary : colors.card,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.sm,
            opacity: pressed && !selected ? 0.92 : 1,
            ...(selected
                ? { shadowColor: colors.primary, shadowOpacity: 0.18, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 2 }
                : null),
        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '800',
                    fontVariant: ['tabular-nums'],
                }, children: top }), bottom != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.onPrimary : colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontVariant: ['tabular-nums'],
                }, children: bottom })) : null] }, key));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: "Tip amount", testID: testID, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: [renderOption('none', noTipSelected, 'No tip', 'No tip', undefined, onNoTip), percents.map((pct) => {
                const amount = tipCentsFor(subtotalCents, pct);
                const selected = selectedPercent === pct && !customSelected;
                return renderOption(`pct-${pct}`, selected, `Tip ${pct}%, ${(0, internal_1.formatMoney)(amount, currency)}`, `${pct}%`, (0, internal_1.formatMoney)(amount, currency), () => onSelectPercent?.(pct));
            }), onCustom
                ? renderOption('custom', customSelected, customSelected ? `Custom tip, ${(0, internal_1.formatMoney)(customCents, currency)}` : 'Custom tip', 'Custom', customSelected ? (0, internal_1.formatMoney)(customCents, currency) : undefined, onCustom)
                : null] }));
}
//# sourceMappingURL=TipSelector.js.map