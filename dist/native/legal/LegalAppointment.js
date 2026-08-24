"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalAppointment = LegalAppointment;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A scheduled legal appointment — consultation, deposition, mediation, hearing —
 * with a leading date block, type + status pills (each glyph + word so state
 * never rests on color alone), and optional location / client. When `actionable`
 * and still `scheduled`, a confirm/cancel row is shown. All colors are theme
 * tokens — no literals.
 */
function LegalAppointment({ type, date, time, location, client, status = 'scheduled', variant = 'default', actionable = false, onPress, onConfirm, onCancel, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.APPOINTMENT_TYPE_META[type];
    const tint = (0, internal_1.toneColor)(colors, typeMeta.tone);
    const showActions = actionable && status === 'scheduled';
    const cancelled = status === 'cancelled';
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                opacity: cancelled ? 0.65 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    minWidth: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.xs,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: (0, color_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.base }, children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: date }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], size: "sm" }) : null] }), !compact && (location || client) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [location, client].filter(Boolean).join(' · ') })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [onConfirm ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", tone: "success", onPress: onConfirm, children: "Confirm" })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onCancel, children: "Cancel" })) : null] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=LegalAppointment.js.map