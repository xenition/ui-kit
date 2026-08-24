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
exports.DonationCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * Web parity of the native `DonationCard`: the donate call-to-action surface —
 * a title/blurb, a grid of preset gift amounts (integer cents → localized
 * currency via `formatMoney`), and a primary CTA that reports the chosen amount.
 * Selection is conveyed by a filled chip, a bold border, AND `aria-checked` on a
 * `role="radio"` button — not color alone. When no `presets` are supplied the
 * grid is omitted and the CTA reports `0`. All colors come from the `--xen-*`
 * token classes — no literal colors.
 */
exports.DonationCard = React.forwardRef(function DonationCard({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant = 'default', onSelectAmount, onDonate, loading = false, disabled = false, className, ...rest }, ref) {
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';
    const fallback = presets.length > 0 ? (presets[0] ?? 0) : 0;
    const active = selected != null ? selected : fallback;
    const busy = loading || disabled;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": title, className: (0, cn_1.cn)('flex flex-col gap-md rounded-lg border border-border bg-surface', isCompact ? 'p-md' : 'p-lg', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-bold text-on-surface', isFeatured ? 'text-xl' : 'text-lg'), children: title }), description ? (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: description }) : null] }), presets.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { role: "radiogroup", "aria-label": "Gift amount", className: "flex flex-wrap gap-sm", children: presets.map((cents, i) => {
                    const isOn = cents === active;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", role: "radio", "aria-checked": isOn, "aria-label": (0, internal_1.formatMoney)(cents, currency), disabled: disabled, onClick: () => onSelectAmount?.(cents), className: (0, cn_1.cn)('rounded-md px-md py-sm text-base font-bold transition-colors', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', 'disabled:pointer-events-none disabled:opacity-50', isOn
                            ? 'border-2 border-primary bg-primary-50 text-primary'
                            : 'border border-border bg-surface text-on-surface hover:bg-neutral-100'), children: (0, internal_1.formatMoney)(cents, currency) }, i));
                }) })) : null, (0, jsx_runtime_1.jsxs)(Button_1.Button, { variant: "primary", disabled: busy, onClick: () => onDonate?.(active), className: "gap-xs", children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2764\uFE0F", size: "base" }), presets.length > 0 ? `${ctaLabel} ${(0, internal_1.formatMoney)(active, currency)}` : ctaLabel] })] }));
});
//# sourceMappingURL=DonationCard.js.map