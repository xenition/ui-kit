"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetAppointmentCard = VetAppointmentCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary', slot: 'primary' },
    today: { label: 'Today', tone: 'warn', slot: 'warn' },
    completed: { label: 'Completed', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', tone: 'neutral', slot: 'muted' },
};
const REASON_GLYPH = {
    checkup: '🩺',
    vaccination: '💉',
    surgery: '🔪',
    dental: '🦷',
    emergency: '🚑',
    grooming: '✂️',
    other: '📋',
};
/**
 * A vet-visit card: reason icon, vet + clinic, the scheduled date/time, and a
 * status chip. Open visits (`upcoming`/`today`) expose confirm + cancel actions;
 * `completed`/`cancelled` visits are read-only. Status reads via a labelled chip
 * plus a left accent bar. Token-only colors.
 */
function VetAppointmentCard({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderTopColor: colors[meta.slot],
                borderWidth: 1,
                borderTopWidth: 3,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                opacity: status === 'cancelled' ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: REASON_GLYPH[reason] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: vetName }), clinic ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: clinic })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: ["\uD83D\uDCC5 ", date, time ? ` · ${time}` : ''] }) }), petName ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["For ", petName] })) : null, notes ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: notes })) : null, open && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onAction, children: actionLabel }) })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", tone: "danger", onPress: onCancel, children: "Cancel" }) })) : null] })) : null] }));
}
//# sourceMappingURL=VetAppointmentCard.js.map