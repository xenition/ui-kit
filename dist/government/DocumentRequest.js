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
exports.DocumentRequest = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const Icon_1 = require("../primitives/Icon");
const Badge_1 = require("../primitives/Badge");
const Button_1 = require("../primitives/Button");
const format_1 = require("./internal/format");
const DOC_TYPE = {
    'birth-certificate': { label: 'Birth certificate', glyph: '👶' },
    'marriage-certificate': { label: 'Marriage certificate', glyph: '💍' },
    'death-certificate': { label: 'Death certificate', glyph: '🕊️' },
    'property-deed': { label: 'Property deed', glyph: '🏠' },
    'court-record': { label: 'Court record', glyph: '⚖️' },
    transcript: { label: 'Transcript', glyph: '🎓' },
    other: { label: 'Document', glyph: '📄' },
};
const STATUS = {
    requested: { label: 'Requested', glyph: '📨', tone: 'primary' },
    processing: { label: 'Processing', glyph: '⋯', tone: 'warn' },
    ready: { label: 'Ready', glyph: '✓', tone: 'success' },
    // Native `accent` folds to `primary` on web (no `accent` BadgeTone).
    mailed: { label: 'Mailed', glyph: '📮', tone: 'primary' },
    denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
};
/**
 * A request for a public / vital record: a tinted document glyph, a status pill
 * conveyed by **text + glyph + color** (never color alone), an optional
 * integer-cents fee funnelled through `formatMoney`, and context-gated Pay /
 * Download actions (real `<button>`s). Token-bound throughout — no literal
 * colors. Web parity of the native `DocumentRequest`.
 */
exports.DocumentRequest = React.forwardRef(function DocumentRequest({ docType, title, requestNumber, status = 'requested', feeCents, paid = false, currency = 'USD', formatMoney: format = format_1.formatMoney, date, onPay, onDownload, className, ...rest }, ref) {
    const dt = DOC_TYPE[docType] ?? DOC_TYPE.other;
    const sd = STATUS[status] ?? STATUS.requested;
    const fee = feeCents != null ? Math.max(0, Math.trunc(feeCents)) : undefined;
    const showPay = onPay != null && !paid && fee != null && fee > 0;
    const showDownload = onDownload != null && status === 'ready';
    return ((0, jsx_runtime_1.jsxs)(Card_1.Card, { ref: ref, className: className, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: dt.glyph, size: "xl", color: "primary", "aria-label": dt.label }) }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title ?? dt.label }), requestNumber != null ? ((0, jsx_runtime_1.jsx)("p", { className: "text-xs text-muted", children: requestNumber })) : null] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: sd.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: sd.glyph }), " ", sd.label] })] }), fee != null || date != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-sm)] flex items-center justify-between", children: [fee != null ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Fee: ", fee === 0 ? 'Free' : format(fee, currency), paid && fee > 0 ? ' · paid' : ''] })) : ((0, jsx_runtime_1.jsx)("span", {})), date != null ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: date }) : null] })) : null, showPay || showDownload ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-md)] flex justify-end gap-[var(--xen-space-sm)]", children: [showPay ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "outline", onClick: onPay, children: "Pay fee" })) : null, showDownload ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", onClick: onDownload, children: "Download" })) : null] })) : null] }));
});
//# sourceMappingURL=DocumentRequest.js.map