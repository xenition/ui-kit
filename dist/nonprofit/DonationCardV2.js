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
exports.DonationCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * DonationCard, redesigned (v2): a **bold gift card**. A large title/blurb over a
 * two-column grid of big preset amount tiles (the chosen one fills primary), with
 * a full-width Donate CTA that names the active amount. Distinct from v1's inline
 * chips. Same props, token-only.
 */
exports.DonationCardV2 = React.forwardRef(function DonationCardV2({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant, onSelectAmount, onDonate, loading = false, disabled = false, className, ...rest }, ref) {
    void variant;
    const active = selected ?? presets[0];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-donation-card": "", className: (0, cn_1.cn)('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "text-lg font-bold text-on-surface", children: title }), description ? (0, jsx_runtime_1.jsx)("p", { className: "mt-0.5 text-sm text-muted", children: description }) : null] }), presets.length > 0 ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-2 gap-2", role: "group", "aria-label": "Gift amount", children: presets.map((cents) => {
                    const isActive = cents === active;
                    return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": isActive, onClick: () => onSelectAmount?.(cents), className: (0, cn_1.cn)('rounded-md border-2 p-3 text-center text-sm font-bold transition-colors', isActive ? 'border-primary bg-primary text-on-primary' : 'border-border bg-surface text-on-surface hover:bg-primary/10'), children: (0, internal_1.formatMoney)(cents, currency) }, cents));
                }) })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "lg", variant: "primary", className: "w-full", disabled: disabled || loading || typeof active !== 'number', onClick: () => typeof active === 'number' && onDonate?.(active), children: typeof active === 'number' ? `${ctaLabel} ${(0, internal_1.formatMoney)(active, currency)}` : ctaLabel })] }));
});
//# sourceMappingURL=DonationCardV2.js.map