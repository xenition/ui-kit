"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummary = BookingSummary;
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
 * Read-only recap of a chosen resource + slot — the native mirror of the web
 * `BookingSummary`. Same `resource`/`slot`/`timeZone`/`formatDate`/`formatTime`/
 * `action`/`title` contract. A token-styled card listing who/what, the date,
 * the time range, the slot duration, and the timezone. Pairs with a
 * `BookingCalendar` + `SlotPicker` flow as the confirmation step. Token-only.
 */
function BookingSummary({ resource, slot, timeZone, formatDate, formatTime, action, title = 'Your booking', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
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
                }, children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [resource ? line('With', resource.name, 'resource') : null, slot ? line('Date', fmtDate(slot.startsAt), 'date') : null, slot ? line('Time', `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time') : null, resource?.slotMinutes ? line('Duration', `${resource.slotMinutes} min`, 'duration') : null, tz ? line('Timezone', tz, 'tz') : null, !slot && !resource ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "Nothing selected yet." })) : null] }), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
}
//# sourceMappingURL=BookingSummary.js.map