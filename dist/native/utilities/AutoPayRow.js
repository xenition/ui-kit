"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoPayRow = AutoPayRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
/**
 * An AutoPay enrollment row: a leading glyph, a title with an on/off status
 * conveyed by **a badge + label** (never the switch color alone), the token-bound
 * `Switch`, and — when enabled — a funding method / next-charge summary. Any
 * amount is integer cents via `formatMoney`. The switch is fully controlled
 * (`enabled` + `onToggle`) and honors `disabled`. Every color traces to a token.
 */
function AutoPayRow({ label = 'AutoPay', enabled, onToggle, method, nextChargeDate, amountCents, currency = 'USD', formatMoney: format = format_1.formatMoney, disabled = false, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDD04", size: "lg", accessibilityLabel: "AutoPay" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: enabled ? 'success' : 'neutral', variant: "soft", size: "sm", children: enabled ? '✓ On' : '○ Off' })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: enabled
                            ? summary.length > 0
                                ? summary.join(' · ')
                                : 'Bills are paid automatically'
                            : 'Turn on to pay automatically each cycle' })] }), (0, jsx_runtime_1.jsx)(primitives_2.Switch, { checked: enabled, onCheckedChange: onToggle, disabled: disabled, accessibilityLabel: `${label}, ${enabled ? 'on' : 'off'}` })] }));
}
//# sourceMappingURL=AutoPayRow.js.map