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
exports.BidRow = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A single bid in an auction's bid history — optional rank, bidder, amount, and
 * time, with a `leading` highlight for the current top bid and a "You" marker.
 * Presentational: shaped data only, no callbacks. The leading state is conveyed
 * by a badge and a token-tinted surface (never color alone), and announced via
 * the row's `aria-label`. Reuses `Avatar`, `Badge`, and the shared
 * `formatMoney`; token-only colors.
 */
exports.BidRow = React.forwardRef(function BidRow({ bidder, amountCents, currency = 'USD', avatarUrl, timeLabel, leading = false, isYou = false, rank, className, ...rest }, ref) {
    const name = isYou ? 'You' : bidder;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": `${leading ? 'Leading bid, ' : ''}${name}, ${(0, commerce_1.formatMoney)(amountCents, currency)}`, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border px-[var(--xen-space-md)] py-[var(--xen-space-sm)]', leading ? 'border-success bg-success/10' : 'border-border bg-surface', className), ...rest, children: [typeof rank === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "w-5 text-sm font-semibold text-muted", children: rank })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-sm font-semibold text-on-surface", children: name }), leading ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", children: "Leading" }) : null] }), timeLabel ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: timeLabel }) : null] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', leading ? 'text-success' : 'text-on-surface'), children: (0, commerce_1.formatMoney)(amountCents, currency) })] }));
});
//# sourceMappingURL=BidRow.js.map