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
exports.SellerCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * SellerCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * strip carries a large avatar straddling its edge; name (+ verified badge),
 * rating, and a sales·location meta line center beneath, with a full-width
 * Contact CTA. Elevated. Distinct from v1's compact layout. Same props,
 * token-only.
 */
exports.SellerCardV2 = React.forwardRef(function SellerCardV2({ name, avatarUrl, rating, reviewCount, salesCount, location, verified, actionLabel = 'Contact', onContact, variant, onClick, className, ...rest }, ref) {
    void variant;
    const interactive = typeof onClick === 'function';
    const meta = [
        typeof salesCount === 'number' ? `${salesCount.toLocaleString()} sales` : null,
        location,
    ].filter((s) => !!s);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-seller-card": "", className: (0, cn_1.cn)('overflow-hidden rounded-lg bg-surface text-center shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-14 bg-primary/20" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-1 px-md pb-md", children: [(0, jsx_runtime_1.jsxs)("div", { role: interactive ? 'button' : undefined, tabIndex: interactive ? 0 : undefined, "aria-label": interactive ? `${name}, open profile` : undefined, onClick: onClick, onKeyDown: interactive ? internal_1.activateOnKey : undefined, className: (0, cn_1.cn)('-mt-10 flex flex-col items-center gap-1', interactive && 'cursor-pointer'), children: [(0, jsx_runtime_1.jsx)("div", { className: "rounded-full border-4 border-surface", children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: name }), verified ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: "\u2713 Verified" }) : null] })] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating }), typeof reviewCount === 'number' ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["(", reviewCount, ")"] }) : null] })) : null, meta.length > 0 ? (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: meta.join(' · ') }) : null, onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "md", variant: "primary", className: "mt-1 w-full", onClick: onContact, children: actionLabel })) : null] })] }));
});
//# sourceMappingURL=SellerCardV2.js.map