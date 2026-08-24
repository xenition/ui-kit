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
exports.ReviewCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/**
 * A customer review card: avatar + author, a star `Rating`, an optional service
 * chip and verified badge, the review body, and an optional salon reply block.
 * `variant="compact"` drops the body for dense lists. The verified state is a
 * spoken/labelled note with a glyph (not color alone). Token-only colors.
 */
exports.ReviewCard = React.forwardRef(function ReviewCard({ author, rating, text, date, service, avatarUrl, verified = false, variant = 'default', reply, className, ...rest }, ref) {
    const compact = variant === 'compact';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-review-card": "", "aria-label": `Review by ${author}, ${rating} out of 5 stars${verified ? ', verified' : ''}${service ? `, for ${service}` : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: author, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm font-bold text-on-surface", children: author }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm" }), date ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["\u00B7 ", date] }) : null] })] }), verified ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 rounded-[var(--xen-radius-sm)] bg-success px-[var(--xen-space-xs)] py-px text-xs font-bold text-on-success", children: "\u2713 Verified" })) : null] }), service ? ((0, jsx_runtime_1.jsx)("span", { className: "self-start rounded-full bg-primary-50 px-[var(--xen-space-sm)] py-0.5 text-xs font-semibold text-primary", children: service })) : null, !compact && text ? ((0, jsx_runtime_1.jsx)("p", { className: "text-sm leading-relaxed text-on-surface", children: text })) : null, reply ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 p-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold text-muted", children: "Response from salon" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: reply })] })) : null] }));
});
//# sourceMappingURL=ReviewCard.js.map