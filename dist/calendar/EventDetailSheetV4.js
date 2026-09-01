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
exports.EventDetailSheetV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const ModalV4_1 = require("../primitives/ModalV4");
const format_1 = require("./format");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 event detail sheet** — the web twin of the native
 * `EventDetailSheetV4`, same props as {@link EventDetailSheet} plus four copy
 * hooks.
 *
 * ## Four changes
 *
 * 1. **The modal variant is `ModalV4`.** The base hand-rolled an overlay, so
 *    it had no scrim, no focus trap, no Escape and no restore — four things
 *    the primitive already does, and the ones that matter most on the surface
 *    that takes a destructive action.
 * 2. **Delete is not the same weight as edit.** A destructive action drawn as
 *    a peer of a routine one is how people delete things by accident.
 * 3. **The event's tone reaches the sheet** as a leading rail, so the sheet
 *    and the block a user clicked read as the same object.
 * 4. **Every field is a labelled row**, announced as a pair.
 *
 * **Renders nothing without an event** (§4.5).
 */
exports.EventDetailSheetV4 = React.forwardRef(function EventDetailSheetV4({ event, description, recurrenceLabel, timezoneLabel, variant = 'card', open = true, editLabel = 'Edit', deleteLabel = 'Delete', 
// `ModalV4` titles its own dismiss; `closeLabel` stays in the props for
// parity with the native twin and reaches the dialog's name.
closeLabel = 'Close', allDayLabel = 'All day', onClose, onEdit, onDelete, className, }, ref) {
    if (!event)
        return null;
    const tone = (0, grid_v4_1.eventTone)(event.tone);
    const time = event.allDay ? allDayLabel : (0, format_1.timeRangeLabel)(event.start, event.end);
    const row = (glyph, value) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: glyph, size: "sm", className: "text-muted-text" }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 text-sm text-on-card", children: value })] }, `${glyph}-${value}`));
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-md", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "w-[3px] shrink-0 self-stretch rounded-full", style: { background: grid_v4_1.TONE_VAR[tone] } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("h3", { className: "min-w-0 flex-1 font-heading text-lg font-bold text-on-card", children: event.title }), event.allDay ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: tone, variant: "soft", size: "sm", children: allDayLabel })) : null] }), time ? row('clock', time) : null, event.location ? row('location', event.location) : null, recurrenceLabel ? row('refresh', recurrenceLabel) : null, timezoneLabel ? row('globe', timezoneLabel) : null, description ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-muted-text", children: description }) : null, onEdit || onDelete ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-sm flex flex-col gap-sm", children: [onEdit ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "md", onClick: () => onEdit(event), "aria-label": `${editLabel}, ${event.title}`, children: editLabel })) : null, onDelete ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "ghost", tone: "danger", size: "md", onClick: () => onDelete(event), "aria-label": `${deleteLabel}, ${event.title}`, children: deleteLabel })) : null] })) : null] })] }));
    if (variant === 'modal') {
        return ((0, jsx_runtime_1.jsx)(ModalV4_1.ModalV4, { open: open, onClose: onClose ?? (() => undefined), title: event.title, "aria-label": (0, grid_v4_1.metaLine)([event.title, time, closeLabel]), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, "data-xen-event-detail": "", className: className, children: body }));
});
//# sourceMappingURL=EventDetailSheetV4.js.map