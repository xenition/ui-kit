"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivicAppointmentV2 = CivicAppointmentV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./internal/format");
const STATUS = {
    scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
    confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
    'checked-in': { label: 'Checked in', glyph: '📍', tone: 'accent' },
    completed: { label: 'Completed', glyph: '🏁', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
    'no-show': { label: 'No-show', glyph: '!', tone: 'danger' },
};
const TERMINAL = ['completed', 'cancelled', 'no-show'];
/**
 * CivicAppointment, alternate design **V2** — a hero card led by a big tinted
 * **date block** (calendar glyph over the date, with the time beneath). The
 * service, office, and location stack beside it under a status pill (text +
 * glyph + color, never color alone), and non-terminal visits expose full-width
 * Reschedule / Check-in actions. Same `CivicAppointmentProps`; drops in for
 * `CivicAppointment`. Token-pure.
 */
function CivicAppointmentV2({ service, office, date, time, status = 'scheduled', location, reference, onCheckIn, onReschedule, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.scheduled;
    const terminal = TERMINAL.includes(status);
    const showActions = !terminal && (onCheckIn != null || onReschedule != null);
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(primitives_2.Card, { variant: "elevated", style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'stretch', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                minWidth: 84,
                                borderRadius: tokens.radius.lg,
                                paddingVertical: tokens.spacing.md,
                                paddingHorizontal: tokens.spacing.sm,
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 2,
                                backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                            }, children: [(0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDCC5", size: "xl", accessibilityLabel: "Appointment" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800', textAlign: 'center' }, children: date }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: time })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: service }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: office }), location != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", location] })) : null, reference != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Ref #", reference] })) : null] })] }), showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.md, flexDirection: 'row', gap: tokens.spacing.sm }, children: [onReschedule != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", variant: "outline", onPress: onReschedule, style: { flex: 1 }, children: "Reschedule" })) : null, onCheckIn != null ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { size: "sm", onPress: onCheckIn, style: { flex: 1 }, children: "Check in" })) : null] })) : null] }) }));
}
//# sourceMappingURL=CivicAppointmentV2.js.map