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
exports.TimeGridV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const format_1 = require("./format");
const layout_v4_1 = require("./layout-v4");
const EventBlockV4_1 = require("./EventBlockV4");
const grid_v4_1 = require("./internal/grid-v4");
/**
 * **V4 time grid** — the web twin of the native `TimeGridV4`, same props as
 * {@link TimeGrid} plus `locale`, `nowLabel` and `emptyLabel`.
 *
 * ## The change this component exists for
 *
 * **The overlap layout was inconsistent.** The base computed, per event, the
 * events overlapping *that* event and used the count as the column total — so
 * three events in one morning were laid out on three different column grids,
 * colliding and leaving gaps at the same time. `layoutEvents()` in
 * `calendar/layout-v4.ts` replaces it with cluster-then-pack; the worked
 * example is in that file.
 *
 * ## Three more
 *
 * 1. **The hour gutter is localized.**
 * 2. **"Now" is announced**, not just drawn.
 * 3. **The metrics are CSS expressions off the spacing scale**, so the hour
 *    rules and the blocks agree on a re-scaled seed.
 */
exports.TimeGridV4 = React.forwardRef(function TimeGridV4({ day, events = [], startHour = 6, endHour = 22, hourHeight, now, locale, nowLabel = 'Current time', emptyLabel = 'Nothing scheduled.', onSelectEvent, selectedEventId, scroll = true, className, style, ...rest }, ref) {
    const from = Math.max(0, Math.min(23, startHour));
    const to = Math.max(from + 1, Math.min(24, endHour));
    const hours = Array.from({ length: to - from }, (_, i) => from + i);
    const gridTop = from * 60;
    const hourPx = hourHeight != null ? `${hourHeight}px` : grid_v4_1.GRID_HOUR;
    const y = (minutes) => `calc(${(minutes - gridTop) / 60} * ${hourPx})`;
    const timed = React.useMemo(() => events.filter((e) => !e.allDay && (0, format_1.sameDay)(e.start, day)), [events, day]);
    const positioned = React.useMemo(() => (0, layout_v4_1.layoutEvents)(timed), [timed]);
    const nowMinutes = now != null && (0, format_1.sameDay)(now, day) ? (0, layout_v4_1.minutesOf)(now) : null;
    const showNow = nowMinutes != null && nowMinutes >= gridTop && nowMinutes <= to * 60;
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-time-grid": "", className: (0, cn_1.cn)(scroll && 'overflow-y-auto', className), style: style, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex", style: { height: `calc(${to - from} * ${hourPx})` }, children: [(0, jsx_runtime_1.jsx)("div", { className: "relative shrink-0", style: { width: grid_v4_1.GRID_GUTTER }, children: hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { className: "absolute right-xs -translate-y-1/2 text-xs text-muted-text [font-variant-numeric:tabular-nums]", style: { top: `calc(${i} * ${hourPx})` }, children: (0, layout_v4_1.hourTitle)(h, locale) }, h))) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative flex-1", children: [hours.map((h, i) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-x-0 h-px bg-border", style: { top: `calc(${i} * ${hourPx})` } }, h))), positioned.length === 0 ? ((0, jsx_runtime_1.jsx)("p", { className: "p-md text-sm text-muted-text", children: emptyLabel })) : null, positioned.map((p) => ((0, jsx_runtime_1.jsx)("div", { className: "absolute pr-0.5", style: {
                                top: y(p.startMin),
                                height: `max(${grid_v4_1.GRID_MIN_BLOCK}, calc(${y(p.endMin)} - ${y(p.startMin)}))`,
                                // Every member of a cluster shares its column count, so the
                                // blocks in one overlap group finally line up.
                                left: `${(100 / p.columns) * p.column}%`,
                                width: `${100 / p.columns}%`,
                            }, children: (0, jsx_runtime_1.jsx)(EventBlockV4_1.EventBlockV4, { event: p.event, size: "sm", selected: selectedEventId === p.event.id, onPress: onSelectEvent, className: "h-full" }) }, p.key))), showNow ? ((0, jsx_runtime_1.jsx)("span", { role: "separator", "aria-label": nowLabel, className: "absolute inset-x-0 h-0.5 bg-danger", style: { top: y(nowMinutes) } })) : null] })] }) }));
});
//# sourceMappingURL=TimeGridV4.js.map