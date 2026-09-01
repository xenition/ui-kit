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
exports.PaymentMethodCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '📱',
};
/**
 * A saved payment method (web parity) — the clean, trust-first row on a money
 * surface: the instrument glyph in a small brand-gradient disc (the signature V4
 * touch), the `label` + `detail`, an optional "Default" badge (success tone),
 * and a manage affordance. When `onSelect` is set the whole row becomes a
 * `role="radio"` carrying `aria-checked`; a selected row gains a 2px primary
 * ring. All colors trace to tokens — no literals.
 */
exports.PaymentMethodCard = React.forwardRef(function PaymentMethodCard({ kind, label, detail, isDefault = false, selected = false, onSelect, onManage, className, ...rest }, ref) {
    const interactive = onSelect != null;
    const body = ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [interactive ? ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2', selected ? 'border-primary' : 'border-border'), children: selected ? (0, jsx_runtime_1.jsx)("span", { className: "h-2.5 w-2.5 rounded-full bg-primary" }) : null })) : null, (0, jsx_runtime_1.jsx)("span", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700", children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: KIND_GLYPH[kind] ?? KIND_GLYPH.card, color: "onPrimary", size: "lg" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-bold text-on-surface", children: label }), detail ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted", children: detail }) : null] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [isDefault ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", children: "Default" })) : null, onManage ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": `Manage ${label}`, onClick: (e) => {
                            e.stopPropagation();
                            onManage();
                        }, className: "rounded-[var(--xen-radius-sm)] px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300", children: "Manage" })) : null] })] }));
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-lg p-5', selected && 'ring-2 ring-primary', interactive &&
            'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...(interactive
            ? {
                role: 'radio',
                tabIndex: 0,
                'aria-checked': selected,
                'aria-label': detail ? `${label}, ${detail}` : label,
                onClick: onSelect,
                onKeyDown: (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onSelect?.();
                    }
                },
            }
            : {}), ...rest, children: body }));
});
//# sourceMappingURL=PaymentMethodCard.js.map