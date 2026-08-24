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
exports.DayAgendaV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const commerce_1 = require("../commerce");
const format_1 = require("./format");
/**
 * DayAgenda, redesigned (v3): a **dense schedule list**. Each event is one hairline
 * row — start time, a tone dot, the title, and the location folded in — for a tight
 * day view. The opposite of v2's timeline. Same props, token-only.
 */
exports.DayAgendaV3 = React.forwardRef(function DayAgendaV3({ day, events, now, onSelectEvent, selectedEventId, loading = false, emptyLabel = 'No events', variant, className, ...rest }, ref) {
    void now;
    void variant;
    if (loading) {
        return (0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-day-agenda": "", "aria-busy": "true", className: (0, cn_1.cn)('space-y-1', className), ...rest, children: [0, 1, 2].map((i) => (0, jsx_runtime_1.jsx)("div", { className: "h-7 animate-pulse rounded bg-neutral-100" }, i)) });
    }
    const list = (events ?? []).filter((e) => (0, format_1.sameDay)(e.start, day)).sort((a, b) => a.start.getTime() - b.start.getTime());
    if (list.length === 0) {
        return (0, jsx_runtime_1.jsx)(commerce_1.EmptyState, { ref: ref, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDCC5" }), title: emptyLabel, className: className, ...rest });
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-day-agenda": "", className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: list.map((e) => {
            const t = (0, format_1.toneClasses)(e.tone);
            const selected = selectedEventId === e.id;
            const interactive = typeof onSelectEvent === 'function';
            return ((0, jsx_runtime_1.jsxs)("button", { type: "button", disabled: !interactive, "aria-pressed": selected, "aria-label": `${e.title}${selected ? ', selected' : ''}`, onClick: interactive ? () => onSelectEvent?.(e) : undefined, className: (0, cn_1.cn)('flex items-center gap-2.5 border-b border-border py-2 text-left', selected && 'bg-primary/5', interactive && 'transition-colors hover:bg-neutral-50'), children: [(0, jsx_runtime_1.jsx)("span", { className: "w-12 shrink-0 text-xs tabular-nums text-muted", children: e.allDay ? 'All day' : (0, format_1.clockLabel)(e.start) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 shrink-0 rounded-full', t.accentBg), "aria-hidden": true }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm text-on-surface", children: e.title }), e.location ? (0, jsx_runtime_1.jsx)("span", { className: "shrink-0 truncate text-xs text-muted", children: e.location }) : null] }, e.id));
        }) }));
});
//# sourceMappingURL=DayAgendaV3.js.map