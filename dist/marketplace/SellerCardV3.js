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
exports.SellerCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * SellerCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name (with an inline ✓ when verified) over a rating·sales·location summary, and
 * a quiet Contact button on the trailing edge — hairline-bordered for storefront
 * lists. The opposite of v2's banner card. Same props, token-only.
 */
exports.SellerCardV3 = React.forwardRef(function SellerCardV3({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel = 'Contact', onContact, variant, onClick, className, ...rest }, ref) {
    void variant;
    void reviewCount;
    const interactive = typeof onClick === 'function';
    const meta = [
        typeof salesCount === 'number' ? `${salesCount.toLocaleString()} sales` : null,
        location,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-seller-card": "", className: (0, cn_1.cn)('flex items-center gap-3 border-b border-border py-2.5', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, open profile` : undefined, onClick: onClick, onKeyDown: interactive ? internal_1.activateOnKey : undefined, className: (0, cn_1.cn)('flex min-w-0 flex-1 items-center gap-3', interactive && 'cursor-pointer'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsxs)("p", { className: "flex items-center gap-1 truncate text-sm font-semibold text-on-surface", children: [name, verified ? (0, jsx_runtime_1.jsx)("span", { className: "text-primary", "aria-label": "Verified", children: "\u2713" }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted", children: meta.join(' · ') }) : null] })] })] }), onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onClick: onContact, children: actionLabel })) : null] }));
});
//# sourceMappingURL=SellerCardV3.js.map