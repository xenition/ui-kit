"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventDetailSheet = EventDetailSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Modal_1 = require("../primitives/Modal");
const Icon_1 = require("../primitives/Icon");
const format_1 = require("./format");
/**
 * An event detail sheet — the tap-target destination from any calendar surface.
 * Shows a tone bar + title, a formatted date/time line, location, description
 * and optional recurrence/timezone captions, plus Edit/Delete actions. Renders
 * inline (`card`) or inside the `Modal` primitive (`modal`). Token colors only.
 */
function EventDetailSheet({ event, description, recurrenceLabel, timezoneLabel, variant = 'card', open = true, onClose, onEdit, onDelete, className, }) {
    if (event == null)
        return null;
    const tone = (0, format_1.toneClasses)(event.tone);
    const dateLine = `${(0, format_1.weekdayLabel)(event.start)}, ${(0, format_1.monthLongLabel)(event.start)} ${event.start.getDate()}`;
    const timeLine = event.allDay ? 'All day' : (0, format_1.timeRangeLabel)(event.start, event.end);
    const metaRow = (glyph, text, key) => ((0, jsx_runtime_1.jsxs)("div", { className: "mt-1 flex items-center", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: glyph, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)("span", { className: "ml-2 text-sm text-on-surface", children: text })] }, key));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: className, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('mr-2 w-1 shrink-0 self-stretch rounded-full', tone.accentBg), style: { minHeight: 28 } }), (0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 text-xl font-extrabold text-on-surface", children: event.title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-2", children: [metaRow('🕑', `${dateLine} · ${timeLine}`, 'time'), event.location ? metaRow('📍', event.location, 'loc') : null, recurrenceLabel ? metaRow('🔁', recurrenceLabel, 'rec') : null, timezoneLabel ? metaRow('🌐', timezoneLabel, 'tz') : null] }), description ? ((0, jsx_runtime_1.jsx)("p", { className: "mt-3 text-sm leading-relaxed text-muted", children: description })) : null, onEdit || onDelete || onClose ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-4 flex items-center gap-2", children: [onEdit ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "sm", onClick: () => onEdit(event), children: "Edit" })) : null, onDelete ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "danger", size: "sm", onClick: () => onDelete(event), children: "Delete" })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex-1" }), onClose ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "sm", onClick: onClose, children: "Close" })) : null] })) : null] }));
    if (variant === 'modal') {
        return ((0, jsx_runtime_1.jsx)(Modal_1.Modal, { open: open, onClose: onClose ?? (() => undefined), children: body }));
    }
    return (0, jsx_runtime_1.jsx)(Card_1.Card, { children: body });
}
//# sourceMappingURL=EventDetailSheet.js.map