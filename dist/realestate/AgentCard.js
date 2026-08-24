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
exports.AgentCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * Web parity of the native `AgentCard`: a listing-agent summary — avatar
 * (initials fallback), name/title/agency, an optional star rating with review
 * count, and a contact action. Data + callbacks only; nothing fetches.
 * `variant="compact"` drops the rating row for dense lists. Reuses the shared
 * `Avatar`, `Button`, and `Icon` primitives; all colors come from the `--xen-*`
 * tokens — no literal colors. Pass `onClick` to make the card an activatable
 * button (the contact action stops propagation so it never double-fires).
 */
exports.AgentCard = React.forwardRef(function AgentCard({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, variant = 'default', onClick, className, ...rest }, ref) {
    const compact = variant === 'compact';
    const hasRating = typeof rating === 'number';
    const fullStars = hasRating ? Math.round(Math.min(Math.max(rating, 0), 5)) : 0;
    const meta = [title, agency].filter(Boolean).join(' · ');
    const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, onClick: onClick, className: (0, cn_1.cn)('flex items-center gap-3 border border-border bg-surface', compact ? 'p-[var(--xen-space-md)]' : 'p-[var(--xen-space-lg)]', 'rounded-[var(--xen-radius-lg)]', onClick && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary', className), ...(0, internal_1.clickableProps)(onClick, `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`), ...rest, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: compact ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-surface", children: name }), meta ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: meta }) : null, hasRating && !compact ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex", children: Array.from({ length: 5 }).map((_, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: i < fullStars ? '★' : '☆', size: "sm", color: i < fullStars ? 'warn' : 'muted' }, i))) }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: `(${reviewCount})` })) : null] })) : null] }), onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onClick: (e) => {
                    e.stopPropagation();
                    onContact();
                }, children: contactLabel })) : null] }));
});
//# sourceMappingURL=AgentCard.js.map