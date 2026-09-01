"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummaryV4 = BookingSummaryV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const CardV4_1 = require("../primitives/CardV4");
const TextV4_1 = require("../primitives/TextV4");
const datetime_1 = require("../../booking/datetime");
const DEFAULT_LABELS = {
    resource: 'With',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    timezone: 'Timezone',
    price: 'Total',
    empty: 'Nothing selected yet.',
};
/**
 * A long date, in the booking's timezone. Kept identical to the base's default
 * so a caller that never passes `formatDate` sees no change.
 */
function defaultFormatDate(iso, timeZone) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime()))
        return '';
    return new Intl.DateTimeFormat(undefined, {
        timeZone,
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    }).format(date);
}
/**
 * **V4 booking summary** — same props as {@link BookingSummary} plus `price`,
 * `priceNote`, `labels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop.** `With` / `Date` / `Time` / `Duration` /
 *    `Timezone` / `Nothing selected yet.` were English constants inside the
 *    component, unreachable from a host that localizes.
 * 3. **The rows are `TextV4`, and the labels take `mutedText`.** The base
 *    hand-wrote `color: colors.muted` with a literal font size on a raw
 *    `<Text>`, which is both the wrong token and the wrong layer.
 * 4. **The card is `CardV4`'s raised ground.** A summary sits on top of a
 *    booking flow, and on a dark page the base's `surface` ground made it
 *    disappear into the page with only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
function BookingSummaryV4({ resource, slot, timeZone, formatDate, formatTime, formatDuration, action, title = 'Your booking', price, priceNote, labels, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const fmtDuration = formatDuration ?? ((minutes) => `${minutes} min`);
    const copy = { ...DEFAULT_LABELS, ...labels };
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: label }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", align: "right", style: { flexShrink: 1 }, children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)(CardV4_1.CardV4, { style: [{ gap: tokens.spacing.md }, style], children: [title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "semibold", tone: "onCard", children: title })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [resource ? line(copy.resource, resource.name, 'resource') : null, slot ? line(copy.date, fmtDate(slot.startsAt), 'date') : null, slot
                        ? line(copy.time, `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
                        : null, resource?.slotMinutes
                        ? line(copy.duration, fmtDuration(resource.slotMinutes), 'duration')
                        : null, tz ? line(copy.timezone, tz, 'tz') : null, !slot && !resource ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: copy.empty })) : null] }), price ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    paddingTop: tokens.spacing.md,
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            alignItems: 'baseline',
                            justifyContent: 'space-between',
                            gap: tokens.spacing.md,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", children: copy.price }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: price })] }), priceNote ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "right", children: priceNote })) : null] })) : null, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
}
//# sourceMappingURL=BookingSummaryV4.js.map