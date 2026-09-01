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
exports.ThankYouCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * ThankYouCard — **V4** "rally" design (web parity of the native V4). The
 * post-donation confirmation card and the ONE reserved gradient moment of the
 * nonprofit "rally" line: a celebratory glyph, a thank-you headline (optionally
 * naming the donor), the gift amount in integer cents, a mission message, an
 * optional concrete impact chip, and share / receipt actions. Honors both
 * `variant`s and is prop-identical to {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: an elevated
 *   `bg-gradient-to-br from-primary-500 to-primary-700` ground with near-white
 *   `text-primary-50`/`text-primary-100` ink and frosted
 *   (`bg-primary-50/15 border-primary-50/30`) amount / impact tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient):
 *   `rounded-lg border border-border bg-surface shadow-md`, with the amount as a
 *   soft-primary chip.
 *
 * All colors come from `--xen-*` token classes (`primary`/`accent`/`neutral`
 * ramps) — no literal colors.
 */
exports.ThankYouCardV4 = React.forwardRef(function ThankYouCardV4({ donorName, amountCents, currency = 'USD', headline, message, impactLabel, variant = 'default', onShare, onViewReceipt, className, ...rest }, ref) {
    const celebratory = variant === 'celebratory';
    const resolvedHeadline = headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
    const hasAmount = typeof amountCents === 'number';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": resolvedHeadline, className: (0, cn_1.cn)('flex flex-col items-center gap-sm rounded-lg p-lg text-center shadow-md', celebratory
            ? 'bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50'
            : 'border border-border bg-surface text-on-surface', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('inline-flex h-12 w-12 items-center justify-center rounded-full', celebratory
                    ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                    : 'bg-success text-on-success'), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: celebratory ? '💝' : '🎉', size: "xl", "aria-hidden": "true" }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-extrabold', celebratory ? 'text-primary-50' : 'text-on-surface'), children: resolvedHeadline }), hasAmount ? (celebratory ? ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full border border-primary-50/30 bg-primary-50/15 px-md py-xs text-2xl font-extrabold text-primary-50", children: (0, internal_1.formatMoney)(amountCents, currency) })) : ((0, jsx_runtime_1.jsx)("span", { className: "rounded-full bg-primary-50 px-md py-xs text-2xl font-extrabold text-primary", children: (0, internal_1.formatMoney)(amountCents, currency) }))) : null, message ? ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', celebratory ? 'text-primary-100' : 'text-muted'), children: message })) : null, impactLabel ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-xs rounded-full px-md py-xs text-sm font-semibold', celebratory
                    ? 'border border-primary-50/30 bg-primary-50/15 text-primary-50'
                    : 'bg-success text-on-success'), children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF31", size: "sm", "aria-hidden": "true" }), impactLabel] })) : null, onShare || onViewReceipt ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-xs flex gap-sm", children: [onShare ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onClick: onShare, children: "Share" })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onClick: onViewReceipt, children: "View receipt" })) : null] })) : null] }));
});
//# sourceMappingURL=ThankYouCardV4.js.map