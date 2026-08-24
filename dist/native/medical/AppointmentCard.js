"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentCard = AppointmentCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    confirmed: { label: 'Confirmed', tone: 'success' },
    completed: { label: 'Completed', tone: 'neutral' },
    cancelled: { label: 'Cancelled', tone: 'danger' },
};
const MODE_META = {
    'in-person': { glyph: '🏥', label: 'In person' },
    video: { glyph: '📹', label: 'Video visit' },
    phone: { glyph: '📞', label: 'Phone call' },
};
/**
 * A single appointment summary card for clinical / telehealth schedules:
 * clinician identity, a date-time strip, a delivery-mode chip (in-person /
 * video / phone), a status badge, and one dominant action. For a `video`
 * appointment the CTA reads "Join call"; otherwise "Book" (or a completed /
 * cancelled state hides it). Status is conveyed by text + badge, never color
 * alone. Informational UI only — not a medical device. Token-only colors.
 */
function AppointmentCard({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusMeta = STATUS_META[status];
    const modeMeta = MODE_META[mode];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading appointment", style: [
                {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const canAct = status === 'upcoming' || status === 'confirmed';
    const isVideo = mode === 'video';
    const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: doctorAvatar, name: doctorName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: doctorName }), specialty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", children: statusMeta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: modeMeta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [date, " \u00B7 ", time] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: modeMeta.label })] }), location ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD ", location] })) : null, canAct && (onBook || onReschedule) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onBook ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: isVideo ? 'success' : 'default', onPress: onBook, children: ctaLabel }) })) : null, onReschedule ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onReschedule, children: "Reschedule" }) })) : null] })) : null] }));
}
//# sourceMappingURL=AppointmentCard.js.map