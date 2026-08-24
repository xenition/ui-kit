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
exports.MatchingGiftBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * Web parity of the native `MatchingGiftBanner`: a promotional banner announcing
 * a gift-matching offer — sponsor, multiplier, an optional matched/cap progress
 * bar (integer cents → `formatMoney`, cap divide-by-zero guarded), a deadline,
 * and an optional CTA. `variant` chooses a solid primary fill, a soft primary
 * tint, or an outline. Progress is shown as a `role="progressbar"` bar plus a
 * printed cap figure — not color alone. All colors come from the `--xen-*` token
 * classes — no literal colors.
 */
exports.MatchingGiftBanner = React.forwardRef(function MatchingGiftBanner({ matcherName, multiplier = 2, matchedCents, capCents, currency = 'USD', deadlineLabel, actionLabel = 'Give now', onAction, variant = 'soft', className, ...rest }, ref) {
    const solid = variant === 'solid';
    const surfaceClass = solid
        ? 'bg-primary text-on-primary'
        : variant === 'soft'
            ? 'bg-primary-50 text-on-surface'
            : 'border border-primary bg-surface text-on-surface';
    const subFg = solid ? 'text-on-primary' : 'text-muted';
    const hasBar = typeof matchedCents === 'number' && typeof capCents === 'number';
    const pct = hasBar ? (0, internal_1.goalPct)(matchedCents, capCents) : 0;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": `${matcherName} is matching gifts ${multiplier}x`, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-lg p-md', surfaceClass, className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2728", size: "lg", color: solid ? 'onPrimary' : 'primary' }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-base font-extrabold", children: `${matcherName} matches ${multiplier}× your gift` })] }), hasBar ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(pct), className: (0, cn_1.cn)('h-2 w-full overflow-hidden rounded-full', solid ? 'bg-primary-300' : 'bg-border'), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', solid ? 'bg-on-primary' : 'bg-primary'), style: { width: `${pct}%` } }) }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs', subFg), children: `${(0, internal_1.formatMoney)(matchedCents, currency)} of ${(0, internal_1.formatMoney)(capCents, currency)} matched` })] })) : null, deadlineLabel ? (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', subFg), children: deadlineLabel }) : null, onAction ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: solid ? 'secondary' : 'primary', onClick: onAction, children: actionLabel })) : null] }));
});
//# sourceMappingURL=MatchingGiftBanner.js.map