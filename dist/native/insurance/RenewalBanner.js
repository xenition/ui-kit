"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenewalBanner = RenewalBanner;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const URGENCY = {
    upcoming: { glyph: '🗓️', color: 'primary', heading: 'Renewal coming up' },
    due: { glyph: '⏰', color: 'warn', heading: 'Renewal due' },
    overdue: { glyph: '⚠️', color: 'danger', heading: 'Renewal overdue' },
};
/**
 * A call-to-action banner prompting a policy renewal. Urgency is conveyed by
 * **glyph + heading + a tint that traces to a `SemanticColors` slot**
 * (upcoming → primary, overdue → danger) — never color alone. The optional
 * renewal premium is integer cents via `formatMoney`. The renew `Button` is
 * only rendered when `onRenew` is supplied. Token-bound throughout.
 */
function RenewalBanner({ renewalDate, urgency = 'due', premiumCents, currency = 'USD', formatMoney: format = format_1.formatMoney, renewLabel = 'Renew now', loading = false, onRenew, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const ud = URGENCY[urgency] ?? URGENCY.due;
    const tint = colors[ud.color];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${ud.heading}, ${renewalDate}`, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: tint,
                backgroundColor: (0, format_1.withAlpha)(tint, 0.1),
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: ud.glyph, size: "xl", accessibilityLabel: ud.heading }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: ud.heading }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["Your policy renews on ", renewalDate, premiumCents != null
                                        ? ` · ${format(Math.max(0, Math.trunc(premiumCents)), currency)}`
                                        : ''] })] })] }), onRenew != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: urgency === 'overdue' ? 'danger' : 'default', onPress: onRenew, loading: loading, children: renewLabel })) : null] }));
}
//# sourceMappingURL=RenewalBanner.js.map