"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummaryV2 = BookingSummaryV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const defaultFormatDate = (iso, timeZone) => {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime()))
        return '';
    return new Intl.DateTimeFormat(undefined, {
        timeZone,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(d);
};
/**
 * BookingSummary — design variant **V2**: an **elevated, receipt-style card**
 * with a highlighted appointment band. Where V1 is a flat bordered card of
 * label/value rows, V2 floats on a shadow with a dashed rule separating the
 * meta rows (With / Duration / Timezone) from a primary-tinted "band" that
 * frames the chosen date and time range like the total on a receipt — the one
 * line the eye should land on. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
function BookingSummaryV2({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    flexShrink: 1,
                    textAlign: 'right',
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '500',
                }, children: value })] }, key));
    const metaRows = [
        resource ? line('With', resource.name, 'resource') : null,
        resource?.slotMinutes ? line('Duration', `${resource.slotMinutes} min`, 'duration') : null,
        tz ? line('Timezone', tz, 'tz') : null,
    ].filter(Boolean);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            { opacity: enter.opacity, transform: enter.transform },
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 0,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                }, children: title }), metaRows.length > 0 ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: metaRows }) : null, metaRows.length > 0 && slot ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderTopWidth: 1, borderStyle: 'dashed', borderColor: colors.border } })) : null, slot ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    gap: 2,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.08),
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 0.5 }, children: "APPOINTMENT" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: fmtDate(slot.startsAt) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}` })] })) : null, !slot && !resource ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Nothing selected yet." })) : null, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
}
//# sourceMappingURL=BookingSummaryV2.js.map