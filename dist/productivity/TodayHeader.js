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
exports.TodayHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** SVG geometry for the near-white progress ring. */
const RING = { size: 88, stroke: 8 };
const RADIUS = (RING.size - RING.stroke) / 2;
const CIRC = 2 * Math.PI * RADIUS;
/**
 * TodayHeader — the "today" dashboard hero and the **peak** of the productivity
 * V4 "flow" line. A brand-gradient panel that greets the person, shows the date,
 * and states the day in one glance: a big near-white **"N tasks due today"**
 * numeral beside a near-white progress ring, frosted done/remaining tiles, and an
 * optional "next up" focus tile. Presentational — shaped data only, nothing
 * fetches. Every color derives from the brand ramp via `--xen-*` token classes
 * and gradient utilities — no literals, light + dark. The one vivid, motivating
 * surface at the top of the day.
 */
exports.TodayHeader = React.forwardRef(function TodayHeader({ greeting = 'Good morning', userName, dateLabel, dueToday, completedToday, progressPct, focusLabel, className, ...rest }, ref) {
    const due = Math.max(0, Math.trunc(dueToday || 0));
    const done = Math.max(0, Math.trunc(completedToday || 0));
    const total = done + due;
    const pct = Math.max(0, Math.min(100, Math.round(progressPct ?? (total > 0 ? (done / total) * 100 : 0))));
    const dashOffset = CIRC * (1 - pct / 100);
    const heading = userName ? `${greeting}, ${userName}` : greeting;
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-extrabold text-primary-50", children: value }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-primary-100", children: label })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-xl)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-primary-100", children: heading }), dateLabel ? (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-primary-100", children: dateLabel }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { "aria-label": `${due} tasks due today`, className: "text-4xl font-extrabold tracking-tight text-primary-50", children: due }), (0, jsx_runtime_1.jsx)("p", { className: "text-base font-semibold text-primary-100", children: due === 1 ? 'task due today' : 'tasks due today' })] }), (0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, "aria-label": `${pct}% complete today`, className: "relative shrink-0", style: { width: RING.size, height: RING.size }, children: [(0, jsx_runtime_1.jsxs)("svg", { width: RING.size, height: RING.size, viewBox: `0 0 ${RING.size} ${RING.size}`, "aria-hidden": true, children: [(0, jsx_runtime_1.jsx)("circle", { cx: RING.size / 2, cy: RING.size / 2, r: RADIUS, fill: "none", strokeWidth: RING.stroke, className: "stroke-primary-50/20" }), (0, jsx_runtime_1.jsx)("circle", { cx: RING.size / 2, cy: RING.size / 2, r: RADIUS, fill: "none", strokeWidth: RING.stroke, strokeLinecap: "round", strokeDasharray: CIRC, strokeDashoffset: dashOffset, transform: `rotate(-90 ${RING.size / 2} ${RING.size / 2})`, className: "stroke-primary-50 transition-[stroke-dashoffset]" })] }), (0, jsx_runtime_1.jsxs)("span", { className: "absolute inset-0 flex items-center justify-center text-lg font-extrabold text-primary-50", children: [pct, "%"] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(Tile, { label: "Done", value: String(done) }), (0, jsx_runtime_1.jsx)(Tile, { label: "Remaining", value: String(due) })] }), focusLabel ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B6", size: "sm", "aria-hidden": true }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs font-semibold text-primary-100", children: "Next up" }), (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-bold text-primary-50", children: focusLabel })] })] })) : null] }));
});
//# sourceMappingURL=TodayHeader.js.map