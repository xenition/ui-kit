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
exports.BenefitCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const format_1 = require("./internal/format");
const pressable_1 = require("./internal/pressable");
const BENEFIT_TYPE = {
    food: { label: 'Food assistance', glyph: '🥫' },
    unemployment: { label: 'Unemployment', glyph: '💼' },
    housing: { label: 'Housing', glyph: '🏘️' },
    medical: { label: 'Medical', glyph: '⚕️' },
    disability: { label: 'Disability', glyph: '♿' },
    family: { label: 'Family support', glyph: '👪' },
    other: { label: 'Benefit', glyph: '🤝' },
};
const STATUS = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
    expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
    expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
    suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};
/**
 * A public-benefit / assistance case card: a tinted program glyph, an enrolment
 * status pill conveyed by **text + glyph + color** (never color alone), an
 * optional recurring amount as integer cents through `formatMoney`, and case /
 * next-payment metadata. Becomes a keyboard-operable button only when `onClick`
 * is supplied. Token-bound throughout — no literal colors. Web parity of the
 * native `BenefitCard`.
 */
exports.BenefitCard = React.forwardRef(function BenefitCard({ name, benefitType, status = 'active', amountCents, cadence = '/mo', caseNumber, nextDate, currency = 'USD', formatMoney: format = format_1.formatMoney, onClick, className, ...rest }, ref) {
    const bt = BENEFIT_TYPE[benefitType] ?? BENEFIT_TYPE.other;
    const sd = STATUS[status] ?? STATUS.active;
    const interactive = (0, pressable_1.pressableProps)(onClick);
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, "aria-label": interactive ? `${name}, ${bt.label}, ${sd.label}` : undefined, className: (0, cn_1.cn)(interactive &&
            'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...interactive, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: bt.glyph, size: "xl", color: "primary", "aria-label": bt.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-lg font-bold text-on-surface", children: name }), (0, jsx_runtime_1.jsxs)("p", { className: "truncate text-sm text-muted", children: [bt.label, caseNumber != null ? ` · ${caseNumber}` : ''] })] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] }), amountCents != null || nextDate != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]", children: [amountCents != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold text-primary", children: format(Math.max(0, Math.trunc(amountCents)), currency) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: cadence })] })) : ((0, jsx_runtime_1.jsx)("span", {})), nextDate != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Next: ", nextDate] })) : null] })) : null] }));
});
//# sourceMappingURL=BenefitCard.js.map