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
exports.FundraiserCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const CampaignProgressV4_1 = require("./CampaignProgressV4");
/**
 * FundraiserCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven peer-to-peer fundraiser card: an elevated rounded card with a
 * soft shadow, an organizer identity row, a cover (image or a friendly glyph in a
 * soft-primary well), a bold title, an inline `CampaignProgressV4` meter
 * (raised/goal in integer cents, with the donor meta), and donate / share
 * actions. Honors all three `variant`s — `default` (cover on top), `compact`
 * (cover-less dense row), and `featured` (larger cover + title) — identical
 * props/behavior to {@link FundraiserCardProps}. All colors from `--xen-*` token
 * classes (no literals).
 */
exports.FundraiserCardV4 = React.forwardRef(function FundraiserCardV4({ title, organizerName, organizerAvatarUrl, imageUrl, imageAlt, raisedCents, goalCents, currency = 'USD', donorCount, variant = 'default', onDonate, onShare, loading = false, className, ...rest }, ref) {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const container = 'overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading fundraiser", "aria-busy": "true", className: (0, cn_1.cn)(container, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full bg-primary/10', isFeatured ? 'h-44' : 'h-36') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-8/12 rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-6/12 rounded-sm bg-neutral-100" })] })] }));
    }
    const cover = !isCompact ? ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('relative w-full bg-primary/10', isFeatured ? 'h-44' : 'h-36'), children: imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF97\uFE0F", size: "2xl", "aria-label": title }) })) })) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(container, className), ...rest, children: [cover, (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: organizerName, src: organizerAvatarUrl, size: "sm" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: `by ${organizerName}` })] }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base'), children: title }), (0, jsx_runtime_1.jsx)(CampaignProgressV4_1.CampaignProgressV4, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, donorCount: donorCount }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onDonate, className: "w-full", children: "Donate" }) }), onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onClick: onShare, "aria-label": "Share fundraiser", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2197", size: "base" }) })) : null] })] })] }));
});
//# sourceMappingURL=FundraiserCardV4.js.map