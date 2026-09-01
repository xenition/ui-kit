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
exports.DayAgendaV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const layout_v4_1 = require("./layout-v4");
const EventBlockV4_1 = require("./EventBlockV4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 day agenda** — the web twin of the native `DayAgendaV4`, same props as
 * {@link DayAgenda} plus `locale` and `nowLabel`.
 *
 * ## Four changes
 *
 * 1. **The list is ordered by the shared layout pass**, so an agenda and a
 *    time grid showing the same day agree.
 * 2. **"Now" is a labelled divider**, not an unnamed rule.
 * 3. **The skeleton is opaque.**
 * 4. **It is a real `<ol>`**, so a reader hears how many events the day holds.
 */
exports.DayAgendaV4 = React.forwardRef(function DayAgendaV4({ day, events = [], now, locale, nowLabel = 'Now', onSelectEvent, selectedEventId, loading = false, emptyLabel = 'Nothing scheduled.', variant = 'soft', className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), ...rest, children: [70, 55, 80].map((w) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-8', grid_v4_1.SKELETON_CLASS), style: { width: `${w}%` } }, w))) }));
    }
    const today = React.useMemo(() => events.filter((e) => (0, format_1.sameDay)(e.start, day)), [events, day]);
    const ordered = React.useMemo(() => (0, layout_v4_1.layoutEvents)(today), [today]);
    const nowMinutes = now != null && (0, format_1.sameDay)(now, day) ? now.getHours() * 60 + now.getMinutes() : null;
    if (ordered.length === 0) {
        return ((0, jsx_runtime_1.jsx)("p", { ref: ref, className: (0, cn_1.cn)('p-md text-sm text-muted-text', className), ...rest, children: emptyLabel }));
    }
    const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
    let nowDrawn = false;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-day-agenda": "", className: className, ...rest, children: (0, jsx_runtime_1.jsx)("ol", { className: "flex flex-col gap-sm", children: ordered.map((p) => {
                const showNow = nowMinutes != null && !nowDrawn && p.startMin >= nowMinutes;
                if (showNow)
                    nowDrawn = true;
                return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [showNow ? ((0, jsx_runtime_1.jsxs)("li", { "aria-label": nowLabel, className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-danger-text", children: nowLabel }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "h-px flex-1 bg-danger" })] })) : null, (0, jsx_runtime_1.jsxs)("li", { className: "flex gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0 pt-0.5 text-xs text-muted-text [font-variant-numeric:tabular-nums]", style: { width: 'var(--xen-space-2xl)' }, children: p.event.allDay ? '' : timeFmt.format(p.event.start) }), (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1", children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, variant: variant, selected: selectedEventId === p.event.id, onPress: onSelectEvent }) })] })] }, p.key));
            }) }) }));
});
//# sourceMappingURL=DayAgendaV4.js.map