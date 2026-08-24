"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummaryV3 = BookingSummaryV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const datetime_1 = require("../../booking/datetime");
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
 * BookingSummary — design variant **V3**: **minimal, headline-first**. Where V1
 * is a bordered card of evenly-weighted label/value rows, V3 drops the chrome
 * and leads with the appointment itself — a large date over a bold time range —
 * then trails the supporting facts (resource · duration · timezone) as a single
 * muted, dot-separated line. No border, no fill: separation comes from type
 * scale and spacing alone. Same
 * `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/`action`/`title`
 * contract as {@link BookingSummaryProps}. Token-only.
 */
function BookingSummaryV3({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const facts = [resource?.name, resource?.slotMinutes ? `${resource.slotMinutes} min` : null, tz].filter((v) => Boolean(v));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.6,
                }, children: typeof title === 'string' ? title.toUpperCase() : title }), slot ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: fmtDate(slot.startsAt) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}` })] })) : null, facts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: facts.join('  ·  ') })) : null, !slot && facts.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Nothing selected yet." })) : null, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: action }) : null] }));
}
//# sourceMappingURL=BookingSummaryV3.js.map