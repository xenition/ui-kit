"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutageAlertV4 = OutageAlertV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * OutageAlert — **V4** design. A cleaner elevated card that keeps the severity
 * signal (active → danger, scheduled → warn, resolved → success via
 * `outageState`) carried by glyph + heading + a semantic tint (never color
 * alone): a thin tinted top rail and tinted ETA line. The kind glyph sits in the
 * signature brand-gradient disc. ETA is surfaced for active/scheduled and
 * suppressed once resolved; the details `Button` renders only when `onDetails`
 * is supplied. Same props as {@link OutageAlertProps}; token-only colors.
 */
function OutageAlertV4({ state = 'active', kind, area, eta, message, detailsLabel = 'View details', onDetails, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const od = (0, status_1.outageState)(state);
    const kd = kind != null ? (0, status_1.utilityKind)(kind) : null;
    const tint = colors[od.color];
    const heading = kd != null ? `${kd.label} ${od.heading.toLowerCase()}` : od.heading;
    const showEta = eta != null && state !== 'resolved';
    const discGlyph = kd != null ? kd.glyph : od.glyph;
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${heading}${area != null ? `, ${area}` : ''}`, style: [card, { gap: tokens.spacing.md, borderTopWidth: 3, borderTopColor: tint }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: { width: 48, height: 48, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: discGlyph, size: "xl", accessibilityLabel: od.label, style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        paddingHorizontal: tokens.spacing.sm,
                                        paddingVertical: 2,
                                        borderRadius: tokens.radius.full,
                                        backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: `${od.glyph} ${od.label}` }) }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: heading }), area != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: area })) : null, message != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { marginTop: 2, color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: message })) : null, showEta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { marginTop: 2, color: tint, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: ["Estimated restoration: ", eta] })) : null] })] }), onDetails != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "outline", onPress: onDetails, children: detailsLabel })) : null] }));
}
//# sourceMappingURL=OutageAlertV4.js.map