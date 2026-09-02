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
exports.TrackingTimelineV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * TrackingTimeline — **V4** "dispatch" design (web parity of the native V4), and
 * the ONE reserved gradient moment of the logistics V4 "dispatch" line: the
 * header (current stage glyph + word, and a frosted "N of 4" progress chip) rides
 * a brand-gradient ground (`bg-gradient-to-br from-primary-500 to-primary-700`)
 * in near-white ink (`text-primary-50` / `text-primary-100`). The body — the
 * canonical **picked → in-transit → out-for-delivery → delivered** rail — stays
 * on the plain surface: reached stages fill with their tone token + a glyph,
 * the current stage is ringed, upcoming stages are muted. Status is carried by
 * glyph + stage word (+ a redundant per-node `aria-label`), never color alone;
 * an `exception` current stage flags the hero with a danger word. Empty/loading
 * states supported. Identical props/behavior to {@link TrackingTimelineProps}.
 * All colors from `--xen-*` token classes / gradient utilities (no literals).
 */
exports.TrackingTimelineV4 = React.forwardRef(function TrackingTimelineV4({ current, events, loading = false, className, ...rest }, ref) {
    const shell = 'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-tracking-timeline": "", "aria-label": "Loading tracking", "aria-busy": "true", className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-1/2 rounded-[var(--xen-radius-sm)] bg-primary-50/25" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/3 rounded-[var(--xen-radius-sm)] bg-primary-50/20" })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]", children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-[22px] w-[22px] rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 flex-1 rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }, i))) })] }));
    }
    const isException = current === 'exception';
    const currentIdx = isException ? -1 : (0, internal_1.trackingIndex)(current);
    const headMeta = internal_1.TRACKING_META[current] ?? internal_1.TRACKING_META.picked;
    const reachedCount = isException ? 0 : currentIdx + 1;
    const eventFor = (stage) => Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-tracking-timeline": "", "aria-label": `Tracking: ${headMeta.label}`, className: (0, cn_1.cn)(shell, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)] text-primary-50", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-semibold uppercase tracking-wide text-primary-100", children: "Tracking" }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)] text-xl font-bold text-primary-50", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: headMeta.glyph }), headMeta.label] })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex shrink-0 items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-bold text-primary-50', 'tabular-nums'), children: isException ? '⚠ Exception' : `${reachedCount} of ${internal_1.TRACKING_ORDER.length}` })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-col p-[var(--xen-space-lg)]", children: internal_1.TRACKING_ORDER.map((stage, i) => {
                    const meta = internal_1.TRACKING_META[stage];
                    const reached = currentIdx >= 0 && i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    const last = i === internal_1.TRACKING_ORDER.length - 1;
                    const connectorFilled = currentIdx >= 0 && i < currentIdx;
                    const ev = eventFor(stage);
                    return ((0, jsx_runtime_1.jsxs)("div", { role: "text", "aria-label": `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)]', !last && 'pb-[var(--xen-space-lg)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full text-xs', reached
                                            ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
                                            : (0, cn_1.cn)('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')), children: reached ? (last ? '✓' : meta.glyph) : i + 1 }), !last ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 w-0.5 flex-1', connectorFilled ? internal_1.TONE_BG[meta.tone] : 'bg-border') })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1 pb-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', isCurrent ? 'font-bold' : 'font-semibold', reached ? 'text-on-surface' : 'text-muted'), children: meta.label }), ev?.time ? (0, jsx_runtime_1.jsx)("span", { className: "whitespace-nowrap text-xs tabular-nums text-muted", children: ev.time }) : null] }), ev?.detail ? (0, jsx_runtime_1.jsx)("p", { className: "line-clamp-2 text-xs text-muted", children: ev.detail }) : null] })] }, stage));
                }) })] }));
});
//# sourceMappingURL=TrackingTimelineV4.js.map