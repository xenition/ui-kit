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
exports.SellerCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * A seller / shop identity block — avatar, name, an optional verified badge, a
 * star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `--xen-*` classes.
 */
exports.SellerCard = React.forwardRef(function SellerCard({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, variant = 'card', onClick, className, ...rest }, ref) {
    const inline = variant === 'inline';
    const interactive = onClick != null;
    const meta = [];
    if (typeof salesCount === 'number')
        meta.push(`${salesCount.toLocaleString()} sales`);
    if (location)
        meta.push(location);
    const identity = ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: inline ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-base font-bold text-on-surface", children: name }), verified ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: "\u2713 Verified" }) : null] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `(${reviewCount.toLocaleString()})` })) : null] })) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: meta.join(' · ') }) : null] })] }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)]', inline ? 'bg-transparent' : 'border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [interactive ? ((0, jsx_runtime_1.jsx)("div", { role: "button", tabIndex: 0, onClick: onClick, onKeyDown: internal_1.activateOnKey, "aria-label": `${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`, className: "flex flex-1 cursor-pointer items-center rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", children: identity })) : (identity), onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onClick: onContact, children: actionLabel })) : null] }));
});
//# sourceMappingURL=SellerCard.js.map