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
exports.AuctionCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/** Format a positive ms duration as the two most-significant units. */
function formatRemaining(ms) {
    if (ms <= 0)
        return 'Ended';
    const totalSec = Math.floor(ms / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    if (d > 0)
        return `${d}d ${h}h`;
    if (h > 0)
        return `${h}h ${m}m`;
    if (m > 0)
        return `${m}m ${s}s`;
    return `${s}s`;
}
/**
 * An auction lot summary — hero media, title, the live current bid with a bid
 * count, a countdown to close, and a place-bid action. The countdown is derived
 * from `endsAtMs` against an injectable `nowMs` (no internal timer, so it stays
 * deterministic in tests); once past close it reads "Ended", disables bidding,
 * and switches the timer chip to a danger tone (state carried by text + tone,
 * not color alone). Presentational: data + `onPlaceBid` only. Reuses `Badge`,
 * `Button`, and the shared `formatMoney`; token-only colors.
 */
exports.AuctionCard = React.forwardRef(function AuctionCard({ title, currentBidCents, currency = 'USD', bidCount = 0, endsAtMs, nowMs, imageUrl, actionLabel = 'Place bid', onPlaceBid, variant = 'card', className, ...rest }, ref) {
    const now = nowMs ?? Date.now();
    const remaining = endsAtMs - now;
    const ended = remaining <= 0;
    const compact = variant === 'compact';
    const timer = ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: ended ? 'danger' : 'warn', children: ended ? 'Ended' : `⏱ ${formatRemaining(remaining)}` }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface', className), ...rest, children: [compact ? null : ((0, jsx_runtime_1.jsxs)("div", { className: "relative flex h-44 items-center justify-center bg-neutral-100", children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover", loading: "lazy" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "No photo" })), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-[var(--xen-space-sm)] top-[var(--xen-space-sm)]", children: timer })] })), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: title }), compact ? timer : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Current bid" }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(currentBidCents, currency) })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `${bidCount.toLocaleString()} ${bidCount === 1 ? 'bid' : 'bids'}` })] }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: onPlaceBid, disabled: ended, children: ended ? 'Auction ended' : actionLabel })) : null] })] }));
});
//# sourceMappingURL=AuctionCard.js.map