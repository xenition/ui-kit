"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingSummaryV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const datetime_1 = require("./datetime");
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
 * A long date, in the booking's timezone. Identical to the base's default so a
 * caller that never passes `formatDate` sees no change.
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
 * **V4 booking summary** — the web twin of the native `BookingSummaryV4`, same
 * props as {@link BookingSummary} plus `price`, `priceNote`, `labels` and
 * `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop**, where six English constants used to live
 *    inside the component out of a localizing host's reach.
 * 3. **Labels take `muted-text`**, the slot with an actual contrast promise,
 *    rather than `muted`.
 * 4. **The card is the raised ground.** A summary sits on top of a booking
 *    flow; on a dark page `bg-surface` made it disappear into the page with
 *    only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
exports.BookingSummaryV4 = React.forwardRef(function BookingSummaryV4({ resource, slot, timeZone, formatDate, formatTime, formatDuration, action, title = 'Your booking', price, priceNote, labels, className, ...rest }, ref) {
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso) => (0, datetime_1.formatTimeInTz)(iso, tz));
    const fmtDuration = formatDuration ?? ((minutes) => `${minutes} min`);
    const copy = { ...DEFAULT_LABELS, ...labels };
    const line = (label, value, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-md", children: [(0, jsx_runtime_1.jsx)("dt", { className: "text-sm text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("dd", { className: "shrink text-right text-sm text-on-card", children: value })] }, key));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card shadow-[var(--xen-elevation-card)]', className), ...rest, children: [title ? (0, jsx_runtime_1.jsx)("h3", { className: "text-base font-semibold", children: title }) : null, (0, jsx_runtime_1.jsxs)("dl", { className: "flex flex-col gap-sm", children: [resource ? line(copy.resource, resource.name, 'resource') : null, slot ? line(copy.date, fmtDate(slot.startsAt), 'date') : null, slot
                        ? line(copy.time, `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
                        : null, resource?.slotMinutes
                        ? line(copy.duration, fmtDuration(resource.slotMinutes), 'duration')
                        : null, tz ? line(copy.timezone, tz, 'tz') : null, !slot && !resource ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: copy.empty })) : null] }), price ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs border-t border-border pt-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-md", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold", children: copy.price }), (0, jsx_runtime_1.jsx)("span", { className: "font-heading text-lg font-bold [font-variant-numeric:tabular-nums]", children: price })] }), priceNote ? ((0, jsx_runtime_1.jsx)("p", { className: "text-right text-xs text-muted-text", children: priceNote })) : null] })) : null, action ? (0, jsx_runtime_1.jsx)("div", { children: action }) : null] }));
});
//# sourceMappingURL=BookingSummaryV4.js.map