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
exports.AuctionCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
function countdown(ms) {
    if (ms <= 0)
        return 'Ended';
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    if (d > 0)
        return `${d}d ${h}h`;
    if (h > 0)
        return `${h}h ${m}m`;
    return `${m}m`;
}
/**
 * AuctionCard, redesigned (v2): a **hero-image lot card**. The photo fills a tall
 * banner with the countdown floating as a danger pill over a scrim; the current
 * bid + bid count sit large on the surface below with a full-width Place bid CTA.
 * Elevated, hover-lift. Same props as {@link AuctionCard}, token-only.
 */
exports.AuctionCardV2 = React.forwardRef(function AuctionCardV2({ title, currentBidCents, currency = 'USD', bidCount, endsAtMs, nowMs = Date.now(), imageUrl, actionLabel = 'Place bid', onPlaceBid, variant, className, ...rest }, ref) {
    void variant;
    const remaining = endsAtMs - nowMs;
    const ended = remaining <= 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-auction-card": "", className: (0, cn_1.cn)('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-40 bg-neutral-100", children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-4xl", children: "\uD83D\uDD28" })), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('absolute left-2 top-2 rounded-full px-2 py-0.5 text-xs font-bold', ended ? 'bg-neutral-200 text-on-surface' : 'bg-danger text-on-danger'), children: ended ? 'Ended' : `⏱ ${countdown(remaining)}` })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 p-md", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: "Current bid" }), (0, jsx_runtime_1.jsx)("p", { className: "text-2xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(currentBidCents, currency) })] }), typeof bidCount === 'number' ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [bidCount, " bid", bidCount === 1 ? '' : 's'] })) : null] }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "w-full", disabled: ended, onClick: onPlaceBid, children: actionLabel })) : null] })] }));
});
//# sourceMappingURL=AuctionCardV2.js.map