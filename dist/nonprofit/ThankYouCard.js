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
exports.ThankYouCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * Web parity of the native `ThankYouCard`: a post-donation confirmation card — a
 * celebratory glyph, a thank-you headline (optionally naming the donor and their
 * gift amount in integer cents), a mission message, an optional concrete impact
 * line, and share / receipt actions. `celebratory` renders on a tinted primary
 * panel. All colors come from the `--xen-*` token classes — no literal colors.
 */
exports.ThankYouCard = React.forwardRef(function ThankYouCard({ donorName, amountCents, currency = 'USD', headline, message, impactLabel, variant = 'default', onShare, onViewReceipt, className, ...rest }, ref) {
    const celebratory = variant === 'celebratory';
    const resolvedHeadline = headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": resolvedHeadline, className: (0, cn_1.cn)('flex flex-col items-center gap-sm rounded-lg p-lg text-center', celebratory ? 'bg-primary-50' : 'border border-border bg-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "inline-flex h-12 w-12 items-center justify-center rounded-full bg-success text-on-success", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF89", size: "xl" }) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-extrabold text-on-surface", children: resolvedHeadline }), typeof amountCents === 'number' ? ((0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-extrabold text-primary", children: (0, internal_1.formatMoney)(amountCents, currency) })) : null, message ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: message }) : null, impactLabel ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-xs rounded-full bg-success px-md py-xs text-sm font-semibold text-on-success", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF31", size: "sm" }), impactLabel] })) : null, onShare || onViewReceipt ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex gap-sm", children: [onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onShare, children: "Share" })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onClick: onViewReceipt, children: "View receipt" })) : null] })) : null] }));
});
//# sourceMappingURL=ThankYouCard.js.map