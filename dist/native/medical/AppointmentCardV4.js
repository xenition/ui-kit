"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentCardV4 = AppointmentCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
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
 * AppointmentCard — **V4** "clinic" design. The calm, clinical take on an
 * appointment: an elevated rounded card with a soft shadow, clinician identity,
 * a date-time strip with a delivery-mode glyph, a labelled status badge (never
 * color alone), and one dominant action. Honors the V4 `variant` — `full`
 * (card, default) and `compact` (a dense single row) — identical props/behavior
 * to {@link AppointmentCardProps}. Token-only colors via `useXenitionTheme()`.
 * Informational UI only — not a medical device.
 */
function AppointmentCardV4({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const statusMeta = STATUS_META[status];
    const modeMeta = MODE_META[mode];
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading appointment", style: [shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 16, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const canAct = status === 'upcoming' || status === 'confirmed';
    const isVideo = mode === 'video';
    const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
    const a11y = `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`;
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: doctorAvatar, name: doctorName, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: doctorName }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [modeMeta.glyph, " ", date, " \u00B7 ", time] })] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [shell, { padding: tokens.spacing.lg, gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: doctorAvatar, name: doctorName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: doctorName }), specialty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", children: statusMeta.label })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: modeMeta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [date, " \u00B7 ", time] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: modeMeta.label })] }), location ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD ", location] })) : null, canAct && (onBook || onReschedule) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onBook ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: isVideo ? 'success' : 'default', onPress: onBook, children: ctaLabel }) })) : null, onReschedule ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onReschedule, children: "Reschedule" }) })) : null] })) : null] }));
}
//# sourceMappingURL=AppointmentCardV4.js.map