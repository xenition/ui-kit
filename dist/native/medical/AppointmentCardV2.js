"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentCardV2 = AppointmentCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
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
 * AppointmentCard, redesigned (v2): an **elevated hero card**. A big primary-
 * tinted date block anchors the left, with the time set large; the clinician
 * rides beside it as a ringed avatar + name/specialty. A mode chip (in-person /
 * video / phone) and a status badge sit on the same row, and a dominant CTA
 * ("Join call" for video, else "Book") spans the foot. Lifted with a shadow and
 * mounted with a gentle fade-in — distinct at a glance from v1's flat bordered
 * card. Same props, token-pure.
 */
function AppointmentCardV2({ doctorName, specialty, doctorAvatar, date, time, mode = 'in-person', status = 'upcoming', location, loading = false, onBook, onReschedule, bookLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const statusMeta = STATUS_META[status];
    const modeMeta = MODE_META[mode];
    const cardBase = {
        backgroundColor: colors.surface,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        gap: tokens.spacing.md,
        ...(0, elevation_1.shadow)('md', tokens),
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: "Loading appointment", style: [cardBase, { opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 64, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 40, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[100] } })] }));
    }
    const canAct = status === 'upcoming' || status === 'confirmed';
    const isVideo = mode === 'video';
    const ctaLabel = bookLabel ?? (isVideo ? 'Join call' : 'Book');
    const tint = (0, color_1.withAlpha)(colors.primary, 0.08);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityLabel: `${modeMeta.label} appointment with ${doctorName}${specialty ? `, ${specialty}` : ''}, ${date} at ${time}, ${statusMeta.label}`, style: [cardBase, { opacity: enter.opacity, transform: enter.transform }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            minWidth: 76,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: tint,
                            alignItems: 'center',
                            gap: 2,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: date }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: doctorAvatar, name: doctorName, size: "md", ring: true }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: doctorName }), specialty ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: specialty })) : null] })] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: `${modeMeta.glyph} ${modeMeta.label}` }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: statusMeta.tone, variant: "soft", size: "sm", children: statusMeta.label })] }), location ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD ", location] })) : null, canAct && (onBook || onReschedule) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onBook ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", tone: isVideo ? 'success' : 'default', onPress: onBook, children: ctaLabel }) })) : null, onReschedule ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onReschedule, children: "Reschedule" }) })) : null] })) : null] }));
}
//# sourceMappingURL=AppointmentCardV2.js.map