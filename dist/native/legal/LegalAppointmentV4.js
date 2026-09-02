"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalAppointmentV4 = LegalAppointmentV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LegalAppointment — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, a leading soft-primary date-glyph
 * block, the date + time, type + status pills (each a glyph + word so state never
 * rests on color alone), and optional location / client. When `actionable` and
 * still `scheduled`, a confirm/cancel button row is shown. Tappable when
 * `onPress` is set. Reuses the base `variant` (`default` / `compact`). Token-only
 * colors via `useXenitionTheme()`.
 */
function LegalAppointmentV4({ type, date, time, location, client, status = 'scheduled', variant = 'default', actionable = false, onPress, onConfirm, onCancel, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.APPOINTMENT_TYPE_META[type];
    const showActions = actionable && status === 'scheduled';
    const cancelled = status === 'cancelled';
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        flexDirection: 'row',
        gap: tokens.spacing.md,
        opacity: cancelled ? 0.6 : 1,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: typeMeta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: date }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: time }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "inline", size: "sm" }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], variant: "soft", size: "sm" }) : null] }), !compact && (location || client) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [location, client].filter(Boolean).join(' · ') })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }, children: [onConfirm ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onConfirm, children: "Confirm" })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onPress: onCancel, children: "Cancel" })) : null] })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : cancelled ? 0.6 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=LegalAppointmentV4.js.map