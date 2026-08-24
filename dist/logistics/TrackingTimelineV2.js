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
exports.TrackingTimelineV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * TrackingTimeline, alternate design **V2** — a *big vertical rail*. Larger
 * (32px) tone-filled nodes over a thick connector, with each stage's event
 * (time + detail) rendered inside its own tinted card beside the node so the
 * lifecycle **picked → in-transit → out-for-delivery → delivered** reads like a
 * courier tracking screen. Reached stages fill and carry a `✓`/glyph, current is
 * ringed and bold, upcoming are muted — always glyph + word, never color alone
 * (each node carries a redundant a11y label). An `exception` current stage
 * surfaces a danger head card. Empty/loading supported. No literal colors.
 */
exports.TrackingTimelineV2 = React.forwardRef(function TrackingTimelineV2({ current, events, loading = false, className, ...rest }, ref) {
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-busy": "true", "aria-label": "Loading tracking", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-lg)]', className), ...rest, children: [0, 1, 2, 3].map((i) => ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 w-8 animate-pulse rounded-full bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-10 flex-1 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" })] }, i))) }));
    }
    const isException = current === 'exception';
    const currentIdx = isException ? -1 : (0, internal_1.trackingIndex)(current);
    const eventFor = (stage) => Array.isArray(events) ? events.find((e) => e.stage === stage) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col', className), ...rest, children: [isException ? ((0, jsx_runtime_1.jsxs)("div", { role: "text", "aria-label": `${internal_1.TRACKING_META.exception.label}: needs attention`, className: "mb-[var(--xen-space-md)] flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] bg-danger/10 p-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-8 w-8 items-center justify-center rounded-full bg-danger text-sm text-on-danger", children: internal_1.TRACKING_META.exception.glyph }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-danger", children: internal_1.TRACKING_META.exception.label })] })) : null, internal_1.TRACKING_ORDER.map((stage, i) => {
                const meta = internal_1.TRACKING_META[stage];
                const reached = currentIdx >= 0 && i <= currentIdx;
                const isCurrent = i === currentIdx;
                const last = i === internal_1.TRACKING_ORDER.length - 1;
                const connectorFilled = currentIdx >= 0 && i < currentIdx;
                const ev = eventFor(stage);
                return ((0, jsx_runtime_1.jsxs)("div", { role: "text", "aria-label": `${meta.label}: ${reached ? (isCurrent ? 'current' : 'done') : 'upcoming'}`, className: (0, cn_1.cn)('flex gap-[var(--xen-space-md)]', !last && 'pb-[var(--xen-space-md)]'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm', reached
                                        ? (0, cn_1.cn)(internal_1.TONE_BG[meta.tone], internal_1.TONE_ON_TEXT[meta.tone])
                                        : (0, cn_1.cn)('border-2 text-muted', isCurrent ? 'border-primary' : 'border-border')), children: reached ? (last ? '✓' : meta.glyph) : i + 1 }), !last ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('mt-0.5 w-[3px] flex-1 rounded-full', connectorFilled ? internal_1.TONE_BG[meta.tone] : 'bg-border') })) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('min-w-0 flex-1 rounded-[var(--xen-radius-md)] p-[var(--xen-space-sm)]', reached ? internal_1.TONE_SOFT_BG[meta.tone] : 'bg-neutral-100'), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', isCurrent ? 'font-bold' : 'font-semibold', reached ? 'text-on-surface' : 'text-muted'), children: meta.label }), ev?.time ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: ev.time }) : null] }), ev?.detail ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 line-clamp-2 text-xs text-muted", children: ev.detail }) : null] })] }, stage));
            })] }));
});
//# sourceMappingURL=TrackingTimelineV2.js.map