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
exports.TrackingTimelineV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * TrackingTimeline, alternate design **V3** — a *compact horizontal step bar*.
 * The four lifecycle stages **picked → in-transit → out-for-delivery →
 * delivered** sit left-to-right as small nodes joined by connector segments that
 * fill with tone once passed; each stage's glyph sits in the node and its word
 * sits below, with the current stage bolded — glyph + word, never color alone
 * (each node carries a redundant a11y label). The current stage's event
 * time/detail is summarised in a caption underneath. An `exception` current
 * stage collapses to a danger strip. Empty/loading supported. No literal colors.
 */
exports.TrackingTimelineV3 = React.forwardRef(function TrackingTimelineV3({ current, events, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading tracking", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-6 w-full animate-pulse rounded-full bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 w-[60%] animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" })] }));
    }
    if (current === 'exception') {
        const meta = internal_1.TRACKING_META.exception;
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "text", "aria-label": `${meta.label}: needs attention`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-sm)] rounded-full bg-danger/10 px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-danger", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-danger", children: meta.label })] }));
    }
    const currentIdx = (0, internal_1.trackingIndex)(current);
    const currentEvent = Array.isArray(events) ? events.find((e) => e.stage === current) : undefined;
    const caption = [currentEvent?.time, currentEvent?.detail].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-start", children: internal_1.TRACKING_ORDER.map((stage, i) => {
                    const meta = internal_1.TRACKING_META[stage];
                    const reached = currentIdx >= 0 && i <= currentIdx;
                    const isCurrent = i === currentIdx;
                    const last = i === internal_1.TRACKING_ORDER.length - 1;
                    const connectorFilled = currentIdx >= 0 && i < currentIdx;
                    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col items-center", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex w-full items-center", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-[3px] flex-1 rounded-full', i === 0 ? 'bg-transparent' : reached ? internal_1.TONE_BG[meta.tone] : 'bg-border') }), (0, jsx_runtime_1.jsx)("span", { role: "text", "aria-label": `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, className: (0, cn_1.cn)('flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full text-xs', reached
                                            ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
                                            : (0, cn_1.cn)('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')), children: (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: reached ? (last ? '✓' : meta.glyph) : i + 1 }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-[3px] flex-1 rounded-full', last ? 'bg-transparent' : connectorFilled ? internal_1.TONE_BG[meta.tone] : 'bg-border') })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-[var(--xen-space-xs)] line-clamp-2 text-center text-xs', isCurrent ? 'font-bold' : 'font-medium', reached ? 'text-on-surface' : 'text-muted'), children: meta.label })] }, stage));
                }) }), caption ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: caption }) : null] }));
});
//# sourceMappingURL=TrackingTimelineV3.js.map