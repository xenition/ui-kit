"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PestAlert = PestAlert;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Token-derived translucent tint (no literal hex; mirrors the primitives). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
const SEVERITY_META = {
    low: { label: 'Low', color: 'success', tone: 'success' },
    moderate: { label: 'Moderate', color: 'warn', tone: 'warn' },
    high: { label: 'High', color: 'danger', tone: 'danger' },
    critical: { label: 'Critical', color: 'danger', tone: 'danger' },
};
/**
 * A pest / disease alert — a tinted, accent-barred callout with a bug glyph, the
 * pest name, affected crop/field, an optional recommendation + detection time,
 * and an optional action {@link Button}. Severity drives the color, but the text
 * {@link Badge} states it too, so the alert never relies on color alone.
 * Announced via `accessibilityRole="alert"`. The tint is a token-derived
 * `withAlpha` of the severity slot — no literal colors.
 */
function PestAlert({ pest, severity = 'moderate', affected, recommendation, detectedAt, icon = '🐛', actionLabel, onAction, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = SEVERITY_META[severity];
    const accent = colors[meta.color];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "alert", accessibilityLabel: `${meta.label} pest alert: ${pest}${affected ? ` on ${affected}` : ''}`, style: [
            {
                padding: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                borderLeftWidth: 4,
                borderLeftColor: accent,
                backgroundColor: withAlpha(accent, 0.12),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: meta.color }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: pest }), affected != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: affected })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), recommendation != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.sm }, children: recommendation })) : null, detectedAt != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 4 }, children: ["\uD83D\uDD53 ", detectedAt] })) : null, actionLabel != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md, alignSelf: 'flex-start' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", tone: meta.tone === 'success' ? 'default' : meta.tone === 'warn' ? 'default' : 'danger', onPress: onAction, children: actionLabel }) })) : null] }));
}
//# sourceMappingURL=PestAlert.js.map