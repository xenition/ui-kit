"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VetAppointmentCardV4 = VetAppointmentCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    upcoming: { label: 'Upcoming', tone: 'primary' },
    today: { label: 'Today', tone: 'warn' },
    completed: { label: 'Completed', tone: 'success' },
    cancelled: { label: 'Cancelled', tone: 'neutral' },
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
 * VetAppointmentCard — **V4** "companion" design (native parity of the web V4).
 * The warm, friendly take on a vet visit: an elevated rounded card with a soft
 * shadow (no gradient — a clean surface), the reason glyph in a soft-primary
 * tinted well, a bold vet name, muted meta lines (date/time/pet/clinic), a
 * labelled status Badge, and the notes shown as a soft-primary chip. Open visits
 * (`upcoming`/`today`) keep the confirm + cancel actions. Same props/behavior as
 * {@link VetAppointmentCardProps}; status + reason both read via glyph + labelled
 * chip (never color alone). Token-only colors via `useXenitionTheme()`.
 */
function VetAppointmentCardV4({ vetName, clinic, reason, date, time, status, petName, notes, actionLabel = 'Confirm', onAction, onCancel, style, variant = 'card', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const open = status === 'upcoming' || status === 'today';
    const a11y = `${reason} with ${vetName}, ${date}${time ? ` at ${time}` : ''}, ${meta.label}`;
    const glyphWell = (size, fontSize) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: size,
            height: size,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize }, children: REASON_GLYPH[reason] }) }));
    const statusBadge = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }));
    if (variant === 'compact') {
        const metaLine = clinic || (petName ? `For ${petName}` : undefined);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    minHeight: 44,
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    padding: tokens.spacing.sm,
                    opacity: status === 'cancelled' ? 0.7 : 1,
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.08,
                    shadowRadius: 12,
                    shadowOffset: { width: 0, height: 6 },
                    elevation: 3,
                },
                style,
            ], children: [glyphWell(36, tokens.typography.scale.lg), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: vetName }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaLine })) : null] }), statusBadge, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: time ? time : date })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: [
            {
                backgroundColor: colors.card,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
                opacity: status === 'cancelled' ? 0.7 : 1,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [glyphWell(44, tokens.typography.scale.xl), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: vetName }), clinic ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["\uD83D\uDCCD ", clinic] })) : null] }), statusBadge] }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: ["\uD83D\uDCC5 ", date, time ? ` · ${time}` : ''] }), petName ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: ["For ", petName] })) : null, notes ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    alignSelf: 'flex-start',
                    maxWidth: '100%',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: notes }) })) : null, open && (onAction || onCancel) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onAction, children: actionLabel }) })) : null, onCancel ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", tone: "danger", onPress: onCancel, children: "Cancel" }) })) : null] })) : null] }));
}
//# sourceMappingURL=VetAppointmentCardV4.js.map