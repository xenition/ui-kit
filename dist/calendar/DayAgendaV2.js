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
exports.DayAgendaV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const format_1 = require("./format");
/**
 * DayAgenda, redesigned (v2): a **timeline agenda**. Each event sits to the right of
 * a time gutter with a tone-colored node and a connector rail; the event card shows
 * title + location, and the selected row is ringed. Distinct from v1. Same props,
 * token-only.
 */
exports.DayAgendaV2 = React.forwardRef(function DayAgendaV2({ day, events, now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events', variant, className, ...rest }, ref) {
    void now;
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-day-agenda": "", "aria-busy": "true", className: (0, cn_1.cn)('space-y-2', className), ...rest, children: [0, 1, 2].map((i) => (0, jsx_runtime_1.jsx)("div", { className: "h-12 animate-pulse rounded-md bg-neutral-100" }, i)) });
    }
    const list = (events ?? []).filter((e) => (0, format_1.sameDay)(e.start, day)).sort((a, b) => a.start.getTime() - b.start.getTime());
    if (list.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCC5" }), title: emptyLabel, className: className, ...rest });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-day-agenda": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: list.map((e, i) => {
            const t = (0, format_1.toneClasses)(e.tone);
            const selected = selectedEventId === e.id;
            const interactive = typeof onSelectEvent === 'function';
            return ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-14 shrink-0 flex-col items-center pt-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold text-muted", children: (0, format_1.clockLabel)(e.start) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-1 h-2.5 w-2.5 rounded-full', t.accentBg), "aria-hidden": true }), i < list.length - 1 ? (0, jsx_runtime_1.jsx)("span", { className: "mt-1 w-px flex-1 bg-border", "aria-hidden": true }) : null] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !interactive, "aria-pressed": selected, "aria-label": `${e.title}${selected ? ', selected' : ''}`, onClick: interactive ? () => onSelectEvent?.(e) : undefined, className: (0, cn_1.cn)('mb-3 flex flex-1 flex-col rounded-lg bg-surface p-3 text-left shadow-sm', selected && 'ring-2 ring-primary', interactive && 'transition-colors hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-semibold text-on-surface", children: e.title }), (e.location || e.subtitle) ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: [e.location, e.subtitle].filter(Boolean).join(' · ') }) : null] })] }, e.id));
        }) }));
});
//# sourceMappingURL=DayAgendaV2.js.map