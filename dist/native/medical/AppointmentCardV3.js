"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentCardV3 = AppointmentCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const STATUS_META = {
    upcoming: { label: 'Upcoming', color: 'primaryText' },
    confirmed: { label: 'Confirmed', color: 'successText' },
    completed: { label: 'Completed', color: 'muted' },
    cancelled: { label: 'Cancelled', color: 'dangerText' },
};
const MODE_META = {
    'in-person': { glyph: '🏥', label: 'In person' },
    video: { glyph: '📹', label: 'Video visit' },
    phone: { glyph: '📞', label: 'Phone call' },
};
/**
 * AppointmentCard, redesigned (v3): a **minimal dense line**. A small colored
 * status dot leads (paired with a text status word, so status never rides on
 * color alone), the clinician + date·time·mode share one flexible line, and the
 * status label hugs the right edge. No card, no avatar disc, no CTA cluster —
 * tuned for long agenda lists. Distinct at a glance from v1's card and v2's
 * hero. Same props, token-pure.
 */
function AppointmentCardV3({ doctorName, specialty, date, time, mode = 'in-person', status = 'upcoming', loading = false, onBook, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const statusMeta = STATUS_META[status];
    const modeMeta = MODE_META[mode];
    const statusColor = colors[statusMeta.color];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading appointment", style: [
                { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingVertical: tokens.spacing.sm, minHeight: 44 },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const meta = [specialty, `${date} · ${time}`, modeMeta.label].filter(Boolean).join(' · ');
    const a11y = `${modeMeta.label} appointment with ${doctorName}, ${date} at ${time}, ${statusMeta.label}`;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                minHeight: 44,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 8, height: 8, borderRadius: tokens.radius.full, backgroundColor: statusColor } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: `${modeMeta.glyph} ${doctorName}` }), meta !== '' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: statusColor, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: statusMeta.label })] }));
    if (!onBook) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onBook, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: body }) }));
}
//# sourceMappingURL=AppointmentCardV3.js.map