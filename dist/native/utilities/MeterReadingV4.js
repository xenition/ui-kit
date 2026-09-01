"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeterReadingV4 = MeterReadingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
const SOURCE_LABEL = {
    estimated: 'Estimated',
    actual: 'Actual read',
    customer: 'Self-reported',
};
/**
 * MeterReading — **V4** design. The clean, trust-first meter card: an elevated
 * rounded surface with the utility-kind glyph in a small brand-gradient disc (the
 * signature V4 touch). Keeps the previous → current → used reading trio, the
 * derived consumption clamped to `0` and printed via `formatUsage`, the date, and
 * the source tag. Restraint by design — only the disc is gradient. Same props as
 * {@link MeterReadingProps}; token-only colors.
 */
function MeterReadingV4({ kind, previous, current, unit, decimals = 0, date, source, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const kd = (0, status_1.utilityKind)(kind);
    const u = unit ?? kd.unit;
    const prev = Number.isFinite(previous) ? previous : 0;
    const curr = Number.isFinite(current) ? current : 0;
    const consumption = Math.max(0, curr - prev);
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "xl", accessibilityLabel: `${kd.label} meter`, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [kd.label, " meter"] }), date != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: [date, source != null ? ` · ${SOURCE_LABEL[source]}` : ''] })) : source != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: SOURCE_LABEL[source] })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Previous" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: (0, format_1.formatUsage)(prev, u, decimals) })] }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2192", accessibilityLabel: "to", color: "muted" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Current" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: (0, format_1.formatUsage)(curr, u, decimals) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: "Used" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, format_1.formatUsage)(consumption, u, decimals) })] })] })] }));
}
//# sourceMappingURL=MeterReadingV4.js.map