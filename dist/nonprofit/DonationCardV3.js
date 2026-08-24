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
exports.DonationCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * DonationCard, redesigned (v3): a **compact inline ask**. The title on one line,
 * a horizontal strip of small preset pills, and a right-aligned Donate button —
 * borderless and tight for embedding in a feed. The opposite of v2's bold grid
 * card. Same props, token-only.
 */
exports.DonationCardV3 = React.forwardRef(function DonationCardV3({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant, onSelectAmount, onDonate, loading = false, disabled = false, className, ...rest }, ref) {
    void variant;
    void description;
    const active = selected ?? presets[0];
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-donation-card": "", className: (0, cn_1.cn)('flex flex-col gap-2 border-b border-border py-3', className), ...rest, children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-semibold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex min-w-0 flex-1 flex-wrap gap-1.5", role: "group", "aria-label": "Gift amount", children: presets.map((cents) => {
                            const isActive = cents === active;
                            return ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-pressed": isActive, onClick: () => onSelectAmount?.(cents), className: (0, cn_1.cn)('rounded-full border px-2.5 py-1 text-xs font-semibold transition-colors', isActive ? 'border-primary bg-primary/10 text-primary' : 'border-border text-on-surface hover:bg-neutral-50'), children: (0, internal_1.formatMoney)(cents, currency) }, cents));
                        }) }), (0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "primary", disabled: disabled || loading || typeof active !== 'number', onClick: () => typeof active === 'number' && onDonate?.(active), children: ctaLabel })] })] }));
});
//# sourceMappingURL=DonationCardV3.js.map