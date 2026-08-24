"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegalAppointmentV2 = LegalAppointmentV2;
exports.LegalAppointmentV3 = LegalAppointmentV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * LegalAppointment, design v2 — an **elevated card** led by a prominent tinted
 * date block (type glyph over the date), with type + status pills, location /
 * client, and a confirm / cancel action row when actionable + still scheduled.
 * Same Props as {@link LegalAppointment}; a larger, calendar-block presentation
 * vs. the flat original. Token-pure; status is a glyph + word, never color alone.
 */
function LegalAppointmentV2({ type, date, time, location, client, status = 'scheduled', variant = 'default', actionable = false, onPress, onConfirm, onCancel, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const compact = variant === 'compact';
    const typeMeta = internal_1.APPOINTMENT_TYPE_META[type];
    const tint = (0, internal_1.toneColor)(colors, typeMeta.tone);
    const showActions = actionable && status === 'scheduled';
    const cancelled = status === 'cancelled';
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "elevated", padding: compact ? 'sm' : 'md', radius: "lg", style: [{ gap: tokens.spacing.sm, opacity: cancelled ? 0.65 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'flex-start' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            minWidth: 64,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(tint, 0.14),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.xl }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700', textAlign: 'center' }, children: date })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: typeMeta, variant: "soft", size: "sm" }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], size: "sm" })] }), time ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: time }) : null, !compact && (location || client) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [location, client].filter(Boolean).join(' · ') })) : null] })] }), showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, paddingTop: tokens.spacing.xs, borderTopWidth: 1, borderTopColor: colors.border }, children: [onConfirm ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", tone: "success", onPress: onConfirm, children: "Confirm" })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onCancel, children: "Cancel" })) : null] })) : null] }));
    const animated = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, children: animated }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: animated });
}
/**
 * LegalAppointment, design v3 — a **compact single line**: a type glyph, the
 * date and time inline, and a trailing inline status, on a hairline divider.
 * Same Props as {@link LegalAppointment}; the tightest schedule row. Token-pure;
 * status stays a glyph + word, never color alone.
 */
function LegalAppointmentV3({ type, date, time, location, client, status = 'scheduled', onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 4 });
    const typeMeta = internal_1.APPOINTMENT_TYPE_META[type];
    const cancelled = status === 'cancelled';
    const secondary = [time, location, client].filter((s) => Boolean(s)).join(' · ');
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                opacity: enter.opacity,
                transform: enter.transform,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, opacity: cancelled ? 0.65 : 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityElementsHidden: true, importantForAccessibility: "no", style: { fontSize: tokens.typography.scale.base }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: date }), secondary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: secondary })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.APPOINTMENT_STATUS_META[status], variant: "inline", size: "sm" })] }) }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${typeMeta.label} on ${date}`, onPress: onPress, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=LegalAppointmentVariants.js.map