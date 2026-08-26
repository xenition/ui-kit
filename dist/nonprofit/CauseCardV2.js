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
exports.CauseCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const CampaignProgressV2_1 = require("./CampaignProgressV2");
/**
 * CauseCard, redesigned (v2): a **full-bleed cover hero**. The image fills the
 * card; the category badge floats top-left and the title/description sit on a
 * gradient scrim at the bottom, with a mini progress meter when funding data is
 * present. Elevated, hover-lift. Same props as {@link CauseCard}, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV2}, not
 * the base one, because an app that picks V2 picks it for every surface it sees.
 */
exports.CauseCardV2 = React.forwardRef(function CauseCardV2({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const hasGoal = typeof raisedCents === 'number' && typeof goalCents === 'number';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-cause-card": "", "aria-label": "Loading cause", className: (0, cn_1.cn)('h-56 animate-pulse rounded-lg bg-neutral-100', className), ...rest }));
    }
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cause-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('relative flex h-56 flex-col justify-end overflow-hidden rounded-lg bg-neutral-100 shadow-md transition-transform', interactive && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className), ...rest, children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 flex items-center justify-center text-4xl", children: "\uD83E\uDD1D" })), category ? (0, jsx_runtime_1.jsx)("div", { className: "absolute left-2 top-2", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) }) : null, (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-gradient-to-t from-neutral-900/75 to-transparent p-3 pt-10", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-base font-bold text-neutral-50", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 line-clamp-2 text-xs text-neutral-200", children: description }) : null, hasGoal ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-2", children: (0, jsx_runtime_1.jsx)(CampaignProgressV2_1.CampaignProgressV2, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, hideAmounts: true }) })) : null] })] }));
});
//# sourceMappingURL=CauseCardV2.js.map