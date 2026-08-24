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
exports.AuctionCardV3 = void 0;
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
 * AuctionCard, redesigned (v3): a **dense lot row**. A small thumbnail, the title
 * over a "N bids · ends in …" meta line, the current bid pinned right, and a
 * compact Bid button — hairline-bordered for scannable lists. The opposite of
 * v2's hero card. Same props, token-only.
 */
exports.AuctionCardV3 = React.forwardRef(function AuctionCardV3({ title, currentBidCents, currency = 'USD', bidCount, endsAtMs, nowMs = Date.now(), imageUrl, actionLabel = 'Bid', onPlaceBid, variant, className, ...rest }, ref) {
    void variant;
    const remaining = endsAtMs - nowMs;
    const ended = remaining <= 0;
    const meta = [
        typeof bidCount === 'number' ? `${bidCount} bid${bidCount === 1 ? '' : 's'}` : null,
        ended ? 'Ended' : `ends in ${countdown(remaining)}`,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-auction-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: "", className: "h-full w-full object-cover" }) : '🔨' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: (0, commerce_1.formatMoney)(currentBidCents, currency) }), onPlaceBid ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", disabled: ended, onClick: onPlaceBid, children: actionLabel })) : null] })] }));
});
//# sourceMappingURL=AuctionCardV3.js.map