"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPayRowV4 = AutoPayRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * AutoPayRow — **V4** design. An elevated row: the AutoPay glyph in the
 * signature brand-gradient disc, a title with an on/off status conveyed by a
 * badge + label (never the switch color alone), the token-bound controlled
 * `Switch`, and — when enabled — a funding method / next-charge summary (amounts
 * integer cents via `formatMoney`). Honors `disabled`. Same props as
 * {@link AutoPayRowProps}; token-only colors.
 */
function AutoPayRowV4({ label = 'AutoPay', enabled, onToggle, method, nextChargeDate, amountCents, currency = 'USD', formatMoney: format = format_1.formatMoney, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const summary = [];
    if (enabled) {
        if (method != null)
            summary.push(method);
        if (nextChargeDate != null)
            summary.push(`Next ${nextChargeDate}`);
        if (amountCents != null) {
            summary.push(`up to ${format(Math.max(0, Math.trunc(amountCents)), currency)}`);
        }
    }
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            card,
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDD04", size: "xl", accessibilityLabel: "AutoPay", style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: enabled ? 'success' : 'neutral', variant: "soft", size: "sm", children: enabled ? '✓ On' : '○ Off' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: enabled
                            ? summary.length > 0
                                ? summary.join(' · ')
                                : 'Bills are paid automatically'
                            : 'Turn on to pay automatically each cycle' })] }), (0, jsx_runtime_1.jsx)(primitives_2.Switch, { checked: enabled, onCheckedChange: onToggle, disabled: disabled, accessibilityLabel: `${label}, ${enabled ? 'on' : 'off'}` })] }));
}
//# sourceMappingURL=AutoPayRowV4.js.map