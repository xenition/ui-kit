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
exports.CauseCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Badge_1 = require("../primitives/Badge");
const Icon_1 = require("../primitives/Icon");
const CampaignProgress_1 = require("./CampaignProgress");
/**
 * Web parity of the native `CauseCard`: a browse tile for a single cause /
 * program — cover (image or token placeholder), a category badge, title, blurb,
 * and an optional inline `CampaignProgress` meter when a goal is supplied.
 * `variant` switches between a full card, a `compact` cover-less row, and a
 * larger `featured` treatment. When `onClick` is set the whole card becomes a
 * `role="button"` target with keyboard (Enter / Space) activation. All colors
 * come from the `--xen-*` token classes — no literal colors.
 */
exports.CauseCard = React.forwardRef(function CauseCard({ title, description, imageUrl, imageAlt, category, raisedCents, goalCents, currency = 'USD', variant = 'default', onClick, loading = false, className, ...rest }, ref) {
    const isCompact = variant === 'compact';
    const isFeatured = variant === 'featured';
    const container = 'overflow-hidden rounded-lg border border-border bg-surface';
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": "Loading cause", "aria-busy": "true", className: (0, cn_1.cn)(container, className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('w-full bg-neutral-200', isFeatured ? 'h-44' : 'h-32') }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm p-md", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-4 w-8/12 rounded-sm bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-11/12 rounded-sm bg-neutral-100" })] })] }));
    }
    const hasProgress = typeof raisedCents === 'number' && typeof goalCents === 'number';
    const cover = !isCompact ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('relative w-full bg-neutral-100', isFeatured ? 'h-44' : 'h-32'), children: [imageUrl ? ((0, jsx_runtime_1.jsx)("img", { src: imageUrl, alt: imageAlt ?? title, loading: "lazy", className: "h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83E\uDD1D", size: "2xl", "aria-label": title }) })), category ? ((0, jsx_runtime_1.jsx)("span", { className: "absolute left-sm top-sm", children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null] })) : null;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-xs p-md", children: [isCompact && category ? ((0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: "primary", children: category }) })) : null, (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-base'), children: title }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null, hasProgress ? ((0, jsx_runtime_1.jsx)("div", { className: "mt-xs", children: (0, jsx_runtime_1.jsx)(CampaignProgress_1.CampaignProgress, { raisedCents: raisedCents, goalCents: goalCents, currency: currency }) })) : null] }));
    const layout = isCompact ? 'flex flex-row' : 'flex flex-col';
    if (onClick) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "button", tabIndex: 0, "aria-label": title, onClick: onClick, onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }, className: (0, cn_1.cn)(container, layout, 'cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: [cover, body] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(container, layout, className), ...rest, children: [cover, body] }));
});
//# sourceMappingURL=CauseCard.js.map