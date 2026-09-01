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
exports.CauseCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const CampaignProgressV4_1 = require("./CampaignProgressV4");
/**
 * CauseCard — **V4** "rally" design (web parity of the native V4). The warm,
 * mission-driven browse tile for a cause: an elevated rounded card with a soft
 * shadow, a cover (image or a friendly glyph in a soft-primary well), a
 * soft-primary category chip, a bold title + blurb, and an inline
 * `CampaignProgressV4` meter when a goal is supplied. Honors all three
 * `variant`s — `default` (cover on top), `compact` (cover-less row), and
 * `featured` (larger cover + title) — identical props/behavior to
 * {@link CauseCardProps}. `onClick` makes the whole card a keyboard-activatable
 * button. All colors from `--xen-*` token classes (no literals).
 */
exports.CauseCardV4 = React.forwardRef(function CauseCardV4({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onClick, loading = false, className, ...rest }, ref) {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const container = 'overflow-hidden rounded-lg border border-border bg-surface text-on-surface shadow-md';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading cause", "aria-busy": "true", className: (0, cn_1.cn)(container, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full bg-neutral-200', isFeatured ? 'h-44' : 'h-32') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-8/12 rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-11/12 rounded-sm bg-neutral-100" })] })] }));
    }
    const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full bg-primary/10', isFeatured ? 'h-44' : 'h-32'), children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD1D", size: "2xl", "aria-label": title }) })), category ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-sm top-sm", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", children: category }) })) : null] })) : null;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [isCompact && category ? ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", variant: "soft", children: category }) })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base'), children: title }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null, hasProgress ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-sm", children: (0, jsx_runtime_1.jsx)(CampaignProgressV4_1.CampaignProgressV4, { raisedCents: raisedCents, goalCents: goalCents, currency: currency }) })) : null] }));
    const layout = isCompact ? 'flex flex-row' : 'flex flex-col';
    if (onClick) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": title, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(container, layout, 'cursor-pointer text-left transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...rest, children: [cover, body] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(container, layout, className), ...rest, children: [cover, body] }));
});
//# sourceMappingURL=CauseCardV4.js.map