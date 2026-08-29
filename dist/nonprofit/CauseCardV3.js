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
exports.CauseCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const CampaignProgressV3_1 = require("./CampaignProgressV3");
/**
 * CauseCard, redesigned (v3): a **compact list row**. A small square thumbnail,
 * the title over a category·description line, and a thin progress meter beneath —
 * hairline-bordered for a dense causes list. The opposite of v2's cover hero.
 * Same props, token-only.
 * Stays inside its own design line: the meter is {@link CampaignProgressV3}, not
 * the base one, because an app that picks V3 picks it for every surface it sees.
 */
exports.CauseCardV3 = React.forwardRef(function CauseCardV3({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant, onClick, loading = false, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const hasGoal = typeof raisedCents === 'number' && typeof goalCents === 'number';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cause-card": "", "aria-label": "Loading cause", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 w-12 animate-pulse rounded-md bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" })] }));
    }
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.();
        }
    };
    const sub = [category, description].filter((s) => !!s).join(' · ');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-cause-card": "", role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": title, onClick: interactive ? () => onClick?.() : undefined, onKeyDown: interactive ? handleKeyDown : undefined, className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-3', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl", children: imageUrl ? (0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, className: "h-full w-full object-cover" }) : '🤝' }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm font-semibold text-on-surface", children: title }), sub ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-xs text-muted", children: sub }) : null, hasGoal ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-1", children: (0, jsx_runtime_1.jsx)(CampaignProgressV3_1.CampaignProgressV3, { raisedCents: raisedCents, goalCents: goalCents, currency: currency, hideAmounts: true }) })) : null] })] }));
});
//# sourceMappingURL=CauseCardV3.js.map