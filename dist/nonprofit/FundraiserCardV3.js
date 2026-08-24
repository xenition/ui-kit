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
exports.FundraiserCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const CampaignProgress_1 = require("./CampaignProgress");
/**
 * FundraiserCard, redesigned (v3): a **dense fundraiser row**. A small thumbnail,
 * the title over an organizer line + a thin progress meter, and a compact Donate
 * button on the right — hairline-bordered for a list of campaigns. The opposite
 * of v2's cover hero. Same props, token-only.
 */
exports.FundraiserCardV3 = React.forwardRef(function FundraiserCardV3({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant, onDonate, onShare, loading = false, className, ...rest }, ref) {
    void variant;
    void onShare;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fundraiser-card": "", "aria-label": "Loading fundraiser", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 animate-pulse rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fundraiser-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "h-full w-full object-cover" }) : '💝' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1 truncate text-xs text-muted", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: organizerAvatarUrl, name: organizerName, size: "xs" }), " ", organizerName, typeof donorCount === 'number' ? ` · ${donorCount} donors` : ''] }), (0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: (0, jsx_runtime_1.jsx)(CampaignProgress_1.CampaignProgress, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, hideAmounts: true }) })] }), onDonate ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "primary", onClick: onDonate, children: "Donate" })) : null] }));
});
//# sourceMappingURL=FundraiserCardV3.js.map