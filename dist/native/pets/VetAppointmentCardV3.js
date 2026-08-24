"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetAppointmentCardV3 = VetAppointmentCardV3;
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
 * Minimal single-line appointment row — a dense alternate to
 * {@link VetAppointmentCard}. The reason glyph, vet name, and date/time sit on a
 * hairline-separated line; open visits show an inline link action, closed visits
 * a status chip. Status always reads via glyph + chip, never color alone. Same
 * `VetAppointmentCardProps`. Token-pure.
 */
function VetAppointmentCardV3({ vetName, clinic, reason, date, time, status, petName, actionLabel = 'Confirm', onAction, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    const when = [date, time].filter(Boolean).join(' · ');
    const sub = [clinic, petName ? `for ${petName}` : null].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
                opacity: status === 'cancelled' ? 0.7 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: REASON_GLYPH[reason], size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: vetName }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [when, sub ? ` · ${sub}` : ''] })] }), open && onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "link", size: "sm", onPress: onAction, children: actionLabel })) : ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }))] }));
}
//# sourceMappingURL=VetAppointmentCardV3.js.map