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
exports.FundraiserCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const CampaignProgress_1 = require("./CampaignProgress");
/**
 * FundraiserCard, redesigned (v2): a **cover-hero fundraiser**. A tall cover image
 * with the organizer's avatar + name overlapping its lower edge, then the title,
 * a progress meter, and Donate/Share actions on the surface below. Elevated.
 * Distinct from v1's stacked card. Same props, token-only.
 */
exports.FundraiserCardV2 = React.forwardRef(function FundraiserCardV2({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant, onDonate, onShare, loading = false, className, ...rest }, ref) {
    void variant;
    void donorCount;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fundraiser-card": "", "aria-label": "Loading fundraiser", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-32 animate-pulse bg-neutral-100" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2 p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-2/3 animate-pulse rounded-sm bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2 w-full animate-pulse rounded-sm bg-neutral-100" })] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fundraiser-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative h-32 bg-neutral-100", children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center text-4xl", children: "\uD83D\uDC9D" })), (0, jsx_runtime_1.jsx)("div", { className: "absolute -bottom-5 left-3 flex items-center gap-2", children: (0, jsx_runtime_1.jsx)("div", { className: "rounded-full border-2 border-surface", children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: organizerAvatarUrl, name: organizerName, size: "md" }) }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-2 px-md pb-md pt-7", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: ["by ", organizerName] })] }), (0, jsx_runtime_1.jsx)(CampaignProgress_1.CampaignProgress, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, donorCount: donorCount }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [onDonate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "primary", className: "flex-1", onClick: onDonate, children: "Donate" })) : null, onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "md", variant: "outline", onClick: onShare, children: "Share" })) : null] })] })] }));
});
//# sourceMappingURL=FundraiserCardV2.js.map