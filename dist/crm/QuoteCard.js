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
exports.QuoteCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
const internal_1 = require("./internal");
/**
 * Card for a sales quote / proposal: number, account, line-item count, grand
 * total (cents → `formatMoney`) and a lifecycle {@link Badge} whose glyph + word
 * carry the status (draft/sent/viewed/accepted/rejected/expired) so it is never
 * color-only. An optional inline action button (`onAction`) drives the next
 * step. When `onClick` is set the card body is a `role="button"` div. All colors
 * are `--xen-*` token classes.
 */
exports.QuoteCard = React.forwardRef(function QuoteCard({ number, company, totalCents, currency = 'USD', lineItems, status, validUntil, actionLabel, onAction, onClick, className, ...rest }, ref) {
    const meta = internal_1.QUOTE_META[status];
    const itemsLabel = lineItems != null && lineItems > 0 ? `${lineItems} item${lineItems === 1 ? '' : 's'}` : undefined;
    const interactive = onClick ? (0, internal_1.activate)(onClick) : {};
    return ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { ref: ref, "aria-label": onClick ? `Quote ${number}` : undefined, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-start justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-bold text-on-surface", children: number }), company ? (0, jsx_runtime_1.jsx)("p", { className: "truncate text-sm text-muted", children: company }) : null] }), (0, jsx_runtime_1.jsxs)(primitives_1.Badge, { tone: (0, internal_1.toneBadgeTone)(meta.tone), "aria-label": `Status ${meta.label}`, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), (0, jsx_runtime_1.jsx)("span", { children: meta.label })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-on-surface", children: (0, commerce_1.formatMoney)(totalCents, currency) }), itemsLabel || validUntil ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [itemsLabel, validUntil].filter(Boolean).join(' · ') })) : null] }), actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onClick: (e) => {
                    e.stopPropagation();
                    onAction();
                }, children: actionLabel })) : null] }));
});
//# sourceMappingURL=QuoteCard.js.map