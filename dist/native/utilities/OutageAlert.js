"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutageAlert = OutageAlert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * A prominent banner for a service outage / planned-maintenance event. Severity
 * is conveyed by **glyph + heading + a tint that traces to a `SemanticColors`
 * slot** (active → danger, scheduled → warn, resolved → success) — never color
 * alone. The estimated restoration is surfaced for active/scheduled events and
 * suppressed once resolved. An optional details `Button` renders only when
 * `onDetails` is supplied. Token-bound throughout.
 */
function OutageAlert({ state = 'active', kind, area, eta, message, detailsLabel = 'View details', onDetails, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const od = (0, status_1.outageState)(state);
    const kd = kind != null ? (0, status_1.utilityKind)(kind) : null;
    const tint = colors[od.color];
    const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
    const showEta = eta != null && state !== 'resolved';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${heading}${area != null ? `, ${area}` : ''}`, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: tint,
                backgroundColor: (0, format_1.withAlpha)(tint, 0.1),
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: od.glyph, size: "xl", accessibilityLabel: od.label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: heading }), area != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: area })) : null, message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: 2, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: message })) : null, showEta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: 2, color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Estimated restoration: ", eta] })) : null] })] }), onDetails != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", onPress: onDetails, children: detailsLabel })) : null] }));
}
//# sourceMappingURL=OutageAlert.js.map