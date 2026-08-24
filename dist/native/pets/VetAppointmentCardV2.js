"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetAppointmentCardV2 = VetAppointmentCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
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
 * Elevated appointment card — a bolder alternate to {@link VetAppointmentCard}.
 * A tinted date "block" (date over time) leads the header, the vet appears with
 * an avatar + clinic, and open visits expose a full-width confirm/join primary
 * plus a cancel. Status reads via a labelled chip. Same `VetAppointmentCardProps`;
 * shadow depth instead of a top accent border. Token-pure.
 */
function VetAppointmentCardV2({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    const textSlot = colors[`${String(meta.slot)}Text`] ?? colors[meta.slot];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`, style: [
            {
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                opacity: status === 'cancelled' ? 0.7 : 1,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            justifyContent: 'center',
                            minWidth: 64,
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors[meta.slot], 0.12),
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: textSlot, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: date }), time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: time })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { name: vetName, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: REASON_GLYPH[reason], size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: vetName })] }), clinic ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: clinic })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }), petName ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["For ", petName] }) : null, notes ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: notes })) : null, open && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm }, children: [onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onAction, children: actionLabel }) })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "md", tone: "danger", onPress: onCancel, children: "Cancel" }) })) : null] })) : null] }));
}
//# sourceMappingURL=VetAppointmentCardV2.js.map